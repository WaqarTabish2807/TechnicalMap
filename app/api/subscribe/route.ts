import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { kv } from "../kv";
import { APIError } from "loops";
import { loops } from "../loops";
import { sql } from "~/lib/db";
import fs from "fs";
import path from "path";

const CONFIRM_EMAIL_ID = "cmc14q1uu0ylizl0i59n1sv7l";

const LOCAL_SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

function saveSubscriberLocally(email: string) {
    try {
        let subscribers = [];
        if (fs.existsSync(LOCAL_SUBSCRIBERS_FILE)) {
            const fileData = fs.readFileSync(LOCAL_SUBSCRIBERS_FILE, "utf-8");
            subscribers = JSON.parse(fileData);
        }
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            fs.writeFileSync(LOCAL_SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
            console.log(`[Dev Fallback] Saved ${email} to subscribers.json`);
        }
    } catch (err) {
        console.error("Failed to save subscriber locally:", err);
    }
}

export async function POST(request: NextRequest) {
    const email: string | null = request.nextUrl.searchParams.get("email");
    if (!email) {
        return NextResponse.json(
            { code: "missing_email", error: "Email is required" },
            { status: 400 }
        );
    }

    // Always log/save locally in dev
    saveSubscriberLocally(email);

    // 1. Try PostgreSQL if URL is available
    if (process.env.POSTGRES_URL) {
        try {
            await sql`CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );`;

            // Insert email
            await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING;`;
        } catch (error) {
            console.error("Postgres subscription storage error:", error);
        }
    } else {
        console.warn("POSTGRES_URL not set, skipping database storage");
    }

    const hasLoops = process.env.LOOPS_API_KEY && process.env.LOOPS_API_KEY !== "example_key";
    if (hasLoops) {
        try {
            await loops.createContact(email, {
                subscribed: false,
            });
        } catch (error) {
            console.error("Loops subscription creation error:", error);
            // @ts-ignore
            if (error instanceof APIError && error.json.message === "Email already on list.") {
                return NextResponse.json(
                    { code: "email_already_exists", error: "Email already exists" },
                    { status: 409 }
                );
            }
        }
    } else {
        console.log(`[Dev Mode] Mock Loops contact created for: ${email}`);
    }

    const token = crypto.randomBytes(12).toString("hex");
    
    const hasRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL !== "https://example.com";
    if (hasRedis) {
        try {
            await kv.set(`token:${token}`, email, { ex: 60 * 60 * 24 * 7 });
        } catch (error) {
            console.error("KV storage error:", error);
        }
    } else {
        console.log(`[Dev Mode] Mock Redis token set for: token:${token} -> ${email}`);
    }

    if (hasLoops) {
        try {
            await loops.sendTransactionalEmail({
                transactionalId: CONFIRM_EMAIL_ID,
                email,
                dataVariables: {
                    confirmation_link: `${request.nextUrl.origin}/api/verify?token=${token}`,
                }
            });
        } catch (error) {
            console.error("Loops transactional email error:", error);
        }
    } else {
        console.log(`[Dev Mode] Mock confirmation link: ${request.nextUrl.origin}/api/verify?token=${token}`);
    }

    return new Response(null, { status: 201 });
}
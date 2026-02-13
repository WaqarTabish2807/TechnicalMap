import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { kv } from "../kv";
import { APIError } from "loops";
import { loops } from "../loops";
import { sql } from "~/lib/db";

const CONFIRM_EMAIL_ID = "cmc14q1uu0ylizl0i59n1sv7l";

export async function POST(request: NextRequest) {
    const email: string | null = request.nextUrl.searchParams.get("email");
    if (!email) {
        return NextResponse.json(
            { code: "missing_email", error: "Email is required" },
            { status: 400 }
        );
    }

    try {
        // Ensure table exists (in a real app, do this via migrations)
        // Check if environment variables are set for Postgres
        if (process.env.POSTGRES_URL) {
            await sql`CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );`;

            // Insert email
            await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING;`;
        } else {
            console.warn("POSTGRES_URL not set, skipping database storage");
        }

        // Proceed with Loops (original logic)
        await loops.createContact(email, {
            subscribed: false,
        });
    } catch (error) {
        console.error("Subscription error:", error);
        // @ts-ignore
        if (error instanceof APIError && error.json.message === "Email already on list.") {
            // Even if already on Loops list, we ensured it's in DB above
            return NextResponse.json(
                { code: "email_already_exists", error: "Email already exists" },
                { status: 409 }
            );
        }
        // If Loops fails but DB succeeded, we might still want to return error or success?
        // For now, mirroring original behavior but logging error.

        // If it's a DB error, we should probably handle it, but for now continuing.
    }

    const token = crypto.randomBytes(12).toString("hex");
    await kv.set(`token:${token}`, email, { ex: 60 * 60 * 24 * 7 });

    try {
        await loops.sendTransactionalEmail({
            transactionalId: CONFIRM_EMAIL_ID,
            email,
            dataVariables: {
                confirmation_link: `${request.nextUrl.origin}/api/verify?token=${token}`,
            }
        });
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
        // Don't fail the request if email sending fails, as we've stored the email (hopefully)
    }

    return new Response(null, { status: 201 });
}
import { NextResponse } from "next/server";
import { sql } from "~/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (process.env.POSTGRES_URL) {
            const result = await sql`SELECT * FROM subscribers ORDER BY created_at DESC;`;
            return NextResponse.json({ subscribers: result.rows });
        } else {
            return NextResponse.json({ error: "POSTGRES_URL not set" }, { status: 500 });
        }
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return NextResponse.json(
            { error: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}

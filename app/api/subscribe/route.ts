import { NextRequest, NextResponse, after } from "next/server";
import IsEmail from "isemail";
import { sql } from "~/lib/db";

// Subscribers are stored in Neon Postgres (the list we own) and, when Kit is
// configured, mirrored to Kit (the tool that sends the weekly newsletter).
//
// Env vars (Vercel → Project → Settings → Environment Variables):
//   POSTGRES_URL              → Neon, set automatically by the Vercel Neon integration
//   KIT_API_KEY, KIT_FORM_ID  → optional, Kit v4 API key + the signup form's id
//
// Table: db/schema.sql

async function saveSubscriber(email: string, source: string | null) {
  const { rowCount } = await sql`
    insert into subscribers (email, source)
    values (${email}, ${source})
    on conflict (email) do nothing
  `;
  return { isNew: (rowCount ?? 0) > 0 };
}

async function addToKit(email: string, referrer: string | null) {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    console.warn("KIT_API_KEY / KIT_FORM_ID not set, skipping Kit");
    return;
  }

  const headers = {
    "X-Kit-Api-Key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // The subscriber has to exist before it can be added to a form. Creating it
  // as "inactive" lets the form's double opt-in email do the confirming.
  const created = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, state: "inactive" }),
  });
  if (!created.ok) {
    throw new Error(`Kit create subscriber failed: ${created.status} ${await created.text()}`);
  }

  const added = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, referrer }),
  });
  if (!added.ok) {
    throw new Error(`Kit add to form failed: ${added.status} ${await added.text()}`);
  }
}

export async function POST(request: NextRequest) {
  let body: { email?: unknown; source?: unknown } = {};
  try {
    body = await request.json();
  } catch {}

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !IsEmail.validate(email)) {
    return NextResponse.json(
      { code: "invalid_email", error: "Please enter a valid email address" },
      { status: 400 }
    );
  }
  const source = typeof body.source === "string" ? body.source.slice(0, 200) : null;

  let isNew: boolean;
  try {
    ({ isNew } = await saveSubscriber(email, source));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { code: "storage_error", error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  if (!isNew) {
    return NextResponse.json(
      { code: "email_already_exists", error: "Email already exists" },
      { status: 409 }
    );
  }

  // The email is already safe in Neon, so Kit runs after the response is sent
  // and a Kit failure doesn't fail the signup. Anything missed can be
  // re-imported into Kit from the subscribers table.
  after(() => addToKit(email, source).catch((error) => console.error(error)));

  return new Response(null, { status: 201 });
}

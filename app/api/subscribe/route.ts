import { NextRequest, NextResponse, after } from "next/server";
import IsEmail from "isemail";
import { sql } from "~/lib/db";

// Subscribers are stored in Neon Postgres (the list we own) and, when Kit is
// configured, mirrored to Kit (the tool that sends the weekly newsletter).
//
// Env vars (Vercel → Project → Settings → Environment Variables):
//   TTM_POSTGRES_URL / POSTGRES_URL → Neon (see lib/db.ts)
//   KIT_API_KEY, KIT_FORM_ID        → optional, Kit v4 API key + the signup form's id
//
// Table: db/schema.sql

// Extra lists someone can join on top of the newsletter. Each one becomes a
// tag in Neon and a tag of the same name in Kit.
const ALLOWED_TAGS = ["course-waitlist"];

const KIT_API = "https://api.kit.com/v4";

/**
 * Saves the email (and tag, if any). `isNew` means a brand-new subscriber;
 * `tagAdded` means an existing subscriber just joined the tagged list.
 */
async function saveSubscriber(email: string, source: string | null, tag: string | null) {
  const tags = tag ? [tag] : [];
  const { rows } = await sql<{ inserted: boolean; had_tag: boolean }>`
    with existing as (
      select tags from subscribers where email = ${email}
    )
    insert into subscribers (email, source, tags)
    values (${email}, ${source}, ${tags as any})
    on conflict (email) do update
      set tags = array(select distinct unnest(subscribers.tags || excluded.tags))
    returning
      (xmax = 0) as inserted,
      coalesce(${tag}::text = any(coalesce((select tags from existing), '{}')), false) as had_tag
  `;
  const { inserted, had_tag } = rows[0];
  return { isNew: inserted, tagAdded: !inserted && !!tag && !had_tag };
}

function kitHeaders() {
  return {
    "X-Kit-Api-Key": process.env.KIT_API_KEY!,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function kitFetch(path: string, body?: unknown) {
  const response = await fetch(`${KIT_API}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: kitHeaders(),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Kit ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.status === 204 ? null : response.json();
}

async function addToKitForm(email: string, referrer: string | null) {
  // The subscriber has to exist before it can be added to a form. Creating it
  // as "inactive" lets the form's double opt-in email do the confirming.
  await kitFetch("/subscribers", { email_address: email, state: "inactive" });
  await kitFetch(`/forms/${process.env.KIT_FORM_ID}/subscribers`, {
    email_address: email,
    referrer,
  });
}

async function addKitTag(email: string, tagName: string) {
  const { tags } = await kitFetch("/tags");
  let tag = tags.find((t: { name: string }) => t.name === tagName);
  if (!tag) {
    ({ tag } = await kitFetch("/tags", { name: tagName }));
  }
  await kitFetch(`/tags/${tag.id}/subscribers`, { email_address: email });
}

async function syncToKit(email: string, source: string | null, tag: string | null, isNew: boolean) {
  if (!process.env.KIT_API_KEY || !process.env.KIT_FORM_ID) {
    console.warn("KIT_API_KEY / KIT_FORM_ID not set, skipping Kit");
    return;
  }
  if (isNew) await addToKitForm(email, source);
  if (tag) await addKitTag(email, tag);
}

export async function POST(request: NextRequest) {
  let body: { email?: unknown; source?: unknown; tag?: unknown } = {};
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
  const tag =
    typeof body.tag === "string" && ALLOWED_TAGS.includes(body.tag) ? body.tag : null;

  let result: { isNew: boolean; tagAdded: boolean };
  try {
    result = await saveSubscriber(email, source, tag);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { code: "storage_error", error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  if (!result.isNew && !result.tagAdded) {
    return NextResponse.json(
      { code: "email_already_exists", error: "Email already exists" },
      { status: 409 }
    );
  }

  // The email is already safe in Neon, so Kit runs after the response is sent
  // and a Kit failure doesn't fail the signup. Anything missed can be
  // re-imported into Kit from the subscribers table.
  after(() =>
    syncToKit(email, source, tag, result.isNew).catch((error) => console.error(error))
  );

  return NextResponse.json({ isNew: result.isNew }, { status: 201 });
}

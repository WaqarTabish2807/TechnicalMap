-- Run once against the Neon database (Neon console → SQL Editor).
-- The subscribe API connects with POSTGRES_URL, which Vercel sets when Neon
-- is added from the project's Storage tab.

create table if not exists subscribers (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

-- Tags for opt-in lists on top of the newsletter (e.g. 'course-waitlist').
alter table subscribers add column if not exists tags text[] not null default '{}';

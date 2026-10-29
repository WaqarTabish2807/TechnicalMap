# The Technical Map

Source for [technicalmap.blog](https://www.technicalmap.blog): technical deep-dives and UGC for AI & DevTool startups, by Waqar Tabish.

## Develop

```bash
pnpm install
pnpm dev
```

Posts live in `content/<slug>/index.mdx` and are listed in `app/(main)/posts.tsx`.
Site name, links and the "Work with me" contact URL are in `lib/config.ts`.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables (and in `.env` for local dev).

| Variable | What it's for |
| --- | --- |
| `POSTGRES_URL` | Neon Postgres, where subscriber emails are stored. Set automatically when Neon is added from Vercel's Storage tab. Create the table with `db/schema.sql`. |
| `KIT_API_KEY`, `KIT_FORM_ID` | Optional. Mirrors each signup into Kit, which sends the weekly newsletter. |
| `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Comments on posts (Giscus / GitHub Discussions). Get them from giscus.app. |

## SEO

`/sitemap.xml`, `/robots.txt` and `/rss.xml` are generated from the post list. Every post gets a canonical URL, Open Graph tags, a generated preview image (`/og?title=...`) and `TechArticle` structured data.

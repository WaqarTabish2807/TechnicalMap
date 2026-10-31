# [The Technical Map](https://www.technicalmap.blog)

The source for my site. I'm Waqar. I write technical deep-dives for AI and DevTool startups, and I make UGC videos for them over on [@waqar.ugc](https://www.instagram.com/waqar.ugc/).

Most developer tools have two content problems. The docs explain every feature, and the ads explain none of them. This site is where I work on the first half of that problem, in public.

**Live:** [technicalmap.blog](https://www.technicalmap.blog) · **Work with me:** [/work](https://www.technicalmap.blog/work) · **Newsletter:** [/newsletter](https://www.technicalmap.blog/newsletter)

## What's in here

- **Posts.** Long-form technical guides. Some are client work (Composio, Namespace), some are just things I wanted to figure out.
- **/work.** What I offer and how a project runs. This is the page that pays the bills.
- **/newsletter.** One email a week. Every issue I publish in Kit also gets its own page here.
- **A course waitlist.** The technical writing course isn't out yet. The banner on the homepage collects names for when it is.

## Built with

- [Next.js 16](https://nextjs.org) and React 19
- [MDX](https://mdxjs.com) via `mdx-bundler` for posts
- [Tailwind CSS](https://tailwindcss.com), with some Stitches left over from the original codebase
- [Neon](https://neon.tech) Postgres for the subscriber list
- [Kit](https://kit.com) to actually send the newsletter
- [Vercel](https://vercel.com) for hosting and analytics

## Running it locally

You'll need Node 20+. The repo pins pnpm through Corepack, so you don't have to install it yourself.

```bash
git clone https://github.com/WaqarTabish2807/TechnicalMap.git
cd TechnicalMap
corepack enable
pnpm install
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

`pnpm dev` runs two things at once: Next.js, and a Babel watcher that compiles `content/` into `_dist-content/`. If a post isn't showing up, that watcher is usually why.

## Writing a new post

1. Make a folder: `content/<slug>/index.mdx`.
2. Add the frontmatter:

   ```yaml
   ---
   title: "The headline people see on the page"
   seoTitle: "The title Google sees, 50-60 characters"   # optional
   blurb: "One or two sentences under the headline."
   description: "The meta description, around 150-160 characters."
   publishedAt: "2026-10-31"
   editedAt: "2026-10-31"
   client: Composio                                     # optional, shows the gold client badge
   ---
   ```

3. Add the post to the list in `app/(main)/posts.tsx`, with its cover art in `app/_images/`.

That's it. The sitemap, RSS feed, `llms.txt`, social preview image and structured data all build themselves from that list.

## How the newsletter works

1. Someone signs up anywhere on the site.
2. `/api/subscribe` saves them to the `subscribers` table in Neon first. That's the list I own.
3. Then it adds them to my Kit form in the background. Kit sends the confirmation email and, later, the newsletter.
4. When I publish an issue in Kit and mark it **public**, it shows up on `/newsletter` within the hour.

If Kit ever goes down, nobody's email is lost. It's already in Neon.

The table lives in [`db/schema.sql`](db/schema.sql). Course waitlist signups get a `course-waitlist` tag in both places.

## Environment variables

Copy these into `.env` for local dev, and into Vercel → Settings → Environment Variables for production.

| Variable | What it's for |
| --- | --- |
| `POSTGRES_URL` | Neon connection string. On Vercel the Neon integration provides it as `TTM_POSTGRES_URL`, and the code checks that first. |
| `KIT_API_KEY` | Kit v4 API key. Optional, but without it nobody gets emails. |
| `KIT_FORM_ID` | The Kit form new subscribers are added to. |

## SEO and AI search

I want people to find this through Google and through ChatGPT, Claude and Perplexity. So the site has:

- `sitemap.xml`, `robots.txt` and an RSS feed at `/rss.xml`
- `/llms.txt`, a plain-text summary of the site written for AI assistants
- Structured data on every page: `Person`, `WebSite`, `TechArticle`, plus `ProfessionalService` and `FAQPage` on /work
- A generated preview image for every post at `/og?title=...`

## Where things live

```
app/(main)/        homepage, /work, /newsletter, the posts list
app/api/subscribe  newsletter and waitlist signups
app/svg-paths/     the SVG paths interactive guide
content/           the posts themselves (MDX)
lib/config.ts      site name, links, the Cal.com booking link
lib/               database, Kit, structured data, OG card
pages/[content]    the template every post renders through
```

## Credits

This site started as a fork of [NotANumber](https://github.com/nandanmen/NotANumber) by [Nanda Syahrasyad](https://nan.fyi). The layout, the interactive components and the overall feel come from that project, and so does the SVG paths guide. If you like how this site looks, go read [nan.fyi](https://nan.fyi). It's where I learned what an interactive blog could be.

Everything else, the posts in `content/`, the newsletter and the /work page, is mine.

## License

It's split three ways, and [LICENSE](LICENSE) has the details:

- **Code from NotANumber** belongs to its author. It has no open-source license, so ask them before reusing it.
- **My writing** (the posts and site copy) is all rights reserved. Short quotes with a link back are fine.
- **Code I wrote** for this site (the newsletter signup, /work, the SEO setup and a few components) is MIT. Take it.

## Say hi

If you're building an AI or DevTool product that's hard to explain, [book 30 minutes](https://cal.com/waqar-tabish-qv6xvy/30min) or find me on [LinkedIn](https://www.linkedin.com/in/md-waqar-tabish/).

import { posts } from "../(main)/posts";
import { BASE_URL, LINKS, SITE } from "~/lib/config";

// llms.txt (https://llmstxt.org): a plain summary of the site for AI assistants
// such as ChatGPT, Claude and Perplexity, so they describe and cite it accurately.
export function GET() {
  // svg-paths is adapted from Nanda Syahrasyad's original, so it isn't listed
  // as Waqar's own guide.
  const ownPosts = posts.filter(
    (post) => !post.slug.startsWith("https") && post.slug !== "svg-paths",
  );
  const clientPosts = ownPosts.filter((post) => post.client);
  const otherPosts = ownPosts.filter((post) => !post.client);

  const line = (post: (typeof posts)[number]) =>
    `- [${post.title}](${BASE_URL}/${post.slug}): ${post.shortDescription}` +
    (post.client ? ` Written for ${post.client}.` : "");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is run by ${SITE.author}, a content partner for AI and DevTool startups. He writes technical deep-dives that developers read, and makes short-form UGC videos (face cam plus screen recording) on Instagram as @waqar.ugc that show what a product does in under a minute. Startups can hire him for an article, a set of UGC videos, or both together.

## Work with Waqar

- [Work with me](${BASE_URL}/work): Services, packages and how a project runs.
- [Book a 30-minute brief call](${LINKS.contact})
- [UGC portfolio on Instagram](${LINKS.instagram})
- [LinkedIn](${LINKS.linkedin})

## Client work

${clientPosts.map(line).join("\n")}

## Guides

${otherPosts.map(line).join("\n")}

## Newsletter

- [The Technical Map, weekly](${BASE_URL}/newsletter): One email a week on how AI and DevTool products get explained, and which explanations convert.

## Optional

- [RSS feed](${BASE_URL}/rss.xml)
- [Sitemap](${BASE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

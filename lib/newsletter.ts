// Newsletter issues come from Kit broadcasts. Only broadcasts that are
// published and marked public in Kit show up on /newsletter.

export type Issue = {
  id: number;
  subject: string;
  description: string | null;
  publishedAt: string;
  thumbnailUrl: string | null;
  slug: string;
};

type KitBroadcast = {
  id: number;
  subject: string | null;
  description: string | null;
  content: string | null;
  public: boolean;
  published_at: string | null;
  thumbnail_url: string | null;
};

const REVALIDATE_SECONDS = 60 * 60;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

async function kitGet<T>(path: string): Promise<T | null> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return null;
  const response = await fetch(`https://api.kit.com/v4${path}`, {
    headers: { "X-Kit-Api-Key": apiKey, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) {
    console.error(`Kit ${path} failed: ${response.status}`);
    return null;
  }
  return response.json();
}

function toIssue(broadcast: KitBroadcast): Issue {
  const subject = broadcast.subject || "Untitled issue";
  return {
    id: broadcast.id,
    subject,
    description: broadcast.description,
    publishedAt: broadcast.published_at!,
    thumbnailUrl: broadcast.thumbnail_url,
    slug: `${broadcast.id}-${slugify(subject)}`,
  };
}

const isPublished = (b: KitBroadcast) => b.public && !!b.published_at;

export async function getIssues(): Promise<Issue[]> {
  const data = await kitGet<{ broadcasts: KitBroadcast[] }>("/broadcasts?per_page=1000");
  return (data?.broadcasts ?? [])
    .filter(isPublished)
    .map(toIssue)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getIssue(slug: string) {
  const id = Number.parseInt(slug, 10);
  if (!Number.isFinite(id)) return null;
  const data = await kitGet<{ broadcast: KitBroadcast }>(`/broadcasts/${id}`);
  if (!data?.broadcast || !isPublished(data.broadcast)) return null;
  return { ...toIssue(data.broadcast), content: data.broadcast.content ?? "" };
}

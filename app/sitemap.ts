import type { MetadataRoute } from "next";
import { posts } from "./(main)/posts";
import { BASE_URL } from "~/lib/config";
import { getIssues } from "~/lib/newsletter";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const issues = await getIssues();
  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/newsletter`, changeFrequency: "weekly", priority: 0.7 },
    ...posts
      .filter((post) => !post.slug.startsWith("https"))
      .map((post) => ({
        url: `${BASE_URL}/${post.slug}`,
        lastModified: new Date(post.editedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...issues.map((issue) => ({
      url: `${BASE_URL}/newsletter/${issue.slug}`,
      lastModified: new Date(issue.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}

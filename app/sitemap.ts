import type { MetadataRoute } from "next";
import { posts } from "./(main)/posts";
import { BASE_URL } from "~/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    ...posts
      .filter((post) => !post.slug.startsWith("https"))
      .map((post) => ({
        url: `${BASE_URL}/${post.slug}`,
        lastModified: new Date(post.editedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}

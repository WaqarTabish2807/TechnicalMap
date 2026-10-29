import { SITE } from "~/lib/config";
import { OG_SIZE, ogCard } from "~/lib/og-card";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ title: "Technical deep-dives and UGC for AI & DevTool startups." });
}

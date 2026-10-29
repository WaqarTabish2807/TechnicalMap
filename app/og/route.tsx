import { NextRequest } from "next/server";
import { SITE } from "~/lib/config";
import { ogCard } from "~/lib/og-card";

export const runtime = "edge";

// Social preview card for posts: /og?title=...&client=...
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  return ogCard({
    title: (searchParams.get("title") ?? SITE.name).slice(0, 140),
    client: searchParams.get("client")?.slice(0, 40),
  });
}

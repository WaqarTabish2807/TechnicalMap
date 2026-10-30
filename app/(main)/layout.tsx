import { BackgroundStripes } from "~/components/stripe-pattern";
import type { Metadata, Viewport } from "next";
import { BASE_URL, SITE } from "~/lib/config";
import { jsonLd, siteSchema } from "~/lib/structured-data";

// Served from /og rather than an opengraph-image file: chat apps (WhatsApp in
// particular) had cached the old image at the file-based URL.
const HOME_OG_IMAGE = `${BASE_URL}/og?${new URLSearchParams({
  title: "Technical deep-dives and UGC for AI & DevTool startups.",
})}`;

export const viewport: Viewport = {
  themeColor: "#ededed",
};

export const metadata: Metadata = {
  description: SITE.description,
  authors: [{ name: SITE.author, url: `${BASE_URL}/work` }],
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    creator: SITE.twitter,
    images: [HOME_OG_IMAGE],
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: BASE_URL,
    siteName: SITE.name,
    type: "website",
    images: [{ url: HOME_OG_IMAGE, width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` }],
  },
  metadataBase: new URL(BASE_URL),
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen isolate">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteSchema)} />
      <BackgroundStripes className="fixed inset-0" />
      <div className="relative z-10 mx-auto md:px-4 w-full max-w-[1450px]">
        {children}
      </div>
    </div>
  );
}

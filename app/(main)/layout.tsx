import { BackgroundStripes } from "~/components/stripe-pattern";
import type { Metadata, Viewport } from "next";
import { BASE_URL, SITE } from "~/lib/config";

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
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: BASE_URL,
    siteName: SITE.name,
    type: "website",
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
      <BackgroundStripes className="fixed inset-0" />
      <div className="relative z-10 mx-auto md:px-4 w-full max-w-[1450px]">
        {children}
      </div>
    </div>
  );
}

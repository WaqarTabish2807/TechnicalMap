import { BackgroundStripes } from "~/components/stripe-pattern";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ededed",
};

export const metadata: Metadata = {
  title: "The Technical Map",
  description:
    "An interactive blog on computer science and web development, by Waqar Tabish.",
  authors: [
    {
      name: "Waqar Tabish",
      url: "https://x.com/iamwaqs",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "The Technical Map",
    description:
      "An interactive blog on computer science and web development, by Waqar Tabish.",
    creator: "@iamwaqs",
  },
  openGraph: {
    title: "The Technical Map",
    description:
      "An interactive blog on computer science and web development, by Waqar Tabish.",
    url: "https://nan.fyi",
    siteName: "The Technical Map",
  },
  metadataBase: new URL("https://nan.fyi"),
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

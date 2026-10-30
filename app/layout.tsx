import {
  Kalam,
  Fira_Code,
  JetBrains_Mono,
  Source_Code_Pro,
  Shantell_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import { clsx } from "clsx";
import "./styles.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "./provider";
import type { Metadata } from "next";
import { BASE_URL, SITE } from "~/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.author, url: `${BASE_URL}/work` }],
  alternates: {
    types: { "application/rss+xml": `${BASE_URL}/rss.xml` },
  },
  // Google Search Console "HTML tag" verification; set the token in Vercel.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const handwriting = Shantell_Sans({
  weight: ["500"],
  variable: "--font-handwriting",
  subsets: ["latin"],
});

const sans = localFont({
  src: [
    {
      path: "./fonts/sans/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sans/regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/sans/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/sans/bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/sans/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/sans/medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/sans/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/sans/semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

/* const mono = localFont({
  src: [
    {
      path: "./fonts/intelone-mono/regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
}); */

const mono = Source_Code_Pro({
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = localFont({
  src: [
    {
      path: "./fonts/pp-editorial-new/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/pp-editorial-new/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          handwriting.variable,
          serif.variable,
          sans.variable,
          mono.variable,
          "font-sans antialiased bg-gray4",
        )}
      >
        <Provider>{children}</Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

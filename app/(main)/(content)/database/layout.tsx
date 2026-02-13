import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Build Your Own Database",
  description:
    "A step-by-step guide to building a key-value database from scratch.",
  authors: [
    {
      name: "Waqar Tabish",
      url: "https://x.com/iamwaqs",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Build Your Own Database",
    description:
      "A step-by-step guide to building a key-value database from scratch.",
    creator: "@iamwaqs",
  },
  openGraph: {
    title: "Build Your Own Database",
    description:
      "A step-by-step guide to building a key-value database from scratch.",
    url: "https://nan.fyi/database",
    siteName: "The Technical Map",
  },
};

export default async function BuildADatabasePage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header
        title="Build Your Own Database"
        description="A step-by-step guide to building a key-value database from scratch."
      />
      {children}
    </>
  );
}

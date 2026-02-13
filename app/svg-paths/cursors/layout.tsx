import { Metadata } from "next";
import { readPage } from "../lib/fs";
import { CursorsContent } from "./content";

export const metadata: Metadata = {
  title: "SVG Path Commands | Cursors",
  description: `The cursor is the "pen" that draws the path - but how does it work, and how does each command affect it?`,
  authors: [
    {
      name: "Waqar Tabish",
      url: "https://x.com/iamwaqs",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "SVG Path Commands | Cursors",
    description: `The cursor is the "pen" that draws the path - but how does it work, and how does each command affect it?`,
    creator: "@iamwaqs",
  },
  openGraph: {
    title: "SVG Path Commands | Cursors",
    description: `The cursor is the "pen" that draws the path - but how does it work, and how does each command affect it?`,
    url: "https://nan.fyi/svg-paths",
    siteName: "The Technical Map",
  },
};

export default async function CursorsPage({ children }) {
  const { length } = await readPage("cursors", "svg-paths", true);
  return <CursorsContent length={length}>{children}</CursorsContent>;
}

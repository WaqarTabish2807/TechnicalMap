import { Metadata } from "next";
import { readPage } from "../lib/fs";
import { Content } from "./content";

export const metadata: Metadata = {
  title: "SVG Path Commands | Bezier Curves",
  description: `The real power of SVG paths lies in its ability to draw curves. Let's take a look at the first type of curve: the quadratic bezier curve.`,
  authors: [
    {
      name: "Waqar Tabish",
      url: "https://x.com/iamwaqs",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "SVG Path Commands | Bezier Curves",
    description: `The real power of SVG paths lies in its ability to draw curves. Let's take a look at the first type of curve: the quadratic bezier curve.`,
    creator: "@iamwaqs",
  },
  openGraph: {
    title: "SVG Path Commands | Bezier Curves",
    description: `The real power of SVG paths lies in its ability to draw curves. Let's take a look at the first type of curve: the quadratic bezier curve.`,
    url: "https://nan.fyi/svg-paths",
    siteName: "The Technical Map",
  },
};

export default async function BezierCurvesPage({ children }) {
  const { length } = await readPage("bezier-curves", "svg-paths", true);
  return <Content length={length}>{children}</Content>;
}

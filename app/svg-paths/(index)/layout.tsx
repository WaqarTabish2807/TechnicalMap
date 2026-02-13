import type { Metadata } from "next";
import { IndexContent } from "./content";
import { readPage } from "../lib/fs";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "A Deep Dive Into SVG Path Commands",
    description:
        "An interactive guide to understanding SVG paths and path commands.",
    authors: [
        {
            name: "Waqar Tabish",
            url: "https://x.com/iamwaqs",
        },
    ],
    twitter: {
        card: "summary_large_image",
        title: "A Deep Dive into SVG Path Commands",
        description:
            "An interactive guide to understanding SVG paths and path commands.",
        creator: "@iamwaqs",
    },
    openGraph: {
        title: "A Deep Dive Into SVG Path Commands",
        description:
            "An interactive guide to understanding SVG paths and path commands.",
        url: "https://nan.fyi/svg-paths",
        siteName: "The Technical Map",
    },
};

export default async function SvgPathsLayout({ children }: { children: ReactNode }) {
    const { length } = await readPage("(index)", "svg-paths", true);
    return <IndexContent length={length}>{children}</IndexContent>
}

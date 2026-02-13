"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { PageSection } from "./page-section";
import { IndexProvider } from "./index-provider";
import { InteractiveCommand } from "./interactive-command";
import { PathEditor } from "./path-editor";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "./icons";
import { CommandListFromSource, CommandList } from "./command-list";
import { PlaySlider, PlaySliderFromSource } from "./play-slider";
import { PracticeQuestionEditor, PracticeQuestion } from "./path-practice";
import { Svg } from "./svg";
import { PathHoverVisual } from "./path-hover-visual";
import styles from "./page-section.module.css";
import { useSession } from "../provider";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const sections = [
    "overview",
    "cursors",
    "lines",
    "bezier curves",
    "cubic curves",
    "arcs",
    "challenge",
];

export const ContentWrapper = ({
    content,
    numSections,
    children,
    prefix,
}: {
    numSections: number;
    children?: React.ReactNode;
    prefix?: React.ReactNode;
    content: React.ReactNode;
}) => {
    const pathName = usePathname();
    const session = useSession();
    return (
        <IndexProvider numSections={numSections}>
            <article className="lg:border-r lg:border-gray8 leading-7 lg:w-[55ch] xl:w-[68ch] w-full lg:max-w-[50vw]">
                <header className="px-8 lg:px-16 pt-8 pb-2 sticky top-0 flex items-center z-50 text-gray11 bg-gray4 mb-8">
                    <h1 className="font-serif text-xl  hover:text-blue9">
                        <Link href="/">TTM</Link>
                    </h1>
                    <motion.div className="flex text-xl gap-2 ml-auto" layout>
                        <a
                            className="hover:text-blue9"
                            href="https://x.com/iamwaqs"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            className="hover:text-blue9"
                            href="https://github.com/WaqarTabish2807"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />
                        </a>
                    </motion.div>
                    {session?.user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.button
                                    className="shrink-0 ml-4"
                                    animate={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                >
                                    <Image
                                        width="24"
                                        height="24"
                                        className="rounded-full"
                                        src={session.user.image}
                                        alt={session.user.username}
                                    />
                                </motion.button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <button className="w-full py-1" onClick={() => signOut()}>
                                    Sign out
                                </button>
                            </PopoverContent>
                        </Popover>
                    )}
                </header>
                {prefix && (
                    <div
                        className={clsx(
                            "p-8 lg:p-16 lg:py-0 grid grid-cols-[1fr_min(100%,60ch)_1fr]",
                            styles.section,
                            styles.prefix
                        )}
                    >
                        {prefix}
                    </div>
                )}
                {content}
                <Footer />
                <nav className="fixed lg:hidden bottom-0 w-[100vw] overflow-x-auto px-8 py-4 bg-gray4/70 border-t border-gray6 backdrop-blur-md">
                    <ul className="flex w-fit md:mx-auto">
                        {sections.map((section) => {
                            const href = toHref(section);
                            return (
                                <li
                                    key={section}
                                    className={clsx(
                                        "capitalize rounded-md py-1 px-2 font-semibold h-fit leading-none relative",
                                        href === pathName
                                            ? "before:absolute before:top-full before:left-2 before:right-2 before:h-[2px] before:bg-current"
                                            : "text-gray10"
                                    )}
                                >
                                    <Link href={href}>{section}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </article>
            <div className="hidden h-screen sticky top-0 lg:flex flex-col overflow-hidden">
                <header className="p-8 w-full">
                    <nav className="flex">
                        <ul className="flex overflow-x-auto">
                            {sections.map((section) => {
                                const href = toHref(section);
                                return (
                                    <li
                                        key={section}
                                        className={clsx(
                                            "capitalize rounded-md py-1 px-2 font-medium h-fit",
                                            href === pathName ? "bg-gray7" : "text-gray10"
                                        )}
                                    >
                                        <Link href={href}>{section}</Link>
                                    </li>
                                );
                            })}
                        </ul>

                    </nav>
                </header>
                <div className="flex items-center justify-center w-full h-full pb-4 pl-4 select-none overflow-hidden">
                    <div className="h-full">{children}</div>
                </div>
            </div>
        </IndexProvider>
    );
};



const Footer = () => {
    const fullpath = usePathname();
    const path = fromHref(fullpath);
    const pathIndex = sections.indexOf(path);
    const prev = sections[pathIndex - 1];
    const next = sections[pathIndex + 1];
    return (
        <footer className="w-[calc(60ch+theme(space.8)*2)] px-8 max-w-[100vw] mx-auto lg:px-16 mb-32 lg:mb-16 flex text-gray11">
            {prev && (
                <Link
                    href={toHref(prev)}
                    className="flex gap-2 items-center capitalize"
                >
                    <ArrowLeft />
                    <span>{prev}</span>
                </Link>
            )}
            {next && (
                <Link
                    href={toHref(next)}
                    className="flex gap-2 items-center capitalize ml-auto"
                >
                    <span>{next}</span>
                    <ArrowRight />
                </Link>
            )}
        </footer>
    );
};

const toHref = (section: string) => {
    const path = section === "overview" ? "" : `/${section.replaceAll(" ", "-")}`;
    return `/svg-paths${path}`;
};

const fromHref = (path: string) => {
    return path.split("/svg-paths/")[1]?.replaceAll("-", " ") || "overview";
};

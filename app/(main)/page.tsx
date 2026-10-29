"use client";

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { LINKS } from "~/lib/config";
import { SubscribeButton } from "./subscribe";
import { CourseWaitlist } from "./course-waitlist";
import { posts, XIcon } from "./posts";
import { ClientNameTray } from "../../components/ClientNameTray";

function Post({
  post,
}: {
  post: (typeof posts)[number];
}) {
  const [active, setHovering] = useState(false);
  const Component = post.slug.startsWith("https") ? "a" : Link;
  return (
    <motion.li
      className="relative"
      onHoverStart={() => {
        setHovering(true);
      }}
      onHoverEnd={() => {
        setHovering(false);
      }}
    >
      <motion.div
        animate={{
          width: active ? 16 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className={clsx(
          "w-px border border-gray8 border-l-0 absolute -top-px -bottom-px left-full z-10 hidden lg:block",
          active ? "bg-gray5" : "bg-gray4",
        )}
      />
      <Component
        href={post.slug}
        className={clsx(
          "lg:p-10 lg:gap-10 block space-y-4 md:flex md:space-y-0 md:gap-8 p-6 relative",
          active ? "bg-gray5" : "bg-gray4",
        )}
      >
        {post.client && (
          <ClientNameTray client={post.client} active={active} />
        )}
        <img
          className="shrink-0 h-min"
          src={post.image.src}
          width="80"
          height="80"
          alt=""
        />
        <div className="space-y-4 xl:flex xl:space-y-0 xl:gap-10">
          <header className="basis-[270px] flex flex-col shrink-0 gap-2 z-20">
            <h1 className="font-serif text-3xl leading-[1.3]">
              <Balancer>{post.title}</Balancer>
            </h1>
            <p className="text-gray11 text-sm">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
                day: "numeric",
              }).format(new Date(post.editedAt))}
            </p>
          </header>
          <article className="grow">
            <p className="max-w-[450px]">{post.description}</p>
          </article>
        </div>
        <motion.div
          animate={{
            x: active ? 16 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          className="flex items-start lg:items-center ml-auto gap-4"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13.75 6.75L19.25 12L13.75 17.25"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 12H4.75"
            />
          </svg>
        </motion.div>
      </Component>
    </motion.li>
  );
}

export default function HomePage() {
  return (
    <div className="lg:grid grid-cols-[320px_1fr] bg-gray4 md:border-x border-gray8 relative">
      <aside className="p-6 pt-12 lg:p-10 border-gray8 top-0 flex flex-col gap-6 relative bg-gray4 border-b lg:border-b-0 lg:border-r-0 lg:sticky lg:h-screen">
        <h1 className="font-serif text-[64px] leading-[1]">The Technical Map</h1>
        <div className="md:flex lg:block lg:space-y-8 space-y-6 md:space-y-0 items-center justify-between">
          <p className="leading-relaxed">
            <Balancer>
              Technical deep-dives and UGC for AI &amp; DevTool startups. How
              complex products get explained, and why some explanations convert.
              By{" "}
              <Link className="underline underline-offset-2" href="/work">
                Waqar Tabish.
              </Link>
            </Balancer>
          </p>
          <div className="flex items-center gap-3">
            <SubscribeButton />
            <Link
              className="text-sm font-medium rounded-lg border border-gray8 px-2 py-1.5 w-fit hover:bg-gray5"
              href="/work"
            >
              Work with me
            </Link>
          </div>
        </div>
        <footer className="mt-auto flex justify-between items-end text-gray11">
          <div className="flex items-center gap-3">
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={LINKS.x} target="_blank" rel="noreferrer" aria-label="X">
              <FaTwitter />
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
          <p className="text-xs text-gray10 font-mono">
            © {new Date().getFullYear()}
          </p>
        </footer>
      </aside>
      <div className="bg-gray4 lg:border-l border-gray8">
        <div className="p-6 lg:p-10 border-b border-gray7 border-dashed">
          <CourseWaitlist />
        </div>
        <ul className="divide-y divide-gray7 divide-dashed">
          {posts.map((post) => (
            <Post post={post} key={post.slug} />
          ))}
        </ul>
      </div>
    </div>
  );
}

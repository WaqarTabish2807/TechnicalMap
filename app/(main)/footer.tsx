"use client";

import Link from "next/link";
import { posts, XIcon } from "./posts";
import { usePathname } from "next/navigation";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function PostsFooter() {
  const pathname = usePathname();
  const current = pathname.split("/").pop();
  return (
    <footer className="relative mx-auto px-4 mt-8 max-w-[1250px] w-full">
      <p className="font-serif text-7xl md:text-[140px] lg:text-[190px] translate-y-[0.15em] leading-none text-gray7 text-center">
        More Posts
      </p>
      <ul className="border border-gray8 bg-gray4 -mt-2 md:-mt-6 relative grid md:grid-cols-2">
        {posts
          .filter((post) => post.slug !== current)
          .map((post) => (
            <li
              className="grid grid-cols-[60px_1fr] p-4 gap-5 items-center md:[&:nth-child(2n)]:border-l border-gray7 border-b last-of-type:border-b-0 last-of-type:md:[&:not(:nth-child(2n))]:border-r last-of-type:md:[&:not(:nth-child(2n))]:-mr-px -mb-px"
              key={post.slug}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="shrink-0 h-min"
                src={post.image.src}
                width="60"
                height="60"
                alt=""
              />
              <article className="grid gap-1">
                <Link
                  className="font-medium leading-tight block"
                  href={post.slug}
                >
                  {post.title}
                </Link>
                <p className="text-gray11 leading-snug">
                  {post.shortDescription}
                </p>
              </article>
            </li>
          ))}
        <span className="text-gray10">
          <span className="top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2">
            <XIcon />
          </span>
          <span className="bottom-0 left-0 absolute -translate-x-1/2 translate-y-1/2">
            <XIcon />
          </span>
          <span className="top-0 right-0 absolute translate-x-1/2 -translate-y-1/2">
            <XIcon />
          </span>
          <span className="bottom-0 right-0 absolute translate-x-1/2 translate-y-1/2">
            <XIcon />
          </span>
        </span>
      </ul>
      <div className="mt-8 flex justify-center gap-6 text-gray11">
        <a
          href="https://github.com/WaqarTabish2807"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray12 transition-colors"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://x.com/iamwaqs"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray12 transition-colors"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/md-waqar-tabish/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray12 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { posts, XIcon } from "../posts";
import { PostsFooter } from "../footer";
import { BASE_URL, LINKS, SITE } from "~/lib/config";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Technical deep-dives and UGC for AI and DevTool startups. One partner for the post developers read and the video that gets them to click.",
  alternates: { canonical: `${BASE_URL}/work` },
  openGraph: {
    title: `Work with me | ${SITE.name}`,
    url: `${BASE_URL}/work`,
    images: [`${BASE_URL}/og?title=${encodeURIComponent("Content partner for AI & DevTool startups")}`],
  },
};

const packages = [
  {
    name: "The Deep-Dive",
    for: "You need developers to understand the product.",
    items: [
      "One technical article, 2,000–4,000 words",
      "Code I actually ran, not copied from the docs",
      "Researched for the keyword your buyers search",
      "Published here with your logo, plus the files for your own blog",
    ],
  },
  {
    name: "The Launch Pack",
    for: "You're launching and need people to read it and click it.",
    featured: true,
    items: [
      "Everything in The Deep-Dive",
      "2 short-form UGC videos built from the same story",
      "3 hook variants per video for paid testing",
      "A feature in the weekly newsletter",
    ],
  },
  {
    name: "The Demo Reel",
    for: "You need ads that make the product feel obvious in 20 seconds.",
    items: [
      "Short-form UGC: face cam + screen recording",
      "Problem first, product second",
      "3 hook variants, ad-ready vertical cuts",
      "Raw footage included",
    ],
  },
];

const steps = [
  ["Brief", "A 20-minute call. What the product does, who buys it, what they're stuck on."],
  ["Angle", "I send 3 angles and hooks. You pick one. Nothing gets written before this."],
  ["Draft", "Article and scripts within a week. Code tested, screens recorded."],
  ["Ship", "One round of edits, then it goes live on your channels and mine."],
];

export default function WorkPage() {
  const clients = Array.from(
    new Set(posts.map((post) => post.client).filter(Boolean)),
  ) as string[];
  const clientPosts = posts.filter((post) => post.client);

  return (
    <>
      <div className="bg-gray4 md:border-x border-b border-gray8 relative">
        <header className="px-6 md:px-8 lg:px-10 py-3 border-b border-borderSoft flex justify-between items-center text-gray11">
          <h2 className="font-serif text-2xl translate-y-0.5">
            <Link href="/">TTM</Link>
          </h2>
        </header>

        <section className="p-6 md:p-10 lg:p-16 border-b border-gray7 border-dashed max-w-[900px]">
          <p className="font-mono text-sm text-gray10 mb-6">Work with me</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
            <Balancer>Content partner for AI &amp; DevTool startups.</Balancer>
          </h1>
          <div className="space-y-4 text-lg leading-relaxed max-w-[60ch]">
            <p>
              Most developer tools have two content problems. The docs explain
              every feature. The ads explain none of them.
            </p>
            <p>
              I work on both ends. Technical deep-dives that developers
              actually finish. And UGC videos, on{" "}
              <a className="underline underline-offset-2" href={LINKS.instagram} target="_blank" rel="noreferrer">
                @waqar.ugc
              </a>
              , that show the one problem your product solves in 20 seconds.
            </p>
            <p>Same story, two formats. One person who understands the product.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="text-sm font-medium rounded-lg bg-gray12 text-gray1 px-3 py-2"
              href={LINKS.contact}
              target="_blank"
              rel="noreferrer"
            >
              Send me a brief
            </a>
            <a
              className="text-sm font-medium rounded-lg border border-gray8 px-3 py-2 hover:bg-gray5"
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
            >
              See the UGC portfolio
            </a>
          </div>
          {clients.length > 0 && (
            <p className="mt-10 text-sm text-gray11">
              Written for{" "}
              {clients.map((client, i) => (
                <span key={client}>
                  <span className="font-medium text-gray12">{client}</span>
                  {i < clients.length - 1 ? ", " : ""}
                </span>
              ))}
              .
            </p>
          )}
        </section>

        <section className="p-6 md:p-10 lg:p-16 border-b border-gray7 border-dashed">
          <h2 className="font-serif text-4xl mb-8">Three ways to work together</h2>
          <ul className="grid md:grid-cols-3 border border-gray8 relative">
            {packages.map((pkg) => (
              <li
                key={pkg.name}
                className={
                  "p-6 flex flex-col gap-4 border-gray8 border-b md:border-b-0 md:[&:not(:last-child)]:border-r last:border-b-0 " +
                  (pkg.featured ? "bg-gray5" : "bg-gray4")
                }
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl">{pkg.name}</h3>
                  {pkg.featured && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-blue11 bg-blue3 border border-blue6 rounded uppercase">
                      Best value
                    </span>
                  )}
                </div>
                <p className="text-gray11">{pkg.for}</p>
                <ul className="space-y-2 text-sm">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-gray10">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <span className="text-gray10">
              <span className="top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2"><XIcon /></span>
              <span className="top-0 right-0 absolute translate-x-1/2 -translate-y-1/2"><XIcon /></span>
              <span className="bottom-0 left-0 absolute -translate-x-1/2 translate-y-1/2"><XIcon /></span>
              <span className="bottom-0 right-0 absolute translate-x-1/2 translate-y-1/2"><XIcon /></span>
            </span>
          </ul>
          <p className="mt-4 text-sm text-gray11">
            Pricing depends on scope. Send a brief and you get a quote within 48 hours.
          </p>
        </section>

        <section className="p-6 md:p-10 lg:p-16 border-b border-gray7 border-dashed">
          <h2 className="font-serif text-4xl mb-8">How it works</h2>
          <ol className="grid md:grid-cols-4 gap-6">
            {steps.map(([title, body], i) => (
              <li key={title} className="space-y-2">
                <p className="font-mono text-sm text-gray10">0{i + 1}</p>
                <h3 className="font-medium">{title}</h3>
                <p className="text-gray11 text-sm leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {clientPosts.length > 0 && (
          <section className="p-6 md:p-10 lg:p-16 border-b border-gray7 border-dashed">
            <h2 className="font-serif text-4xl mb-8">Recent client work</h2>
            <ul className="space-y-4">
              {clientPosts.map((post) => (
                <li key={post.slug}>
                  <Link className="group block max-w-[70ch]" href={`/${post.slug}`}>
                    <span className="font-mono text-xs uppercase tracking-wider text-gray10">
                      {post.client}
                    </span>
                    <span className="block font-serif text-2xl group-hover:underline underline-offset-4">
                      {post.title}
                    </span>
                    <span className="block text-gray11">{post.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="p-6 md:p-10 lg:p-16">
          <h2 className="font-serif text-4xl mb-4">Got a product that&apos;s hard to explain?</h2>
          <p className="text-gray11 mb-6 max-w-[55ch]">
            That&apos;s the kind I like. Send a line about what you&apos;re building.
          </p>
          <div className="flex gap-4 text-gray11">
            <a className="flex items-center gap-2 hover:text-gray12" href={LINKS.contact} target="_blank" rel="noreferrer">
              <FaInstagram /> DM @waqar.ugc
            </a>
            <a className="flex items-center gap-2 hover:text-gray12" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>
      </div>
      <div className="pb-4 xl:pb-12">
        <PostsFooter />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { SubscribeButton } from "../subscribe";
import { PostsFooter } from "../footer";
import { BASE_URL, SITE } from "~/lib/config";
import { getIssues } from "~/lib/newsletter";

export const revalidate = 3600;

const description =
  "One email a week on how AI and DevTool products get explained: the technical deep-dives, the UGC that converts, and why.";

export const metadata: Metadata = {
  title: "Newsletter",
  description,
  alternates: { canonical: `${BASE_URL}/newsletter` },
  openGraph: {
    title: `The weekly newsletter | ${SITE.name}`,
    description,
    url: `${BASE_URL}/newsletter`,
    images: [`${BASE_URL}/og?title=${encodeURIComponent("The Technical Map, weekly")}`],
  },
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default async function NewsletterPage() {
  const issues = await getIssues();

  return (
    <>
      <div className="bg-gray4 md:border-x border-b border-gray8 relative">
        <header className="px-6 md:px-8 lg:px-10 py-3 border-b border-borderSoft flex justify-between items-center text-gray11">
          <h2 className="font-serif text-2xl translate-y-0.5">
            <Link href="/">TTM</Link>
          </h2>
          <Link className="text-sm hover:text-gray12" href="/work">
            Work with me
          </Link>
        </header>

        <section className="p-6 md:p-10 lg:p-16 border-b border-gray7 border-dashed max-w-[900px]">
          <p className="font-mono text-sm text-gray10 mb-6">Newsletter</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
            <Balancer>The Technical Map, weekly.</Balancer>
          </h1>
          <div className="space-y-4 text-lg leading-relaxed max-w-[60ch] mb-8">
            <p>
              One email a week. What I noticed about how AI and DevTool products
              get explained. The deep-dives developers finish, the UGC that
              actually converts, and the specific reason why.
            </p>
            <p className="text-gray11">No fluff. Unsubscribe anytime.</p>
          </div>
          <div className="max-w-[360px]">
            <SubscribeButton />
          </div>
        </section>

        <section className="p-6 md:p-10 lg:p-16">
          <h2 className="font-serif text-4xl mb-8">Past issues</h2>
          {issues.length === 0 ? (
            <p className="text-gray11 max-w-[55ch]">
              The first issue lands this week. Subscribe above and it comes
              straight to your inbox.
            </p>
          ) : (
            <ul className="divide-y divide-gray7 divide-dashed border-y border-gray7 border-dashed">
              {issues.map((issue) => (
                <li key={issue.id}>
                  <Link
                    className="group grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-6"
                    href={`/newsletter/${issue.slug}`}
                  >
                    <time className="font-mono text-sm text-gray10" dateTime={issue.publishedAt}>
                      {dateFormat.format(new Date(issue.publishedAt))}
                    </time>
                    <span>
                      <span className="block font-serif text-2xl group-hover:underline underline-offset-4">
                        {issue.subject}
                      </span>
                      {issue.description && (
                        <span className="block text-gray11 mt-1">{issue.description}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className="pb-4 xl:pb-12">
        <PostsFooter />
      </div>
    </>
  );
}

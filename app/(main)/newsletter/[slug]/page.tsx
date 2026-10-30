import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { SubscribeButton } from "../../subscribe";
import { PostsFooter } from "../../footer";
import { BASE_URL, SITE } from "~/lib/config";
import { getIssue, getIssues } from "~/lib/newsletter";

export const revalidate = 3600;

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({ slug: issue.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await getIssue((await params).slug);
  if (!issue) return {};
  const url = `${BASE_URL}/newsletter/${issue.slug}`;
  return {
    title: issue.subject,
    description: issue.description ?? `An issue of ${SITE.name}, the weekly newsletter.`,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: issue.subject,
      url,
      publishedTime: issue.publishedAt,
      images: [`${BASE_URL}/og?title=${encodeURIComponent(issue.subject)}`],
    },
  };
}

export default async function IssuePage({ params }: Props) {
  const issue = await getIssue((await params).slug);
  if (!issue) notFound();

  return (
    <>
      <div className="bg-gray4 md:border-x border-b border-gray8 relative">
        <header className="px-6 md:px-8 lg:px-10 py-3 border-b border-borderSoft flex justify-between items-center text-gray11">
          <h2 className="font-serif text-2xl translate-y-0.5">
            <Link href="/">TTM</Link>
          </h2>
          <Link className="text-sm hover:text-gray12" href="/newsletter">
            All issues
          </Link>
        </header>

        <article className="p-6 md:p-10 lg:p-16 max-w-[760px] mx-auto">
          <time className="font-mono text-sm text-gray10" dateTime={issue.publishedAt}>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(issue.publishedAt))}
          </time>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] mt-4 mb-10">
            <Balancer>{issue.subject}</Balancer>
          </h1>
          {/* Issue HTML comes from our own Kit account. */}
          <div
            className="leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4 [&_img]:max-w-full [&_img]:h-auto [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
            dangerouslySetInnerHTML={{ __html: issue.content }}
          />
          <div className="mt-16 p-6 border border-gray8 border-dashed bg-gray3">
            <p className="font-medium mb-1">Get the next one in your inbox.</p>
            <p className="text-gray11 text-sm mb-4">One email a week. Unsubscribe anytime.</p>
            <div className="max-w-[360px]">
              <SubscribeButton />
            </div>
          </div>
        </article>
      </div>
      <div className="pb-4 xl:pb-12">
        <PostsFooter />
      </div>
    </>
  );
}

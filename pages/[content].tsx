import React, { useEffect } from "react";
import type { GetStaticPropsContext } from "next";
import NextLink from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getMDXComponent } from "mdx-bundler/client";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

import { getAllPosts, getPost, type Post } from "~/lib/content.server";
import { BASE_URL, SITE } from "~/lib/config";
import { PERSON_ID, WEBSITE_ID, personSchema } from "~/lib/structured-data";
import { darkTheme, styled } from "~/stitches.config";

import { Heading, Subheading } from "~/components/Heading";
import { OrderedList } from "~/components/OrderedList";
import { NewsletterForm } from "~/components/NewsletterForm";
import { MobileBottomBar } from "~/components/MobileBottomBar";
import { Link } from "~/components/Link";
import { Content } from "~/components/Content";
// import { ThemeToggle } from "~/components/ThemeToggle";
import { ClientNameTray } from "~/components/ClientNameTray";
import { WorkWithMe } from "~/components/WorkWithMe";

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            content: await getPost(context.params?.content as string),
        },
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
        paths: posts.map((post) => ({ params: { content: post.slug } })),
        fallback: false,
    };
}

const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
});

export default function PostPage({ content }: { content: Post }) {
    const PostContent = React.useMemo(
        () => getMDXComponent(content.code),
        [content.code]
    );
    const { frontmatter, headings, slug } = content;
    const url = `${BASE_URL}/${slug}`;
    // seoTitle (optional) is the search/social title; the on-page H1 stays `title`.
    const seoTitle: string = frontmatter.seoTitle ?? frontmatter.title;
    const ogImage = `${BASE_URL}/og?${new URLSearchParams({
        title: frontmatter.title,
        ...(frontmatter.client ? { client: frontmatter.client } : {}),
    })}`;

    useEffect(() => {
        const lastHeights = new WeakMap<HTMLIFrameElement, number>();
        function handleIframeMessage(event: MessageEvent) {
            if (event.data && event.data.type === 'iframeHeight') {
                const newH: number = event.data.height;
                const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[src]');
                iframes.forEach((iframe) => {
                    try {
                        if (iframe.contentWindow === event.source) {
                            const prev = lastHeights.get(iframe) ?? 0;
                            if (Math.abs(newH - prev) > 2) { // only update if meaningfully different
                                lastHeights.set(iframe, newH);
                                iframe.style.height = `${newH}px`;
                            }
                        }
                    } catch {}
                });
            }
        }
        window.addEventListener('message', handleIframeMessage);
        return () => window.removeEventListener('message', handleIframeMessage);
    }, []);
    return (
        <PageWrapper>
            <Head>
                <title>{frontmatter.seoTitle ?? `${frontmatter.title} | ${SITE.name}`}</title>
                <meta name="description" content={frontmatter.description} />
                <meta name="author" content={SITE.author} />
                <link rel="canonical" href={url} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content={SITE.name} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={frontmatter.description} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={url} />
                <meta property="article:published_time" content={frontmatter.publishedAt} />
                <meta property="article:modified_time" content={frontmatter.editedAt} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={SITE.twitter} />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={frontmatter.description} />
                <meta name="twitter:image" content={ogImage} />
                <link rel="alternate" type="application/rss+xml" title={SITE.name} href={`${BASE_URL}/rss.xml`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "TechArticle",
                            headline: frontmatter.title,
                            description: frontmatter.description,
                            image: ogImage,
                            url,
                            datePublished: frontmatter.publishedAt,
                            dateModified: frontmatter.editedAt,
                            author: personSchema,
                            publisher: { "@id": PERSON_ID },
                            isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE.name, url: BASE_URL },
                            ...(frontmatter.client ? { sponsor: { "@type": "Organization", name: frontmatter.client } } : {}),
                        }),
                    }}
                />
            </Head>
            <MobileBottomBar headings={headings} />
            <Nav>
                <h2>
                    <NextLink href="/">TTM</NextLink>
                </h2>
                <ul>
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a href={`#${heading.id}`}>{heading.text}</a>
                        </li>
                    ))}
                </ul>
            </Nav>
            <Article as="article">
                <Header>
                    {frontmatter.client && (
                        <ClientNameTray client={frontmatter.client} active={false} />
                    )}
                    <LastUpdated>
                        {formatter.format(new Date(frontmatter.editedAt))}
                    </LastUpdated>
                    <Title>
                        <Balancer>{frontmatter.title}</Balancer>
                    </Title>
                    <Blurb>
                        <Balancer>{frontmatter.blurb}</Balancer>
                    </Blurb>
                </Header>
                <PostContent
                    components={{
                        h2: Heading as any,
                        h3: Subheading as any,
                        ol: OrderedList as any,
                        a: Link as any,
                        TitleTester: TitleTester as any,
                    }}
                />
                <NewsletterWrapper>
                    <WorkWithMe client={frontmatter.client} />
                    <NewsletterForm />
                </NewsletterWrapper>
            </Article>
        </PageWrapper>
    );
}

const TitleTester = dynamic(() =>
    import("~/components/perfect-title/TitleTester").then(
        (mod) => mod.TitleTester
    )
);

const NewsletterWrapper = styled("footer", {
    marginTop: "$24",
});

const Nav = styled("nav", {
    position: "fixed",
    top: "$16",
    bottom: "$16",
    color: "$gray11",
    maxWidth: "$40",
    display: "none",
    flexDirection: "column",
    paddingLeft: "$6",

    "@media (min-width: 72rem)": {
        display: "flex",
    },

    h2: {
        fontFamily: "$serif",
    },

    a: {
        textDecoration: "none",
        color: "inherit",

        "&:hover": {
            color: "$blue9",
        },
    },

    ul: {
        marginTop: "auto",
        listStyle: "none",
        fontSize: "$sm",

        "> :not(:last-child)": {
            marginBottom: "$2",
        },
    },
});

const PageWrapper = styled("main", {
    width: `min(80rem, 100%)`,
    margin: "0 auto",
    padding: "$8 0",
    "@md": {
        padding: "$16 0",
    },
});

const Title = styled("h1", {
    fontSize: "2.25rem",
    fontFamily: "$serif",
    lineHeight: "$title",
    fontWeight: 500,
    "@md": {
        fontSize: "4rem",
    },
});

const Blurb = styled("p", {
    fontSize: "$lg",
});

const LastUpdated = styled("p", {
    fontFamily: "$mono",
    color: "$gray10",
});

const Header = styled("header", {
    position: "relative",
    marginBottom: "$16",

    "> :not(:last-child)": {
        marginBottom: "$8",
    },
});

const Article = styled(Content, {
    lineHeight: "$body",
    maxWidth: 800,
    display: "grid",
    gridTemplateColumns: "min(100%, 65ch) 1fr",
    margin: "0 auto",
    padding: "0 $4",
    paddingBottom: "$12",
    fontFamily: "$sans",

    "@media (min-width: 72rem)": {
        paddingBottom: "0",
    },
});
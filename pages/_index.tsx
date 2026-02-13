import React from "react";
import Head from "next/head";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

import { styled } from "~/stitches.config";
import { BASE_URL } from "~/lib/config";
import { Post } from "~/components/Post";
import { SubscribeButton } from "~/components/SubscribeButton";

import { DynamicIsland } from "~/components/MobileNavIsland";
import { SvgPaths } from "~/components/home/SvgPaths";

const posts = [
  {
    post: {
      slug: "svg-paths",
      title: "A Deep Dive Into SVG Path Commands",
      description:
        "The mystical d attribute in SVG paths is actually a series of small commands. In this guide, we'll take a look at each path command and how we can use them to draw icons.",
      editedAt: "2023-07-04",
    },
    children: <SvgPaths />,
  },
];

export default function HomePage() {
  return (
    <PageWrapper>
      <Head>
        <title>The Technical Map</title>
        <meta
          name="description"
          content="An Interactive Posts On How to Write A Technical Blog, by Waqar Tabish."
        />
        <meta name="author" content="Waqar Tabish" />
        <meta property="og:title" content="The Technical Map" />
        <meta
          property="og:description"
          content="An Interactive Posts On How to Write A Technical Blog, by Waqar Tabish."
        />
        <meta property="og:image" content={`${BASE_URL}/og/index.png`} />
        <meta property="og:url" content={BASE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ContentWrapper>
        <Header>
          <Links>
            <SocialLinks />
          </Links>
          <Title>
            The Technical Map<span>By Waqar Tabish</span>
          </Title>
          <SubscribeWrapper>
            <SubscribeButton />
          </SubscribeWrapper>
        </Header>
        <Posts>
          {posts.map((post, index) => (
            <Post
              key={post.post.slug}
              direction={index % 2 ? "right" : "left"}
              {...post}
            />
          ))}
        </Posts>
      </ContentWrapper>
      <IslandWrapper>
        <DynamicIsland
          css={{
            borderRadius: "calc($radii$base + 4px)",
            height: "auto",
            display: "flex",
            alignItems: "center",
            color: "$gray12",
          }}
        >
          <MobileSocialWrapper>
            <SocialLinks />
          </MobileSocialWrapper>
          <SubscribeButton small />
        </DynamicIsland>
      </IslandWrapper>
    </PageWrapper>
  );
}

const SocialLinks = () => {
  return (
    <>
      <li>
        <a
          href="https://github.com/WaqarTabish2807"
          target="_blank"
          rel="noreferrer"
          aria-label="Github"
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          href="https://x.com/iamwaqs"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </li>
    </>
  );
};

const MobileSocialWrapper = styled("ul", {
  display: "flex",
  gap: "$2",
  padding: "0 $2",
  listStyle: "none",
  fontSize: "$xl",
  transform: "translateY(3px)",

  a: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      color: "$blue9",
    },
  },
});

const IslandWrapper = styled("div", {
  position: "fixed",
  bottom: "$4",
  left: "$4",
  right: "$4",
  height: "auto",

  "@md": {
    display: "none",
  },
});

const SubscribeWrapper = styled("div", {
  display: "none",

  "@md": {
    display: "block",
  },
});

const Links = styled(motion.ul, {
  fontSize: "$xl",
  gap: "$4",
  display: "none",
  listStyle: "none",

  a: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      color: "$blue9",
    },
  },

  "@md": {
    display: "flex",
  },
});

const PageWrapper = styled("main", {
  $$gap: "$space$16",
  width: "fit-content",
  margin: "0 auto",
  padding: "0 $8",
  paddingBottom: "calc($$gap + $space$16)",
  maxWidth: "72rem",

  "@lg": {
    padding: "0 $16",
    paddingBottom: "calc($$gap + $space$24)",
  },

  "@media screen and (min-width: 75rem)": {
    maxWidth: "initial",
  },
});

const ContentWrapper = styled("div", {});

const Title = styled("h1", {
  fontFamily: "var(--font-serif)",
  fontSize: "3rem",
  lineHeight: "$title",
  fontWeight: 500,

  span: {
    display: "block",
    fontSize: "$sm",
    fontFamily: "$sans",
    color: "$gray11",
    textAlign: "center",
    marginTop: "$2",
  },
});

const Header = styled("header", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "$12 0",
  marginBottom: "calc($$gap / 2)",

  "@md": {
    marginBottom: "$$gap",
    justifyContent: "space-between",
  },
});

const Posts = styled(motion.ul, {
  gridColumn: 2,

  "> :not(:last-child)": {
    marginBottom: "$$gap",
  },
});

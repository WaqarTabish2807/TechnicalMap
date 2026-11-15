import { bundleMDX } from "mdx-bundler";
import * as fs from "fs";
import * as path from "path";
import glob from "glob";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";

import { getId } from "./utils";

const CONTENT_FOLDER = `${process.cwd()}/_dist-content`;
const POST_FILENAME = "index.mdx";

export type Heading = {
  id: string;
  text: string;
};

export type Faq = { question: string; answer: string };

export type Post = {
  code: string;
  frontmatter: Record<string, any>;
  slug: string;
  headings: Heading[];
  faqs: Faq[];
};

export type PostMetadata = {
  frontmatter: Record<string, any>;
  slug: string;
};

const theme = {
  light: JSON.parse(
    fs.readFileSync(`${process.cwd()}/assets/light-colorblind.json`, "utf8")
  ),
  dark: JSON.parse(
    fs.readFileSync(`${process.cwd()}/assets/dark-default.json`, "utf8")
  ),
};

/**
 * Gets the post from `dist/content` and bundles it using MDX bundler
 */
export const getPost = async (slug: string): Promise<Post> => {
  const postFolder = path.join(CONTENT_FOLDER, slug);
  const mdxSource = (
    await fs.promises.readFile(path.join(postFolder, POST_FILENAME))
  ).toString();
  const mdxOut = await bundleMDX({
    source: mdxSource,
    cwd: postFolder,
    mdxOptions(options) {
      /* options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypePrettyCode,
          {
            theme,
            onVisitHighlightedLine(node) {
              // Each line node by default has `class="line"`.
              node.properties.className.push("highlighted");
            },
          },
        ],
      ]; */
      return options;
    },
    esbuildOptions(options) {
      /**
       * Babel saves React files with a .js extension, so we have to explicitly tell
       * esbuild to parse these files assuming it contains JSX
       */
      options.loader = {
        ".js": "jsx",
      };
      options.tsconfig = `${process.cwd()}/tsconfig-esbuild.json`;
      return options;
    },
  });
  return { ...mdxOut, slug, headings: getHeadings(mdxSource), faqs: getFaqs(mdxSource) };
};

/**
 * Pulls question/answer pairs out of a "## FAQs" section (each question an
 * h3, the answer the text under it) so the post page can emit FAQPage schema
 * that matches what readers see.
 */
const getFaqs = (content: string): Faq[] => {
  const match = content.match(/\n## FAQs?\s*\n([\s\S]*?)(?=\n## |$)/);
  if (!match) return [];
  return ("\n" + match[1])
    .split(/\n### /)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      const answer = rest
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return { question: question.trim(), answer };
    })
    .filter((faq) => faq.question && faq.answer);
};

const getHeadings = (content: string): Heading[] => {
  return (
    content
      .split("\n")
      /* I only care about h2s, so explicitly look for 2 hashtags */
      .filter((line) => line.match(/^##\s/))
      .map((line) => line.replace("##", "").trim())
      .map((text) => ({
        text,
        id: getId(text),
      }))
  );
};

export const getAllPosts = async (): Promise<PostMetadata[]> => {
  const paths = await getAllPostPaths();
  return Promise.all(
    paths.map(async (postPath) => {
      const file = await fs.promises.readFile(
        path.join(process.cwd(), postPath)
      );
      const { data: frontmatter } = matter(file.toString());
      return {
        slug: postPath.replace("content/", "").replace("/index.mdx", ""),
        frontmatter,
      };
    })
  );
};

const getAllPostPaths = () => {
  return new Promise<string[]>((resolve, reject) => {
    glob("content/**/index.mdx", (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
};

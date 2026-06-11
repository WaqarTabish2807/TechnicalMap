import svgPaths from "../_images/svg-paths.png";
import bazelCacheArt from "../_images/bazel-cache-art.png";
import coldEmailArt from "../_images/cold-email-art.png";
import openClawArt from "../_images/open-claw-art.png";
import perfectTitleArt from "../_images/perfect-title-art.png";
import composioLinearAgentArt from "../_images/composio-linear-agent-art.png";

export function XIcon() {
  return (
    <svg
      width="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M17.25 6.75L6.75 17.25" />
      <path d="M6.75 6.75L17.25 17.25" />
    </svg>
  );
}

export const posts = [
  {
    slug: "building-github-pr-review-agent-composio-linear-sync",
    title: "Building a GitHub PR Review Agent with Composio and Linear Sync",
    description:
      "Stop doing manual chore work. Learn how to build an AI agent that automatically reviews pull requests, writes structural feedback, and moves linked Linear tickets to 'In Review' in real-time.",
    shortDescription: "Automate code reviews and Linear issue updates with Composio's v3 SDK.",
    editedAt: "2026-06-11",
    image: composioLinearAgentArt,
    client: "Composio",
  },
  {
    slug: "cold-email-outreach-guide",
    title: "Cold Email",
    description:
      "Tired of sending resumes into black-hole career mailboxes? Learn a value-first, 7-step cold-email playbook that bypassed gatekeepers and got replies from active founders at high-growth DevTool startups.",
    shortDescription: "A value-first, 7-step cold-email playbook to land high-paying technical clients.",
    editedAt: "2026-06-01",
    image: coldEmailArt,
  },
  {
    slug: "bazel-remote-cache-github-actions-ephemeral-runners",
    title: "Bazel Remote Cache on GitHub Actions: Why Ephemeral Runners Hurt You and How to Fix It",
    description:
      "Every GitHub Actions job starts with an empty disk cache, forcing Bazel onto high-latency network calls. Learn why ephemeral runners hurt your build times and how to resolve it with Namespace's persistent NVMe Cache Volumes.",
    shortDescription: "Solving Bazel remote cache latency on ephemeral GitHub Actions runners.",
    editedAt: "2026-05-20",
    image: bazelCacheArt,
    client: "Namespace",
  },
  {
    slug: "open-claw-tutorial",
    title: "OpenClaw Tutorial: Installation to First Chat Setup",
    description:
      "Set up OpenClaw bot in 20 minutes. Complete guide to install, configure, and chat with your local AI agent via Telegram.",
    shortDescription: "Complete guide to install and setup OpenClaw.",
    editedAt: "2026-02-13",
    image: openClawArt,
  },
  {
    slug: "perfect-title",
    title: "The Perfect Title: An Interactive Guide",
    description:
      "Stop writing boring titles. Use this interactive A/B tester to craft headlines that get clicked.",
    shortDescription: "Interactive A/B tester for blog titles.",
    editedAt: "2026-01-24",
    image: perfectTitleArt,
  },
  {
    slug: "svg-paths",
    title: "A Deep Dive Into SVG Path Commands",
    description:
      "The mystical d attribute in SVG paths is actually a series of small commands. In this guide, we'll take a look at each path command and how we can use them to draw icons.",
    shortDescription: "An interactive look at the SVG d attribute.",
    editedAt: "2025-12-15",
    image: svgPaths,
  },
];


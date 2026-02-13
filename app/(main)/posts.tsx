import svgPaths from "../_images/svg-paths.png";

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
    slug: "open-claw-tutorial",
    title: "OpenClaw Tutorial: Installation to First Chat Setup",
    description:
      "Set up OpenClaw bot in 20 minutes. Complete guide to install, configure, and chat with your local AI agent via Telegram.",
    shortDescription: "Complete guide to install and setup OpenClaw.",
    editedAt: "2026-02-13",
    image: svgPaths,
  },
  {
    slug: "perfect-title",
    title: "The Perfect Title: An Interactive Guide",
    description:
      "Stop writing boring titles. Use this interactive A/B tester to craft headlines that get clicked.",
    shortDescription: "Interactive A/B tester for blog titles.",
    editedAt: "2026-01-24",
    image: svgPaths, // Temporary placeholder until we generate a new one
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

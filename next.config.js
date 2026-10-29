const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async rewrites() {
    // Browsers still ask for /favicon.ico; serve the SVG icon from app/icon.svg.
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
};

const withMDX = createMDX({});

module.exports = withMDX(nextConfig);

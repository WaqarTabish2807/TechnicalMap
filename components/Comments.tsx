import React from "react";
import { styled } from "~/stitches.config";

// Comments are powered by Giscus (GitHub Discussions): free, no database, and
// readers sign in with GitHub. Get the ids from https://giscus.app after
// enabling Discussions on the repo and installing the Giscus app.
const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "WaqarTabish2807/TechnicalMap";
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Comments";
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function Comments({ slug }: { slug: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = ref.current;
    if (!container || !REPO_ID || !CATEGORY_ID) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries({
      "data-repo": REPO,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-mapping": "specific",
      "data-term": slug,
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "preferred_color_scheme",
      "data-lang": "en",
      "data-loading": "lazy",
    }).forEach(([key, value]) => script.setAttribute(key, value));

    container.replaceChildren(script);
    return () => container.replaceChildren();
  }, [slug]);

  if (!REPO_ID || !CATEGORY_ID) return null;

  return (
    <Wrapper>
      <h4>Comments</h4>
      <div ref={ref} />
    </Wrapper>
  );
}

const Wrapper = styled("section", {
  marginTop: "$16",

  "> h4": {
    marginBottom: "$4",
  },
});

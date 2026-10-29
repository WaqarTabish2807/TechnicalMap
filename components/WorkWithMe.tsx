import NextLink from "next/link";
import { styled } from "~/stitches.config";

// End-of-post pitch. Shown on every article, above the newsletter form.
export function WorkWithMe({ client }: { client?: string }) {
  return (
    <Wrapper>
      <h4>Building an AI or DevTool product?</h4>
      <p>
        {client
          ? `This post was written with ${client}. `
          : ""}
        I write technical deep-dives like this one and make the UGC that goes
        with them. One partner for the post developers read and the video that
        gets them to click.
      </p>
      <NextLink href="/work">See how I work with startups →</NextLink>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  border: "1px dashed $gray8",
  background: "$gray3",
  padding: "$4",
  borderRadius: "$base",
  marginBottom: "$8",

  "> :not(:last-child)": {
    marginBottom: "$2",
  },

  a: {
    fontWeight: 500,
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
});

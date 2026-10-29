import { styled } from "~/stitches.config";
import { SubscribeInput } from "./SubscribeInput";

export function NewsletterForm() {
  return (
    <Wrapper>
      <h4>The Technical Map, weekly</h4>
      <p>
        One email a week. What I noticed about how AI and DevTool products get
        explained: the technical deep-dives, the UGC that actually converts,
        and why. No fluff. Unsubscribe anytime.
      </p>
      <SubscribeInput />
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  border: "1px solid $gray8",
  padding: "$4",
  borderRadius: "$base",

  "> :not(:last-child)": {
    marginBottom: "$2",
  },
});

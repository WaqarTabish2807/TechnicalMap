"use client";

import { useState } from "react";
import { styled } from "~/stitches.config";
import { Card, CardBody, CardHeader, Hint, Pill } from "./ui";

// A made-up tool. The jargon is the kind HN commenters stopped on.
const JARGON: Record<string, string> = {
  "agentic decisioning layer": "a service that decides which agent handles each request",
  "ADE-native": "works inside agent coding tools like Claude Code and Codex",
  "enterprise-grade": "says nothing a reader can check; cut it",
  "ex-FAANG": "tells readers where you worked, not what the tool does",
};

export function ReadmeFixer() {
  const [after, setAfter] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const term = (t: string) => (
    <Term
      data-open={open === t}
      onClick={() => setOpen(open === t ? null : t)}
      title="What does this mean?"
    >
      {t}
    </Term>
  );

  return (
    <Card>
      <CardHeader>
        <h3>The README a Show HN visitor sees</h3>
        <span>Toggle</span>
      </CardHeader>
      <CardBody>
        <Row>
          <Pill data-active={!after} onClick={() => setAfter(false)}>
            Before
          </Pill>
          <Pill data-active={after} onClick={() => setAfter(true)}>
            After
          </Pill>
        </Row>

        <Readme>
          <h4># switchyard</h4>
          {!after ? (
            <>
              <p>
                The {term("agentic decisioning layer")} for modern teams. {term("ADE-native")},{" "}
                {term("enterprise-grade")}, and built by {term("ex-FAANG")} engineers.
              </p>
              <p>## Getting started</p>
              <Code>Sign up on the dashboard to get your API key.</Code>
              {open && (
                <Gloss>
                  <span>{open}</span>
                  {JARGON[open]}
                </Gloss>
              )}
            </>
          ) : (
            <>
              <p>
                Switchyard routes each request from your app to the right AI agent, so a billing
                question goes to your billing agent and a bug report goes to your triage agent.
                Built on LiteLLM. If you only run one agent, you don't need this.
              </p>
              <Shot aria-label="Screenshot placeholder: terminal showing three requests routed to three agents">
                $ switchyard route &quot;refund my last invoice&quot;
                <br />→ billing-agent (0.4s)
              </Shot>
              <p>
                <strong>Works with:</strong> Claude Code, Codex, any OpenAI-compatible API.{" "}
                <strong>Not yet:</strong> Windows, streaming responses.
              </p>
              <Code>npx switchyard init   # no account needed</Code>
            </>
          )}
        </Readme>

        <Hint>
          {after
            ? "One sentence on what it does, what it's built on, when not to use it, one image of the output, and a first command with no signup."
            : "Tap the underlined words. They're modelled on the ones HN commenters stopped on in this sample."}
        </Hint>
      </CardBody>
    </Card>
  );
}

const Row = styled("div", { display: "flex", gap: "6px" });

const Readme = styled("div", {
  padding: "18px",
  borderRadius: "10px",
  border: "1px solid $gray6",
  background: "$gray2",
  fontSize: "0.95rem",
  lineHeight: 1.55,
  color: "$gray12",
  "& h4": { margin: "0 0 8px", fontFamily: "$mono", fontSize: "1rem" },
  "& p": { margin: "0 0 10px" },
});

const Term = styled("button", {
  display: "inline",
  padding: 0,
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  cursor: "pointer",
  textDecoration: "underline wavy",
  textDecorationColor: "$blue9",
  textUnderlineOffset: "3px",
  '&[data-open="true"]': { background: "hsla(206, 100%, 50%, 0.25)" },
});

const Gloss = styled("p", {
  margin: "8px 0 0 !important",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "$gray1",
  border: "1px solid $gray6",
  fontSize: "0.9rem",
  "& span": {
    display: "block",
    fontFamily: "$mono",
    fontSize: "0.72rem",
    color: "$blue9",
  },
});

const Code = styled("pre", {
  margin: 0,
  padding: "10px 12px",
  borderRadius: "8px",
  background: "$gray12",
  color: "$gray1",
  fontFamily: "$mono",
  fontSize: "0.82rem",
  whiteSpace: "pre-wrap",
});

const Shot = styled("div", {
  margin: "0 0 10px",
  padding: "14px",
  borderRadius: "8px",
  background: "$gray12",
  color: "$gray1",
  fontFamily: "$mono",
  fontSize: "0.82rem",
});

"use client";

import { useState } from "react";
import { styled } from "~/stitches.config";

// Counts come from hand-coding 583 top-level comments on 30 AI/DevTool
// Launch HN and Show HN threads (Oct 29 to Nov 13, 2026).
// Raw data: /data/hn-launch-objections-2026-11.csv
const ITEMS = [
  {
    id: "comparison",
    label: "The post names the closest alternative and says where it wins",
    asked: "How is this different from X?",
    comments: 75,
    threads: 20,
  },
  {
    id: "support",
    label: "There's a 'works with / doesn't yet' list (platforms, languages, models)",
    asked: "Does it support X?",
    comments: 58,
    threads: 20,
  },
  {
    id: "unclear",
    label: "The first screen says what it is in one plain sentence, no scroll needed",
    asked: "I can't tell what this does.",
    comments: 47,
    threads: 19,
  },
  {
    id: "proof",
    label: "Any benchmark ships with its method, and there's a demo you can try",
    asked: "How was this measured? Show me.",
    comments: 29,
    threads: 13,
  },
  {
    id: "trust",
    label: "It says where data goes, and whether it runs locally or self-hosted",
    asked: "Can I self-host it? Where does my data go?",
    comments: 28,
    threads: 10,
  },
  {
    id: "pricing",
    label: "Pricing, token costs and how the project stays funded are stated",
    asked: "What does it cost, and will it last?",
    comments: 14,
    threads: 8,
  },
  {
    id: "name",
    label: "You searched the name on HN and GitHub for clashes",
    asked: "Isn't that already a different product?",
    comments: 5,
    threads: 4,
  },
];

const TOTAL = ITEMS.reduce((sum, item) => sum + item.comments, 0);

export function LaunchChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const covered = ITEMS.filter((item) => checked[item.id]).reduce(
    (sum, item) => sum + item.comments,
    0
  );
  const percent = Math.round((covered / TOTAL) * 100);
  const open = ITEMS.filter((item) => !checked[item.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: window.location.href,
          tag: "hn-launch-checklist",
        }),
      });
      setStatus(response.ok || response.status === 409 ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card>
      <Header>
        <Title>Show HN pre-flight check</Title>
        <Tag>Interactive</Tag>
      </Header>
      <Body>
        <Intro>Tick what your launch post, README or landing page already answers.</Intro>
        <List>
          {ITEMS.map((item) => (
            <Item key={item.id} data-checked={!!checked[item.id]}>
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={(e) =>
                  setChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))
                }
              />
              <span>
                {item.label}
                <Meta>
                  {item.comments} comments, {item.threads} of 30 threads
                </Meta>
              </span>
            </Item>
          ))}
        </List>

        <Result>
          <Score>{percent}%</Score>
          <p>
            of the objections in our sample are answered before anyone asks.
          </p>
        </Result>

        {open.length > 0 ? (
          <Open>
            <h4>Still coming your way in the thread</h4>
            <ul>
              {open.slice(0, 3).map((item) => (
                <li key={item.id}>&ldquo;{item.asked}&rdquo;</li>
              ))}
            </ul>
          </Open>
        ) : (
          <Open>
            <h4>Every objection type is covered</h4>
            <p>Now the thread can be about your product.</p>
          </Open>
        )}

        <Signup onSubmit={handleSubmit}>
          <label htmlFor="hn-checklist-email">
            Get the next teardown (what makes a developer tool demo video work) in your inbox.
          </label>
          <Row>
            <input
              id="hn-checklist-email"
              type="email"
              placeholder="you@startup.dev"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send it"}
            </button>
          </Row>
          {status === "done" && (
            <Note>Almost there. Check your inbox and click the confirm link.</Note>
          )}
          {status === "error" && <Note>Something went wrong. Try again?</Note>}
        </Signup>
      </Body>
    </Card>
  );
}

const Card = styled("div", {
  border: "1px solid $gray6",
  borderRadius: "16px",
  overflow: "hidden",
  margin: "24px 0",
  background: "$gray1",
  fontFamily: "$sans",
});

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  background: "$gray3",
  borderBottom: "1px solid $gray6",
});

const Title = styled("h3", {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 600,
  color: "$gray12",
});

const Tag = styled("span", {
  fontFamily: "$mono",
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "$gray10",
});

const Body = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Intro = styled("p", {
  margin: 0,
  color: "$gray11",
  fontSize: "0.95rem",
});

const List = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const Item = styled("label", {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  padding: "12px 14px",
  border: "1px solid $gray6",
  borderRadius: "10px",
  cursor: "pointer",
  color: "$gray12",
  fontSize: "0.95rem",
  lineHeight: 1.4,
  "& input": { marginTop: "4px", accentColor: "var(--colors-blue9)" },
  '&[data-checked="true"]': {
    background: "hsla(206, 100%, 50%, 0.1)",
    borderColor: "$blue9",
  },
});

const Meta = styled("span", {
  display: "block",
  marginTop: "2px",
  fontFamily: "$mono",
  fontSize: "0.75rem",
  color: "$gray10",
});

const Result = styled("div", {
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  flexWrap: "wrap",
  "& p": { margin: 0, color: "$gray11" },
});

const Score = styled("span", {
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "$gray12",
  fontVariantNumeric: "tabular-nums",
});

const Open = styled("div", {
  padding: "14px 16px",
  borderRadius: "10px",
  background: "$gray3",
  "& h4": {
    margin: "0 0 6px",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "$gray10",
  },
  "& ul": { margin: 0, paddingLeft: "18px", color: "$gray12" },
  "& p": { margin: 0, color: "$gray12" },
});

const Signup = styled("form", {
  borderTop: "1px solid $gray6",
  paddingTop: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "& label": { fontSize: "0.9rem", color: "$gray11" },
});

const Row = styled("div", {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  "& input": {
    flex: "1 1 200px",
    minWidth: 0,
    padding: "10px 12px",
    border: "1px solid $gray7",
    borderRadius: "8px",
    background: "$gray1",
    color: "$gray12",
  },
  "& button": {
    padding: "10px 16px",
    borderRadius: "8px",
    background: "$gray12",
    color: "$gray1",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  "& button:disabled": { opacity: 0.6 },
});

const Note = styled("p", {
  margin: 0,
  fontFamily: "$mono",
  fontSize: "0.8rem",
  color: "$gray11",
});

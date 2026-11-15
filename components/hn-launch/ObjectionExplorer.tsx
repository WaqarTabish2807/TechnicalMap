"use client";

import { useState } from "react";
import { styled } from "~/stitches.config";
import { CATEGORIES } from "./data";
import { Card, CardBody, CardHeader, Hint } from "./ui";

const MAX = CATEGORIES[0].comments;

export function ObjectionExplorer() {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const category = CATEGORIES.find((c) => c.key === active)!;

  return (
    <Card>
      <CardHeader>
        <h3>What 583 comments asked</h3>
        <span>Tap a bar</span>
      </CardHeader>
      <CardBody>
        <Bars role="tablist" aria-label="Objection categories">
          {CATEGORIES.map((c) => (
            <Bar
              key={c.key}
              role="tab"
              aria-selected={c.key === active}
              data-active={c.key === active}
              onClick={() => setActive(c.key)}
            >
              <BarLabel>{c.label}</BarLabel>
              <Track>
                <Fill style={{ width: `${(c.comments / MAX) * 100}%` }} />
              </Track>
              <BarValue>{c.comments}</BarValue>
            </Bar>
          ))}
        </Bars>

        <Detail role="tabpanel">
          <Stat>
            <strong>{category.comments}</strong> comments in{" "}
            <strong>{category.threads}</strong> of 30 threads
          </Stat>
          <Examples>
            {category.examples.map((e) => (
              <Example key={e.url} href={e.url} target="_blank" rel="noreferrer">
                <span>{e.product}</span>
                {e.text}
              </Example>
            ))}
          </Examples>
          <Fix>
            <span>Fix before launch</span>
            {category.fix}
          </Fix>
        </Detail>
        <Hint>
          Paraphrased. Each example links to the original comment on Hacker News.
        </Hint>
      </CardBody>
    </Card>
  );
}

const Bars = styled("div", { display: "flex", flexDirection: "column", gap: "6px" });

const Bar = styled("button", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) 32px",
  alignItems: "center",
  gap: "12px",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid transparent",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  color: "$gray11",
  "&:hover": { background: "$gray3" },
  '&[data-active="true"]': {
    background: "$gray3",
    borderColor: "$gray7",
    color: "$gray12",
  },
  "@media (max-width: 520px)": {
    gridTemplateColumns: "minmax(0, 1fr) 32px",
    "& > div": { gridColumn: "1 / -1", gridRow: 2 },
  },
});

const BarLabel = styled("span", { fontSize: "0.9rem" });

const Track = styled("div", {
  height: "10px",
  borderRadius: "999px",
  background: "$gray4",
  overflow: "hidden",
});

const Fill = styled("div", {
  height: "100%",
  borderRadius: "999px",
  background: "$blue9",
  transition: "width 400ms ease",
});

const BarValue = styled("span", {
  fontFamily: "$mono",
  fontSize: "0.85rem",
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

const Detail = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "16px",
  borderRadius: "12px",
  background: "$gray2",
  border: "1px solid $gray5",
});

const Stat = styled("p", { margin: 0, color: "$gray11", "& strong": { color: "$gray12" } });

const Examples = styled("div", { display: "flex", flexDirection: "column", gap: "8px" });

const Example = styled("a", {
  display: "block",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "$gray1",
  border: "1px solid $gray5",
  color: "$gray12",
  fontSize: "0.9rem",
  textDecoration: "none",
  "&:hover": { borderColor: "$blue9" },
  "& span": {
    display: "block",
    fontFamily: "$mono",
    fontSize: "0.75rem",
    color: "$blue9",
    marginBottom: "2px",
  },
});

const Fix = styled("p", {
  margin: 0,
  fontSize: "0.9rem",
  color: "$gray12",
  "& span": {
    display: "block",
    fontFamily: "$mono",
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "$gray10",
    marginBottom: "2px",
  },
});

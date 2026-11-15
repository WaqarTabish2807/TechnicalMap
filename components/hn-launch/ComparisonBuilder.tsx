"use client";

import { useState } from "react";
import { styled } from "~/stitches.config";
import { Card, CardBody, CardHeader, Hint, Pill } from "./ui";

const PRESETS = [
  {
    name: "tmux-restore",
    builtOn: "tmux-resurrect and tmux-continuum",
    adds: "restores coding agent sessions in the right panes after a reboot",
    otherWins: "you don't run coding agents, resurrect alone is enough",
  },
  {
    name: "a diff tool",
    builtOn: "tree-sitter, like difftastic",
    adds: "hides moved code and whitespace churn so the real change stands out",
    otherWins: "you want a pager that drops into git with zero config, delta is simpler",
  },
  {
    name: "an AI testing agent",
    builtOn: "a frontier model plus our own browser harness for state and retries",
    adds: "remembers which flows broke before and replays them on every deploy",
    otherWins: "you're testing a single page once, pointing Claude at it is cheaper",
  },
];

export function ComparisonBuilder() {
  const [preset, setPreset] = useState(0);
  const [builtOn, setBuiltOn] = useState(PRESETS[0].builtOn);
  const [adds, setAdds] = useState(PRESETS[0].adds);
  const [otherWins, setOtherWins] = useState(PRESETS[0].otherWins);

  function load(i: number) {
    setPreset(i);
    setBuiltOn(PRESETS[i].builtOn);
    setAdds(PRESETS[i].adds);
    setOtherWins(PRESETS[i].otherWins);
  }

  return (
    <Card>
      <CardHeader>
        <h3>Write your comparison line</h3>
        <span>Interactive</span>
      </CardHeader>
      <CardBody>
        <Row>
          {PRESETS.map((p, i) => (
            <Pill key={p.name} data-active={preset === i} onClick={() => load(i)}>
              {p.name}
            </Pill>
          ))}
        </Row>
        <Field>
          <span>It's built on</span>
          <input value={builtOn} onChange={(e) => setBuiltOn(e.target.value)} />
        </Field>
        <Field>
          <span>What it adds</span>
          <input value={adds} onChange={(e) => setAdds(e.target.value)} />
        </Field>
        <Field>
          <span>Pick the alternative if</span>
          <input value={otherWins} onChange={(e) => setOtherWins(e.target.value)} />
        </Field>
        <Output>
          <span>First line of your Show HN post</span>
          Built on {builtOn || "…"}. It {adds || "…"}. If {otherWins || "…"}.
        </Output>
        <Hint>
          The last clause is the one people skip, and it's the one that buys trust.
        </Hint>
      </CardBody>
    </Card>
  );
}

const Row = styled("div", { display: "flex", flexWrap: "wrap", gap: "6px" });

const Field = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  "& span": {
    fontFamily: "$mono",
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "$gray10",
  },
  "& input": {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid $gray7",
    background: "$gray2",
    color: "$gray12",
    fontSize: "0.95rem",
  },
  "& input:focus": { outline: "none", borderColor: "$blue9" },
});

const Output = styled("p", {
  margin: 0,
  padding: "16px",
  borderRadius: "10px",
  background: "$gray12",
  color: "$gray1",
  fontSize: "1rem",
  lineHeight: 1.5,
  "& span": {
    display: "block",
    fontFamily: "$mono",
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: "6px",
  },
});

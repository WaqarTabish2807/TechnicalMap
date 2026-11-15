"use client";

import { useEffect, useRef, useState } from "react";
import { styled } from "~/stitches.config";
import { Card, CardBody, CardHeader, Hint } from "./ui";

// A made-up product, so nobody's real landing page gets picked on.
const ANSWER =
  "Quietline is a pair of glasses that turns silently mouthed words into text on your laptop. $299, English only, ships in Q2.";

const SLIDES = [
  "Silence is the new interface.",
  "Years of research. One quiet idea.",
  "Imagine a world where your thoughts move at the speed of you.",
  "Designed for the way you already work.",
  "Now, meet Quietline.",
];

export function ScrollJackDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    const target = answerRef.current;
    if (!root || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && elapsed === null) {
          setElapsed(startedAt ? (Date.now() - startedAt) / 1000 : 0);
        }
      },
      { root, threshold: 0.9 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [startedAt, elapsed]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (startedAt === null) setStartedAt(Date.now());
    setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
  }

  function reset() {
    scrollRef.current?.scrollTo({ top: 0 });
    setStartedAt(null);
    setElapsed(null);
    setProgress(0);
  }

  return (
    <Card>
      <CardHeader>
        <h3>Find out what the product is</h3>
        <span>Try both</span>
      </CardHeader>
      <CardBody>
        <Hint>Two landing pages for the same made-up product. Scroll the left one until you know what it is.</Hint>
        <Panels>
          <Panel>
            <PanelLabel>Scroll-driven</PanelLabel>
            <Screen ref={scrollRef} onScroll={onScroll}>
              {SLIDES.map((s, i) => (
                <Slide
                  key={s}
                  style={{
                    opacity: Math.min(1, Math.max(0.15, 1 - Math.abs(progress * (SLIDES.length + 1) - i - 0.5))),
                  }}
                >
                  {s}
                </Slide>
              ))}
              <Slide as="p" ref={answerRef} css={{ fontSize: "0.95rem", fontWeight: 400 }}>
                {ANSWER}
              </Slide>
            </Screen>
            <Timer>
              {elapsed !== null
                ? `Took you ${elapsed.toFixed(1)}s to find out`
                : startedAt
                ? "Still looking…"
                : "Start scrolling"}
              {elapsed !== null && <button onClick={reset}>Again</button>}
            </Timer>
          </Panel>
          <Panel>
            <PanelLabel>Plain</PanelLabel>
            <Screen as="div" css={{ overflow: "hidden" }}>
              <Plain>
                <strong>Quietline</strong>
                <p>{ANSWER}</p>
                <span>Watch the 60-second demo · How it works · Privacy</span>
              </Plain>
            </Screen>
            <Timer>Took you 0s to find out</Timer>
          </Panel>
        </Panels>
      </CardBody>
    </Card>
  );
}

const Panels = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  "@media (max-width: 560px)": { gridTemplateColumns: "1fr" },
});

const Panel = styled("div", { display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 });

const PanelLabel = styled("span", {
  fontFamily: "$mono",
  fontSize: "0.72rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "$gray10",
});

const Screen = styled("div", {
  height: "240px",
  overflowY: "auto",
  borderRadius: "10px",
  border: "1px solid $gray6",
  background: "$gray12",
  color: "$gray1",
  overscrollBehavior: "contain",
});

const Slide = styled("div", {
  minHeight: "240px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "24px",
  margin: 0,
  boxSizing: "border-box",
  fontSize: "1.2rem",
  fontWeight: 600,
  lineHeight: 1.3,
  transition: "opacity 200ms",
});

const Plain = styled("div", {
  height: "100%",
  padding: "20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  "& strong": { fontSize: "1.1rem" },
  "& p": { margin: 0, fontSize: "0.95rem", lineHeight: 1.45 },
  "& span": { fontSize: "0.8rem", opacity: 0.7, marginTop: "auto" },
});

const Timer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  fontFamily: "$mono",
  fontSize: "0.8rem",
  color: "$gray11",
  "& button": {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid $gray7",
    background: "$gray2",
    color: "$gray12",
    cursor: "pointer",
  },
});

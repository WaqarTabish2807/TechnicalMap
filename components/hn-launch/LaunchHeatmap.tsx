"use client";

import { useMemo, useState } from "react";
import { styled } from "~/stitches.config";
import { CATEGORIES, LAUNCHES } from "./data";
import { Card, CardBody, CardHeader, Hint, Pill } from "./ui";

const SHADES = ["$gray3", "hsla(206, 100%, 50%, 0.2)", "hsla(206, 100%, 50%, 0.4)", "hsla(206, 100%, 50%, 0.65)", "hsla(206, 100%, 50%, 0.95)"];

function shade(n: number) {
  if (n === 0) return SHADES[0];
  if (n === 1) return SHADES[1];
  if (n <= 3) return SHADES[2];
  if (n <= 6) return SHADES[3];
  return SHADES[4];
}

export function LaunchHeatmap() {
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

  const rows = useMemo(() => {
    const list = LAUNCHES.map((l, i) => ({ ...l, i }));
    if (sortBy === null) return list;
    return [...list].sort((a, b) => b.c[sortBy] - a.c[sortBy]);
  }, [sortBy]);

  const sel = selected ? LAUNCHES[selected.row] : null;

  return (
    <Card>
      <CardHeader>
        <h3>30 launches, 7 kinds of objection</h3>
        <span>Tap a cell</span>
      </CardHeader>
      <CardBody>
        <Pills>
          <Pill data-active={sortBy === null} onClick={() => setSortBy(null)}>
            Most objections
          </Pill>
          {CATEGORIES.map((c, i) => (
            <Pill key={c.key} data-active={sortBy === i} onClick={() => setSortBy(i)}>
              {c.short}
            </Pill>
          ))}
        </Pills>

        <Scroller>
          <Grid>
            <thead>
              <tr>
                <th />
                {CATEGORIES.map((c, i) => (
                  <Th key={c.key} data-active={sortBy === i}>
                    {c.short}
                  </Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <Name>
                    <a
                      href={`https://news.ycombinator.com/item?id=${l.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.name}
                    </a>
                    {l.kind === "Launch HN" && <Badge>YC</Badge>}
                  </Name>
                  {l.c.map((n, col) => (
                    <td key={col}>
                      <Cell
                        aria-label={`${l.name}: ${n} ${CATEGORIES[col].short} comments`}
                        data-selected={selected?.row === l.i && selected?.col === col}
                        css={{ background: shade(n), color: n > 3 ? "white" : "$gray12" }}
                        onClick={() => setSelected({ row: l.i, col })}
                        onMouseEnter={() => setSelected({ row: l.i, col })}
                      >
                        {n || ""}
                      </Cell>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Grid>
        </Scroller>

        <Readout aria-live="polite">
          {sel && selected ? (
            <>
              <strong>{sel.name}</strong> ({sel.kind}, {sel.comments} top-level comments):{" "}
              {sel.c[selected.col]} asked &ldquo;{CATEGORIES[selected.col].label}&rdquo;
            </>
          ) : (
            "Darker means more comments. YC marks a Launch HN."
          )}
        </Readout>
        <Hint>Launch names link to the HN thread.</Hint>
      </CardBody>
    </Card>
  );
}

const Pills = styled("div", { display: "flex", flexWrap: "wrap", gap: "6px" });

const Scroller = styled("div", {
  overflowX: "auto",
  maxHeight: "460px",
  overflowY: "auto",
  border: "1px solid $gray5",
  borderRadius: "10px",
});

const Grid = styled("table", {
  borderCollapse: "separate",
  borderSpacing: "3px",
  width: "100%",
  margin: 0,
  fontSize: "0.8rem",
  "& th, & td": {
    padding: 0,
    border: "none",
    background: "transparent",
    verticalAlign: "middle",
    lineHeight: 1.2,
  },
  "& thead th": {
    position: "sticky",
    top: 0,
    background: "$gray1",
    zIndex: 1,
  },
});

const Th = styled("th", {
  fontFamily: "$mono",
  fontWeight: 500,
  fontSize: "0.7rem",
  color: "$gray10",
  padding: "6px 2px !important",
  textAlign: "center",
  '&[data-active="true"]': { color: "$blue9" },
});

const Name = styled("th", {
  textAlign: "left",
  fontWeight: 500,
  whiteSpace: "nowrap",
  paddingRight: "8px !important",
  "& a": { color: "$gray12", textDecoration: "none" },
  "& a:hover": { textDecoration: "underline" },
});

const Badge = styled("span", {
  marginLeft: "6px",
  fontFamily: "$mono",
  fontSize: "0.6rem",
  padding: "1px 4px",
  borderRadius: "4px",
  background: "$gray4",
  color: "$gray11",
});

const Cell = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "100%",
  minWidth: "34px",
  height: "26px",
  border: "none",
  borderRadius: "5px",
  fontFamily: "$mono",
  fontSize: "0.75rem",
  cursor: "pointer",
  '&[data-selected="true"]': { outline: "2px solid $gray12", outlineOffset: "1px" },
});

const Readout = styled("p", {
  margin: 0,
  minHeight: "2.6em",
  fontSize: "0.9rem",
  color: "$gray11",
  "& strong": { color: "$gray12" },
});

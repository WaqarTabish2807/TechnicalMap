import { styled } from "~/stitches.config";

// Shared card chrome for the HN launch article widgets.
export const Card = styled("div", {
  border: "1px solid $gray6",
  borderRadius: "16px",
  overflow: "hidden",
  margin: "28px 0",
  background: "$gray1",
  fontFamily: "$sans",
});

export const CardHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  padding: "14px 20px",
  background: "$gray3",
  borderBottom: "1px solid $gray6",
  "& h3": { margin: 0, fontSize: "1rem", fontWeight: 600, color: "$gray12" },
  "& span": {
    fontFamily: "$mono",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "$gray10",
    whiteSpace: "nowrap",
  },
});

export const CardBody = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const Hint = styled("p", {
  margin: 0,
  fontSize: "0.9rem",
  color: "$gray11",
});

export const Pill = styled("button", {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid $gray7",
  background: "$gray2",
  color: "$gray12",
  fontSize: "0.85rem",
  cursor: "pointer",
  '&[data-active="true"]': {
    background: "$gray12",
    color: "$gray1",
    borderColor: "$gray12",
  },
});

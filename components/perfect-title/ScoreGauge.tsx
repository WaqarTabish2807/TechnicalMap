"use client";

import { motion } from "framer-motion";
import { styled } from "~/stitches.config";

export const ScoreGauge = ({ score }: { score: number }) => {
    const color = score > 70 ? "#22c55e" : score > 40 ? "#eab308" : "#ef4444";

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ position: "relative", width: "128px", height: "128px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg
                    style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
                    viewBox="0 0 128 128"
                >
                    {/* Background Track */}
                    <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#f3f4f6"
                        strokeWidth="10"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={color}
                        strokeWidth="10"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ type: "spring", bounce: 0, duration: 1 }}
                    />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <ScoreNumber style={{ color }}>
                        {score}
                    </ScoreNumber>
                </div>
            </div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "#6b7280" }}>
                Score
            </span>
        </div>
    );
};

const ScoreNumber = styled("span", {
    fontSize: "2.25rem",
    fontWeight: "bold",
    fontFamily: "$mono",
    letterSpacing: "-0.05em",
});

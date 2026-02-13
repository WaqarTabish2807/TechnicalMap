"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "~/stitches.config";
import { ScoreGauge } from "./ScoreGauge";
import { GooglePreview } from "./GooglePreview";

const POWER_WORDS = ["guide", "tutorial", "how to", "ultimate", "complete", "101", "vs", "tips"];
const TECHNICAL_TERMS = ["react", "javascript", "python", "css", "api", "database", "cloud", "aws"];

interface FeedbackItem {
    text: string;
    isSuccess: boolean;
}

export const TitleTester = () => {
    const [title, setTitle] = useState("How to Build a Technical Blog");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

    useEffect(() => {
        let newScore = 0;
        const newFeedback: FeedbackItem[] = [];
        const lowerTitle = title.toLowerCase();

        // 1. Length Check
        if (title.length >= 40 && title.length <= 60) {
            newScore += 40;
            newFeedback.push({ text: "Perfect length (40-60 chars)", isSuccess: true });
        } else if (title.length < 40) {
            newScore += title.length;
            newFeedback.push({ text: "Too short. Add more detail.", isSuccess: false });
        } else {
            newScore += Math.max(0, 40 - (title.length - 60));
            newFeedback.push({ text: "Too long. It might get truncated.", isSuccess: false });
        }

        // 2. Power Words
        const hasPowerWord = POWER_WORDS.some((word) => lowerTitle.includes(word));
        if (hasPowerWord) {
            newScore += 30;
            newFeedback.push({ text: "Contains a power word (e.g., Guide, How to)", isSuccess: true });
        } else {
            newFeedback.push({ text: "Try adding a power word like 'Guide' or 'Tutorial'", isSuccess: false });
        }

        // 3. Technical Terms
        const hasTechTerm = TECHNICAL_TERMS.some((term) => lowerTitle.includes(term));
        if (hasTechTerm) {
            newScore += 30;
            newFeedback.push({ text: "Includes specific technical keywords", isSuccess: true });
        } else {
            newFeedback.push({ text: "Mention specific technologies (e.g., React, Python) for SEO", isSuccess: false });
        }

        setScore(Math.min(100, Math.max(0, newScore)));
        setFeedback(newFeedback);
    }, [title]);

    return (
        <Card>
            {/* Header */}
            <Header>
                <h3 style={{ fontWeight: 600, fontSize: "1rem", margin: 0, color: "#111827" }}>Title Analyzer</h3>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono), monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Interactive
                </span>
            </Header>

            {/* Body */}
            <div style={{ padding: "24px 32px", display: "flex", flexDirection: "row", gap: "40px", flexWrap: "wrap" }}>
                {/* Left Column */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
                        Enter your blog title to test
                    </label>
                    <div style={{ position: "relative" }}>
                        <StyledInput
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. The Ultimate Guide to React Hooks"
                        />
                        <div style={{
                            position: "absolute",
                            right: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono), monospace",
                            color: "#9ca3af",
                            backgroundColor: "#e5e7eb",
                            padding: "4px 8px",
                            borderRadius: "4px",
                        }}>
                            {title.length} chars
                        </div>
                    </div>
                    <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#9ca3af" }}>Target: 40-60 chars</div>

                    {/* Feedback */}
                    <div style={{ marginTop: "24px" }}>
                        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af", marginBottom: "12px" }}>
                            Optimizations
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {feedback.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: "12px 16px",
                                        borderRadius: "8px",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        border: "1px solid",
                                        backgroundColor: item.isSuccess ? "#f0fdf4" : "#fffbeb",
                                        borderColor: item.isSuccess ? "#bbf7d0" : "#fde68a",
                                        color: item.isSuccess ? "#15803d" : "#b45309",
                                        fontFamily: "var(--font-sans)",
                                    }}
                                >
                                    <span style={{ fontSize: "1.25rem" }}>{item.isSuccess ? "✓" : "!"}</span>
                                    {item.text}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
                    {/* Gauge */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #f3f4f6", width: "100%" }}>
                        <ScoreGauge score={score} />
                    </div>

                    {/* Google Preview */}
                    <div style={{ width: "100%" }}>
                        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af", textAlign: "center", marginBottom: "12px" }}>
                            Google SERP Preview
                        </h4>
                        <div style={{ padding: "16px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }}>
                            <GooglePreview title={title} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const Card = styled("div", {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    overflow: "hidden",
    marginTop: "24px",
    marginBottom: "24px",
    fontFamily: "$sans",
});

const Header = styled("div", {
    backgroundColor: "#f9fafb",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const StyledInput = styled("input", {
    width: "100%",
    padding: "16px 20px",
    fontSize: "1.25rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "2px solid transparent",
    outline: "none",
    fontWeight: 500,
    boxSizing: "border-box",
    fontFamily: "$sans",
    color: "$gray12",

    "&:focus": {
        backgroundColor: "#ffffff",
        borderColor: "$blue8",
        boxShadow: "0 0 0 4px $colors$blue4",
    },
});

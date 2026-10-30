"use client";

import React from "react";
import clsx from "clsx";
import { subscribe } from "./subscribe";
import { XIcon } from "./posts";

// "Coming soon" course banner. Clicking it opens an email field; signups are
// tagged `course-waitlist` in Neon and Kit (and join the weekly newsletter).
export function CourseWaitlist() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ kind: "ok" | "error"; text: string } | null>(
    null,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await subscribe(email, "course-waitlist");
    setLoading(false);
    if (result.error) {
      setMessage({
        kind: "error",
        text: result.error.startsWith("You're already")
          ? "You're already on the waitlist. You'll hear first."
          : result.error,
      });
      return;
    }
    setMessage({
      kind: "ok",
      text: result.isNew
        ? "You're on the waitlist. Confirm the email in your inbox so I can reach you."
        : "You're on the waitlist. You'll hear first.",
    });
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray3 border border-gray8 border-dashed relative">
      <button
        type="button"
        className="flex gap-4 items-center text-left w-full"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex flex-col gap-1 min-w-0">
          <span className="flex items-center gap-2 shrink-0">
            <span className="font-medium">The Complete Technical Writing Course</span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-blue11 bg-blue3 border border-blue6 rounded uppercase shrink-0">
              Coming Soon
            </span>
          </span>
          <span className="text-sm">
            Stop writing boring docs. Learn to craft technical content that developers actually
            want to read.
          </span>
        </span>
        <span
          className={clsx(
            "ml-auto shrink-0 text-sm font-medium whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors",
            open
              ? "border border-gray8 text-gray11 hover:bg-gray5"
              : "bg-gray12 text-gray1 hover:bg-gray11",
          )}
        >
          {open ? "Close" : "Join waitlist →"}
        </span>
      </button>

      {open && (
        <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="email"
            name="email"
            required
            placeholder="you@startup.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null);
            }}
            className="grow bg-gray1 border border-gray8 rounded-lg px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:border-blue9"
          />
          <button
            type="submit"
            disabled={loading || message?.kind === "ok"}
            className={clsx(
              "text-sm font-medium rounded-lg px-3 py-1.5 bg-gray12 text-gray1",
              (loading || message?.kind === "ok") && "opacity-50",
            )}
          >
            {loading ? "Joining…" : message?.kind === "ok" ? "Joined" : "Join waitlist"}
          </button>
        </form>
      )}
      {open && (
        <p className={clsx("text-xs", message?.kind === "error" ? "text-red11" : "text-gray11")}>
          {message?.text ?? "You'll also get the weekly newsletter. Unsubscribe anytime."}
        </p>
      )}

      <span className="text-gray9">
        <span className="absolute -top-2 -right-2"><XIcon /></span>
        <span className="absolute -top-2 -left-2"><XIcon /></span>
        <span className="absolute -bottom-2 -right-2"><XIcon /></span>
        <span className="absolute -bottom-2 -left-2"><XIcon /></span>
      </span>
    </div>
  );
}

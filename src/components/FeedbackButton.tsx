"use client";

import { useMemo, useState } from "react";
import type { FeedbackPayload, TeamProfile } from "@/types/team";

type FeedbackButtonProps = {
  team: TeamProfile;
  compact?: boolean;
};

const feedbackFields = ["FIFA ranking", "Captain", "Top goal scorer", "Top scorer goals", "Most recent game", "Other"];

function storageKey(teamId: string) {
  return "world-soccer-feedback-" + teamId;
}

export function FeedbackButton({ team, compact = false }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState(feedbackFields[0]);
  const [correction, setCorrection] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const savedMessage = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(storageKey(team.id)) ?? "";
  }, [team.id, status]);

  async function submitFeedback() {
    const trimmedCorrection = correction.trim();
    if (!trimmedCorrection) return;

    setStatus("saving");

    const payload: FeedbackPayload = {
      teamId: team.id,
      teamName: team.countryName,
      field,
      correction: trimmedCorrection,
      pagePath: window.location.pathname,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(storageKey(team.id), field + ": " + trimmedCorrection);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Local storage still keeps the child's correction visible if the network is unavailable.
    }

    setStatus("saved");
    setIsOpen(false);
  }

  return (
    <div className={compact ? "mt-4" : "mt-6"}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-night shadow-sm transition hover:border-rose-300 hover:text-rose-700"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">Thumbs down</span>
        <span>Report incorrect info</span>
      </button>

      {savedMessage ? (
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
          Correction saved on this device: {savedMessage}
        </p>
      ) : null}

      {isOpen ? (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-black text-night">What should be updated?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[12rem_1fr]">
            <label className="block">
              <span className="text-xs font-bold uppercase text-slate-600">Field</span>
              <select
                value={field}
                onChange={(event) => setField(event.target.value)}
                className="mt-1 min-h-11 w-full rounded-xl border border-amber-200 bg-white px-3 text-sm font-bold text-night outline-none focus:border-pitch"
              >
                {feedbackFields.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase text-slate-600">Suggested correction</span>
              <input
                value={correction}
                onChange={(event) => setCorrection(event.target.value)}
                placeholder="Example: Ranking should be 18"
                className="mt-1 min-h-11 w-full rounded-xl border border-amber-200 bg-white px-3 text-sm font-bold text-night outline-none placeholder:text-slate-400 focus:border-pitch"
              />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitFeedback}
              disabled={status === "saving" || correction.trim().length === 0}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-night px-4 py-2 text-sm font-black text-white transition hover:bg-pitch disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === "saving" ? "Saving..." : "Submit correction"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-black text-slate-600 transition hover:text-night"
            >
              Cancel
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold text-amber-900">
            Thanks. This marks the team for review and keeps your suggested correction visible on this device.
          </p>
        </div>
      ) : null}
    </div>
  );
}

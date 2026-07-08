"use client";

import { useMemo, useState } from "react";
import type { FeedbackPayload } from "@/types/team";

const storageKey = "world-soccer-ideas-feedback";

export function IdeaFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const savedIdea = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(storageKey) ?? "";
  }, [status]);

  async function submitIdea() {
    const trimmedIdea = idea.trim();
    if (!trimmedIdea) return;

    setStatus("saving");
    window.localStorage.setItem(storageKey, trimmedIdea);

    const payload: FeedbackPayload = {
      feedbackType: "idea",
      field: "App idea",
      correction: trimmedIdea,
      pagePath: window.location.pathname,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // The idea remains saved locally even if the network is unavailable.
    }

    setStatus("saved");
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Help shape the app</p>
          <p className="mt-1 text-lg font-black text-night">Share feedback or an idea for the next update</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-pitch px-4 py-2 text-sm font-black text-white transition hover:bg-night"
          aria-expanded={isOpen}
        >
          Share an idea
        </button>
      </div>

      {savedIdea ? (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">
          Latest idea saved on this device: {savedIdea}
        </p>
      ) : null}

      {isOpen ? (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <label className="block">
            <span className="text-xs font-bold uppercase text-slate-600">Your idea</span>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Example: Add favourite teams, badges, or a quiz mode"
              className="mt-1 min-h-24 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-night outline-none placeholder:text-slate-400 focus:border-pitch"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitIdea}
              disabled={status === "saving" || idea.trim().length === 0}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-night px-4 py-2 text-sm font-black text-white transition hover:bg-pitch disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === "saving" ? "Saving..." : "Send idea"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-black text-slate-600 transition hover:text-night"
            >
              Cancel
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">Ideas are queued through the feedback API so future updates can be planned from real user suggestions.</p>
        </div>
      ) : null}
    </div>
  );
}

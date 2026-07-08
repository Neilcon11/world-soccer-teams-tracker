import { NextResponse } from "next/server";
import { getTeamById } from "@/data/teams";
import type { FeedbackPayload } from "@/types/team";

const allowedFields = new Set(["FIFA ranking", "Captain", "Top 3 scorers", "Top scorer goals", "Most recent game", "Other", "App idea"]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<FeedbackPayload>;
    const feedbackType = payload.feedbackType ?? "correction";

    if (!payload.field || !payload.correction) {
      return NextResponse.json({ error: "Missing feedback fields" }, { status: 400 });
    }

    if (!allowedFields.has(payload.field)) {
      return NextResponse.json({ error: "Unsupported feedback field" }, { status: 400 });
    }

    if (feedbackType === "correction") {
      if (!payload.teamId) {
        return NextResponse.json({ error: "Missing team for correction" }, { status: 400 });
      }

      const team = getTeamById(payload.teamId);
      if (!team) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 });
      }
    }

    const cleanCorrection = payload.correction.slice(0, 500).trim();

    if (!cleanCorrection) {
      return NextResponse.json({ error: "Feedback cannot be empty" }, { status: 400 });
    }

    console.info("World Soccer feedback received", {
      feedbackType,
      teamId: payload.teamId,
      field: payload.field,
      feedback: cleanCorrection,
      createdAt: payload.createdAt,
    });

    return NextResponse.json({
      ok: true,
      status: feedbackType === "idea" ? "idea-queued-for-next-update" : "queued-for-review",
      message: feedbackType === "idea" ? "Thanks. Your idea has been queued for a future update." : "Thanks. Your correction has been marked for review.",
    });
  } catch (error) {
    console.error("Feedback route failed", error);
    return NextResponse.json({ error: "Could not save feedback" }, { status: 500 });
  }
}

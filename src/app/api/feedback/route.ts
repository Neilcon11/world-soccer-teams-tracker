import { NextResponse } from "next/server";
import { getTeamById } from "@/data/teams";
import type { FeedbackPayload } from "@/types/team";

const allowedFields = new Set(["FIFA ranking", "Captain", "Top goal scorer", "Top scorer goals", "Most recent game", "Other"]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<FeedbackPayload>;

    if (!payload.teamId || !payload.field || !payload.correction) {
      return NextResponse.json({ error: "Missing feedback fields" }, { status: 400 });
    }

    const team = getTeamById(payload.teamId);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    if (!allowedFields.has(payload.field)) {
      return NextResponse.json({ error: "Unsupported feedback field" }, { status: 400 });
    }

    const cleanCorrection = payload.correction.slice(0, 240).trim();

    if (!cleanCorrection) {
      return NextResponse.json({ error: "Correction cannot be empty" }, { status: 400 });
    }

    console.info("Team data feedback received", {
      teamId: team.id,
      field: payload.field,
      correction: cleanCorrection,
      createdAt: payload.createdAt,
    });

    return NextResponse.json({
      ok: true,
      status: "queued-for-review",
      message: "Thanks. Your correction has been marked for review.",
    });
  } catch (error) {
    console.error("Feedback route failed", error);
    return NextResponse.json({ error: "Could not save feedback" }, { status: 500 });
  }
}

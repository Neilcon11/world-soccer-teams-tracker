import { NextResponse } from "next/server";
import { getTeamById } from "@/data/teams";
import { getLatestMatchForTeam } from "@/lib/apiFootball";
import type { TeamWithMatch } from "@/types/team";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const team = getTeamById(id);

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  try {
    const liveMatch = team.apiFootballTeamId ? await getLatestMatchForTeam(team.apiFootballTeamId) : null;
    const payload: TeamWithMatch = { ...team, latestMatch: liveMatch ?? team.lastMatchFallback, isUsingDemoMatchData: !liveMatch };
    return NextResponse.json(payload, { headers: { "Cache-Control": "s-maxage=21600, stale-while-revalidate=3600" } });
  } catch (error) {
    console.error("Team API route failed for " + team.id, error);
    const payload: TeamWithMatch = { ...team, latestMatch: team.lastMatchFallback, isUsingDemoMatchData: true };
    return NextResponse.json(payload, { headers: { "Cache-Control": "s-maxage=21600, stale-while-revalidate=3600" } });
  }
}

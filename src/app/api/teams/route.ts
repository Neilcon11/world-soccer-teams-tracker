import { NextResponse } from "next/server";
import { teams } from "@/data/teams";
import { getLatestMatchForTeam } from "@/lib/apiFootball";
import type { TeamWithMatch } from "@/types/team";

export async function GET() {
  const payload = await Promise.all(
    teams.map(async (team): Promise<TeamWithMatch> => {
      const liveMatch = team.apiFootballTeamId ? await getLatestMatchForTeam(team.apiFootballTeamId) : null;

      return {
        ...team,
        latestMatch: liveMatch ?? team.lastMatchFallback,
        isUsingDemoMatchData: !liveMatch,
      };
    }),
  );

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=21600, stale-while-revalidate=3600",
    },
  });
}

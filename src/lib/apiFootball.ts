import type { LastMatch } from "@/types/team";

type ApiFootballFixture = {
  fixture?: { date?: string };
  league?: { name?: string };
  teams?: {
    home?: { id?: number; name?: string };
    away?: { id?: number; name?: string };
  };
  goals?: { home?: number | null; away?: number | null };
};

type ApiFootballResponse = {
  response?: ApiFootballFixture[];
};

export async function getLatestMatchForTeam(
  apiFootballTeamId: number,
): Promise<LastMatch | null> {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const url = new URL("https://v3.football.api-sports.io/fixtures");
    url.searchParams.set("team", String(apiFootballTeamId));
    url.searchParams.set("last", "1");

    const response = await fetch(url, {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ApiFootballResponse;
    const fixture = data.response?.[0];

    if (!fixture?.teams?.home?.name || !fixture.teams.away?.name) {
      return null;
    }

    const homeName = fixture.teams.home.name;
    const awayName = fixture.teams.away.name;
    const opponent = fixture.teams.home.id === apiFootballTeamId ? awayName : homeName;
    const homeGoals = fixture.goals?.home ?? 0;
    const awayGoals = fixture.goals?.away ?? 0;

    return {
      opponent,
      score: homeName + " " + homeGoals + "-" + awayGoals + " " + awayName,
      date: fixture.fixture?.date ?? new Date().toISOString(),
      competition: fixture.league?.name ?? "Latest match",
    };
  } catch (error) {
    console.error("API-Football latest match fetch failed", error);
    return null;
  }
}

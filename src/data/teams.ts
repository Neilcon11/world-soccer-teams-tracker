import type { TeamProfile } from "@/types/team";

const rankingSource = {
  label: "FIFA/Coca-Cola Men's World Ranking, 11 June 2026",
  url: "https://inside.fifa.com/fifa-world-ranking/men",
};

const scorerSource = {
  label: "National team all-time scoring records",
  url: "https://en.wikipedia.org/wiki/List_of_top_international_men%27s_football_goal_scorers_by_country",
};

const verifiedAt = "2026-07-09T09:00:00+10:00";
const rankingUpdatedAt = "2026-06-11";

export const teams: TeamProfile[] = [
  { id: "australia", countryName: "Australia", flagEmoji: "🇦🇺", fifaCode: "AUS", apiFootballTeamId: 20, fifaRanking: 24, captain: "Mat Ryan", topGoalScorer: { name: "Tim Cahill", goals: 50 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "brazil", countryName: "Brazil", flagEmoji: "🇧🇷", fifaCode: "BRA", apiFootballTeamId: 6, fifaRanking: 6, captain: "Marquinhos", topGoalScorer: { name: "Neymar", goals: 79 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "argentina", countryName: "Argentina", flagEmoji: "🇦🇷", fifaCode: "ARG", apiFootballTeamId: 26, fifaRanking: 3, captain: "Lionel Messi", topGoalScorer: { name: "Lionel Messi", goals: 116 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "england", countryName: "England", flagEmoji: "🏴", fifaCode: "ENG", apiFootballTeamId: 10, fifaRanking: 4, captain: "Harry Kane", topGoalScorer: { name: "Harry Kane", goals: 73 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "france", countryName: "France", flagEmoji: "🇫🇷", fifaCode: "FRA", apiFootballTeamId: 2, fifaRanking: 1, captain: "Kylian Mbappe", topGoalScorer: { name: "Olivier Giroud", goals: 57 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "germany", countryName: "Germany", flagEmoji: "🇩🇪", fifaCode: "GER", apiFootballTeamId: 25, fifaRanking: 9, captain: "Joshua Kimmich", topGoalScorer: { name: "Miroslav Klose", goals: 71 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "spain", countryName: "Spain", flagEmoji: "🇪🇸", fifaCode: "ESP", apiFootballTeamId: 9, fifaRanking: 2, captain: "Alvaro Morata", topGoalScorer: { name: "David Villa", goals: 59 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "portugal", countryName: "Portugal", flagEmoji: "🇵🇹", fifaCode: "POR", apiFootballTeamId: 27, fifaRanking: 5, captain: "Cristiano Ronaldo", topGoalScorer: { name: "Cristiano Ronaldo", goals: 146 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "japan", countryName: "Japan", flagEmoji: "🇯🇵", fifaCode: "JPN", apiFootballTeamId: 12, fifaRanking: 18, captain: "Wataru Endo", topGoalScorer: { name: "Kunishige Kamamoto", goals: 75 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "united-states", countryName: "United States", flagEmoji: "🇺🇸", fifaCode: "USA", apiFootballTeamId: 2384, fifaRanking: 15, captain: "Christian Pulisic", topGoalScorer: { name: "Landon Donovan", goals: 57 }, lastMatchFallback: { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" }, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
];

export function getTeamById(id: string) {
  return teams.find((team) => team.id === id);
}

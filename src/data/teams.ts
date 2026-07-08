import type { GoalScorer, TeamProfile } from "@/types/team";

const rankingSource = {
  label: "FIFA/Coca-Cola Men's World Ranking, 11 June 2026",
  url: "https://inside.fifa.com/fifa-world-ranking/men",
};

const scorerSource = {
  label: "National team all-time scoring records",
  url: "https://en.wikipedia.org/wiki/List_of_top_international_men%27s_football_goalscorers_by_country",
};

const verifiedAt = "2026-07-09T09:00:00+10:00";
const rankingUpdatedAt = "2026-06-11";
const tbcMatch = { opponent: "TBC", score: "Latest result TBC", date: "2026-07-09", competition: "Needs live API update" };

function scorers(topGoalScorers: GoalScorer[]) {
  return topGoalScorers;
}

export const teams: TeamProfile[] = [
  { id: "australia", countryName: "Australia", flagEmoji: "🇦🇺", fifaCode: "AUS", apiFootballTeamId: 20, fifaRanking: 24, captain: "Mat Ryan", topGoalScorers: scorers([{ name: "Tim Cahill", goals: 50 }, { name: "Damian Mori", goals: 29 }, { name: "Archie Thompson", goals: 28 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "brazil", countryName: "Brazil", flagEmoji: "🇧🇷", fifaCode: "BRA", apiFootballTeamId: 6, fifaRanking: 6, captain: "Marquinhos", topGoalScorers: scorers([{ name: "Neymar", goals: 80 }, { name: "Pele", goals: 77 }, { name: "Ronaldo", goals: 62 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "argentina", countryName: "Argentina", flagEmoji: "🇦🇷", fifaCode: "ARG", apiFootballTeamId: 26, fifaRanking: 3, captain: "Lionel Messi", topGoalScorers: scorers([{ name: "Lionel Messi", goals: 116 }, { name: "Gabriel Batistuta", goals: 54 }, { name: "Sergio Aguero", goals: 41 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "england", countryName: "England", flagEmoji: "🏴", fifaCode: "ENG", apiFootballTeamId: 10, fifaRanking: 4, captain: "Harry Kane", topGoalScorers: scorers([{ name: "Harry Kane", goals: 78 }, { name: "Wayne Rooney", goals: 53 }, { name: "Bobby Charlton", goals: 49 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "france", countryName: "France", flagEmoji: "🇫🇷", fifaCode: "FRA", apiFootballTeamId: 2, fifaRanking: 1, captain: "Kylian Mbappe", topGoalScorers: scorers([{ name: "Olivier Giroud", goals: 57 }, { name: "Kylian Mbappe", goals: null }, { name: "Thierry Henry", goals: 51 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "germany", countryName: "Germany", flagEmoji: "🇩🇪", fifaCode: "GER", apiFootballTeamId: 25, fifaRanking: 9, captain: "Joshua Kimmich", topGoalScorers: scorers([{ name: "Miroslav Klose", goals: 71 }, { name: "Gerd Muller", goals: 68 }, { name: "Lukas Podolski", goals: 49 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "spain", countryName: "Spain", flagEmoji: "🇪🇸", fifaCode: "ESP", apiFootballTeamId: 9, fifaRanking: 2, captain: "Alvaro Morata", topGoalScorers: scorers([{ name: "David Villa", goals: 59 }, { name: "Raul", goals: 44 }, { name: "Fernando Torres", goals: 38 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "portugal", countryName: "Portugal", flagEmoji: "🇵🇹", fifaCode: "POR", apiFootballTeamId: 27, fifaRanking: 5, captain: "Cristiano Ronaldo", topGoalScorers: scorers([{ name: "Cristiano Ronaldo", goals: 146 }, { name: "Pauleta", goals: 47 }, { name: "Eusebio", goals: 41 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "japan", countryName: "Japan", flagEmoji: "🇯🇵", fifaCode: "JPN", apiFootballTeamId: 12, fifaRanking: 18, captain: "Wataru Endo", topGoalScorers: scorers([{ name: "Kunishige Kamamoto", goals: 75 }, { name: "Kazuyoshi Miura", goals: 55 }, { name: "Shinji Okazaki", goals: 50 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
  { id: "united-states", countryName: "United States", flagEmoji: "🇺🇸", fifaCode: "USA", apiFootballTeamId: 2384, fifaRanking: 15, captain: "Christian Pulisic", topGoalScorers: scorers([{ name: "Landon Donovan", goals: 57 }, { name: "Clint Dempsey", goals: 57 }, { name: "Jozy Altidore", goals: 42 }]), lastMatchFallback: tbcMatch, lastUpdated: verifiedAt, rankingUpdatedAt, sources: [rankingSource, scorerSource] },
];

export function getTeamById(id: string) {
  return teams.find((team) => team.id === id);
}

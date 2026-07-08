export type LastMatch = {
  opponent: string;
  score: string;
  date: string;
  competition: string;
};

export type TeamProfile = {
  id: string;
  countryName: string;
  flagEmoji: string;
  fifaCode: string;
  apiFootballTeamId?: number;
  fifaRanking: number | null;
  captain: string;
  topGoalScorer: {
    name: string;
    goals: number | null;
  };
  lastMatchFallback: LastMatch;
  lastUpdated: string;
};

export type TeamWithMatch = TeamProfile & {
  latestMatch: LastMatch;
  isUsingDemoMatchData: boolean;
};

export type LastMatch = {
  opponent: string;
  score: string;
  date: string;
  competition: string;
};

export type DataSource = {
  label: string;
  url: string;
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
  rankingUpdatedAt: string;
  sources: DataSource[];
};

export type TeamWithMatch = TeamProfile & {
  latestMatch: LastMatch;
  isUsingDemoMatchData: boolean;
};

export type FeedbackPayload = {
  teamId: string;
  teamName: string;
  field: string;
  correction: string;
  pagePath: string;
  createdAt: string;
};

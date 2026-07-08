import { DataQualityNote } from "@/components/DataQualityNote";
import { IdeaFeedback } from "@/components/IdeaFeedback";
import { LiveTeamGrid } from "@/components/LiveTeamGrid";
import { teams } from "@/data/teams";
import type { TeamWithMatch } from "@/types/team";

export default function Home() {
  const initialTeams: TeamWithMatch[] = teams.map((team) => ({
    ...team,
    latestMatch: team.lastMatchFallback,
    isUsingDemoMatchData: true,
  }));

  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-pitch">National teams</p>
          <h1 className="mt-3 text-4xl font-black text-night sm:text-6xl">World Soccer Teams Tracker</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate-600">Search, compare and help keep national soccer team facts accurate</p>
        </div>
        <div className="mx-auto mt-6 grid max-w-4xl gap-5 text-left lg:grid-cols-[1fr_1fr]">
          <DataQualityNote />
          <IdeaFeedback />
        </div>
      </section>
      <LiveTeamGrid initialTeams={initialTeams} />
    </main>
  );
}

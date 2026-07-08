import Link from "next/link";
import { notFound } from "next/navigation";
import { DataQualityNote } from "@/components/DataQualityNote";
import { FeedbackButton } from "@/components/FeedbackButton";
import { LastMatchCard } from "@/components/LastMatchCard";
import { StatCard } from "@/components/StatCard";
import { TopScorersList } from "@/components/TopScorersList";
import { getTeamById, teams } from "@/data/teams";
import { getLatestMatchForTeam } from "@/lib/apiFootball";
import { formatDateTime, formatNullableNumber } from "@/lib/formatters";

type TeamPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return teams.map((team) => ({ id: team.id }));
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const team = getTeamById(id);
  if (!team) notFound();

  const liveMatch = team.apiFootballTeamId ? await getLatestMatchForTeam(team.apiFootballTeamId) : null;
  const latestMatch = liveMatch ?? team.lastMatchFallback;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 py-3 font-black text-night shadow-card transition hover:text-pitch">Back</Link>
        <section className="mt-8 flex flex-col gap-6 rounded-3xl bg-night p-6 text-white shadow-card sm:p-8 md:flex-row md:items-center md:justify-between">
          <div><p className="text-7xl" aria-hidden="true">{team.flagEmoji}</p><h1 className="mt-4 text-4xl font-black sm:text-6xl">{team.countryName}</h1><p className="mt-2 text-xl font-black text-sun">{team.fifaCode}</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm font-bold text-slate-200">Last Updated</p><p className="mt-1 text-lg font-black">{formatDateTime(team.lastUpdated)}</p></div>
        </section>
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard label="FIFA Ranking" value={formatNullableNumber(team.fifaRanking)} helper={"FIFA update: " + team.rankingUpdatedAt} emphasis />
          <StatCard label="Captain" value={team.captain} helper="Team leader" />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Top 3 Goal Scorers</p>
            <div className="mt-3"><TopScorersList scorers={team.topGoalScorers} /></div>
          </div>
        </section>
        <section className="mt-6"><LastMatchCard match={latestMatch} isUsingDemoMatchData={!liveMatch} /></section>
        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <DataQualityNote team={team} />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Spot a mistake?</p>
            <p className="mt-2 font-semibold text-slate-700">Use the thumbs-down feedback flow to suggest a correction and mark this team for review.</p>
            <FeedbackButton team={team} />
          </div>
        </section>
      </div>
    </main>
  );
}

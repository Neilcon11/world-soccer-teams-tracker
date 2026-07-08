import Link from "next/link";
import type { TeamProfile } from "@/types/team";
import { FeedbackButton } from "@/components/FeedbackButton";
import { formatGoals, formatNullableNumber } from "@/lib/formatters";

type TeamCardProps = {
  team: TeamProfile;
};

export function TeamCard({ team }: TeamCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-emerald-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-5xl" aria-hidden="true">{team.flagEmoji}</p>
          <h2 className="mt-3 text-2xl font-black text-night">{team.countryName}</h2>
          <p className="font-bold text-slate-500">{team.fifaCode}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center">
          <p className="text-xs font-black uppercase text-emerald-700">Rank</p>
          <p className="text-3xl font-black text-pitch">{formatNullableNumber(team.fifaRanking)}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm">
        <p><span className="font-bold text-slate-500">Captain: </span><span className="font-bold text-night">{team.captain}</span></p>
        <p><span className="font-bold text-slate-500">Top scorer: </span><span className="font-bold text-night">{team.topGoalScorer.name} - {formatGoals(team.topGoalScorer.goals)}</span></p>
        <p><span className="font-bold text-slate-500">Last game: </span><span className="font-bold text-night">{team.lastMatchFallback.score}</span></p>
      </div>
      <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">
        Verified against FIFA ranking update: {team.rankingUpdatedAt}
      </p>
      <FeedbackButton team={team} compact />
      <Link href={"/team/" + team.id} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-night px-4 py-3 text-center font-black text-white transition hover:bg-pitch">View Team</Link>
    </article>
  );
}

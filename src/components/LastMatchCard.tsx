import type { LastMatch } from "@/types/team";
import { formatDate } from "@/lib/formatters";

type LastMatchCardProps = {
  match: LastMatch;
  isUsingDemoMatchData?: boolean;
};

export function LastMatchCard({ match, isUsingDemoMatchData = false }: LastMatchCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Most Recent Game</p>
          <p className="mt-3 text-2xl font-black text-night">{match.score}</p>
        </div>
        <span className="rounded-full bg-sun px-3 py-1 text-xs font-black text-night">{match.competition}</span>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div><dt className="font-semibold text-slate-500">Opponent</dt><dd className="text-base font-bold text-night">{match.opponent}</dd></div>
        <div><dt className="font-semibold text-slate-500">Date</dt><dd className="text-base font-bold text-night">{formatDate(match.date)}</dd></div>
      </dl>
      {isUsingDemoMatchData ? <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">Using demo match data. Add a free API key to enable live updates.</p> : null}
    </div>
  );
}

import type { GoalScorer } from "@/types/team";
import { formatGoals } from "@/lib/formatters";

type TopScorersListProps = {
  scorers: GoalScorer[];
  compact?: boolean;
};

export function TopScorersList({ scorers, compact = false }: TopScorersListProps) {
  return (
    <ol className={compact ? "space-y-1" : "space-y-3"}>
      {scorers.slice(0, 3).map((scorer, index) => (
        <li key={scorer.name} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
          <span className="flex items-center gap-2 font-black text-night">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sun text-xs text-night">{index + 1}</span>
            {scorer.name}
          </span>
          <span className="shrink-0 text-sm font-black text-pitch">{formatGoals(scorer.goals)}</span>
        </li>
      ))}
    </ol>
  );
}

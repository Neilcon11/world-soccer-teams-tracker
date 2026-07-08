import type { TeamProfile } from "@/types/team";
import { formatDate, formatDateTime } from "@/lib/formatters";

type DataQualityNoteProps = {
  team?: TeamProfile;
};

export function DataQualityNote({ team }: DataQualityNoteProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
      <p className="font-black">Data accuracy</p>
      <p className="mt-1 font-semibold">
        Rankings use the FIFA/Coca-Cola Men&apos;s World Ranking published on {team ? formatDate(team.rankingUpdatedAt) : "11 June 2026"}. Team profile data was reviewed on {team ? formatDateTime(team.lastUpdated) : "9 July 2026"}.
      </p>
      {team?.sources?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {team.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-full bg-white px-3 py-1 text-xs font-black text-pitch ring-1 ring-emerald-200">
              {source.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import type { TeamWithMatch } from "@/types/team";
import { SearchBox } from "@/components/SearchBox";
import { TeamCard } from "@/components/TeamCard";

type LiveTeamGridProps = {
  initialTeams: TeamWithMatch[];
};

export function LiveTeamGrid({ initialTeams }: LiveTeamGridProps) {
  const [teams, setTeams] = useState(initialTeams);
  const [search, setSearch] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function refreshTeams() {
      try {
        const response = await fetch("/api/teams", { cache: "no-store" });
        if (!response.ok) return;
        const nextTeams = (await response.json()) as TeamWithMatch[];
        if (!isMounted) return;
        setTeams(nextTeams);
        setLastSyncedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
      } catch {
        // Keep the initial server-rendered data if a refresh fails.
      }
    }

    refreshTeams();
    const intervalId = window.setInterval(refreshTeams, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const filteredTeams = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return teams;
    return teams.filter((team) => team.countryName.toLowerCase().includes(normalizedSearch) || team.fifaCode.toLowerCase().includes(normalizedSearch));
  }, [search, teams]);

  const hasLiveMatches = teams.some((team) => !team.isUsingDemoMatchData);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl"><SearchBox value={search} onChange={setSearch} /></div>
      <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-card">
        {hasLiveMatches ? "Live match updates are enabled from the server API." : "Using fallback match data. Add API_FOOTBALL_KEY in Vercel to enable live API-Football updates."}
        {lastSyncedAt ? <span className="block text-xs text-slate-500">Last checked: {lastSyncedAt}</span> : null}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredTeams.map((team) => <TeamCard key={team.id} team={team} />)}</div>
      {filteredTeams.length === 0 ? <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><p className="text-xl font-black text-night">No teams found</p><p className="mt-2 text-slate-600">Try a country name or FIFA code.</p></div> : null}
    </section>
  );
}

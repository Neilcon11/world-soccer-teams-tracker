"use client";

import { useEffect, useMemo, useState } from "react";
import type { TeamWithMatch } from "@/types/team";
import { SearchBox } from "@/components/SearchBox";
import { TeamCard } from "@/components/TeamCard";

type LiveTeamGridProps = {
  initialTeams: TeamWithMatch[];
};

const favoritesStorageKey = "world-soccer-favorite-teams";

function readFavoriteTeamIds() {
  if (typeof window === "undefined") return [] as string[];

  try {
    const savedValue = window.localStorage.getItem(favoritesStorageKey);
    if (!savedValue) return [] as string[];
    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [] as string[];
  }
}

export function LiveTeamGrid({ initialTeams }: LiveTeamGridProps) {
  const [teams, setTeams] = useState(initialTeams);
  const [search, setSearch] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [favoriteTeamIds, setFavoriteTeamIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "favorites">("all");

  useEffect(() => {
    setFavoriteTeamIds(readFavoriteTeamIds());
  }, []);

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

  function toggleFavoriteTeam(teamId: string) {
    setFavoriteTeamIds((currentIds) => {
      const nextIds = currentIds.includes(teamId) ? currentIds.filter((id) => id !== teamId) : [...currentIds, teamId];
      window.localStorage.setItem(favoritesStorageKey, JSON.stringify(nextIds));
      if (nextIds.length === 0) setViewMode("all");
      return nextIds;
    });
  }

  const filteredTeams = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const visibleTeams = viewMode === "favorites" ? teams.filter((team) => favoriteTeamIds.includes(team.id)) : teams;
    if (!normalizedSearch) return visibleTeams;
    return visibleTeams.filter((team) => team.countryName.toLowerCase().includes(normalizedSearch) || team.fifaCode.toLowerCase().includes(normalizedSearch));
  }, [favoriteTeamIds, search, teams, viewMode]);

  const hasLiveMatches = teams.some((team) => !team.isUsingDemoMatchData);
  const favoriteCount = favoriteTeamIds.length;
  const isFavoritesView = viewMode === "favorites";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl"><SearchBox value={search} onChange={setSearch} /></div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm" aria-label="Team view">
          <button
            type="button"
            onClick={() => setViewMode("all")}
            className={"min-h-10 rounded-lg px-4 text-sm font-black transition " + (viewMode === "all" ? "bg-night text-white" : "text-slate-600 hover:text-night")}
          >
            All teams
          </button>
          <button
            type="button"
            onClick={() => setViewMode("favorites")}
            disabled={favoriteCount === 0}
            className={"min-h-10 rounded-lg px-4 text-sm font-black transition disabled:cursor-not-allowed disabled:text-slate-300 " + (viewMode === "favorites" ? "bg-night text-white" : "text-slate-600 hover:text-night")}
          >
            Favourites ({favoriteCount})
          </button>
        </div>
        <p className="text-sm font-semibold text-slate-600">Save teams to build a quicker personal tracker.</p>
      </div>
      <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-card">
        {hasLiveMatches ? "Live match updates are enabled from the server API." : "Using fallback match data. Add API_FOOTBALL_KEY in Vercel to enable live API-Football updates."}
        {lastSyncedAt ? <span className="block text-xs text-slate-500">Last checked: {lastSyncedAt}</span> : null}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} isFavorite={favoriteTeamIds.includes(team.id)} onToggleFavorite={toggleFavoriteTeam} />
        ))}
      </div>
      {filteredTeams.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-xl font-black text-night">{isFavoritesView ? "No favourites yet" : "No teams found"}</p>
          <p className="mt-2 text-slate-600">{isFavoritesView ? "Save a team from the full list to see it here." : "Try a country name or FIFA code."}</p>
        </div>
      ) : null}
    </section>
  );
}

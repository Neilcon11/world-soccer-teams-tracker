"use client";

import { useMemo, useState } from "react";
import type { TeamProfile } from "@/types/team";
import { SearchBox } from "@/components/SearchBox";
import { TeamCard } from "@/components/TeamCard";

type TeamGridProps = {
  teams: TeamProfile[];
};

export function TeamGrid({ teams }: TeamGridProps) {
  const [search, setSearch] = useState("");
  const filteredTeams = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return teams;
    return teams.filter((team) => team.countryName.toLowerCase().includes(normalizedSearch) || team.fifaCode.toLowerCase().includes(normalizedSearch));
  }, [search, teams]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl"><SearchBox value={search} onChange={setSearch} /></div>
      <p className="mt-5 text-center text-sm font-semibold text-emerald-800">Using demo match data. Add a free API key to enable live updates.</p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredTeams.map((team) => <TeamCard key={team.id} team={team} />)}</div>
      {filteredTeams.length === 0 ? <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><p className="text-xl font-black text-night">No teams found</p><p className="mt-2 text-slate-600">Try a country name or FIFA code.</p></div> : null}
    </section>
  );
}

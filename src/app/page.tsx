import { DataQualityNote } from "@/components/DataQualityNote";
import { TeamGrid } from "@/components/TeamGrid";
import { teams } from "@/data/teams";

export default function Home() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-pitch">National teams</p>
          <h1 className="mt-3 text-4xl font-black text-night sm:text-6xl">World Soccer Teams Tracker</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate-600">Search, compare and help keep national soccer team facts accurate</p>
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-left">
          <DataQualityNote />
        </div>
      </section>
      <TeamGrid teams={teams} />
    </main>
  );
}

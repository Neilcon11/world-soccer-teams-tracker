type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  emphasis?: boolean;
};

export function StatCard({ label, value, helper, emphasis = false }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={emphasis ? "mt-3 text-5xl font-black text-pitch" : "mt-3 text-2xl font-black text-night"}>{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}

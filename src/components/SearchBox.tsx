"use client";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="block">
      <span className="sr-only">Search teams</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type="search" placeholder="Search by country or FIFA code" className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-5 text-base font-semibold text-night shadow-card outline-none transition placeholder:text-slate-400 focus:border-pitch focus:ring-4 focus:ring-emerald-100" />
    </label>
  );
}

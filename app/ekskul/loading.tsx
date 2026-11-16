export default function MemuatEkskul() {
  return (
    <div>

      <div className="mb-4 h-8 w-48 animate-pulse rounded-xl bg-slate-200" />
      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-3 h-5 w-20 animate-pulse rounded bg-slate-200" />
            <div className="mb-2 h-6 w-36 animate-pulse rounded bg-slate-200" />
            <div className="mb-1 h-4 w-28 animate-pulse rounded bg-slate-200" />
            <div className="mb-1 h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

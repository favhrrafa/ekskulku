import Link from "next/link";

export default function LayoutDetailEkskul({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <nav className="flex items-center justify-between text-sm">
        <Link
          href="/ekskul"
          className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
        >
          ← Kembali ke Daftar Ekskul
        </Link>
        <span className="text-xs text-slate-400">Kerangka Detail Ekskul</span>
      </nav>
      {children}
    </div>
  );
}


import { type Ekskul, JAMN_SESI } from "@/data/ekskul";
import Link from "next/link";

const warnaBadge: Record<string, string> = {
  Olahraga: "bg-blue-100 text-blue-700",
  Seni: "bg-purple-100 text-purple-700",
  Akademik: "bg-amber-100 text-amber-700",
  Teknologi: "bg-emerald-100 text-emerald-700",
};

export default function KartuEkskul({
  ekskul,
  terisi,
}: {
  ekskul: Ekskul;
  terisi: number;
}) {
  const waktu = `${ekskul.hari}, ${JAMN_SESI[ekskul.sesi]}`;
  const badgeClass = warnaBadge[ekskul.kategori] ?? "bg-slate-100 text-slate-700";
  const sisa = ekskul.kuota - terisi;
  const penuh = sisa <= 0;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <span className={`rounded px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
        {ekskul.kategori}
      </span>
      <h3 className="mt-2 text-lg font-bold text-slate-800">{ekskul.nama}</h3>
      <p className="text-sm text-slate-500">🕒 {waktu}</p>
      <p className="text-sm text-slate-500">👤 {ekskul.pembina}</p>
      <p className={`mt-1 text-sm font-medium ${penuh ? "text-red-600" : "text-emerald-700"}`}>
        {penuh ? "Penuh" : `Sisa ${sisa} dari ${ekskul.kuota} tempat`}
      </p>
      <Link
        href={`/ekskul/${ekskul.id}`}
        className="mt-3 inline-block rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700 transition-colors"
      >
        Lihat Detail
      </Link>
    </div>
  );
}


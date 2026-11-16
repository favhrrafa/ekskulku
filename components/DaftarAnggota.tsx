import { ambilAnggota } from "@/data/ambil";
import { cookies } from "next/headers";

export default async function DaftarAnggota({
  ekskulId,
  kuota,
}: {
  ekskulId: number;
  kuota: number;
}) {
  const [anggota, cookieStore] = await Promise.all([
    ambilAnggota(ekskulId),
    cookies(),
  ]);

  const namaSaya = cookieStore.get("nama")?.value ?? "";

  return (
    <div className="mt-2">
      <p className="mb-3 text-sm text-slate-500">
        {anggota.length} dari {kuota} tempat terisi
      </p>
      {anggota.length === 0 ? (
        <p className="text-slate-500">Belum ada anggota.</p>
      ) : (
        <ul className="space-y-1">
          {anggota.map((a) => (
            <li key={a.nomor} className="text-sm text-slate-700">
              {a.nama} · {a.kelas}
              {namaSaya && a.nama.trim().toLowerCase() === namaSaya.trim().toLowerCase() && (
                <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                  Kamu
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


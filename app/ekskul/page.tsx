import type { Metadata } from "next";
import { ambilSemuaEkskul, ambilJumlahPendaftar } from "@/data/ambil";
import { DAFTAR_KATEGORI, DAFTAR_HARI, type Kategori } from "@/data/ekskul";
import KontrolEkskul from "@/components/KontrolEkskul";
import KartuEkskul from "@/components/KartuEkskul";

export const metadata: Metadata = { title: "Daftar Ekskul" };

export default async function HalamanEkskul({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; hari?: string; sisa?: string }>;
}) {
  const sp = await searchParams;

  // Value aneh di URL diabaikan
  const kategoriFilter = DAFTAR_KATEGORI.includes(sp.kategori as Kategori)
    ? (sp.kategori as Kategori)
    : null;
  const hariFilter = DAFTAR_HARI.includes(sp.hari ?? "") ? sp.hari! : null;
  const sisaFilter = sp.sisa === "1" || sp.sisa === "true";

  const [semuaEkskul, jumlahPendaftar] = await Promise.all([
    ambilSemuaEkskul(),
    ambilJumlahPendaftar(),
  ]);

  // Filter
  const hasil = semuaEkskul.filter((e) => {
    const cocokKategori = !kategoriFilter || e.kategori === kategoriFilter;
    const cocokHari = !hariFilter || e.hari === hariFilter;
    const terisi = jumlahPendaftar[e.id] ?? 0;
    const cocokSisa = !sisaFilter || terisi < e.kuota;
    return cocokKategori && cocokHari && cocokSisa;
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Daftar Ekskul</h1>
      <KontrolEkskul />
      <p className="mb-4 text-sm text-slate-500">{hasil.length} ekskul ditemukan</p>
      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada ekskul yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEkskul key={e.id} ekskul={e} terisi={jumlahPendaftar[e.id] ?? 0} />
          ))}
        </div>
      )}
    </div>
  );
}


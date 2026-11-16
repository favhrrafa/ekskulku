import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ekskul, pendaftar, JAMN_SESI } from "@/data/ekskul";
import { batalkanPendaftaran } from "@/app/action";

export const metadata: Metadata = { title: "Ekskul Saya" };

async function KontenSaya() {
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value;
  const kelasCookie = cookieStore.get("kelas")?.value ?? "";

  const adaCookie = Boolean(namaCookie);

  const daftarSaya = adaCookie
    ? pendaftar
        .filter(
          (p) =>
            p.nama.trim().toLowerCase() === namaCookie!.trim().toLowerCase() &&
            (!kelasCookie ||
              p.kelas.trim().toLowerCase() === kelasCookie.trim().toLowerCase()),
        )
        .map((p) => ({
          nomor: p.nomor,
          ekskul: ekskul.find((e) => e.id === p.ekskulId),
        }))
        .filter(
          (item): item is { nomor: number; ekskul: (typeof ekskul)[number] } =>
            item.ekskul !== undefined,
        )
    : [];

  if (!adaCookie) {
    return (
      <p className="text-slate-500">
        Kamu belum mendaftar apa pun.{" "}
        <Link
          href="/ekskul"
          className="text-emerald-600 underline hover:text-emerald-700"
        >
          Lihat daftar ekskul
        </Link>
      </p>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm font-medium text-slate-600">
        {namaCookie}
        {kelasCookie ? ` · ${kelasCookie}` : ""} · {daftarSaya.length} dari maksimal 2 ekskul diikuti
      </p>

      {daftarSaya.length >= 2 && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Kamu sudah mencapai batas maksimal 2 ekskul. Batalkan salah satu jika ingin mendaftar ke ekskul lain.
        </div>
      )}

      {daftarSaya.length === 0 ? (
        <p className="text-slate-500">
          Belum ada ekskul yang diikuti.{" "}
          <Link
            href="/ekskul"
            className="text-emerald-600 underline hover:text-emerald-700"
          >
            Pilih ekskul
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {daftarSaya.map((item) => (
            <div
              key={item.nomor}
              className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  href={`/ekskul/${item.ekskul.id}`}
                  className="text-lg font-bold text-emerald-600 hover:underline"
                >
                  {item.ekskul.nama}
                </Link>
                <p className="text-sm text-slate-500">
                  🕒 {item.ekskul.hari}, sesi {item.ekskul.sesi} (
                  {JAMN_SESI[item.ekskul.sesi]})
                </p>
              </div>

              <form action={batalkanPendaftaran}>
                <input type="hidden" name="nomor" value={item.nomor} />
                <button
                  type="submit"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                  Batalkan
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function HalamanSaya() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Ekskul Saya</h1>
      <Suspense fallback={<p className="text-slate-400">Memuat data ekskul...</p>}>
        <KontenSaya />
      </Suspense>
    </div>
  );
}

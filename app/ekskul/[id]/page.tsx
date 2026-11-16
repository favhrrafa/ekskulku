import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ambilEkskul, ambilJumlahPendaftar } from "@/data/ambil";
import { JAMN_SESI } from "@/data/ekskul";
import DaftarAnggota from "@/components/DaftarAnggota";
import FormDaftar from "@/components/FormDaftar";

export async function generateMetadata({ params }: PageProps<"/ekskul/[id]">): Promise<Metadata> {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));
  if (!ekskul) return { title: "Ekskul tidak ditemukan" };
  return { title: ekskul.nama };
}

export default async function DetailEkskul({ params }: PageProps<"/ekskul/[id]">) {
  const { id } = await params;
  const [ekskul, jumlahPendaftar, cookieStore] = await Promise.all([
    ambilEkskul(Number(id)),
    ambilJumlahPendaftar(),
    cookies(),
  ]);

  if (!ekskul) notFound();

  const terisi = jumlahPendaftar[ekskul.id] ?? 0;
  const waktu = `${ekskul.hari}, ${JAMN_SESI[ekskul.sesi]}`;
  const namaAwal = cookieStore.get("nama")?.value ?? "";
  const kelasAwal = cookieStore.get("kelas")?.value ?? "";

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
        {ekskul.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{ekskul.nama}</h1>
      <p className="mt-1 text-slate-500">🕒 {waktu}</p>
      <p className="text-slate-500">👤 {ekskul.pembina}</p>
      <p className="mt-2 text-slate-600">{terisi} dari {ekskul.kuota} tempat terisi</p>

      <FormDaftar
        key={ekskul.id}
        ekskulId={ekskul.id}
        namaAwal={namaAwal}
        kelasAwal={kelasAwal}
      />

      <section className="mt-6">
        <h2 className="font-semibold text-slate-800">Anggota terdaftar</h2>
        <Suspense fallback={<p className="text-slate-400">Memuat anggota...</p>}>
          <DaftarAnggota ekskulId={ekskul.id} kuota={ekskul.kuota} />
        </Suspense>
      </section>
    </article>
  );
}


"use client";

import { useState, useActionState } from "react";
import { daftarEkskul, type HasilDaftar } from "@/app/action";

export default function FormDaftar({
  ekskulId,
  namaAwal,
  kelasAwal,
}: {
  ekskulId: number;
  namaAwal: string;
  kelasAwal: string;
}) {
  const awal: HasilDaftar = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, kelas: kelasAwal },
  };

  const [nama, setNama] = useState(namaAwal);
  const [kelas, setKelas] = useState(kelasAwal);
  const [hasil, kirim, sedangKirim] = useActionState(daftarEkskul, awal);

  return (
    <form action={kirim} className="mt-6 border-t pt-4 space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Daftar ekskul ini</h2>

      <input type="hidden" name="ekskulId" value={ekskulId} />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nama
        </label>
        <input
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama siswa"
          className="block w-full rounded border bg-white px-3 py-2 text-slate-700"
        />
        {hasil.galat.nama && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Kelas
        </label>
        <input
          name="kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          placeholder="Contoh: XI RPL 1"
          className="block w-full rounded border bg-white px-3 py-2 text-slate-700"
        />
        {hasil.galat.kelas && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.kelas}</p>
        )}
      </div>

      {hasil.pesan && (
        <p
          className={`text-sm font-medium ${
            hasil.berhasil ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="rounded bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
      >
        {sedangKirim ? "Memproses..." : "Daftar ekskul ini"}
      </button>
    </form>
  );
}


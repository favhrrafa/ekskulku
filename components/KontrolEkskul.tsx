"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

export default function KontrolEkskul() {
  const router = useRouter();
  const sp = useSearchParams();

  function ubahFilter(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/ekskul?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <select
        value={sp.get("kategori") ?? ""}
        onChange={(e) => ubahFilter("kategori", e.target.value)}
        className="rounded border bg-white px-3 py-2 text-slate-600"
      >
        <option value="">Semua kategori</option>
        {DAFTAR_KATEGORI.map((k) => (
          <option key={k} value={k}>{k}</option>
        ))}
      </select>

      <select
        value={sp.get("hari") ?? ""}
        onChange={(e) => ubahFilter("hari", e.target.value)}
        className="rounded border bg-white px-3 py-2 text-slate-600"
      >
        <option value="">Semua hari</option>
        {DAFTAR_HARI.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>
    </div>
  );
}


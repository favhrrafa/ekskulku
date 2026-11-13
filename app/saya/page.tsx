import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ekskul Saya" };

export default function HalamanSaya() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Ekskul Saya</h1>
      <p className="text-slate-500">Belum ada ekskul yang kamu ikuti.</p>
    </div>
  );
}


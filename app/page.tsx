import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold text-emerald-600 mb-3">EkskulKu</h1>
      <p className="text-slate-600 max-w-md mb-8 text-lg">
        Sistem pendaftaran ekstrakurikuler sekolah secara online. Temukan, daftar, dan kelola ekskul favoritmu!
      </p>
      <div className="flex gap-4">
        <Link
          href="/ekskul"
          className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          Lihat Ekskul
        </Link>
        <Link
          href="/saya"
          className="rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
        >
          Ekskul Saya
        </Link>
      </div>
    </div>
  );
}

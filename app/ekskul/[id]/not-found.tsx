import Link from "next/link";

export default function EkskulTidakAda() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Ekskul tidak ditemukan</h1>
      <p className="mt-2 text-slate-600">Mungkin ekskul ini sudah dihapus atau alamatnya salah.</p>
      <Link href="/ekskul" className="mt-4 inline-block text-emerald-600 hover:underline">
        Kembali ke daftar ekskul
      </Link>
    </div>
  );
}


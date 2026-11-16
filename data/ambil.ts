import { ekskul, pendaftar } from "./ekskul";

function jeda(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

export async function ambilSemuaEkskul() {
    await jeda(1000);
    return ekskul;
}

export async function ambilEkskul(id: number) {
    await jeda(500);
    return ekskul.find((e) => e.id === id);
}

export async function ambilAnggota(ekskulId: number) {
    await jeda(1500);
    return pendaftar.filter((p) => p.ekskulId === ekskulId).sort((a, b) => a.nomor - b.nomor);
}

export async function ambilJumlahPendaftar(): Promise<Record<number, number>> {
    await jeda(300);
    const map: Record<number, number> = {};
    for (const p of pendaftar) {
        map[p.ekskulId] = (map[p.ekskulId] ?? 0) + 1;
    }
    return map;
}
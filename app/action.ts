"use server";

import { ekskul, pendaftar, tambahPendaftar, JAMN_SESI } from "@/data/ekskul";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type HasilDaftar = {
  berhasil: boolean;
  pesan: string;
  galat: { nama?: string; kelas?: string };
  isian?: { nama: string; kelas: string };
};

export async function daftarEkskul(
  _sebelum: HasilDaftar,
  formData: FormData,
): Promise<HasilDaftar> {
  const ekskulId = Number(formData.get("ekskulId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const isian = { nama, kelas };

  await new Promise((r) => setTimeout(r, 600));

  const galat: HasilDaftar["galat"] = {};
  if (nama.length < 3) {
    galat.nama = "Nama minimal 3 huruf.";
  }
  if (kelas.length < 3) {
    galat.kelas = "Kelas minimal 3 karakter.";
  }

  if (Object.keys(galat).length > 0) {
    return {
      berhasil: false,
      pesan: "",
      galat,
      isian,
    };
  }

  const target = ekskul.find((e) => e.id === ekskulId);
  if (!target) {
    return {
      berhasil: false,
      pesan: "Ekskul tidak ditemukan.",
      galat: {},
      isian,
    };
  }

  const sudahAda = pendaftar.find(
    (p) =>
      p.ekskulId === target.id &&
      p.nama.trim().toLowerCase() === nama.toLowerCase() &&
      p.kelas.trim().toLowerCase() === kelas.toLowerCase(),
  );
  if (sudahAda) {
    return {
      berhasil: false,
      pesan: `${sudahAda.nama} (${sudahAda.kelas}) sudah terdaftar di ${target.nama}.`,
      galat: {},
      isian,
    };
  }

  // Maksimal 2 ekskul per murid
  const ekskulDiikuti = pendaftar.filter(
    (p) =>
      p.nama.trim().toLowerCase() === nama.toLowerCase() &&
      p.kelas.trim().toLowerCase() === kelas.toLowerCase(),
  );
  if (ekskulDiikuti.length >= 2) {
    return {
      berhasil: false,
      pesan: `Pendaftaran ditolak: Satu murid hanya boleh mengikuti maksimal 2 ekskul (${nama} sudah terdaftar di ${ekskulDiikuti.length} ekskul).`,
      galat: {},
      isian,
    };
  }

  const jumlahAnggota = pendaftar.filter((p) => p.ekskulId === target.id).length;
  if (jumlahAnggota >= target.kuota) {
    return {
      berhasil: false,
      pesan: `Kuota ${target.nama} sudah penuh (${target.kuota} orang).`,
      galat: {},
      isian,
    };
  }


  const ekskulBentrok = pendaftar
    .filter(
      (p) =>
        p.nama.trim().toLowerCase() === nama.toLowerCase() &&
        p.kelas.trim().toLowerCase() === kelas.toLowerCase(),
    )
    .map((p) => ekskul.find((e) => e.id === p.ekskulId))
    .find(
      (e) =>
        e &&
        e.id !== target.id &&
        e.hari.toLowerCase() === target.hari.toLowerCase() &&
        e.sesi === target.sesi,
    );

  if (ekskulBentrok) {
    return {
      berhasil: false,
      pesan: `Jadwal bentrok dengan ${ekskulBentrok.nama} (${ekskulBentrok.hari}, sesi ${ekskulBentrok.sesi}).`,
      galat: {},
      isian,
    };
  }

  const nomor = tambahPendaftar({
    ekskulId: target.id,
    nama,
    kelas,
  });

  const toples = await cookies();
  toples.set("nama", nama, { maxAge: 60 * 60 * 24 * 30 });
  toples.set("kelas", kelas, { maxAge: 60 * 60 * 24 * 30 });

  // Revalidasi halaman
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${target.id}`);
  revalidatePath("/saya");

  return {
    berhasil: true,
    pesan: `Pendaftaran #${nomor} berhasil: ${target.nama}, ${target.hari}, sesi ${target.sesi} (${JAMN_SESI[target.sesi]}).`,
    galat: {},
    isian: { nama, kelas },
  };
}

export async function batalkanPendaftaran(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  const cookieStore = await cookies();
  const namaSaya = cookieStore.get("nama")?.value ?? "";
  const kelasSaya = cookieStore.get("kelas")?.value ?? "";

  const i = pendaftar.findIndex((p) => p.nomor === nomor);
  if (i === -1) return;

  const target = pendaftar[i];
  if (
    target.nama.trim().toLowerCase() !== namaSaya.trim().toLowerCase() ||
    (kelasSaya && target.kelas.trim().toLowerCase() !== kelasSaya.trim().toLowerCase())
  ) {
    return;
  }

  const [batal] = pendaftar.splice(i, 1);

  // Setelah dibatalkan, /saya, daftar anggota, dan sisa tempat langsung berubah
  revalidatePath("/saya");
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${batal.ekskulId}`);
}



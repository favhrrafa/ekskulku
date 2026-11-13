import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "EkskulKu", template: "%s · EkskulKu" },
  description: "Daftar dan kelola ekstrakurikuler sekolah",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="antialiased">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
        <Suspense fallback={<nav className="h-12 border-b bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t bg-white p-4 text-center text-sm text-slate-500">
          EkskulKu - Sistem Pendaftaran Ekstrakurikuler
        </footer>
      </body>
    </html>
  );
}

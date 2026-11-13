"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", text: "Beranda" },
  { href: "/ekskul", text: "Ekskul" },
  { href: "/saya", text: "Ekskul Saya" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6 bg-white px-6 py-3 border-b border-slate-200 shadow-sm">
      <span className="text-lg font-bold text-emerald-600">EkskulKu</span>
      {menu.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          className={
            pathname === m.href || (m.href !== "/" && pathname.startsWith(m.href))
              ? "font-semibold text-emerald-600"
              : "text-slate-600 hover:text-emerald-600 transition-colors"
          }
        >
          {m.text}
        </Link>
      ))}
    </nav>
  );
}


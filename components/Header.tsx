// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setSoundOn, useSoundOn } from "@/lib/soundPref";

const NAV = [
  { href: "/hesapla", label: "Hesapla" },
  { href: "/karsilastir", label: "Karşılaştır" },
  { href: "/rehber", label: "Rehber" },
  { href: "/toplist", label: "Toplist" },
];

export function Wordmark({ size = 16 }: { size?: number }) {
  return (
    <span className="brand-lockup" style={{ fontSize: size }}>
      <span className="brand-mark"><Image src="/logo.jpg" alt="" aria-hidden="true" width={38} height={38} priority /></span>
      <span className="wordmark">Human<b>CODE</b></span>
    </span>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const sound = useSoundOn();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="container-hc" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <Link href="/" aria-label="HumanCODE ana sayfa" className="hdr-logo">
          <Wordmark />
        </Link>

        <nav aria-label="Ana gezinme" className="hidden md:block">
          <ul style={{ display: "flex", gap: 32 }}>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={active(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-btn hdr-btn"
          aria-pressed={sound}
          aria-label={sound ? "Sesi kapat" : "Sesi aç"}
          onClick={() => setSoundOn(!sound)}
          style={{ marginLeft: "auto" }}
        >
          Ses: {sound ? "açık" : "kapalı"}
        </button>

        <button
          type="button"
          className="menu-btn hdr-btn md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
          
        >
          <span className="menu-icon" aria-hidden="true">{open ? "×" : "☰"}</span>
          <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobil gezinme"
          className="md:hidden"
          style={{
            position: "absolute",
            top: "var(--hc-header-h)",
            left: 0,
            right: 0,
            background: "var(--hc-bg)", boxShadow: "0 18px 30px rgba(93,51,58,0.08)",
            borderBottom: "1px solid var(--hc-border)",
            padding: "16px var(--hc-space) 24px",
          }}
        >
          <ul style={{ display: "grid", gap: 4 }}>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  style={{ display: "block", padding: "12px 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

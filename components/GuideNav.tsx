// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DIGITS } from "@/content/digits";
import { HANELER } from "@/content/haneler";

const TOP = [
  { href: "/rehber", label: "Genel bakış" },
  { href: "/rehber/elementler", label: "Elementler" },
  { href: "/rehber/yasam-dongusu", label: "Yaşam döngüsü" },
  { href: "/rehber/sinerji", label: "Sinerji rehberi" },
  { href: "/rehber/koken", label: "Sistemin kökeni" },
];

export function GuideNav() {
  const path = usePathname();
  const cur = (h: string) => (path === h ? "page" : undefined);
  const linkStyle = (h: string) => ({
    display: "block",
    padding: "6px 0",
    color: path === h ? "var(--hc-text)" : "var(--hc-muted)",
    fontWeight: path === h ? 700 : 500,
  });
  return (
    <nav aria-label="Rehber içindekiler" style={{ fontSize: 13 }}>
      <ul style={{ display: "grid", gap: 2 }}>
        {TOP.map((t) => (
          <li key={t.href}>
            <Link href={t.href} aria-current={cur(t.href)} style={linkStyle(t.href)}>
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="eyebrow" style={{ margin: "20px 0 8px" }}>Rakamlar</p>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {DIGITS.map((d) => (
          <li key={d.n}>
            <Link
              href={`/rehber/rakam/${d.n}`}
              aria-current={cur(`/rehber/rakam/${d.n}`)}
              aria-label={`Rakam ${d.n}: ${d.baslik}`}
              className="mono"
              style={{
                display: "grid",
                placeItems: "center",
                width: 34,
                height: 34,
                border: `1px solid ${path === `/rehber/rakam/${d.n}` ? "var(--hc-accent)" : "var(--hc-border-strong)"}`,
                color: path === `/rehber/rakam/${d.n}` ? "var(--hc-accent)" : "var(--hc-text)",
              }}
            >
              {d.n}
            </Link>
          </li>
        ))}
      </ul>
      <p className="eyebrow" style={{ margin: "20px 0 8px" }}>Haneler</p>
      <ul style={{ display: "grid", gap: 2 }}>
        {HANELER.map((h) => (
          <li key={h.n}>
            <Link href={`/rehber/hane/${h.n}`} aria-current={cur(`/rehber/hane/${h.n}`)} style={linkStyle(`/rehber/hane/${h.n}`)}>
              <span className="mono" style={{ color: "var(--hc-accent)", marginRight: 8 }}>h{h.n}</span>
              {h.ad}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

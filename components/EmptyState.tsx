// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";

/** Boş / hata / henüz açık olmayan durumlar için: sönük yağmur + kısa metin. */
export function EmptyState({
  eyebrow,
  title,
  text,
  actions,
}: {
  eyebrow: string;
  title: string;
  text: string;
  actions?: { href: string; label: string; primary?: boolean }[];
}) {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "70dvh", display: "flex", alignItems: "center" }}>
      <div className="page-glow" aria-hidden="true" />
      <div className="container-hc" style={{ position: "relative", paddingTop: "var(--hc-top)", paddingBottom: 72 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display" style={{ margin: "14px 0 20px", fontSize: "clamp(40px, 7vw, 88px)" }}>{title}</h1>
        <p className="lead" style={{ maxWidth: "52ch", marginBottom: 32 }}>{text}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {actions?.map((a) => (
            <Link key={a.href} href={a.href} className={a.primary ? "btn btn-primary" : "btn"}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

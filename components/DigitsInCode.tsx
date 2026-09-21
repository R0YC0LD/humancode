// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";
import { getDigit } from "@/content/digits";
import { getToolbox } from "@/content/attributes";
import { ELEMENT_INFO } from "@/content/elements";
import { digitCounts } from "@/lib/portrait";
import type { Pin } from "@/lib/numerology";

/** Kodda geçen her rakamın kısa açıklaması: sayfadan çıkmadan ne demek olduğunu öğren. */
export function DigitsInCode({ pin }: { pin: Pin }) {
  const counts = digitCounts(pin);
  const present = counts
    .map((c, i) => ({ n: i + 1, c }))
    .filter((x) => x.c > 0)
    .sort((a, b) => b.c - a.c || a.n - b.n);
  const firstSentence = (s: string) => s.split(". ")[0].replace(/\.$/, "") + ".";

  return (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
      {present.map(({ n, c }) => {
        const d = getDigit(n);
        const tb = getToolbox(n);
        const el = ELEMENT_INFO[d.element];
        const hanes = pin.flatMap((v, i) => (v === n ? [`h${i + 1}`] : []));
        return (
          <article key={n} className="panel" style={{ padding: 20, borderTop: `2px solid ${el.renk}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span className="mono" style={{ fontSize: 48, lineHeight: 1 }}>{n}</span>
              <div style={{ flex: 1 }}>
                <strong>{tb.arketip}</strong>
                <span style={{ display: "block", color: el.renk, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>{el.ad}</span>
              </div>
              <span className="mono" style={{ color: "var(--hc-muted)" }} aria-label={`${c} kez`}>×{c}</span>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--hc-muted)", margin: "10px 0" }}>Yer aldığı haneler: {hanes.join(", ")}</p>
            <p style={{ color: "var(--hc-text-2)", margin: "0 0 12px", lineHeight: 1.6 }}>{firstSentence(d.oz)}</p>
            <p style={{ margin: "0 0 6px", fontSize: 13, color: "var(--hc-text-2)" }}>
              <span className="badge badge-ok" style={{ marginRight: 8 }}>Güçlü</span>
              {tb.aktif.slice(0, 3).join(", ")}
            </p>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--hc-text-2)" }}>
              <span className="badge badge-warn" style={{ marginRight: 8 }}>Gölge</span>
              {tb.reaktif.slice(0, 3).join(", ")}
            </p>
            <Link href={`/rehber/rakam/${n}`} style={{ color: "var(--hc-accent)", fontSize: 13 }}>Ayrıntılı rehber →</Link>
          </article>
        );
      })}
    </div>
  );
}

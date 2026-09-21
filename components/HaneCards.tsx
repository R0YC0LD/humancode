// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";
import { getDigit } from "@/content/digits";
import { getToolbox } from "@/content/attributes";
import { HANELER } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/elements";
import { formulaLine } from "@/lib/formula";
import type { BirthDate, Pin } from "@/lib/numerology";

/** 9 haneyi tek tek açıklar: ne ölçer, bu kodda nasıl hesaplandı, sana ne söyler. */
export function HaneCards({ pin, birth }: { pin: Pin; birth?: BirthDate | null }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {HANELER.map((h, i) => {
        const d = getDigit(pin[i]);
        const tb = getToolbox(pin[i]);
        const line = formulaLine(i, pin, birth);
        return (
          <details key={h.n} className="panel hane-card" open={i === 0}>
            <summary>
              <span className="mono" style={{ fontSize: 34, lineHeight: 1, color: i === 8 ? "var(--hc-accent)" : "var(--hc-text)" }}>
                {pin[i]}
              </span>
              <span>
                <span className="mono" style={{ color: "var(--hc-accent)", fontSize: 12, marginRight: 8 }}>h{h.n}</span>
                <strong>{h.ad}</strong>
                <span style={{ display: "block", color: "var(--hc-muted)", fontSize: 13 }}>
                  {tb.arketip} · {ELEMENT_INFO[d.element].ad}
                </span>
              </span>
            </summary>
            <div style={{ padding: "0 18px 20px", display: "grid", gap: 14 }}>
              <p style={{ color: "var(--hc-muted)", margin: 0, fontSize: 14 }}>
                <strong style={{ color: "var(--hc-text-2)" }}>Bu hane ne anlatır: </strong>
                {h.olcer}
              </p>
              <p className="mono" style={{ margin: 0, fontSize: 13, padding: "10px 12px", background: "var(--hc-surface-2)", border: "1px solid var(--hc-border)" }}>
                {h.formul}
                {line && (
                  <>
                    <br />
                    <span style={{ color: "var(--hc-accent)" }}>{line}</span>
                  </>
                )}
              </p>
              <p style={{ margin: 0, color: "var(--hc-text-2)", lineHeight: 1.65 }}>
                <strong>Senin kodunda: </strong>
                {h.lead} {d.hane[i]}
              </p>
              <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
                <p style={{ margin: 0, fontSize: 13, color: "var(--hc-text-2)" }}>
                  <span className="badge badge-ok" style={{ marginRight: 8 }}>Dengedeyken</span>
                  {tb.aktif.slice(0, 4).join(", ")}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--hc-text-2)" }}>
                  <span className="badge badge-warn" style={{ marginRight: 8 }}>Zorlanınca</span>
                  {tb.reaktif.slice(0, 4).join(", ")}
                </p>
              </div>
              <p style={{ margin: 0, fontSize: 13 }}>
                <Link href={`/rehber/rakam/${d.n}`} style={{ color: "var(--hc-accent)" }}>Rakam {d.n} rehberi →</Link>
                <span style={{ margin: "0 10px", color: "var(--hc-muted)" }}>·</span>
                <Link href={`/rehber/hane/${h.n}`} style={{ color: "var(--hc-accent)" }}>Hane {h.n} rehberi →</Link>
              </p>
            </div>
          </details>
        );
      })}
    </div>
  );
}

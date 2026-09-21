// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { BAND_INFO } from "@/content/haneler";
import { timeAgo } from "@/lib/time";
import type { TopEntry } from "@/lib/toplist";

/** Toplist satırları: sıra, iki ad, skor çubuğu. */
export function TopRows({ items, compact = false }: { items: TopEntry[]; compact?: boolean }) {
  return (
    <ol style={{ display: "grid", gap: compact ? 8 : 10, listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((e, i) => {
        const band = BAND_INFO[e.band];
        return (
          <li key={`${e.a.name}${e.a.pin}${e.b.name}${e.b.pin}`} className="panel" style={{ padding: compact ? "12px 16px" : "16px 20px", display: "grid", gridTemplateColumns: "40px 1fr auto", gap: 14, alignItems: "center" }}>
            <span className="mono" style={{ fontSize: compact ? 18 : 24, color: i < 3 ? "var(--hc-accent)" : "var(--hc-muted)" }} aria-label={`${i + 1}. sıra`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ minWidth: 0 }}>
              <strong style={{ fontSize: compact ? 15 : 18, overflowWrap: "anywhere" }}>
                {e.a.name} <span style={{ color: "var(--hc-accent)" }}>×</span> {e.b.name}
              </strong>
              <div className="bar" style={{ marginTop: 8, maxWidth: 360 }} aria-hidden="true">
                <i style={{ width: `${e.score}%`, background: band.renk }} />
              </div>
              <span className="mono" style={{ color: "var(--hc-muted)", fontSize: 11 }}>
                {!compact && `${e.a.pin} × ${e.b.pin}`}
                {!compact && e.t ? " · " : ""}
                {e.t ? timeAgo(e.t) : ""}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="mono" style={{ fontSize: compact ? 22 : 30, lineHeight: 1 }}>{e.score}</span>
              <span style={{ display: "block", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: band.renk }}>{band.ad}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { ELEMENT_ORDER, type ElementCounts } from "@/lib/numerology";
import { ELEMENT_INFO } from "@/content/elements";

/** Halka grafik + yanında sayım listesi. Toplam her zaman 9. */
export function ElementDonut({ counts, size = 180 }: { counts: ElementCounts; size?: number }) {
  const total = ELEMENT_ORDER.reduce((s, e) => s + counts[e], 0);
  const r = 40;
  const C = 2 * Math.PI * r;
  const offsets = ELEMENT_ORDER.map((_, i) =>
    ELEMENT_ORDER.slice(0, i).reduce((sum, e) => sum + (total ? (counts[e] / total) * C : 0), 0),
  );
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label={ELEMENT_ORDER.map((e) => `${ELEMENT_INFO[e].ad} ${counts[e]}`).join(", ")}
      >
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hc-border)" strokeWidth="12" />
        {ELEMENT_ORDER.map((e, i) => {
          const len = total ? (counts[e] / total) * C : 0;
          if (!len) return null;
          return (
            <circle
              key={e}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={ELEMENT_INFO[e].renk}
              strokeWidth="12"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offsets[i]}
              transform="rotate(-90 50 50)"
            />
          );
        })}
        <text x="50" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fill="var(--hc-text)">
          {total}
        </text>
      </svg>
      <ul style={{ display: "grid", gap: 8, minWidth: 160 }}>
        {ELEMENT_ORDER.map((e) => (
          <li key={e} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, background: ELEMENT_INFO[e].renk, display: "inline-block" }} />
            <span style={{ flex: 1, color: "var(--hc-text-2)" }}>{ELEMENT_INFO[e].ad}</span>
            <span className="mono">{counts[e]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

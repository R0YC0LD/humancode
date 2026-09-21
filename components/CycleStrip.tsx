// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { ageOn, cyclePeriods, cycleYear, personalYear, personalYearAtAge, type BirthDate, type Ymd } from "@/lib/numerology";
import { PERSONAL_YEAR_THEMES } from "@/content/guide";
import { PERIOD_THEMES } from "@/content/attributes";

/** 9'ar yıllık dönemler + bulunulan dönemin yıl yıl kişisel yılı. */
export function CycleStrip({ birth, today }: { birth: BirthDate; today: Ymd }) {
  const periods = cyclePeriods(birth, today);
  const age = ageOn(birth, today);
  const cur = periods.find((p) => p.isCurrent)!;
  const py = personalYear(birth, cycleYear(birth, today));
  const theme = PERSONAL_YEAR_THEMES[py - 1];

  return (
    <div>
      <p className="lead" style={{ marginBottom: 16 }}>
        Şu an <strong>{age}</strong> yaşındasın; <strong className="mono">{cur.startAge}–{cur.endAge}</strong> yaş döneminin{" "}
        <strong className="mono">{age - cur.startAge + 1}</strong>. yılındasın. Kişisel yılın{" "}
        <strong className="mono" style={{ color: "var(--hc-accent)" }}>{py}</strong>: {theme.baslik}.
      </p>
      <p style={{ color: "var(--hc-text-2)", maxWidth: "68ch", marginBottom: 16 }}>{theme.metin}</p>
      <p style={{ color: "var(--hc-text-2)", maxWidth: "68ch", marginBottom: 24 }}>
        <strong>Bu 9 yıllık dönemin teması: {PERIOD_THEMES[cur.index]?.baslik}.</strong> {PERIOD_THEMES[cur.index]?.metin}
      </p>

      <div
        role="list"
        aria-label="9 yıllık dönemler"
        style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(112px, 1fr)", gap: 8, overflowX: "auto", paddingBottom: 8 }}
      >
        {periods.map((p) => (
          <div
            role="listitem"
            key={p.index}
            aria-current={p.isCurrent ? "true" : undefined}
            style={{
              border: `1px solid ${p.isCurrent ? "var(--hc-accent)" : "var(--hc-border)"}`,
              background: p.isCurrent ? "rgba(255,95,86,0.08)" : "var(--hc-surface)",
              padding: "10px 12px",
            }}
          >
            <div className="mono" style={{ fontSize: 15 }}>
              {p.startAge}–{p.endAge}
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--hc-muted)" }}>
              {p.startYear}–{p.endYear}
            </div>
          </div>
        ))}
      </div>

      <h3 className="h3" style={{ margin: "28px 0 12px" }}>
        Bu dönemin yılları
      </h3>
      <ol style={{ display: "grid", gridTemplateColumns: "repeat(9, minmax(0, 1fr))", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = cur.startAge + i;
          const isNow = a === age;
          const v = personalYearAtAge(birth, a);
          return (
            <li
              key={a}
              aria-current={isNow ? "true" : undefined}
              style={{
                border: `1px solid ${isNow ? "var(--hc-accent)" : "var(--hc-border)"}`,
                background: isNow ? "rgba(255,95,86,0.08)" : "transparent",
                padding: "8px 4px",
                textAlign: "center",
              }}
            >
              <div className="mono" style={{ fontSize: 20, color: isNow ? "var(--hc-accent)" : "var(--hc-text)" }}>
                {v}
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--hc-muted)" }}>
                {birth.year + a}
              </div>
              {isNow && (
                <div style={{ fontSize: 9, letterSpacing: "0.08em", color: "var(--hc-accent)", textTransform: "uppercase" }}>şimdi</div>
              )}
            </li>
          );
        })}
      </ol>
      <p style={{ color: "var(--hc-muted)", fontSize: 12, marginTop: 10 }}>
        Yıl değişimi takvim yılbaşında değil, doğum gününde olur. Yılın altındaki sayı, o yaş yılının başladığı takvim yılıdır.
      </p>
    </div>
  );
}

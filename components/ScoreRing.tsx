// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BAND_INFO } from "@/content/haneler";
import { bandOf } from "@/lib/numerology";

/** 0 → skor sayaçlı halka. Sayı ve yay aynı değerle (ease-out) ilerler. */
export function ScoreRing({
  score,
  size = 180,
  duration = 1400,
  animate = true,
}: {
  score: number;
  size?: number;
  duration?: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const skip = !animate || !!reduce;
  const [v, setV] = useState(skip ? score : 0);

  useEffect(() => {
    if (skip) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const u = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - u, 3);
      setV(score * e);
      if (u < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [score, skip, duration]);

  const shown = skip ? score : v;
  const band = BAND_INFO[bandOf(score)];
  const r = 44;
  const C = 2 * Math.PI * r;
  return (
    <div
      style={{ width: size, height: size, position: "relative" }}
      role="img"
      aria-label={`Sinerji skoru 100 üzerinden ${score}, ${band.ad}`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hc-border)" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={band.renk}
          strokeWidth="5"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - shown / 100)}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="mono" style={{ fontSize: size * 0.3, fontWeight: 500, lineHeight: 1 }}>
          {Math.round(shown)}
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: band.renk, marginTop: 6 }}>
          {band.ad}
        </span>
      </div>
    </div>
  );
}

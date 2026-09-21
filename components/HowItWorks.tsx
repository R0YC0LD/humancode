// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BirthField } from "./BirthField";
import { Pyramid, staticCells, type PyramidCellView } from "./Pyramid";
import { formulaLine } from "@/lib/formula";
import { HANELER } from "@/content/haneler";
import { validateFields, type BirthFields } from "@/lib/birthForm";
import { computePin } from "@/lib/numerology";

const NAMES = HANELER.map((h) => h.ad);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

/** Ana sayfa: 9 hane sırayla çizilir + canlı hesaplayıcı (varsayılan: 11.02.1980). */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const [f, setF] = useState<BirthFields>({ d: "11", m: "2", y: "1980" });
  const res = validateFields(f);
  const pin = useMemo(() => (res.ok ? computePin(res.date) : null), [res]);
  const birth = res.ok ? res.date : null;

  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(reduce ? 99999 : 0);

  useEffect(() => {
    if (reduce) {
      setT(99999);
      return;
    }
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setT(99999);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const loop = (now: number) => {
          const dt = now - t0;
          setT(dt);
          if (dt < 9 * 260 + 700) raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const cells: PyramidCellView[] = pin
    ? staticCells(pin).map((c, i) => ({ ...c, opacity: clamp01((t - i * 260 + 200) / 240) }))
    : [];
  const links = pin ? pin.map((_, i) => (HANELER[i].deps.length ? clamp01((t - i * 260) / 520) : 0)) : undefined;

  return (
    <div ref={box} style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", alignItems: "start" }}>
      <div>
        {pin ? (
          <Pyramid cells={cells} names={NAMES} links={links} title="Örnek kod piramidi" />
        ) : (
          <div className="card" style={{ padding: 32, color: "var(--hc-muted)", textAlign: "center" }}>
            Geçerli bir tarih girince piramit burada çizilir.
          </div>
        )}
      </div>
      <div>
        <div style={{ maxWidth: 420, marginBottom: 20 }}>
          <BirthField id="ornek" legend="Örnek tarih (değiştirebilirsin)" value={f} onChange={setF} error={res.ok ? null : res.error} />
        </div>
        <ol aria-label="Hesap adımları" style={{ display: "grid", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
          {pin &&
            HANELER.map((h, i) => (
              <li key={h.n} className="mono" style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 8, fontSize: 13, color: "var(--hc-text-2)" }}>
                <span style={{ color: "var(--hc-accent)" }}>h{h.n}</span>
                <span>
                  <span style={{ color: "var(--hc-muted)" }}>{h.formul}</span>
                  {formulaLine(i, pin, birth) && (
                    <>
                      {" "}
                      → <span style={{ color: "var(--hc-text)" }}>{formulaLine(i, pin, birth)}</span>
                    </>
                  )}
                </span>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

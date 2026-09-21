// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useState } from "react";
import { HANELER } from "@/content/haneler";
import { digitSum, reduce } from "@/lib/numerology";

/** Bir hanenin canlı mini hesaplayıcısı. */
export function MiniHane({ n }: { n: number }) {
  const h = HANELER[n - 1];
  const [day, setDay] = useState(11);
  const [month, setMonth] = useState(2);
  const [year, setYear] = useState(1980);
  const [deps, setDeps] = useState<number[]>(() => h.deps.map((_, i) => [2, 2, 9, 4, 6, 4, 2, 6][h.deps[i]] ?? 1));

  let eq = "";
  let out = 0;
  if (n === 1) {
    out = reduce(day);
    eq = `reduce(${day}) = ${out}`;
  } else if (n === 2) {
    out = reduce(month);
    eq = `reduce(${month}) = ${out}`;
  } else if (n === 3) {
    const s = digitSum(year);
    out = reduce(s);
    eq = `reduce(${String(year).split("").join(" + ")} = ${s}) = ${out}`;
  } else {
    const s = deps.reduce((a, b) => a + b, 0);
    out = reduce(s);
    eq = `reduce(${deps.join(" + ")} = ${s}) = ${out}`;
  }

  const numField = (id: string, label: string, v: number, set: (x: number) => void, min: number, max: number) => (
    <div className="field" style={{ width: 110 }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="num-input"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={v}
        onChange={(e) => {
          const x = Math.trunc(Number(e.target.value));
          if (Number.isFinite(x)) set(Math.min(Math.max(x, min), max));
        }}
      />
    </div>
  );

  return (
    <div className="card" style={{ padding: 24 }}>
      <p className="eyebrow" style={{ marginBottom: 14 }}>Canlı hesap</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        {n === 1 && numField("mh-day", "Gün", day, setDay, 1, 31)}
        {n === 2 && numField("mh-month", "Ay", month, setMonth, 1, 12)}
        {n === 3 && numField("mh-year", "Yıl", year, setYear, 1900, 2100)}
        {n > 3 &&
          h.deps.map((d, i) => (
            <div className="field" key={d} style={{ width: 96 }}>
              <label htmlFor={`mh-${d}`}>h{d + 1}</label>
              <select
                id={`mh-${d}`}
                className="num-input"
                style={{ textAlign: "center", textAlignLast: "center" }}
                value={deps[i]}
                onChange={(e) => setDeps((old) => old.map((x, j) => (j === i ? Number(e.target.value) : x)))}
              >
                {Array.from({ length: 9 }, (_, k) => (
                  <option key={k + 1} value={k + 1}>
                    {k + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        <div style={{ paddingBottom: 6 }} aria-live="polite">
          <span className="mono" style={{ fontSize: 44, lineHeight: 1, color: "var(--hc-accent)" }}>{out}</span>
        </div>
      </div>
      <p className="mono" style={{ marginTop: 16, fontSize: 13, color: "var(--hc-text-2)" }}>
        h{n} = {h.formul}
        <br />
        {eq}
      </p>
    </div>
  );
}

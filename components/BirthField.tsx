// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useRef } from "react";
import type { BirthFields } from "@/lib/birthForm";

interface Props {
  id: string;
  legend: string;
  value: BirthFields;
  onChange: (v: BirthFields) => void;
  error?: string | null;
  autoFocus?: boolean;
}

const digits = (s: string, max: number) => s.replace(/\D/g, "").slice(0, max);

/** Gün / ay / yıl ayrı alanlar; 2 hane girilince sonraki alana geçer. */
export function BirthField({ id, legend, value, onChange, error, autoFocus }: Props) {
  const d = useRef<HTMLInputElement>(null);
  const m = useRef<HTMLInputElement>(null);
  const y = useRef<HTMLInputElement>(null);
  const bad = !!error;
  const errId = `${id}-err`;
  const common = {
    inputMode: "numeric" as const,
    autoComplete: "off",
    "aria-invalid": bad,
    "aria-describedby": bad ? errId : undefined,
  };

  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      <legend className="eyebrow" style={{ marginBottom: 10, padding: 0 }}>
        {legend}
      </legend>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.6fr", gap: 10 }}>
        <div className="field">
          <label htmlFor={`${id}-d`}>Gün</label>
          <input
            id={`${id}-d`}
            ref={d}
            className="num-input"
            placeholder="GG"
            autoFocus={autoFocus}
            value={value.d}
            onChange={(e) => {
              // Tam tarih yapıştırılırsa (01011972 / 01.01.1972) üç alana dağıt
              const raw = e.target.value.replace(/\D/g, "");
              if (raw.length > 2) {
                const next = { d: raw.slice(0, 2), m: raw.slice(2, 4), y: raw.slice(4, 8) };
                onChange(next);
                (next.y.length === 4 ? y : next.m.length === 2 ? y : m).current?.focus();
                return;
              }
              onChange({ ...value, d: raw });
              if (raw.length === 2) m.current?.focus();
            }}
            {...common}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-m`}>Ay</label>
          <input
            id={`${id}-m`}
            ref={m}
            className="num-input"
            placeholder="AA"
            maxLength={2}
            value={value.m}
            onChange={(e) => {
              const v = digits(e.target.value, 2);
              onChange({ ...value, m: v });
              if (v.length === 2) y.current?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value.m) d.current?.focus();
            }}
            {...common}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-y`}>Yıl</label>
          <input
            id={`${id}-y`}
            ref={y}
            className="num-input"
            placeholder="YYYY"
            maxLength={4}
            value={value.y}
            onChange={(e) => onChange({ ...value, y: digits(e.target.value, 4) })}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value.y) m.current?.focus();
            }}
            {...common}
          />
        </div>
      </div>
      <p id={errId} role="alert" style={{ minHeight: 20, margin: "8px 0 0", fontSize: 13, color: "var(--hc-accent)" }}>
        {error ?? ""}
      </p>
    </fieldset>
  );
}

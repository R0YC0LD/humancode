// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { NAME_MAX } from "@/lib/names";

/** Ad alanı: yorumlar bu adla yazılır (Onur’un şu özelliği…). */
export function NameField({
  id,
  label = "Ad",
  value,
  onChange,
  error,
  autoFocus,
  placeholder = "ör. Onur",
  autoComplete = "given-name",
}: {
  id: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  autoFocus?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errId = `${id}-err`;
  return (
    <div className="field" style={{ marginBottom: 14 }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className="num-input"
        style={{ fontFamily: "var(--font-sans)", fontSize: 20, textAlign: "left", padding: "0 14px" }}
        value={value}
        maxLength={NAME_MAX}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCapitalize="words"
        autoFocus={autoFocus}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      <p id={errId} role="alert" style={{ minHeight: error ? 18 : 0, margin: "4px 0 0", fontSize: 13, color: "var(--hc-accent)" }}>
        {error ?? ""}
      </p>
    </div>
  );
}

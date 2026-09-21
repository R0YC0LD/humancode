// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useState, type ReactNode } from "react";
import { SectionNav, type NavItem } from "../SectionNav";
import { MODES } from "@/content/haneler";
import type { Mode } from "@/lib/numerology";

/**
 * İlişki türü seçici + bölüm gezintisi. İçerik (children) sunucuda çizilir ve tüm türlerin
 * metnini taşır; burada yalnızca hangisinin görüneceği (data-mode-active) değişir.
 */
export function ModeShell({ initialMode, nav, children }: { initialMode: Mode; nav: NavItem[]; children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode);

  const choose = (m: Mode) => {
    setMode(m);
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("m", m);
      window.history.replaceState(null, "", u.toString());
    } catch {
      /* URL güncellenemezse yalnızca görünüm değişir */
    }
  };

  return (
    <div data-mode-active={mode}>
      <div role="radiogroup" aria-label="İlişki türü" style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "48px 0 8px" }}>
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            role="radio"
            aria-checked={mode === m.key}
            className="btn"
            onClick={() => choose(m.key)}
            style={mode === m.key ? { background: "var(--hc-text)", color: "#000", borderColor: "var(--hc-text)" } : undefined}
          >
            {m.ad}
          </button>
        ))}
      </div>
      <p style={{ color: "var(--hc-muted)", fontSize: 13 }}>Sayılar aynı kalır; alanın kapsamı ve ipuçları seçtiğin ilişki türüne göre değişir.</p>
      <SectionNav items={nav} />
      {children}
    </div>
  );
}

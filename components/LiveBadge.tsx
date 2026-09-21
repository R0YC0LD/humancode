// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { usePresence } from "@/lib/presenceStore";

/** Alt bilgide "şu an N kişi" rozeti (yağmurdaki sayıyla aynı kaynak). */
export function LiveBadge() {
  const n = usePresence();
  return (
    <span aria-live="polite" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: "var(--hc-success)", boxShadow: "0 0 8px var(--hc-success)" }} />
      Şu an <b className="mono" style={{ color: "var(--hc-text)" }}>{n}</b> kişi burada
    </span>
  );
}

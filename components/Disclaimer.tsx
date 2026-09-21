// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { DISCLAIMER } from "@/content/guide";

export function Disclaimer() {
  return (
    <aside
      role="note"
      style={{
        borderTop: "1px solid var(--hc-border)",
        marginTop: 56,
        paddingTop: 20,
        color: "var(--hc-muted)",
        fontSize: 13,
        lineHeight: 1.6,
        maxWidth: "72ch",
      }}
    >
      <strong style={{ color: "var(--hc-text-2)", fontWeight: 600 }}>Not: </strong>
      {DISCLAIMER}
    </aside>
  );
}

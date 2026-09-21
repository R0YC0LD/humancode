// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchEntry } from "@/content/searchIndex";

const norm = (s: string) => s.toLocaleLowerCase("tr");

export function GuideSearch({ index }: { index: SearchEntry[] }) {
  const [q, setQ] = useState("");
  const term = norm(q.trim());
  const hits = useMemo(() => {
    if (term.length < 2) return [];
    return index
      .map((e) => {
        const t = norm(e.title);
        const score = t.includes(term) ? 2 : norm(e.text).includes(term) ? 1 : 0;
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [index, term]);

  return (
    <div>
      <label htmlFor="guide-q" className="eyebrow" style={{ display: "block", marginBottom: 8 }}>
        Rehberde ara
      </label>
      <input
        id="guide-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ör. bağımlılık, su, ruh duygusu, meslek"
        autoComplete="off"
        style={{
          width: "100%",
          maxWidth: 560,
          height: 52,
          padding: "0 16px",
          background: "var(--hc-surface)",
          border: "1px solid var(--hc-border-strong)",
          color: "var(--hc-text)",
          fontSize: 16,
        }}
      />
      <div role="status" aria-live="polite" style={{ marginTop: 12, minHeight: 20, color: "var(--hc-muted)", fontSize: 13 }}>
        {term.length >= 2 ? (hits.length ? `${hits.length} sonuç` : "Sonuç yok. Başka bir kelime dene.") : ""}
      </div>
      {hits.length > 0 && (
        <ul style={{ display: "grid", gap: 8, maxWidth: 720, marginTop: 8 }}>
          {hits.map(({ e }) => (
            <li key={e.href + e.title}>
              <Link href={e.href} className="card" style={{ display: "flex", gap: 12, padding: "12px 16px", alignItems: "baseline" }}>
                <span className="badge badge-muted">{e.kind}</span>
                <span style={{ fontWeight: 600 }}>{e.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TopRows } from "./TopRows";
import type { TopEntry } from "@/lib/toplist";

/** Ana sayfa: toplist'in ilk 5'i (sayfa açıldıktan sonra yüklenir, ilk açılışı yavaşlatmaz). */
export function TopPreview() {
  const [items, setItems] = useState<TopEntry[] | null>(null);
  useEffect(() => {
    let dead = false;
    fetch("/api/toplist?limit=5")
      .then((r) => r.json())
      .then((j: { enabled: boolean; items: TopEntry[] }) => {
        if (!dead) setItems(j.enabled ? j.items : []);
      })
      .catch(() => {
        if (!dead) setItems([]);
      });
    return () => {
      dead = true;
    };
  }, []);

  return (
    <div style={{ minHeight: 120 }}>
      {items === null ? (
        <p style={{ color: "var(--hc-muted)" }}>Yükleniyor…</p>
      ) : items.length ? (
        <TopRows items={items} compact />
      ) : (
        <p style={{ color: "var(--hc-muted)", maxWidth: "52ch" }}>
          Toplist henüz boş. İki kişiyi karşılaştırdığında sonuç buraya işlenir; sıra uyumluluk skoruna göredir.
        </p>
      )}
      <p style={{ marginTop: 16 }}>
        <Link href="/toplist" className="btn">Tüm toplist</Link>
      </p>
    </div>
  );
}

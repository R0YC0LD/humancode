// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect } from "react";
import { setPresence } from "@/lib/presenceStore";

const VID_KEY = "hc:vid";
const BEAT_MS = 20_000;

function visitorId(): string {
  try {
    let id = window.localStorage.getItem(VID_KEY);
    if (!id || !/^[A-Za-z0-9-]{8,48}$/.test(id)) {
      id = crypto.randomUUID();
      window.localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Nabız gönderir (20 sn'de bir, sekme görünürken) ve anlık kullanıcı sayısını günceller. */
export function LivePresence() {
  useEffect(() => {
    const id = visitorId();
    let timer = 0;
    let stopped = false;

    const beat = async () => {
      if (stopped || document.hidden) return;
      try {
        const r = await fetch("/api/presence", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
          cache: "no-store",
        });
        const j = (await r.json()) as { count: number | null };
        if (typeof j.count === "number") setPresence(j.count);
      } catch {
        /* çevrimdışı ya da depo yok: sayı 1 kalır */
      }
    };

    const schedule = () => {
      timer = window.setTimeout(async () => {
        await beat();
        if (!stopped) schedule();
      }, BEAT_MS);
    };
    const onVis = () => {
      if (!document.hidden) void beat();
    };

    // İlk nabız açılışı yavaşlatmasın diye kısa bir gecikmeyle atılır
    const first = window.setTimeout(() => void beat(), 3000);
    schedule();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopped = true;
      clearTimeout(first);
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
}

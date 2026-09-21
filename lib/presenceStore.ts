// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useSyncExternalStore } from "react";

/** Anlık aktif kullanıcı sayısı: tek kaynak (nabız bileşeni yazar; yağmur ve rozet okur). */
let count = 1;
const listeners = new Set<() => void>();

export function getPresence(): number {
  return count;
}

export function setPresence(n: number) {
  const v = Math.max(1, Math.min(Math.floor(n), 99999));
  if (v === count) return;
  count = v;
  listeners.forEach((l) => l());
}

export function usePresence(): number {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getPresence,
    () => 1,
  );
}

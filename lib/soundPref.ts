// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useSyncExternalStore } from "react";

/** Site sesi tercihi: tek kaynak (başlıktaki düğme, sahne düğmesi, müzik). Varsayılan: açık. */
const KEY = "hc:sound";
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

let cache: boolean | null = null;

export function getSoundOn(): boolean {
  if (cache === null) cache = read();
  return cache;
}

export function setSoundOn(v: boolean) {
  cache = v;
  try {
    window.localStorage.setItem(KEY, v ? "on" : "off");
  } catch {
    /* depolama kapalı olabilir */
  }
  listeners.forEach((l) => l());
}

export function useSoundOn(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getSoundOn,
    () => true,
  );
}

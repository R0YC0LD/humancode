// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useCallback, useEffect, useRef } from "react";
import { getSoundOn, setSoundOn, useSoundOn } from "./soundPref";

export type Sfx = "tik" | "acilis";
const FILES: Record<Sfx, string> = { tik: "/audio/tik.mp3", acilis: "/audio/acilis.mp3" };
/**
 * Sahne sesleri (Web Audio). Ses varsayılan olarak AÇIKTIR; kullanıcı kapatırsa tercih hatırlanır.
 * Tarayıcılar sayfa ilk açıldığında sesi engeller: bağlam askıdaysa ilk tıklama/tuşta otomatik devam eder.
 */
export function useSceneAudio() {
  const on = useSoundOn();
  const ctx = useRef<AudioContext | null>(null);
  const bufs = useRef<Partial<Record<Sfx, AudioBuffer>>>({});

  const ensure = useCallback(() => {
    if (ctx.current) return ctx.current;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const c = new AC();
    ctx.current = c;
    (Object.keys(FILES) as Sfx[]).forEach((k) => {
      fetch(FILES[k])
        .then((r) => r.arrayBuffer())
        .then((ab) => c.decodeAudioData(ab))
        .then((b) => {
          bufs.current[k] = b;
        })
        .catch(() => {});
    });
    return c;
  }, []);

  useEffect(() => {
    if (!on) return;
    const c = ensure();
    if (!c) return;
    void c.resume().catch(() => {});
    if (c.state === "running") return;
    const unlock = () => {
      void c.resume().catch(() => {});
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [on, ensure]);

  const play = useCallback(
    (name: Sfx) => {
      if (!on) return;
      const c = ctx.current;
      const b = bufs.current[name];
      if (!c || !b || c.state !== "running") return;
      const src = c.createBufferSource();
      const g = c.createGain();
      g.gain.value = 0.9;
      src.buffer = b;
      src.connect(g).connect(c.destination);
      src.start();
    },
    [on],
  );

  const toggle = useCallback(() => {
    const n = !getSoundOn();
    setSoundOn(n);
    if (n) void ensure()?.resume().catch(() => {});
  }, [ensure]);

  return { on, play, toggle };
}

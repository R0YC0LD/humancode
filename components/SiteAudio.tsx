// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useRef } from "react";
import { useSoundOn } from "@/lib/soundPref";

/** Dosyalar public/audio altına bu adlarla konur; dosya yoksa ilgili ses sessizce atlanır. */
const MUSIC_SRC = "/audio/arka-plan.mp3";
const CLICK_SRC = "/audio/tikla.mp3";
const MUSIC_VOL = 0.26;
const MUSIC_VOL_SCENE = 0.09;
const CLICK_VOL = 0.5;
const CLICKABLE = "a[href], button, summary, [role='button'], [role='radio']";

/**
 * Site geneli ses: arka plan müziği (döngü) + tıklama sesi.
 * Tarayıcı ilk kullanıcı etkileşimine kadar ses çalmayı engeller; müzik ilk tıklama/tuşta başlar.
 * Sekme gizlenince müzik durur; kod çözme sahnesinde kısılır.
 */
export function SiteAudio() {
  const on = useSoundOn();
  const onRef = useRef(on);
  const music = useRef<HTMLAudioElement | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const click = useRef<AudioBuffer | null>(null);
  const started = useRef(false);
  const inScene = useRef(false);

  useEffect(() => {
    onRef.current = on;
    const m = music.current;
    if (!m || !started.current) return;
    if (on) void m.play().catch(() => {});
    else m.pause();
  }, [on]);

  useEffect(() => {
    // 10 MB'lık parça: src ilk kullanıcı etkileşiminde verilir (sayfa açılışında indirilmez)
    const m = new Audio();
    m.loop = true;
    m.preload = "none";
    m.volume = MUSIC_VOL;
    music.current = m;

    // Tıklama sesi: ham dosya boşta iken indirilir; AudioContext ve çözümleme ilk etkileşimde yapılır
    // (sayfa açılışında ana iş parçacığı meşgul edilmez).
    let raw: ArrayBuffer | null = null;
    const idleTimer = window.setTimeout(() => {
      fetch(CLICK_SRC)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
        .then((b) => {
          raw = b;
        })
        .catch(() => {});
    }, 2500);

    const prime = () => {
      if (!ctx.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AC) ctx.current = new AC();
      }
      const c = ctx.current;
      if (c && raw && !click.current) {
        const b = raw;
        raw = null;
        c.decodeAudioData(b)
          .then((buf) => {
            click.current = buf;
          })
          .catch(() => {});
      }
    };

    const startMusic = () => {
      started.current = true;
      if (!m.src) m.src = MUSIC_SRC;
      if (onRef.current && !document.hidden) void m.play().catch(() => {});
    };

    const onClick = (e: Event) => {
      prime();
      void ctx.current?.resume().catch(() => {});
      if (!started.current) startMusic();
      if (!onRef.current || !click.current || !ctx.current || ctx.current.state !== "running") return;
      const t = e.target as Element | null;
      if (!t?.closest?.(CLICKABLE)) return;
      const src = ctx.current.createBufferSource();
      const g = ctx.current.createGain();
      g.gain.value = CLICK_VOL;
      src.buffer = click.current;
      src.connect(g).connect(ctx.current.destination);
      src.start();
    };
    const onKey = () => {
      if (!started.current) startMusic();
    };
    const onVis = () => {
      if (document.hidden) m.pause();
      else if (started.current && onRef.current) void m.play().catch(() => {});
    };
    const onScene = (e: Event) => {
      inScene.current = !!(e as CustomEvent<boolean>).detail;
      m.volume = inScene.current ? MUSIC_VOL_SCENE : MUSIC_VOL;
    };

    document.addEventListener("pointerdown", prime, { capture: true, passive: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("hc:scene", onScene);
    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener("pointerdown", prime, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("hc:scene", onScene);
      m.pause();
      music.current = null;
      void ctx.current?.close().catch(() => {});
      ctx.current = null;
    };
  }, []);

  return null;
}

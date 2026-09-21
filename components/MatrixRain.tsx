// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useRef } from "react";
import { getPresence } from "@/lib/presenceStore";

export interface RainControl {
  /** Düşüş hızı çarpanı (negatif = geriye/yukarı). */
  speed: number;
  /** Genel opaklık çarpanı 0..1. */
  alpha: number;
  /** 0..1: yağmurun ortadaki şeride toplanma miktarı. */
  gather: number;
}

interface Props {
  control?: React.MutableRefObject<RainControl>;
  /** Sabit kullanım (hero): control yoksa bunlar geçerli. */
  speed?: number;
  /** Başlangıç kalite kademesi (0 tam, 1 orta, 2 düşük) ve başlatmayı ilk boşta ana kadar erteleme. */
  startTier?: 0 | 1 | 2;
  deferStart?: boolean;
  alpha?: number;
  className?: string;
}

const GLYPHS = "0123456789";

/**
 * Canvas 2D rakam yağmuru. DPI duyarlı, sekme gizlenince durur, kare süresi uzarsa
 * kalite kademesini otomatik düşürür (kolon seyrekleşir).
 */
export function MatrixRain({ control, speed = 1, alpha = 1, className, startTier = 0, deferStart = false }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fallback = useRef<RainControl>({ speed, alpha, gather: 0 });

  useEffect(() => {
    fallback.current.speed = speed;
    fallback.current.alpha = alpha;
  }, [speed, alpha]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctl = control ?? fallback;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let font = 16;
    let cols: { y: number; v: number }[] = [];
    let liveCols = new Set<number>();
    let tier: number = startTier; // 0 = tam, 1 = orta, 2 = düşük
    const slow: number[] = [];
    let last = performance.now();

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--hc-accent").trim() || "#ff5f56";
    const bg = "0,0,0";
    const monoVar = styles.getPropertyValue("--font-jbmono").trim();
    const family = `${monoVar ? monoVar + ", " : ""}ui-monospace, monospace`;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${bg})`;
      ctx.fillRect(0, 0, w, h);
      const mobile = w < 640;
      font = mobile ? 18 : 16;
      const n = Math.ceil(w / font);
      cols = Array.from({ length: n }, () => ({
        y: Math.random() * -60,
        v: 0.35 + Math.random() * 0.9,
      }));
      // ~her 9. sütun canlı sayaç sütunu (kalite kademesinde çizilen sütunlarla çakışsın diye step'e hizalı)
      const every = Math.max(6, Math.round(n / 7));
      liveCols = new Set(Array.from({ length: Math.floor(n / every) }, (_, k) => Math.floor(every / 2) + k * every));
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 100);
      last = now;

      // kalite kademesi: son 30 karenin ortalaması 24 ms'yi aşarsa düşür
      slow.push(dt);
      if (slow.length > 30) {
        slow.shift();
        const avg = slow.reduce((a, b) => a + b, 0) / slow.length;
        if (avg > 24 && tier < 2) {
          tier++;
          slow.length = 0;
        }
      }
      const step = tier === 0 ? 1 : tier === 1 ? 2 : 3; // her step'inci kolon çizilir

      const { speed: sp, alpha: al, gather } = ctl.current;
      ctx.fillStyle = `rgba(${bg},${0.08 + (tier > 0 ? 0.04 : 0)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${font}px ${family}`;
      ctx.textAlign = "center";

      const cx = w / 2;
      const band = w * (0.5 - 0.32 * gather);
      const rows = h / font;

      for (let i = 0; i < cols.length; i++) {
        if (i % step !== 0 && !liveCols.has(i)) continue; // düşük kalitede sayaç sütunları yine çizilir
        const col = cols[i];
        const x = i * font + font / 2;
        const inBand = Math.abs(x - cx) <= band;
        col.y += col.v * sp * (dt / 16) * 0.6 * (1 - 0.6 * gather);
        if (col.y * font > h + 60 || col.y < -70) {
          col.y = sp >= 0 ? Math.random() * -20 : rows + Math.random() * 20;
          col.v = 0.35 + Math.random() * 0.9;
        }
        if (!inBand && gather > 0.05 && Math.random() < gather * 0.9) continue;
        const y = col.y * font;
        if (liveCols.has(i)) {
          // Canlı sütun: anlık aktif kullanıcı sayısının rakamları aşağı akar (accent renk, biraz büyük)
          const live = String(getPresence());
          const idx = Math.floor(col.y);
          ctx.font = `700 ${Math.round(font * 1.3)}px ${family}`;
          ctx.fillStyle = hexA(accent, Math.min(1, 1.0 * al + 0.2));
          ctx.shadowColor = accent;
          ctx.shadowBlur = 10;
          ctx.fillText(live[((idx % live.length) + live.length) % live.length], x, y);
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${0.55 * al})`;
          const j = idx - 1;
          ctx.fillText(live[((j % live.length) + live.length) % live.length], x, y - font * 1.3);
          ctx.font = `${font}px ${family}`;
          continue;
        }
        const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        // parlak baş
        ctx.fillStyle = `rgba(255,255,255,${0.9 * al})`;
        ctx.fillText(g, x, y);
        // önceki karakter accent renkte
        ctx.fillStyle = hexA(accent, 0.75 * al);
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, y - font);
      }
    };

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    // İlk boyama (LCP) tamamlanana kadar bekle: yağmur süs, içerik önce gelir.
    let startTimer = 0;
    if (deferStart) {
      running = false;
      startTimer = window.setTimeout(() => {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }, 900);
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      running = false;
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [control, startTier, deferStart]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function hexA(hex: string, a: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return `rgba(255,95,86,${a})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MatrixRain, type RainControl } from "./MatrixRain";
import {
  Pyramid,
  PyramidGroup,
  cellCenter,
  type PyramidCellView,
} from "./Pyramid";
import { HANELER } from "@/content/haneler";
import { synergy } from "@/lib/numerology";
import { useSceneAudio } from "@/lib/useSceneAudio";
import { cellVisual, linkProgress, mergeVisual, PAIR, SINGLE, type Timeline } from "@/lib/scene";

interface Props {
  pinA: number[];
  pinB?: number[];
  labelA?: string;
  labelB?: string;
  onDone: (skipped: boolean) => void;
}

const NAMES = HANELER.map((h) => h.ad);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

// Çift sahne yerleşimi (tek SVG içinde; hayalet rakamlar bu koordinatlarla uçar)
const OFF_A = { x: 0, y: 24 };
const OFF_B = { x: 540, y: 24 };
const OFF_S = { x: 270, y: 404 };

export function DecodeScene({ pinA, pinB, labelA, labelB, onDone }: Props) {
  const reduce = useReducedMotion();
  const pair = !!pinB;
  const tl: Timeline = pair ? PAIR : SINGLE;
  const [t, setT] = useState(0);
  const rain = useRef<RainControl>({ speed: 1, alpha: 1, gather: 0 });
  const done = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const audio = useSceneAudio();
  const soundPrev = useRef(0);
  const openPlayed = useRef(false);

  const sh = useMemo(() => (pinB ? synergy(pinA, pinB) : []), [pinA, pinB]);
  const totalMs = reduce ? (pair ? 9 * 150 + 8 * 150 + 700 : 9 * 150 + 700) : tl.total;

  const finish = (skipped: boolean) => {
    if (done.current) return;
    done.current = true;
    onDone(skipped);
  };

  // zaman sürücüsü: sekme gizlenince durur (dt sınırlı)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      acc += dt;
      setT(acc);
      if (acc >= totalMs) {
        finish(false);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMs]);

  // Sahne sürerken arka plan müziği kısılır (hane sesleri öne çıksın)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("hc:scene", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("hc:scene", { detail: false }));
    };
  }, []);

  // ESC = atla; kaydırma kilidi; odak
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(true);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // yağmur evreleri (ref güncellemesi render dışında, efektte yapılır)
  useEffect(() => {
    if (reduce) return;
    const c = rain.current;
    if (t < tl.rainEnd) {
      c.speed = 1;
      c.alpha = 1;
      c.gather = 0;
    } else if (t < tl.condenseEnd) {
      const u = (t - tl.rainEnd) / (tl.condenseEnd - tl.rainEnd);
      c.speed = 1 - 0.6 * u;
      c.gather = u;
      c.alpha = 1;
    } else if (t < tl.openAt) {
      c.speed = 0.4;
      c.gather = 1;
      c.alpha = 0.85;
    } else {
      const u = clamp01((t - tl.openAt) / (tl.total - tl.openAt));
      c.speed = -1.4;
      c.gather = 1;
      c.alpha = 1 - u;
    }
  }, [t, reduce, tl]);

  // hücre görünümleri
  const buildCells = (pin: number[], labels: boolean): PyramidCellView[] =>
    pin.map((d, i) => {
      if (reduce) {
        const o = clamp01((t - i * 150) / 150);
        return { value: d, state: o > 0 ? "locked" : "hidden", since: 1, flash: false, scale: 1, chars: 99, opacity: o };
      }
      return cellVisual(d, i, t, tl.lockAt[i], tl.scrambleMs, labels ? NAMES[i].length : 0);
    });

  const cellsA = buildCells(pinA, !pair);
  const cellsB = pinB ? buildCells(pinB, false) : [];

  const lockedNow = reduce ? 0 : tl.lockAt.filter((l) => t >= l).length;

  const links = !pair && !reduce ? pinA.map((_, i) => (HANELER[i].deps.length ? linkProgress(t, tl.lockAt[i]) : 0)) : undefined;

  const opening = !reduce && t >= tl.openAt;
  const glow = opening ? clamp01((t - tl.openAt) / 300) : 0;
  const ca = reduce ? 0 : clamp01((t - tl.rainEnd) / 800) * (opening ? 1 - clamp01((t - tl.openAt) / 400) : 1);
  const scanY = !reduce && t >= tl.rainEnd && t < tl.openAt ? (((t - tl.rainEnd) / 1500) % 1) * 100 : -10;
  const lockedCount = reduce ? Math.min(9, Math.floor(t / 150) + 1) : lockedNow;

  const synCells: PyramidCellView[] = [];
  const ghosts: { x: number; y: number; v: number; key: string }[] = [];
  if (pair && pinB) {
    const mt = { mergeAt: PAIR.mergeAt!, mergeStep: PAIR.mergeStep!, mergeTravel: PAIR.mergeTravel!, mergeSettle: PAIR.mergeSettle! };
    for (let k = 0; k < 8; k++) {
      if (reduce) {
        const o = clamp01((t - (9 * 150 + k * 150)) / 150);
        synCells.push({ value: sh[k], state: o > 0 ? "locked" : "hidden", since: 1, flash: false, scale: 1, chars: 0, opacity: o });
        continue;
      }
      const mv = mergeVisual(sh[k], k, t, mt, 0);
      synCells.push(mv.cell);
      if (mv.ghosts) {
        const s = cellCenter(k, false);
        const a = cellCenter(k, false);
        const tx = OFF_S.x + s.x;
        const ty = OFF_S.y + s.y;
        ghosts.push({ key: `a${k}`, v: pinA[k], x: OFF_A.x + a.x + (tx - (OFF_A.x + a.x)) * mv.travel, y: OFF_A.y + a.y + (ty - (OFF_A.y + a.y)) * mv.travel });
        ghosts.push({ key: `b${k}`, v: pinB[k], x: OFF_B.x + a.x + (tx - (OFF_B.x + a.x)) * mv.travel, y: OFF_B.y + a.y + (ty - (OFF_B.y + a.y)) * mv.travel });
      }
    }
  }

  // Ses: her hane (ve çiftte her sinerji hanesi) belirdikçe "tik", kod tamamlanınca "açılış".
  const shownCount =
    (reduce ? cellsA.filter((c) => c.state === "locked").length : lockedNow) +
    synCells.filter((c) => c.state === "locked").length;
  const opened = reduce ? t >= totalMs - 700 : t >= tl.openAt;
  useEffect(() => {
    if (shownCount > soundPrev.current) audio.play("tik");
    soundPrev.current = shownCount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownCount]);
  useEffect(() => {
    if (opened && !openPlayed.current) {
      openPlayed.current = true;
      audio.play("acilis");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <div className="scene-root" role="dialog" aria-modal="true" aria-label="Kod çözülüyor">
      {!reduce && (
        <div style={{ position: "absolute", inset: 0, opacity: opening ? 1 - clamp01((t - tl.openAt) / (tl.total - tl.openAt)) * 0.6 : 1 }}>
          <MatrixRain control={rain} />
        </div>
      )}
      {!reduce && <div className="scene-vignette" />}
      {!reduce && scanY >= 0 && <div className="scene-scanline" style={{ top: `${scanY}%` }} />}

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 16px 32px" }}>
        <div className="mono" style={{ letterSpacing: "0.3em", fontSize: 12, color: "var(--hc-accent)", marginBottom: 16, textTransform: "uppercase" }}>
          {opening || lockedCount >= 9 ? "Kod çözüldü" : "Kod çözülüyor"}
          <span className="mono" style={{ color: "var(--hc-muted)", marginLeft: 14 }}>
            {String(Math.min(lockedCount, 9)).padStart(2, "0")}/09
          </span>
        </div>

        <div
          style={{
            width: pair ? "min(96vw, 1100px)" : "min(92vw, 640px)",
            filter: ca > 0 ? `drop-shadow(${1.6 * ca}px 0 rgba(199,47,72,0.35)) drop-shadow(${-1.6 * ca}px 0 rgba(46,31,42,0.2))` : undefined,
          }}
        >
          {!pair ? (
            <Pyramid cells={cellsA} names={NAMES} links={links} glow={glow} title="Kod çözümü" />
          ) : (
            <svg viewBox="0 0 1040 720" role="group" aria-label="İki kodun çözümü ve sinerji" style={{ width: "100%", overflow: "visible" }}>
              <text x={OFF_A.x + 250} y={12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--hc-muted)" letterSpacing={2}>
                {labelA ?? "A"}
              </text>
              <text x={OFF_B.x + 250} y={12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--hc-muted)" letterSpacing={2}>
                {labelB ?? "B"}
              </text>
              <text x={OFF_S.x + 250} y={OFF_S.y - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--hc-accent)" letterSpacing={2} opacity={t >= PAIR.mergeAt! || reduce ? 1 : 0}>
                SİNERJİ
              </text>
              <g transform={`translate(${OFF_A.x} ${OFF_A.y})`}>
                <PyramidGroup cells={cellsA} showLabels={false} glow={glow} opacity={opening ? 0.45 : 1} idPrefix="a" />
              </g>
              <g transform={`translate(${OFF_B.x} ${OFF_B.y})`}>
                <PyramidGroup cells={cellsB} showLabels={false} glow={glow} opacity={opening ? 0.45 : 1} idPrefix="b" />
              </g>
              <g transform={`translate(${OFF_S.x} ${OFF_S.y})`}>
                <PyramidGroup cells={synCells} count={8} showLabels={false} glow={glow} idPrefix="s" />
              </g>
              {ghosts.map((g) => (
                <text key={g.key} x={g.x} y={g.y + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={32} fill="var(--hc-accent)" style={{ filter: "drop-shadow(0 0 6px var(--hc-accent))" }}>
                  {g.v}
                </text>
              ))}
            </svg>
          )}
        </div>
      </div>

      <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 8, zIndex: 2 }}>
        <button type="button" className="btn" aria-pressed={audio.on} onClick={audio.toggle}>
          Ses: {audio.on ? "açık" : "kapalı"}
        </button>
        <button type="button" className="btn btn-primary" ref={skipRef} onClick={() => finish(true)}>
          Atla (Esc)
        </button>
      </div>
      <span className="sr-only" role="status">
        {t >= totalMs - 100 ? "Kod çözüldü" : "Kod çözülüyor"}
      </span>
    </div>
  );
}

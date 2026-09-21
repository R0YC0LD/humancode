// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import type { CellState } from "@/lib/scene";
import { HANELER } from "@/content/haneler";

export interface PyramidCellView {
  value: number | null;
  state: CellState;
  since?: number;
  flash?: boolean;
  scale?: number;
  chars?: number;
  opacity?: number;
}

/** (sütun, satır): h1..h5 üstte, h6 ve h7 ikinci sırada, h8 üçüncü, h9 ayrı. */
export const POS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [1, 1],
  [3, 1],
  [2, 2],
  [2, 3],
];

export const CELL_W = 80;
export const CELL_H = 64;
const COL_PITCH = 100;

function rowPitch(showLabels: boolean) {
  return showLabels ? 100 : 80;
}

export function groupSize(showLabels: boolean, count: number) {
  const rows = count === 9 ? 3 : 2;
  return { w: 500, h: rows * rowPitch(showLabels) + CELL_H + (showLabels ? 34 : 0) };
}

export function cellOrigin(i: number, showLabels: boolean) {
  const [c, r] = POS[i];
  return { x: c * COL_PITCH + 10, y: r * rowPitch(showLabels) + 2 };
}

export function cellCenter(i: number, showLabels: boolean) {
  const o = cellOrigin(i, showLabels);
  return { x: o.x + CELL_W / 2, y: o.y + CELL_H / 2 };
}

/** Etiketi iki satıra bölmek için, ortaya en yakın boşluğun indeksi (yoksa -1). */
export function splitPoint(label: string): number {
  let best = -1;
  for (let i = 0; i < label.length; i++) {
    if (label[i] === " " && (best < 0 || Math.abs(i - label.length / 2) < Math.abs(best - label.length / 2))) best = i;
  }
  return best;
}

export function staticCells(pin: number[]): PyramidCellView[] {
  return pin.map((v) => ({ value: v, state: "locked" as const, since: 1, flash: false, scale: 1, chars: 99 }));
}

interface GroupProps {
  cells: PyramidCellView[];
  names?: string[];
  count?: 8 | 9;
  showLabels?: boolean;
  /** Hedef hane başına çizgi ilerlemesi (0..1). */
  links?: number[];
  selected?: number | null;
  onSelect?: (i: number) => void;
  /** Tüm piramidin parlaklığı 0..1. */
  glow?: number;
  /** Solukluk (0..1). */
  opacity?: number;
  idPrefix?: string;
  /** Hane etiketi öneki: pin için "h", sinerji için "sH". */
  tag?: string;
  /** Verilirse her hane bir bağlantı olur: href = hrefPrefix + indeks (sunucu bileşenlerinden işlev geçmeden gezinme). */
  hrefPrefix?: string;
}

/** Piramidi <g> olarak çizer; bir <svg> içine yerleştirilir. */
export function PyramidGroup({
  cells,
  names,
  count = 9,
  showLabels = true,
  links,
  selected,
  onSelect,
  glow = 0,
  opacity = 1,
  idPrefix = "p",
  tag = "h",
  hrefPrefix,
}: GroupProps) {
  const interactive = !!onSelect;
  return (
    <g opacity={opacity}>
      {links &&
        Array.from({ length: count }, (_, i) => {
          const p = links[i] ?? 0;
          if (p <= 0) return null;
          return HANELER[i].deps.map((d) => {
            const a = cellCenter(d, showLabels);
            const b = cellCenter(i, showLabels);
            return (
              <path
                key={`${i}-${d}`}
                d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
                fill="none"
                stroke="var(--hc-accent)"
                strokeWidth={1.4}
                strokeLinecap="round"
                opacity={p >= 1 ? 0.28 : 0.9}
                style={{ filter: "drop-shadow(0 0 3px var(--hc-accent))" }}
              />
            );
          });
        })}
      {Array.from({ length: count }, (_, i) => {
        const c = cells[i];
        if (!c) return null;
        const o = cellOrigin(i, showLabels);
        const cx = o.x + CELL_W / 2;
        const cy = o.y + CELL_H / 2;
        const isLast = i === 8;
        const label = names?.[i] ?? "";
        const shown = c.state === "locked" ? label.slice(0, c.chars ?? label.length) : "";
        const isSel = selected === i;
        const wave = c.state === "locked" && (c.since ?? 1) < 1 ? (c.since ?? 1) : null;
        const stroke = isSel
          ? "var(--hc-accent)"
          : c.state === "locked"
            ? isLast
              ? "var(--hc-accent)"
              : "var(--hc-border-strong)"
            : "var(--hc-border)";
        const digitFill = c.flash ? "var(--hc-bg)" : c.state === "scramble" ? "var(--hc-muted)" : "var(--hc-text)";
        const body = (
          <>
            {wave !== null && (
              <rect
                x={o.x - wave * 26}
                y={o.y - wave * 26}
                width={CELL_W + wave * 52}
                height={CELL_H + wave * 52}
                rx={2 + wave * 6}
                fill="none"
                stroke="var(--hc-accent)"
                strokeWidth={1.2}
                opacity={(1 - wave) * 0.8}
              />
            )}
            <g
              transform={`translate(${cx} ${cy}) scale(${c.scale ?? 1}) translate(${-cx} ${-cy})`}
              style={glow > 0 ? { filter: `drop-shadow(0 0 ${6 + glow * 14}px rgba(255,95,86,${0.25 + glow * 0.6}))` } : undefined}
            >
              <rect
                x={o.x}
                y={o.y}
                width={CELL_W}
                height={CELL_H}
                rx={2}
                fill={c.flash ? "var(--hc-accent)" : isLast && c.state === "locked" ? "var(--hc-accent-soft)" : "var(--hc-surface)"}
                stroke={stroke}
                strokeWidth={isSel ? 2 : 1}
                strokeDasharray={isLast && c.state !== "locked" ? "3 3" : undefined}
              />
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={36}
                fontWeight={500}
                fill={digitFill}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {c.value === null ? "" : c.value}
              </text>
              {c.state === "hidden" && (
                <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--hc-border-strong)">
                  ·
                </text>
              )}
              <text x={o.x + 6} y={o.y + 13} fontFamily="var(--font-mono)" fontSize={9} fill="var(--hc-muted)" opacity={0.7}>
                {tag}{i + 1}
              </text>
            </g>
            {showLabels && (
              <text
                x={cx}
                y={o.y + CELL_H + 14}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize={10}
                fill="var(--hc-muted)"
                style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                {(() => {
                  const cut = splitPoint(label);
                  if (cut < 0) return shown;
                  return (
                    <>
                      <tspan x={cx}>{shown.slice(0, cut)}</tspan>
                      <tspan x={cx} dy={12}>
                        {shown.slice(cut + 1)}
                      </tspan>
                    </>
                  );
                })()}
              </text>
            )}
          </>
        );
        if (hrefPrefix) {
          return (
            <a key={`${idPrefix}-${i}`} href={`${hrefPrefix}${i}`} aria-label={`${tag === "h" ? "Hane" : "Sinerji hanesi"} ${i + 1}${label ? `: ${label}` : ""}, değer ${c.value ?? "?"}`} style={{ cursor: "pointer" }}>
              <g opacity={c.opacity ?? 1}>{body}</g>
            </a>
          );
        }
        return interactive ? (
          <g
            key={`${idPrefix}-${i}`}
            opacity={c.opacity ?? 1}
            role="button"
            tabIndex={0}
            aria-label={`${tag === "h" ? "Hane" : "Sinerji hanesi"} ${i + 1}${label ? `: ${label}` : ""}, değer ${c.value ?? "?"}`}
            aria-pressed={isSel}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect?.(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(i);
              }
            }}
          >
            {body}
          </g>
        ) : (
          <g key={`${idPrefix}-${i}`} opacity={c.opacity ?? 1}>
            {body}
          </g>
        );
      })}
    </g>
  );
}

interface PyramidProps extends GroupProps {
  className?: string;
  title?: string;
}

export function Pyramid({ className, title, ...rest }: PyramidProps) {
  const showLabels = rest.showLabels ?? true;
  const { w, h } = groupSize(showLabels, rest.count ?? 9);
  return (
    <svg
      viewBox={`-6 -8 ${w + 12} ${h + 16}`}
      className={className}
      role="group"
      aria-label={title ?? "HumanCODE piramidi"}
      style={{ overflow: "visible" }}
    >
      <PyramidGroup {...rest} />
    </svg>
  );
}

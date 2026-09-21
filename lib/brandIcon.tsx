// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { ImageResponse } from "next/og";

/** HumanCODE simgesi (9 kutunun sadeleşmiş piramidi) — PWA ve Apple ikonları için PNG üretir. */
export function brandIcon(size: number, maskable = false) {
  const pad = maskable ? size * 0.2 : size * 0.12;
  const inner = size - pad * 2;
  const box = inner / 3.6;
  const gap = box * 0.2;
  const ACCENT = "#ff5f56";
  const cell = (x: number, y: number, fill: string, stroke?: string) => (
    <div
      key={`${x}-${y}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: box,
        height: box,
        background: stroke ? "transparent" : fill,
        border: stroke ? `${Math.max(2, size / 64)}px solid ${stroke}` : "none",
        display: "flex",
      }}
    />
  );
  const w = box * 3 + gap * 2;
  const x0 = (size - w) / 2;
  const y0 = (size - (box * 3 + gap * 2)) / 2;
  return new ImageResponse(
    (
      <div style={{ width: size, height: size, background: "#000", display: "flex", position: "relative", borderRadius: maskable ? 0 : size * 0.18 }}>
        {[0, 1, 2].map((i) => cell(x0 + i * (box + gap), y0, ACCENT))}
        {[0, 1].map((i) => cell(x0 + box / 2 + gap / 2 + i * (box + gap), y0 + box + gap, "#fff"))}
        {cell(x0 + box + gap, y0 + 2 * (box + gap), ACCENT, ACCENT)}
      </div>
    ),
    { width: size, height: size },
  );
}

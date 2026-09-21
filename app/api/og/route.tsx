// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { BAND_INFO } from "@/content/haneler";
import { computeScore, isConsistentPin, pinFromString, type Pin } from "@/lib/numerology";

const W = 1200;
const H = 630;
const ACCENT = "#ff5f56";

const POS: [number, number][] = [
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

function Pyr({ pin, x, y, box, count = 9 }: { pin: number[]; x: number; y: number; box: number; count?: number }) {
  const pitch = box + 14;
  return (
    <div style={{ display: "flex", position: "absolute", left: x, top: y }}>
      {pin.slice(0, count).map((v, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            position: "absolute",
            left: POS[i][0] * pitch,
            top: POS[i][1] * pitch,
            width: box,
            height: box,
            alignItems: "center",
            justifyContent: "center",
            background: i === 8 ? "rgba(255,95,86,0.12)" : "#111",
            border: `2px solid ${i === 8 ? ACCENT : "rgba(255,255,255,0.3)"}`,
            color: "#fff",
            fontSize: box * 0.55,
            fontWeight: 700,
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

function Frame({ children, foot }: { children: React.ReactNode; foot: string }) {
  return (
    <div style={{ display: "flex", position: "relative", width: W, height: H, background: "#000", color: "#fff" }}>
      <div style={{ display: "flex", position: "absolute", left: 56, top: 44, fontSize: 34, fontWeight: 700, letterSpacing: 6 }}>
        <span>Human</span>
        <span style={{ color: ACCENT }}>CODE</span>
      </div>
      {children}
      <div style={{ display: "flex", position: "absolute", left: 56, bottom: 40, fontSize: 24, color: "#bbb", letterSpacing: 2 }}>{foot}</div>
    </div>
  );
}

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const opts = { width: W, height: H, headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" } };

  const a = pinFromString(q.get("a"));
  const b = pinFromString(q.get("b"));
  if (a && b && isConsistentPin(a) && isConsistentPin(b)) {
    const r = computeScore(a, b);
    const band = BAND_INFO[r.band];
    return new ImageResponse(
      (
        <Frame foot="Sinerji Çözümü · numerolojiye dayanır, eğlence amaçlıdır">
          <Pyr pin={r.sh} count={8} x={590} y={150} box={96} />
          <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 56, top: 190 }}>
            <div style={{ display: "flex", fontSize: 200, fontWeight: 700, lineHeight: 1 }}>{r.score}</div>
            <div style={{ display: "flex", fontSize: 40, color: ACCENT, marginTop: 8 }}>{band.ad}</div>
            <div style={{ display: "flex", fontSize: 26, color: "#bbb", marginTop: 28 }}>{`${a.join("")} × ${b.join("")}`}</div>
          </div>
        </Frame>
      ),
      opts,
    );
  }

  const p: Pin | null = pinFromString(q.get("pin"));
  if (p && isConsistentPin(p)) {
    return new ImageResponse(
      (
        <Frame foot="Kod Çözümü · Kodunu çöz.">
          <Pyr pin={p} x={342} y={110} box={92} />
          <div style={{ display: "flex", position: "absolute", right: 56, top: 52, fontSize: 40, color: ACCENT, letterSpacing: 6 }}>{p.join("")}</div>
        </Frame>
      ),
      opts,
    );
  }

  return new ImageResponse(
    (
      <Frame foot="Kodunu çöz.">
        <Pyr pin={[2, 2, 9, 4, 6, 4, 2, 6, 8]} x={342} y={110} box={92} />
      </Frame>
    ),
    opts,
  );
}

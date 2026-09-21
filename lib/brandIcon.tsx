// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { ImageResponse } from "next/og";
import { LOGO_DATA_URI } from "@/lib/logoData";

/** HumanCODE logosu — PWA ve Apple ikonları için PNG üretir (beyaz zemin, ortalanmış logo). */
export function brandIcon(size: number, maskable = false) {
  const pad = maskable ? size * 0.16 : size * 0.06;
  const inner = size - pad * 2;
  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: maskable ? 0 : size * 0.2,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_DATA_URI} width={inner} height={inner} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}

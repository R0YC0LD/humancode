// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useState } from "react";
import { loadSavedBirth } from "@/lib/birthForm";
import { computePin, parseBirth, type Pin } from "@/lib/numerology";

/** Kayıtlı (bu cihazda hesaplanmış) kodda bu rakam var mı / yok mu. Kod yoksa hiçbir şey göstermez. */
export function MyCodeBadge({ digit }: { digit: number }) {
  const [pin, setPin] = useState<Pin | null>(null);
  useEffect(() => {
    const b = parseBirth(loadSavedBirth());
    if (b) {
      try {
        setPin(computePin(b));
      } catch {
        /* geçersiz kayıt */
      }
    }
  }, []);
  if (!pin) return null;
  const n = pin.filter((x) => x === digit).length;
  return n > 0 ? (
    <span className="badge badge-ok" title="Bu cihazda hesapladığın koda göre">
      Kodunda var ×{n}
    </span>
  ) : (
    <span className="badge badge-muted" title="Bu cihazda hesapladığın koda göre">
      Kodunda yok
    </span>
  );
}

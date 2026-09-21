// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useMemo } from "react";
import { CodeResult } from "./CodeResult";
import { codeSlots } from "./CodeSlots";
import { buildPortrait } from "@/lib/portrait";
import { buildSummary } from "@/lib/summary";
import { buildHaneDetails } from "@/lib/codeView";
import type { BirthDate, Pin, Ymd } from "@/lib/numerology";

/** İstemcide hesaplanan kod için sonuç sayfası (/hesapla). Ayrı parça olarak, gerektiğinde yüklenir. */
export default function CodeResultLive({
  pin,
  birth,
  today,
  name,
  onReplay,
}: {
  pin: Pin;
  birth: BirthDate | null;
  today: Ymd | null;
  name?: string;
  onReplay: () => void;
}) {
  const built = useMemo(
    () => ({
      imza: buildPortrait(pin).imza,
      summary: buildSummary(pin),
      details: buildHaneDetails(pin),
      slots: codeSlots(pin, birth),
    }),
    [pin, birth],
  );
  return <CodeResult pin={pin} birth={birth} today={today} name={name} onReplay={onReplay} {...built} />;
}

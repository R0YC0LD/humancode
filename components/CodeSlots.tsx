// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { ReactNode } from "react";
import { HaneCards } from "./HaneCards";
import { DigitsInCode } from "./DigitsInCode";
import { PortraitSections } from "./PortraitSections";
import { Glossary } from "./Glossary";
import { GLOSSARY_CODE } from "@/content/glossary";
import { buildPortrait } from "@/lib/portrait";
import type { BirthDate, Pin } from "@/lib/numerology";

export interface CodeSlots {
  hane: ReactNode;
  rakamlar: ReactNode;
  portre: ReactNode;
  glossary: ReactNode;
}

/**
 * Sonuç sayfasının ağır, etkileşimsiz bölümleri. /kod sayfasında sunucuda üretilir (istemciye JS
 * gitmez); /hesapla'da istemcide üretilir.
 */
export function codeSlots(pin: Pin, birth?: BirthDate | null): CodeSlots {
  return {
    hane: <HaneCards pin={pin} birth={birth} />,
    rakamlar: <DigitsInCode pin={pin} />,
    portre: <PortraitSections portrait={buildPortrait(pin)} />,
    glossary: <Glossary terms={GLOSSARY_CODE} />,
  };
}

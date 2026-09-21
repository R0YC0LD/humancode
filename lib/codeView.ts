// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { getDigit } from "@/content/digits";
import { getToolbox } from "@/content/attributes";
import { ELEMENT_INFO } from "@/content/elements";
import { HANELER } from "@/content/haneler";
import type { Pin } from "./numerology";

/** Piramitte bir haneye tıklayınca yanda gösterilen, önceden hesaplanmış küçük veri. */
export interface HaneDetail {
  rakam: number;
  arketip: string;
  elementAd: string;
  metin: string;
}

export function buildHaneDetails(pin: Pin): HaneDetail[] {
  return HANELER.map((h, i) => {
    const d = getDigit(pin[i]);
    return {
      rakam: d.n,
      arketip: getToolbox(d.n).arketip,
      elementAd: ELEMENT_INFO[d.element].ad,
      metin: `${h.lead} ${d.hane[i]}`,
    };
  });
}

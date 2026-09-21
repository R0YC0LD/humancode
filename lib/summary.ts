// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { getToolbox } from "@/content/attributes";
import { digitCounts } from "./portrait";
import { dominantElement, elementCounts, type ElementKey, type Pin } from "./numerology";
import { pickN, seedOf } from "./variety";

export interface Highlight {
  etiket: string;
  deger: string;
  rakam: number;
}

export interface Summary {
  guclu: Highlight[];
  dikkat: Highlight[];
  baskinElement: ElementKey;
  /** Kodda en çok geçen rakam ve sayısı (beraberlikte en küçük rakam); tek geçenler için de doldurulur. */
  enCok: { rakam: number; adet: number };
  eksikSayisi: number;
  /** Tek cümlelik "en dikkat çekici özellik". */
  dikkatCekici: string;
}

const ROLES: { etiket: string; i: number }[] = [
  { etiket: "Dışarıda", i: 0 },
  { etiket: "İçeride", i: 5 },
  { etiket: "Ruhunda", i: 7 },
];

/** "Kısaca sen": her katmandan (h1, h6, h8) bir güçlü ve bir dikkat noktası; deterministik. */
export function buildSummary(pin: Pin): Summary {
  const seed = seedOf(pin);
  const used = new Set<string>();
  const take = (list: string[], salt: number) => {
    const cand = pickN(list, list.length, seed, salt).find((x) => !used.has(x)) ?? list[0];
    used.add(cand);
    return cand;
  };
  const guclu = ROLES.map((r, k) => ({
    etiket: r.etiket,
    rakam: pin[r.i],
    deger: take(getToolbox(pin[r.i]).aktif, 10 + k),
  }));
  const dikkat = ROLES.map((r, k) => ({
    etiket: r.etiket,
    rakam: pin[r.i],
    deger: take(getToolbox(pin[r.i]).reaktif, 20 + k),
  }));

  const counts = digitCounts(pin);
  const max = Math.max(...counts);
  const enCokRakam = counts.indexOf(max) + 1;
  const missing = counts.filter((c) => c === 0).length;
  const arketip = getToolbox(enCokRakam).arketip;

  let dikkatCekici: string;
  if (max >= 4) dikkatCekici = `${enCokRakam} rakamı kodunda ${max} kez geçiyor: ${arketip} teması hayatında baskın bir ses.`;
  else if (max === 3) dikkatCekici = `${enCokRakam} rakamı üç kez geçiyor: ${arketip} teması kodunun ana rengi.`;
  else if (missing >= 5) dikkatCekici = `Kodunda ${missing} rakam hiç geçmiyor: dar ama yoğun bir palet.`;
  else dikkatCekici = "Rakamlar dengeli dağılmış: tek bir tema yerine birkaç ton arasında gidip geliyorsun.";

  return {
    guclu,
    dikkat,
    baskinElement: dominantElement(pin),
    enCok: { rakam: enCokRakam, adet: max },
    eksikSayisi: missing,
    dikkatCekici,
  };
}

/** Element sayımı kısayolu (arayüzde tekrar hesaplamamak için). */
export function elementsOf(pin: Pin) {
  return elementCounts(pin);
}

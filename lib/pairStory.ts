// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { getToolbox } from "@/content/attributes";
import { ATTITUDE, OUTCOMES, PERSON_LINES, SCIENCE, TOGETHER, type RelKey } from "@/content/pairVoices";
import { DIGIT_POINTS, elementOf, synergy, type Pin } from "./numerology";
import { relationOf } from "./portrait";
import { fill } from "./turkish";
import { pickN } from "./variety";

export interface AreaStory {
  index: number;
  digitA: number;
  digitB: number;
  sh: number;
  points: number;
  tone: "iyi" | "gergin";
  kisiA: string;
  kisiB: string;
  guc: string;
  dikkat: string;
  tutum: string;
  nedenler: string[];
  bilim: { konu: string; not: string; kaynak: string };
}

/** İki rakamın o alandaki ilişkisi (aynı rakam ayrı ele alınır). */
export function relKey(da: number, db: number): RelKey {
  return da === db ? "ayniRakam" : relationOf(elementOf(da), elementOf(db));
}

const upFirst = (s: string) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

/**
 * Bir alan için, iki kişinin adlarını kullanan, tutarlı ve alana özgü anlatım.
 * Deterministiktir: aynı iki kod ve aynı adlar → aynı metin.
 */
export function buildAreaStory(i: number, a: Pin, b: Pin, names: { A: string; B: string }, seed: number): AreaStory {
  const da = a[i];
  const db = b[i];
  const sh = synergy(a, b)[i];
  const points = DIGIT_POINTS[sh];
  const tone: "iyi" | "gergin" = points >= 60 ? "iyi" : "gergin";
  const ta = getToolbox(da);
  const tb = getToolbox(db);
  const out = OUTCOMES[i][tone];

  const xa = pickN(ta.aktif, 1, seed, i * 8 + 1)[0];
  const yb = pickN(tone === "iyi" ? tb.aktif : tb.reaktif, 1, seed, i * 8 + 2)[0];
  const xb = pickN(tb.aktif, 1, seed, i * 8 + 3)[0];
  const ya = pickN(tone === "iyi" ? ta.aktif : ta.reaktif, 1, seed, i * 8 + 4)[0];
  const tail = tone === "iyi" ? "yanı" : "eğilimi";

  const nedenler = [
    fill(`{A:gen} ${xa} yanı ile {B:gen} ${yb} ${tail} bir araya gelince ${out[0]}.`, names),
    fill(`{B:gen} ${xb} yanı da {A:gen} ${ya} ${tail} ile birleştiğinde ${out[1]}.`, names),
  ];

  return {
    index: i,
    digitA: da,
    digitB: db,
    sh,
    points,
    tone,
    kisiA: fill(PERSON_LINES[i][da - 1], names),
    kisiB: fill(PERSON_LINES[i][db - 1], { A: names.B, B: names.A }),
    guc: TOGETHER[i][sh - 1].guc,
    dikkat: TOGETHER[i][sh - 1].dikkat,
    tutum: upFirst(fill(ATTITUDE[i][relKey(da, db)], names)),
    nedenler,
    bilim: SCIENCE[i],
  };
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/**
 * Türkçe özel isimlere ünlü uyumuna göre ek getirir: Onur'un, Nehir'in, Ayşe'nin, Mert'ten.
 * Kural tabanlıdır (yapay zeka yok). Yabancı kökenli, ünlü uyumuna uymayan isimlerde
 * (ör. "Saat", "Harun" gibi istisnalar) yazılışa göre en olası ek seçilir.
 */

export type Case = "gen" | "dat" | "acc" | "abl" | "loc" | "ile" | "plain";

const BACK = "aıou";
const ROUNDED = "ouöü";
const VOWELS = "aeıioöuü";
const VOICELESS = "çfhkpsşt";

const lower = (s: string) => s.toLocaleLowerCase("tr");

function lastVowel(name: string): string {
  const l = lower(name);
  for (let i = l.length - 1; i >= 0; i--) if (VOWELS.includes(l[i])) return l[i];
  return "e";
}

function endsWithVowel(name: string): boolean {
  const l = lower(name.trim());
  return VOWELS.includes(l[l.length - 1] ?? "");
}

function four(v: string): string {
  const back = BACK.includes(v);
  const rounded = ROUNDED.includes(v);
  if (back) return rounded ? "u" : "ı";
  return rounded ? "ü" : "i";
}

function two(v: string): string {
  return BACK.includes(v) ? "a" : "e";
}

/** İsme hâl eki ekler; kesme işaretiyle: ek("Onur","gen") → "Onur’un". */
export function ek(name: string, kase: Case): string {
  const n = name.trim();
  if (!n || kase === "plain") return n;
  const v = lastVowel(n);
  const vowelEnd = endsWithVowel(n);
  const l = lower(n);
  const lastCh = l[l.length - 1] ?? "";
  let suffix: string;
  switch (kase) {
    case "gen":
      suffix = (vowelEnd ? "n" : "") + four(v) + "n";
      break;
    case "acc":
      suffix = (vowelEnd ? "y" : "") + four(v);
      break;
    case "dat":
      suffix = (vowelEnd ? "y" : "") + two(v);
      break;
    case "abl":
      suffix = (VOICELESS.includes(lastCh) ? "t" : "d") + two(v) + "n";
      break;
    case "loc":
      suffix = (VOICELESS.includes(lastCh) ? "t" : "d") + two(v);
      break;
    case "ile":
      suffix = (vowelEnd ? "y" : "") + "l" + two(v);
      break;
  }
  return `${n}’${suffix}`;
}

/** {A} {B:gen} {A:abl} gibi işaretleri isimlerle doldurur. */
export function fill(template: string, names: { A: string; B?: string }): string {
  return template.replace(/\{([AB])(?::(\w+))?\}/g, (_, who: "A" | "B", kase?: Case) => {
    const nm = who === "A" ? names.A : (names.B ?? "");
    return kase ? ek(nm, kase) : nm;
  });
}

/** Cümle başında büyük harf (Türkçe i/İ kuralı). */
export function upFirst(s: string): string {
  return s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);
}

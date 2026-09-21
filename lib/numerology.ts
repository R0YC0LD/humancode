// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/**
 * HumanCODE çekirdek algoritması.
 * Tüm hesaplar deterministiktir; aynı girdi her zaman aynı çıktıyı verir.
 * Formüller prompt Bölüm 4 ile birebir aynıdır.
 */

export type ElementKey = "hava" | "su" | "ates" | "toprak" | "notr";
export type Band = "yuksek" | "uyumlu" | "emek" | "zorlayici";
export type Mode = "romantik" | "arkadaslik" | "is" | "aile";

export interface BirthDate {
  day: number;
  month: number;
  year: number;
}

/** 9 hane; indeks 0 = h1 ... indeks 8 = h9. */
export type Pin = number[];

export const HANE_COUNT = 9;

/** n > 9 olduğu sürece rakamlarını topla. 29 → 11 → 2. Master sayı yok. */
export function reduce(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`reduce: negatif olmayan tam sayı bekleniyor, gelen: ${n}`);
  }
  let v = n;
  while (v > 9) {
    let s = 0;
    for (let x = v; x > 0; x = Math.floor(x / 10)) s += x % 10;
    v = s;
  }
  return v;
}

/** Bir sayının rakamları toplamı (indirgemeden). */
export function digitSum(n: number): number {
  let s = 0;
  for (let x = Math.abs(n); x > 0; x = Math.floor(x / 10)) s += x % 10;
  return s;
}

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function daysInMonth(month: number, year: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

export function isValidDate(d: BirthDate): boolean {
  const { day, month, year } = d;
  if (![day, month, year].every(Number.isInteger)) return false;
  if (year < 1900 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  return day >= 1 && day <= daysInMonth(month, year);
}

/** 9 haneyi hesaplar. */
export function computePin(d: BirthDate): Pin {
  if (!isValidDate(d)) throw new RangeError("computePin: geçersiz tarih");
  const h1 = reduce(d.day);
  const h2 = reduce(d.month);
  const h3 = reduce(digitSum(d.year));
  const h4 = reduce(h1 + h2 + h3);
  const h5 = reduce(h1 + h4);
  const h6 = reduce(h1 + h2);
  const h7 = reduce(h2 + h3);
  const h8 = reduce(h6 + h7);
  const h9 = reduce(h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8);
  return [h1, h2, h3, h4, h5, h6, h7, h8, h9];
}

/** İki kişinin sinerji haneleri sH1..sH8. */
export function synergy(a: Pin, b: Pin): number[] {
  const out: number[] = [];
  for (let i = 0; i < 8; i++) out.push(reduce(a[i] + b[i]));
  return out;
}

/* ------------------------------------------------------------------ */
/* Element katmanı                                                     */
/* ------------------------------------------------------------------ */

export const ELEMENT_ORDER: ElementKey[] = ["hava", "su", "ates", "toprak", "notr"];

export function elementOf(digit: number): ElementKey {
  switch (digit) {
    case 1:
    case 5:
      return "hava";
    case 2:
    case 7:
      return "su";
    case 3:
    case 6:
      return "ates";
    case 4:
    case 8:
      return "toprak";
    case 9:
      return "notr";
    default:
      throw new RangeError(`elementOf: 1-9 bekleniyor, gelen: ${digit}`);
  }
}

export type ElementCounts = Record<ElementKey, number>;

/** h1..h9 üzerindeki element dağılımı. */
export function elementCounts(pin: Pin): ElementCounts {
  const c: ElementCounts = { hava: 0, su: 0, ates: 0, toprak: 0, notr: 0 };
  for (const d of pin) c[elementOf(d)]++;
  return c;
}

/**
 * Baskın element. Beraberlikte: eşitlerden biri Karakter (h1) elementiyse o kazanır,
 * değilse sabit sıra (hava, su, ateş, toprak, nötr).
 */
export function dominantElement(pin: Pin): ElementKey {
  const c = elementCounts(pin);
  const max = Math.max(...ELEMENT_ORDER.map((e) => c[e]));
  const tied = ELEMENT_ORDER.filter((e) => c[e] === max);
  const h1El = elementOf(pin[0]);
  return tied.includes(h1El) ? h1El : tied[0];
}

/** Element eşleşme puanı (Bölüm 4). Bkz. README: belirtilmeyen iki çift için varsayım. */
export function elementPoints(a: ElementKey, b: ElementKey): number {
  if (a === "notr" || b === "notr") return 75;
  if (a === b) return 70;
  const pair = [a, b].sort().join("+");
  switch (pair) {
    case "su+toprak":
      return 100;
    case "ates+hava":
      return 100;
    case "hava+toprak":
      return 40;
    case "ates+su":
      return 35;
    // Prompt'ta tanımsız iki çift: orta değer 60 (varsayım, README'de belgeli).
    case "hava+su":
    case "ates+toprak":
      return 60;
    default:
      throw new Error(`elementPoints: bilinmeyen çift ${pair}`);
  }
}

/* ------------------------------------------------------------------ */
/* Skor                                                                */
/* ------------------------------------------------------------------ */

/** sH8 / sH1 rakamı → puan tablosu. */
export const DIGIT_POINTS: Record<number, number> = {
  2: 95,
  6: 90,
  9: 85,
  5: 75,
  3: 70,
  7: 55,
  8: 50,
  4: 45,
  1: 40,
};

export function bandOf(score: number): Band {
  if (score >= 80) return "yuksek";
  if (score >= 60) return "uyumlu";
  if (score >= 40) return "emek";
  return "zorlayici";
}

export interface ScoreResult {
  score: number;
  band: Band;
  sh: number[];
  sh8Points: number;
  elementPoints: number;
  characterPoints: number;
  elementA: ElementKey;
  elementB: ElementKey;
}

/**
 * score = round(0.60*sH8p + 0.25*elP + 0.15*karP)
 * Tam sayı aritmetiği (×100) ile yapılır; kayan nokta yuvarlama hatası olmaz.
 * Yuvarlama: yarım yukarı.
 */
export function computeScore(a: Pin, b: Pin): ScoreResult {
  const sh = synergy(a, b);
  const sh8Points = DIGIT_POINTS[sh[7]];
  const characterPoints = DIGIT_POINTS[sh[0]];
  const elementA = dominantElement(a);
  const elementB = dominantElement(b);
  const elPts = elementPoints(elementA, elementB);
  const scaled = 60 * sh8Points + 25 * elPts + 15 * characterPoints; // = 100 × ağırlıklı ortalama
  const score = Math.floor((scaled + 50) / 100);
  return {
    score,
    band: bandOf(score),
    sh,
    sh8Points,
    elementPoints: elPts,
    characterPoints,
    elementA,
    elementB,
  };
}

/* ------------------------------------------------------------------ */
/* Alan alan çözümleme                                                 */
/* ------------------------------------------------------------------ */

export interface AreaRank {
  /** 0 tabanlı hane indeksi (0 = sH1). */
  index: number;
  digit: number;
  points: number;
}

/** Tüm sinerji hanelerini puanıyla döndürür. */
export function rankAreas(sh: number[]): AreaRank[] {
  return sh.map((digit, index) => ({ index, digit, points: DIGIT_POINTS[digit] }));
}

/**
 * En iyi 3 ve en zayıf 3 alan (aynı alan iki listede yer almaz).
 * Beraberlikte düşük hane indeksi önce gelir; deterministiktir.
 */
export function pickAreas(sh: number[]): { best: AreaRank[]; friction: AreaRank[] } {
  const all = rankAreas(sh);
  const best = [...all].sort((x, y) => y.points - x.points || x.index - y.index).slice(0, 3);
  const bestIdx = new Set(best.map((r) => r.index));
  const friction = [...all]
    .filter((r) => !bestIdx.has(r.index))
    .sort((x, y) => x.points - y.points || x.index - y.index)
    .slice(0, 3);
  return { best, friction };
}

/* ------------------------------------------------------------------ */
/* Yaşam döngüsü                                                       */
/* ------------------------------------------------------------------ */

export interface Ymd {
  year: number;
  month: number;
  day: number;
}

/**
 * "Yaş yılı" hangi takvim yılında başladı: en son kutlanan doğum günü.
 * 29 Şubat doğumlular için artık olmayan yıllarda doğum günü 1 Mart sayılır.
 */
export function cycleYear(birth: BirthDate, today: Ymd): number {
  const bd = { month: birth.month, day: birth.day };
  if (birth.month === 2 && birth.day === 29 && !isLeapYear(today.year)) {
    bd.month = 3;
    bd.day = 1;
  }
  const passed = today.month > bd.month || (today.month === bd.month && today.day >= bd.day);
  return passed ? today.year : today.year - 1;
}

/** Kişisel yıl = reduce(h1 + h2 + reduce(yıl rakamları)). */
export function personalYear(birth: BirthDate, cycleYr: number): number {
  return reduce(reduce(birth.day) + reduce(birth.month) + reduce(digitSum(cycleYr)));
}

/** Tamamlanan tam yaş. */
export function ageOn(birth: BirthDate, today: Ymd): number {
  return cycleYear(birth, today) - birth.year;
}

export interface CyclePeriod {
  index: number;
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  isCurrent: boolean;
}

/** 9'ar yıllık dönemler; doğum yılından başlar. */
export function cyclePeriods(birth: BirthDate, today: Ymd, count = 12): CyclePeriod[] {
  const age = ageOn(birth, today);
  const currentIdx = Math.floor(Math.max(age, 0) / 9);
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    startAge: i * 9,
    endAge: i * 9 + 8,
    startYear: birth.year + i * 9,
    endYear: birth.year + i * 9 + 8,
    isCurrent: i === currentIdx,
  }));
}

/** Bir yaş yılı (birth.year + n) için kişisel yıl. */
export function personalYearAtAge(birth: BirthDate, age: number): number {
  return personalYear(birth, birth.year + age);
}

/** ISO/URL biçimi: GG-AA-YYYY ↔ BirthDate. */
export function formatBirth(d: BirthDate): string {
  return `${String(d.day).padStart(2, "0")}-${String(d.month).padStart(2, "0")}-${d.year}`;
}

export function parseBirth(s: string | null | undefined): BirthDate | null {
  if (!s) return null;
  const m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(s);
  if (!m) return null;
  const d = { day: Number(m[1]), month: Number(m[2]), year: Number(m[3]) };
  return isValidDate(d) ? d : null;
}

export function todayYmd(now = new Date()): Ymd {
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

export function isFuture(d: BirthDate, today: Ymd): boolean {
  if (d.year !== today.year) return d.year > today.year;
  if (d.month !== today.month) return d.month > today.month;
  return d.day > today.day;
}

/* ------------------------------------------------------------------ */
/* Pin ↔ metin (paylaşım bağlantıları doğum tarihi içermez)            */
/* ------------------------------------------------------------------ */

export function pinToString(pin: Pin): string {
  return pin.join("");
}

/** 9 haneli metni Pin'e çevirir; her hane 1..9 olmalı. */
export function pinFromString(s: string | null | undefined): Pin | null {
  if (!s || !/^[1-9]{9}$/.test(s)) return null;
  return s.split("").map(Number);
}

/**
 * Pin, Bölüm 4'teki formüllerle tutarlı mı? (h4..h9, h1..h3'ten türetilebiliyor mu.)
 * Uydurma bir pin bağlantısı reddedilir.
 */
export function isConsistentPin(p: Pin): boolean {
  if (p.length !== 9 || p.some((x) => !Number.isInteger(x) || x < 1 || x > 9)) return false;
  const [h1, h2, h3] = p;
  const h4 = reduce(h1 + h2 + h3);
  const h5 = reduce(h1 + h4);
  const h6 = reduce(h1 + h2);
  const h7 = reduce(h2 + h3);
  const h8 = reduce(h6 + h7);
  const h9 = reduce(h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8);
  return p[3] === h4 && p[4] === h5 && p[5] === h6 && p[6] === h7 && p[7] === h8 && p[8] === h9;
}

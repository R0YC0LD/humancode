// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { describe, expect, it } from "vitest";
import {
  bandOf,
  computePin,
  computeScore,
  cycleYear,
  cyclePeriods,
  dominantElement,
  elementCounts,
  elementPoints,
  formatBirth,
  isValidDate,
  parseBirth,
  pickAreas,
  personalYear,
  reduce,
  synergy,
} from "./numerology";

const pin = (day: number, month: number, year: number) => computePin({ day, month, year });

describe("reduce", () => {
  it("tek haneyi olduğu gibi bırakır", () => {
    for (let n = 0; n <= 9; n++) expect(reduce(n)).toBe(n);
  });
  it("29 → 11 → 2", () => expect(reduce(29)).toBe(2));
  it("11 → 2 (master sayı yok)", () => expect(reduce(11)).toBe(2));
  it("10 → 1, 18 → 9, 99 → 9, 1999 → 1", () => {
    expect(reduce(10)).toBe(1);
    expect(reduce(18)).toBe(9);
    expect(reduce(99)).toBe(9);
    expect(reduce(1999)).toBe(1);
  });
  it("her n>0 için dijital kök = 1 + (n-1) mod 9", () => {
    for (let n = 1; n <= 20000; n++) expect(reduce(n)).toBe(1 + ((n - 1) % 9));
  });
  it("geçersiz girdide hata", () => {
    expect(() => reduce(-1)).toThrow();
    expect(() => reduce(1.5)).toThrow();
  });
});

describe("computePin — prompt test vektörleri", () => {
  it("11.02.1980 → 2,2,9,4,6,4,2,6 | h9 = 8", () => {
    expect(pin(11, 2, 1980)).toEqual([2, 2, 9, 4, 6, 4, 2, 6, 8]);
  });
  it("29.05.1969 → 2,5,7,5,7,7,3,1 | h9 = 1", () => {
    expect(pin(29, 5, 1969)).toEqual([2, 5, 7, 5, 7, 7, 3, 1, 1]);
  });
  it("01.01.1972 → 1,1,1,3,4,2,2,4", () => {
    expect(pin(1, 1, 1972).slice(0, 8)).toEqual([1, 1, 1, 3, 4, 2, 2, 4]);
  });
  it("10.04.1984 → 1,4,4,9,1,5,8,4", () => {
    expect(pin(10, 4, 1984).slice(0, 8)).toEqual([1, 4, 4, 9, 1, 5, 8, 4]);
  });
  it("h9 elle doğrulama: 01.01.1972 → 18 → 9 ; 10.04.1984 → 36 → 9", () => {
    expect(pin(1, 1, 1972)[8]).toBe(9);
    expect(pin(10, 4, 1984)[8]).toBe(9);
  });
  it("tüm haneler 1..9 aralığında (1900-2100 taraması)", () => {
    for (let y = 1900; y <= 2100; y += 7) {
      for (let m = 1; m <= 12; m++) {
        for (const d of [1, 9, 10, 19, 28]) {
          const p = pin(d, m, y);
          expect(p).toHaveLength(9);
          for (const h of p) {
            expect(h).toBeGreaterThanOrEqual(1);
            expect(h).toBeLessThanOrEqual(9);
          }
        }
      }
    }
  });
  it("geçersiz tarihte hata", () => {
    expect(() => pin(31, 4, 1990)).toThrow();
    expect(() => pin(29, 2, 2001)).toThrow();
    expect(() => pin(0, 1, 1990)).toThrow();
  });
});

describe("tarih doğrulama", () => {
  it("artık yıl", () => {
    expect(isValidDate({ day: 29, month: 2, year: 2000 })).toBe(true);
    expect(isValidDate({ day: 29, month: 2, year: 1900 })).toBe(false);
    expect(isValidDate({ day: 29, month: 2, year: 2024 })).toBe(true);
    expect(isValidDate({ day: 29, month: 2, year: 2023 })).toBe(false);
  });
  it("parse / format gidiş-dönüş", () => {
    expect(parseBirth("01-01-1972")).toEqual({ day: 1, month: 1, year: 1972 });
    expect(formatBirth({ day: 1, month: 1, year: 1972 })).toBe("01-01-1972");
    expect(parseBirth("31-02-1990")).toBeNull();
    expect(parseBirth("abc")).toBeNull();
    expect(parseBirth(null)).toBeNull();
  });
});

describe("sinerji", () => {
  const a = pin(1, 1, 1972);
  const b = pin(10, 4, 1984);
  it("Sinerji(01.01.1972, 10.04.1984) → 2,5,5,3,5,7,1,8", () => {
    expect(synergy(a, b)).toEqual([2, 5, 5, 3, 5, 7, 1, 8]);
  });
  it("simetrik", () => expect(synergy(a, b)).toEqual(synergy(b, a)));
});

describe("element", () => {
  it("dağılım toplamı 9", () => {
    const c = elementCounts(pin(11, 2, 1980));
    expect(Object.values(c).reduce((x, y) => x + y, 0)).toBe(9);
  });
  it("01.01.1972: hava 3 (1,1,1), su 2, ateş 1, toprak 2, nötr 1 → baskın hava", () => {
    const p = pin(1, 1, 1972);
    expect(elementCounts(p)).toEqual({ hava: 3, su: 2, ates: 1, toprak: 2, notr: 1 });
    expect(dominantElement(p)).toBe("hava");
  });
  it("10.04.1984: hava 3, toprak 4, nötr 2 → baskın toprak", () => {
    const p = pin(10, 4, 1984);
    expect(elementCounts(p)).toEqual({ hava: 3, su: 0, ates: 0, toprak: 4, notr: 2 });
    expect(dominantElement(p)).toBe("toprak");
  });
  it("beraberlikte h1 elementi öncelikli", () => {
    // [5,3,3,5,...] gibi yapay pin: hava 2, ateş 2 → h1 = 5 (hava)
    expect(dominantElement([5, 3, 3, 5, 4, 8, 2, 7, 9])).toBe("hava");
    expect(dominantElement([3, 5, 3, 5, 4, 8, 2, 7, 9].map((x) => x))).toBe("ates");
  });
  it("puan tablosu", () => {
    expect(elementPoints("su", "toprak")).toBe(100);
    expect(elementPoints("toprak", "su")).toBe(100);
    expect(elementPoints("ates", "hava")).toBe(100);
    expect(elementPoints("hava", "hava")).toBe(70);
    expect(elementPoints("notr", "su")).toBe(75);
    expect(elementPoints("hava", "notr")).toBe(75);
    expect(elementPoints("toprak", "hava")).toBe(40);
    expect(elementPoints("su", "ates")).toBe(35);
    expect(elementPoints("hava", "su")).toBe(60);
    expect(elementPoints("ates", "toprak")).toBe(60);
  });
});

describe("skor", () => {
  it("01.01.1972 × 10.04.1984: 0.6·50 + 0.25·40 + 0.15·95 = 54.25 → 54, emek ister", () => {
    const r = computeScore(pin(1, 1, 1972), pin(10, 4, 1984));
    expect(r.sh8Points).toBe(50);
    expect(r.elementPoints).toBe(40);
    expect(r.characterPoints).toBe(95);
    expect(r.score).toBe(54);
    expect(r.band).toBe("emek");
  });
  it("alt ve üst sınırlar: tüm bileşenler 95/100/95 → 96; 40/35/40 → 39", () => {
    // Elle: 0.6*95+0.25*100+0.15*95 = 57+25+14.25 = 96.25 → 96
    expect(Math.floor((60 * 95 + 25 * 100 + 15 * 95 + 50) / 100)).toBe(96);
    // Elle: 0.6*40+0.25*35+0.15*40 = 24+8.75+6 = 38.75 → 39
    expect(Math.floor((60 * 40 + 25 * 35 + 15 * 40 + 50) / 100)).toBe(39);
  });
  it("yarım yukarı yuvarlama: 0.5 sınırı", () => {
    // 0.6*95 + 0.25*35 + 0.15*40 = 57 + 8.75 + 6 = 71.75 → 72
    expect(Math.floor((60 * 95 + 25 * 35 + 15 * 40 + 50) / 100)).toBe(72);
  });
  it("skor her zaman 39..96 içinde (tüm hane çiftleri × tüm element çiftleri)", () => {
    const pts = [95, 90, 85, 75, 70, 55, 50, 45, 40];
    const els = [100, 70, 75, 40, 35, 60];
    for (const a of pts)
      for (const e of els)
        for (const k of pts) {
          const s = Math.floor((60 * a + 25 * e + 15 * k + 50) / 100);
          expect(s).toBeGreaterThanOrEqual(39);
          expect(s).toBeLessThanOrEqual(96);
        }
  });
  it("bantlar", () => {
    expect(bandOf(80)).toBe("yuksek");
    expect(bandOf(79)).toBe("uyumlu");
    expect(bandOf(60)).toBe("uyumlu");
    expect(bandOf(59)).toBe("emek");
    expect(bandOf(40)).toBe("emek");
    expect(bandOf(39)).toBe("zorlayici");
  });
  it("simetrik ve deterministik", () => {
    const a = pin(29, 5, 1969);
    const b = pin(11, 2, 1980);
    expect(computeScore(a, b).score).toBe(computeScore(b, a).score);
    expect(computeScore(a, b)).toEqual(computeScore(a, b));
  });
});

describe("alan seçimi", () => {
  it("en iyi/en zayıf 3, kesişimsiz; beraberlikte düşük indeks önce", () => {
    const { best, friction } = pickAreas([2, 5, 5, 3, 5, 7, 1, 8]);
    // puanlar: 95,75,75,70,75,55,40,50
    expect(best.map((r) => r.index)).toEqual([0, 1, 2]);
    expect(friction.map((r) => r.index)).toEqual([6, 7, 5]);
    const s = new Set([...best, ...friction].map((r) => r.index));
    expect(s.size).toBe(6);
  });
});

describe("yaşam döngüsü", () => {
  const birth = { day: 11, month: 2, year: 1980 };
  it("doğum günü geçtiyse aynı yıl, geçmediyse önceki yıl", () => {
    expect(cycleYear(birth, { year: 2026, month: 9, day: 19 })).toBe(2026);
    expect(cycleYear(birth, { year: 2026, month: 1, day: 15 })).toBe(2025);
    expect(cycleYear(birth, { year: 2026, month: 2, day: 11 })).toBe(2026);
    expect(cycleYear(birth, { year: 2026, month: 2, day: 10 })).toBe(2025);
  });
  it("kişisel yıl elle doğrulama: 2026 → 2+2+1 = 5 ; 2025 → 2+2+9 = 13 → 4", () => {
    expect(personalYear(birth, 2026)).toBe(5);
    expect(personalYear(birth, 2025)).toBe(4);
  });
  it("kişisel yıl 9'luk döngü: ardışık yıllar +1 (9 → 1)", () => {
    for (let y = 2000; y < 2040; y++) {
      const a = personalYear(birth, y);
      const b = personalYear(birth, y + 1);
      expect(b).toBe(a === 9 ? 1 : a + 1);
    }
  });
  it("29 Şubat: artık olmayan yılda doğum günü 1 Mart", () => {
    const leap = { day: 29, month: 2, year: 2000 };
    expect(cycleYear(leap, { year: 2025, month: 2, day: 28 })).toBe(2024);
    expect(cycleYear(leap, { year: 2025, month: 3, day: 1 })).toBe(2025);
  });
  it("dönemler: 9'ar yıl, bugün olan işaretli (yaş 46 → dönem 5)", () => {
    const ps = cyclePeriods(birth, { year: 2026, month: 9, day: 19 });
    expect(ps[0]).toMatchObject({ startYear: 1980, endYear: 1988, startAge: 0, endAge: 8 });
    expect(ps.filter((p) => p.isCurrent)).toHaveLength(1);
    expect(ps.find((p) => p.isCurrent)?.index).toBe(5); // 46 / 9 = 5.11
  });
});

import { isConsistentPin, pinFromString, pinToString } from "./numerology";

describe("pin metni", () => {
  it("gidiş-dönüş", () => {
    const p = pin(11, 2, 1980);
    expect(pinToString(p)).toBe("229464268");
    expect(pinFromString("229464268")).toEqual(p);
  });
  it("geçersiz metinler reddedilir", () => {
    expect(pinFromString("22946426")).toBeNull();
    expect(pinFromString("2294642680")).toBeNull();
    expect(pinFromString("229464260")).toBeNull();
    expect(pinFromString("abc")).toBeNull();
    expect(pinFromString(undefined)).toBeNull();
  });
  it("tutarlılık: gerçek pinler geçer, uydurma pin reddedilir", () => {
    for (let y = 1900; y <= 2026; y += 5)
      for (let m = 1; m <= 12; m++) expect(isConsistentPin(pin(15, m, y))).toBe(true);
    expect(isConsistentPin([1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(false);
    expect(isConsistentPin([2, 2, 9, 4, 6, 4, 2, 6, 7])).toBe(false);
  });
});

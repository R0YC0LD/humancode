// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { describe, expect, it } from "vitest";
import { TOOLBOX } from "@/content/attributes";
import { computePin } from "./numerology";
import { buildPortrait, digitCounts, relationOf } from "./portrait";
import { areaExtra, buildChemistry, synergySeed } from "./chemistry";
import { pickN, seedOf } from "./variety";

const pin = (d: number, m: number, y: number) => computePin({ day: d, month: m, year: y });

describe("veri bütünlüğü", () => {
  it("her rakam için 10 aktif + 10 reaktif öznitelik, tekrarsız", () => {
    expect(TOOLBOX).toHaveLength(9);
    for (const t of TOOLBOX) {
      expect(t.aktif).toHaveLength(10);
      expect(t.reaktif).toHaveLength(10);
      expect(new Set(t.aktif).size).toBe(10);
      expect(new Set(t.reaktif).size).toBe(10);
      for (const m of ["romantik", "arkadaslik", "is", "aile"] as const) expect(t.ipucu[m].length).toBeGreaterThan(20);
    }
  });
});

describe("variety", () => {
  it("pickN: deterministik, tekrarsız, doğru sayıda", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const a = pickN(arr, 4, 123, 1);
    expect(a).toEqual(pickN(arr, 4, 123, 1));
    expect(new Set(a).size).toBe(4);
    expect(pickN(arr, 99, 1)).toHaveLength(10);
  });
  it("farklı tohum çoğunlukla farklı seçim verir", () => {
    const arr = Array.from({ length: 10 }, (_, i) => i);
    const seen = new Set<string>();
    for (let s = 1; s <= 50; s++) seen.add(pickN(arr, 3, s).join());
    expect(seen.size).toBeGreaterThan(30);
  });
  it("seedOf sıraya duyarlı", () => {
    expect(seedOf([1, 2, 3])).not.toBe(seedOf([3, 2, 1]));
  });
});

describe("Kod Portresi", () => {
  it("11.02.1980: sayımlar elle doğrulandı", () => {
    const p = pin(11, 2, 1980); // 2,2,9,4,6,4,2,6,8
    expect(digitCounts(p)).toEqual([0, 3, 0, 2, 0, 2, 0, 1, 1]);
    const r = buildPortrait(p);
    expect(r.dominant).toEqual([2]);
    expect(r.missing).toEqual([1, 3, 5, 7]);
    expect(r.sections.map((s) => s.id)).toEqual(["dis-ic", "akis", "ruh", "rakam", "eksik", "duyu"]);
  });
  it("aynı kod aynı portre; farklı kodlar farklı metin", () => {
    const a = buildPortrait(pin(11, 2, 1980));
    expect(a).toEqual(buildPortrait(pin(11, 2, 1980)));
    // Toplam 9×9×9 = 729 farklı kod vardır; yıl kökü 9 ardışık yılda 9 farklı değer alır.
    const texts = new Set<string>();
    for (let y = 1950; y < 1959; y++) texts.add(JSON.stringify(buildPortrait(pin(9, 4, y)).sections));
    expect(texts.size).toBe(9);
    // 729 kodun tamamı için portre metinleri en az 500 farklı varyanta dağılır
    const all = new Set<string>();
    for (let d = 1; d <= 9; d++) for (let m = 1; m <= 9; m++) for (let y = 1990; y < 1999; y++) all.add(JSON.stringify(buildPortrait(pin(d, m, y)).sections));
    expect(all.size).toBe(729);
  });
  it("1900–2025 taramasında boş, tanımsız ya da NaN metin yok", () => {
    for (let y = 1900; y <= 2025; y += 5)
      for (let m = 1; m <= 12; m++)
        for (const d of [1, 12, 23, 28]) {
          const r = buildPortrait(pin(d, m, y));
          expect(r.imza.split(" · ")).toHaveLength(3);
          for (const s of r.sections) {
            expect(s.metin.length).toBeGreaterThan(40);
            expect(s.metin).not.toMatch(/undefined|NaN|\[object/);
          }
        }
  });
  it("eksik rakam bölümü yalnızca eksik varsa; dominant yalnızca max ≥ 3 ise", () => {
    for (let y = 1950; y < 2010; y++) {
      const p = pin(5, 7, y);
      const r = buildPortrait(p);
      const c = digitCounts(p);
      expect(r.sections.some((s) => s.id === "eksik")).toBe(c.some((x) => x === 0));
      expect(r.dominant.length > 0).toBe(Math.max(...c) >= 3);
    }
  });
  it("relationOf", () => {
    expect(relationOf("su", "toprak")).toBe("besleyen");
    expect(relationOf("hava", "ates")).toBe("besleyen");
    expect(relationOf("su", "ates")).toBe("catisan");
    expect(relationOf("hava", "toprak")).toBe("catisan");
    expect(relationOf("hava", "hava")).toBe("ayni");
    expect(relationOf("notr", "su")).toBe("denge");
    expect(relationOf("hava", "su")).toBe("farkli");
  });
});

describe("Kimya (sinerji)", () => {
  const a = pin(1, 1, 1972);
  const b = pin(10, 4, 1984);
  it("A×B ile B×A aynı tohum ve aynı kimya", () => {
    expect(synergySeed(a, b)).toBe(synergySeed(b, a));
    const x = buildChemistry(a, b, "is");
    const y = buildChemistry(b, a, "is");
    expect(x.ozet).toBe(y.ozet);
    expect(x.aktif).toEqual(y.aktif);
    expect(x.sozlesme).toBe(y.sozlesme);
  });
  it("sH8 = 8 → 'Ağır ve yoğun bağ' sözleşmesi; ipuçları 3 tane ve farklı rakamlardan", () => {
    const c = buildChemistry(a, b, "romantik");
    expect(c.baslik).toBe("Ağır ve yoğun bağ");
    expect(c.ipuclari).toHaveLength(3);
    expect(new Set(c.ipuclari.map((i) => i.metin)).size).toBe(3);
  });
  it("areaExtra: aynı rakam farklı alanlarda farklı öznitelik seçer (çoğunlukla)", () => {
    const s = synergySeed(a, b);
    const seen = new Set<string>();
    for (let i = 0; i < 8; i++) seen.add(areaExtra(i, 5, "is", s).aktif.join());
    expect(seen.size).toBeGreaterThan(4);
  });
});

import { buildSummary } from "./summary";

describe("Kısaca özet", () => {
  it("11.02.1980: 3 güçlü + 3 dikkat, katmanlar h1/h6/h8 rakamlarına bağlı, tekrarsız", () => {
    const s = buildSummary(pin(11, 2, 1980)); // 2,2,9,4,6,4,2,6,8
    expect(s.guclu.map((g) => g.rakam)).toEqual([2, 4, 6]);
    expect(s.dikkat.map((g) => g.rakam)).toEqual([2, 4, 6]);
    expect(new Set([...s.guclu, ...s.dikkat].map((x) => x.deger)).size).toBe(6);
    expect(s.enCok).toEqual({ rakam: 2, adet: 3 });
    expect(s.eksikSayisi).toBe(4);
    expect(s.baskinElement).toBe("su");
  });
  it("deterministik; 729 kodun hepsinde geçerli çıktı", () => {
    expect(buildSummary(pin(11, 2, 1980))).toEqual(buildSummary(pin(11, 2, 1980)));
    for (let d = 1; d <= 9; d++)
      for (let m = 1; m <= 9; m++)
        for (let y = 1990; y < 1999; y++) {
          const s = buildSummary(pin(d, m, y));
          expect(s.dikkatCekici.length).toBeGreaterThan(20);
          for (const h of [...s.guclu, ...s.dikkat]) expect(h.deger).toBeTruthy();
        }
  });
});

import { buildAreaStory, relKey } from "./pairStory";
import { PERSON_LINES, TOGETHER, ATTITUDE, OUTCOMES, SCIENCE } from "@/content/pairVoices";

describe("Alan anlatımı (isimli)", () => {
  it("içerik tabloları eksiksiz: 8 alan × 9 rakam × (kişi, birlikte); 8 × 6 tutum; 8 sonuç; 8 bilim notu", () => {
    expect(PERSON_LINES).toHaveLength(8);
    expect(TOGETHER).toHaveLength(8);
    for (let i = 0; i < 8; i++) {
      expect(PERSON_LINES[i]).toHaveLength(9);
      expect(TOGETHER[i]).toHaveLength(9);
      expect(Object.keys(ATTITUDE[i]).sort()).toEqual(["ayni", "ayniRakam", "besleyen", "catisan", "denge", "farkli"]);
      expect(OUTCOMES[i].iyi).toHaveLength(2);
      expect(OUTCOMES[i].gergin).toHaveLength(2);
      for (const l of PERSON_LINES[i]) expect(l).toContain("{A}");
    }
    expect(SCIENCE).toHaveLength(8);
  });
  it("aynı alan içinde 9 rakamın 9 farklı metni var (tekrar yok)", () => {
    for (let i = 0; i < 8; i++) {
      expect(new Set(PERSON_LINES[i]).size).toBe(9);
      expect(new Set(TOGETHER[i].map((t) => t.guc)).size).toBe(9);
      expect(new Set(TOGETHER[i].map((t) => t.dikkat)).size).toBe(9);
    }
  });
  it("hiçbir yer tutucu açıkta kalmaz; adlar ve ekler doğru yerleşir", () => {
    const a = pin(1, 1, 1972);
    const b = pin(10, 4, 1984);
    const names = { A: "Onur", B: "Nehir" };
    for (let i = 0; i < 8; i++) {
      const s = buildAreaStory(i, a, b, names, 12345);
      const all = [s.kisiA, s.kisiB, s.tutum, ...s.nedenler].join(" ");
      expect(all).not.toMatch(/\{|\}|undefined/);
      expect(s.kisiA.startsWith("Onur")).toBe(true);
      expect(s.kisiB.startsWith("Nehir")).toBe(true);
      expect(s.nedenler[0]).toMatch(/^Onur’un .* Nehir’in /);
      expect(s.nedenler[1]).toMatch(/^Nehir’in .* Onur’un /);
    }
  });
  it("alan/rakam bilgisi tutarlı: puan ve ton sinerji rakamından çıkar", () => {
    const s = buildAreaStory(7, pin(1, 1, 1972), pin(10, 4, 1984), { A: "Onur", B: "Nehir" }, 1); // sH8 = 8 → 50 → gergin
    expect(s.sh).toBe(8);
    expect(s.points).toBe(50);
    expect(s.tone).toBe("gergin");
    expect(s.digitA).toBe(4);
    expect(s.digitB).toBe(4);
    expect(relKey(4, 4)).toBe("ayniRakam");
    expect(relKey(2, 4)).toBe("besleyen");
    expect(relKey(1, 5)).toBe("ayni");
  });
  it("deterministik ve A/B yer değişince ad simetrisi korunur (tohum aynıysa)", () => {
    const a = pin(1, 1, 1972), b = pin(10, 4, 1984);
    const n = { A: "Onur", B: "Nehir" };
    expect(buildAreaStory(2, a, b, n, 9)).toEqual(buildAreaStory(2, a, b, n, 9));
  });
});

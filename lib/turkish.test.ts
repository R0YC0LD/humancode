// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { describe, expect, it } from "vitest";
import { ek, fill, upFirst } from "./turkish";
import { cleanName, isCleanForPublic, isValidName, maskFullName, titleCase } from "./names";

describe("Türkçe ekler", () => {
  it("tamlayan (genitive)", () => {
    expect(ek("Onur", "gen")).toBe("Onur’un");
    expect(ek("Nehir", "gen")).toBe("Nehir’in");
    expect(ek("Ayşe", "gen")).toBe("Ayşe’nin");
    expect(ek("Ali", "gen")).toBe("Ali’nin");
    expect(ek("Ömer", "gen")).toBe("Ömer’in");
    expect(ek("Şule", "gen")).toBe("Şule’nin");
    expect(ek("Murat", "gen")).toBe("Murat’ın");
    expect(ek("Ümit", "gen")).toBe("Ümit’in");
    expect(ek("Buse", "gen")).toBe("Buse’nin");
    expect(ek("Cansu", "gen")).toBe("Cansu’nun");
    expect(ek("Efe", "gen")).toBe("Efe’nin");
  });
  it("yönelme, belirtme, ile", () => {
    expect(ek("Onur", "dat")).toBe("Onur’a");
    expect(ek("Nehir", "dat")).toBe("Nehir’e");
    expect(ek("Ayşe", "dat")).toBe("Ayşe’ye");
    expect(ek("Onur", "acc")).toBe("Onur’u");
    expect(ek("Nehir", "acc")).toBe("Nehir’i");
    expect(ek("Ayşe", "acc")).toBe("Ayşe’yi");
    expect(ek("Onur", "ile")).toBe("Onur’la");
    expect(ek("Nehir", "ile")).toBe("Nehir’le");
    expect(ek("Ayşe", "ile")).toBe("Ayşe’yle");
  });
  it("ayrılma ve bulunma: sert ünsüzden sonra t", () => {
    expect(ek("Onur", "abl")).toBe("Onur’dan");
    expect(ek("Nehir", "abl")).toBe("Nehir’den");
    expect(ek("Mert", "abl")).toBe("Mert’ten");
    expect(ek("Ceyhan", "abl")).toBe("Ceyhan’dan");
    expect(ek("Kerem", "loc")).toBe("Kerem’de");
    expect(ek("Sıla", "loc")).toBe("Sıla’da");
    expect(ek("Aslıhan", "loc")).toBe("Aslıhan’da");
    expect(ek("Sinan", "abl")).toBe("Sinan’dan");
    expect(ek("Enes", "abl")).toBe("Enes’ten");
  });
  it("boş ad ve düz hâl", () => {
    expect(ek("", "gen")).toBe("");
    expect(ek("Onur", "plain")).toBe("Onur");
  });
  it("fill: işaretleri doldurur", () => {
    expect(fill("{A:gen} sabrı ile {B:gen} hızı; {A} ve {B:ile}.", { A: "Onur", B: "Nehir" })).toBe(
      "Onur’un sabrı ile Nehir’in hızı; Onur ve Nehir’le.",
    );
  });
  it("upFirst: Türkçe büyük harf", () => {
    expect(upFirst("ilk")).toBe("İlk");
    expect(upFirst("ışık")).toBe("Işık");
  });
});

describe("Ad temizleme", () => {
  it("harf dışını atar, boşlukları sadeleştirir, baş harfleri büyütür", () => {
    expect(cleanName("  onur   can <b>x</b> ")).toBe("Onur Can Bxb");
    expect(cleanName("nehir123")).toBe("Nehir");
    expect(cleanName("ışıl")).toBe("Işıl");
    expect(cleanName("iLKAY")).toBe("İlkay");
    expect(cleanName(null)).toBe("");
  });
  it("en fazla 24 karakter", () => {
    expect(cleanName("a".repeat(60)).length).toBeLessThanOrEqual(24);
  });
  it("geçerlilik ve kaba dil filtresi", () => {
    expect(isValidName("O")).toBe(false);
    expect(isValidName("On")).toBe(true);
    expect(isCleanForPublic("Onur")).toBe(true);
    expect(isCleanForPublic("Amk Adam")).toBe(false);
    expect(isCleanForPublic("Sikik")).toBe(false);
  });
  it("titleCase", () => expect(titleCase("mehmet ali")).toBe("Mehmet Ali"));
});

import { keyOf, mergeEntry, parseStored, parseTopInput, publicView, rankOf, sortEntries, type StoredEntry } from "./toplist";

describe("Toplist mantığı", () => {
  const P = (ad: string, soyad: string, pin: string) => ({ ad, soyad, pin });
  const ok = parseTopInput({ a: P("onur", "yılmaz", "111342249"), b: P("NEHİR", "kaya", "144915849") });
  it("girdi doğrulanır: ad sansürlenir (ilk 2 harf), skor sunucuda hesaplanır (54, emek ister)", () => {
    expect(ok.ok).toBe(true);
    if (!ok.ok) return;
    expect(ok.entry.score).toBe(54);
    expect(ok.entry.band).toBe("emek");
    expect([ok.entry.a.name, ok.entry.b.name].sort()).toEqual(["Ne*** Ka***", "On*** Yı***"]);
    // tam ad hiçbir alanda yok
    expect(JSON.stringify(ok.entry)).not.toMatch(/Onur|Yılmaz|Nehir|Kaya/);
  });
  it("sansür: ad ve soyadın ilk 2 harfi + ***; Türkçe harfler bozulmaz", () => {
    expect(maskFullName("onur", "yılmaz")).toBe("On*** Yı***");
    expect(maskFullName("İlkay", "Özkan")).toBe("İl*** Öz***".replace("Öz", "Öz"));
    expect(maskFullName("Ali Can", "Demir Kaya")).toBe("Al*** Ka***");
    expect(maskFullName("Ş", "Ç")).toBe("Ş*** Ç***");
  });
  it("kötü girdiler reddedilir (soyad zorunlu, kaba dil, geçersiz kod)", () => {
    expect(parseTopInput(null).ok).toBe(false);
    expect(parseTopInput({ a: P("Onur", "", "111342249"), b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
    expect(parseTopInput({ a: P("O", "Yılmaz", "111342249"), b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
    expect(parseTopInput({ a: P("Onur", "Yılmaz", "111111111"), b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
    expect(parseTopInput({ a: P("Amk", "Yılmaz", "111342249"), b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
    expect(parseTopInput({ a: { ad: "Onur", pin: "111342249" }, b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
    expect(parseTopInput({ a: { name: "Onur", pin: "111342249" }, b: P("Nehir", "Kaya", "144915849") }).ok).toBe(false);
  });
  it("skor istemciden alınmaz (sahte skor yok sayılır)", () => {
    const r = parseTopInput({ a: P("Onur", "Yılmaz", "111342249"), b: P("Nehir", "Kaya", "144915849"), score: 100 });
    expect(r.ok && r.entry.score).toBe(54);
  });
  it("ekleme: sıralı, yinelenme yok (aynı çift güncellenir), üst sınır, sıra doğru", () => {
    if (!ok.ok) return;
    const mk = (score: number, n: string): StoredEntry => ({ a: { name: n, pin: "111111111" }, b: { name: "X" + n, pin: "222222222" }, score, band: "emek", t: 1 });
    let list: StoredEntry[] = [mk(50, "A"), mk(90, "B"), mk(70, "C")];
    list = mergeEntry(list, ok.entry, 100);
    expect(list.map((e) => e.score)).toEqual([90, 70, 54, 50]);
    expect(rankOf(list, ok.entry)).toBe(3);
    list = mergeEntry(list, ok.entry, 200);
    expect(list).toHaveLength(4);
    expect(list.filter((e) => keyOf(e) === keyOf(ok.entry))).toHaveLength(1);
    const big = Array.from({ length: 10 }, (_, i) => mk(40 + i, String.fromCharCode(65 + i)));
    expect(mergeEntry(big, ok.entry, 1, 5)).toHaveLength(5);
  });
  it("eşit skorda yeni kayıt üstte", () => {
    const a: StoredEntry = { a: { name: "A", pin: "111111111" }, b: { name: "B", pin: "222222222" }, score: 60, band: "uyumlu", t: 1 };
    const b: StoredEntry = { ...a, a: { name: "C", pin: "111111111" }, t: 5 };
    expect(sortEntries([a, b])[0].a.name).toBe("C");
  });
  it("eski sansürsüz kayıtlar okunurken sansürlenir; sansürlüye dokunulmaz", () => {
    const parsed = parseStored([{ a: { name: "Mehmet Emre", pin: "1" }, b: { name: "On*** Yı***", pin: "2" }, score: 59, t: 1 }]);
    expect(parsed[0].a.name).toBe("Me*** Em***");
    expect(parsed[0].b.name).toBe("On*** Yı***");
  });
  it("bozuk depo verisi güvenle atlanır; genel görünümde zaman damgası bulunur", () => {
    const parsed = parseStored([{ foo: 1 }, null, "x", { a: { name: "A", pin: "1" }, b: { name: "B", pin: "2" }, score: 55, t: 3 }]);
    expect(parsed).toHaveLength(1);
    expect(parseStored({})).toEqual([]);
    expect(publicView(parsed, 5)[0].t).toBe(3);
  });
});

import { timeAgo } from "./time";

describe("timeAgo", () => {
  it("biçimler", () => {
    const now = 10_000_000_000;
    expect(timeAgo(now - 5_000, now)).toBe("az önce");
    expect(timeAgo(now - 5 * 60_000, now)).toBe("5 dk önce");
    expect(timeAgo(now - 3 * 3_600_000, now)).toBe("3 sa önce");
    expect(timeAgo(now - 50 * 3_600_000, now)).toBe("2 gün önce");
    expect(timeAgo(undefined, now)).toBe("");
  });
});

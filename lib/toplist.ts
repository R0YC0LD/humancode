// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { cleanName, ensureMasked, isCleanForPublic, isValidName, maskFullName } from "./names";
import { bandOf, computeScore, isConsistentPin, pinFromString, pinToString, type Band } from "./numerology";

export const TOP_MAX = 300;

export interface TopPerson {
  name: string;
  /** 9 haneli kod (doğum tarihi tutulmaz). */
  pin: string;
}

export interface TopEntry {
  a: TopPerson;
  b: TopPerson;
  score: number;
  band: Band;
  /** Kayıt zamanı (ms); "3 dk önce" göstermek için. */
  t?: number;
}

/** Depoda tutulan kayıt: zaman damgası eşit skorlarda yenisini üste çıkarır. */
export interface StoredEntry extends TopEntry {
  t: number;
}

export type ParseResult = { ok: true; entry: TopEntry } | { ok: false; reason: string };

interface RawPerson {
  ad?: unknown;
  soyad?: unknown;
  pin?: unknown;
}

/** İstemciden gelen veriyi doğrular; skoru asla istemciden almaz, kodlardan yeniden hesaplar. */
export function parseTopInput(body: unknown): ParseResult {
  if (!body || typeof body !== "object") return { ok: false, reason: "bad-body" };
  const { a, b } = body as { a?: RawPerson; b?: RawPerson };
  const people: TopPerson[] = [];
  for (const p of [a, b]) {
    if (!p || typeof p.ad !== "string" || typeof p.soyad !== "string" || typeof p.pin !== "string") return { ok: false, reason: "bad-person" };
    const ad = cleanName(p.ad);
    const soyad = cleanName(p.soyad);
    if (!isValidName(ad) || !isValidName(soyad)) return { ok: false, reason: "bad-name" };
    if (!isCleanForPublic(ad) || !isCleanForPublic(soyad)) return { ok: false, reason: "name-not-allowed" };
    const pin = pinFromString(p.pin);
    if (!pin || !isConsistentPin(pin)) return { ok: false, reason: "bad-pin" };
    // Tam ad hiçbir yerde saklanmaz: yalnızca sansürlü görünüm ("On*** Yı***")
    people.push({ name: maskFullName(ad, soyad), pin: pinToString(pin) });
  }
  // Aynı çift iki sırayla girilse de tek kayıt olsun
  people.sort((x, y) => (x.name + x.pin).localeCompare(y.name + y.pin, "tr"));
  const [pa, pb] = people;
  const r = computeScore(pinFromString(pa.pin)!, pinFromString(pb.pin)!);
  return { ok: true, entry: { a: pa, b: pb, score: r.score, band: bandOf(r.score) } };
}

/** Çiftin kimliği: sıradan bağımsız, yinelenmeyi önler. */
export function keyOf(e: TopEntry): string {
  return `${e.a.name}|${e.a.pin}|${e.b.name}|${e.b.pin}`;
}

/** Listeyi skora (büyükten küçüğe), eşitte yeniliğe göre sıralar. */
export function sortEntries<T extends StoredEntry>(list: T[]): T[] {
  return [...list].sort((x, y) => y.score - x.score || y.t - x.t);
}

/** Yeni kaydı ekler (aynı çift varsa günceller), sıralar ve en fazla `max` kayıt tutar. */
export function mergeEntry(list: StoredEntry[], entry: TopEntry, now: number, max = TOP_MAX): StoredEntry[] {
  const k = keyOf(entry);
  const rest = list.filter((e) => keyOf(e) !== k);
  return sortEntries([...rest, { ...entry, t: now }]).slice(0, max);
}

/** Depodan okunan veriyi güvenle çözer (bozuk kayıtları atar). */
export function parseStored(raw: unknown): StoredEntry[] {
  if (!Array.isArray(raw)) return [];
  const out: StoredEntry[] = [];
  for (const x of raw) {
    if (!x || typeof x !== "object") continue;
    const e = x as Partial<StoredEntry>;
    if (
      typeof e.score === "number" &&
      typeof e.t === "number" &&
      typeof e.a?.name === "string" &&
      typeof e.a?.pin === "string" &&
      typeof e.b?.name === "string" &&
      typeof e.b?.pin === "string"
    ) {
      out.push({ a: { name: ensureMasked(e.a.name), pin: e.a.pin }, b: { name: ensureMasked(e.b.name), pin: e.b.pin }, score: e.score, band: bandOf(e.score), t: e.t });
    }
  }
  return sortEntries(out);
}

export function publicView(list: StoredEntry[], limit: number): TopEntry[] {
  return list.slice(0, limit).map(({ a, b, score, band, t }) => ({ a, b, score, band, t }));
}

/** Bir kaydın listedeki sırası (1 tabanlı); yoksa 0. */
export function rankOf(list: StoredEntry[], entry: TopEntry): number {
  const k = keyOf(entry);
  return list.findIndex((e) => keyOf(e) === k) + 1;
}

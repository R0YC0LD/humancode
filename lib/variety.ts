// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/**
 * Deterministik çeşitlilik: rastgelelik yok, yapay zeka yok. Aynı girdi (kod) her zaman aynı
 * seçimi verir; farklı kodlar farklı metin varyantları ve öznitelik seçimleri alır.
 */

/** FNV-1a (32 bit): rakam dizisinden tohum. */
export function seedOf(nums: number[]): number {
  let h = 0x811c9dc5;
  for (const n of nums) {
    h ^= n & 0xff;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32: küçük, hızlı, deterministik üreteç. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Diziden tekrarsız n öğe seçer (kısmi Fisher–Yates); sıra da deterministiktir. */
export function pickN<T>(arr: readonly T[], n: number, seed: number, salt = 0): T[] {
  const r = rng((seed ^ Math.imul(salt + 1, 0x9e3779b1)) >>> 0);
  const a = arr.slice();
  const k = Math.min(n, a.length);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(r() * (a.length - i));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}

export function pick1<T>(arr: readonly T[], seed: number, salt = 0): T {
  return pickN(arr, 1, seed, salt)[0];
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { list, put } from "@vercel/blob";
import { getCache } from "@vercel/functions";
import { mergeEntry, parseStored, publicView, rankOf, type StoredEntry, type TopEntry } from "./toplist";

/**
 * Depolama: yalnızca Vercel'in kendi ücretsiz hizmetleri.
 *  - Toplist: Vercel Blob'da tek bir JSON dosyası (kalıcı).
 *  - Canlı sayaç / hız sınırı: Vercel Runtime Cache (geçici, yaklaşık değer).
 * Blob belirteci yoksa toplist kapalı kalır; site çalışmaya devam eder.
 */

const TOP_PATH = "toplist.json";
const PRESENCE_WINDOW_MS = 45_000;

export const storeEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;

let topUrl: string | null = null;
let topMemo: { at: number; data: StoredEntry[] } | null = null;

async function readTop(fresh: boolean): Promise<StoredEntry[]> {
  const now = Date.now();
  if (!fresh && topMemo && now - topMemo.at < 8_000) return topMemo.data;
  try {
    if (!topUrl) {
      const { blobs } = await list({ prefix: TOP_PATH, limit: 1 });
      if (!blobs.length) {
        topMemo = { at: now, data: [] };
        return [];
      }
      topUrl = blobs[0].url;
    }
    // Sorgu parametresi CDN önbelleğini atlar (güncel veri)
    const r = await fetch(`${topUrl}?v=${now}`, { cache: "no-store" });
    if (r.status === 404) {
      // Dosya silinmiş: boş liste say, adresi unut
      topUrl = null;
      topMemo = { at: now, data: [] };
      return [];
    }
    if (!r.ok) throw new Error(`blob ${r.status}`);
    const data = parseStored(await r.json());
    topMemo = { at: now, data };
    return data;
  } catch {
    return topMemo?.data ?? [];
  }
}

/** Toplist'in ilk `limit` kaydı. */
export async function topList(limit: number): Promise<TopEntry[]> {
  if (!storeEnabled()) return [];
  return publicView(await readTop(false), limit);
}

/** Bir kaydı ekler. (Aynı anda iki yazma çok nadiren birinin kaydını kaybettirebilir; kabul edilen risk.) */
export async function topAdd(entry: TopEntry): Promise<{ rank: number; total: number } | null> {
  if (!storeEnabled()) return null;
  const current = await readTop(true);
  const next = mergeEntry(current, entry, Date.now());
  const res = await put(TOP_PATH, JSON.stringify(next), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
  topUrl = res.url;
  topMemo = { at: Date.now(), data: next };
  return { rank: rankOf(next, entry), total: next.length };
}

const cache = () => getCache({ namespace: "hc" });

/** Nabız: tarayıcı kimliğini işaretler, son 45 saniyedeki farklı tarayıcı sayısını döndürür. */
export async function presenceBeat(id: string): Promise<number> {
  const c = cache();
  const now = Date.now();
  const cur = ((await c.get("presence")) as Record<string, number> | undefined) ?? {};
  const alive: Record<string, number> = {};
  for (const [k, t] of Object.entries(cur)) if (typeof t === "number" && now - t < PRESENCE_WINDOW_MS) alive[k] = t;
  alive[id] = now;
  await c.set("presence", alive, { ttl: 120 });
  return Object.keys(alive).length;
}

export async function presenceCount(): Promise<number> {
  const cur = ((await cache().get("presence")) as Record<string, number> | undefined) ?? {};
  const now = Date.now();
  return Object.values(cur).filter((t) => typeof t === "number" && now - t < PRESENCE_WINDOW_MS).length;
}

/** Basit hız sınırı (en iyi çaba): anahtar başına pencere içinde en fazla `max` istek. */
export async function rateLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  try {
    const c = cache();
    const slot = `rl:${key}:${Math.floor(Date.now() / (windowSec * 1000))}`;
    const n = (((await c.get(slot)) as number | undefined) ?? 0) + 1;
    await c.set(slot, n, { ttl: windowSec * 2 });
    return n <= max;
  } catch {
    return true;
  }
}

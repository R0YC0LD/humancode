// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { parseTopInput } from "@/lib/toplist";
import { rateLimit, storeEnabled, topAdd, topList } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Toplist: iki kişinin uyumluluk skorları, büyükten küçüğe. */
export async function GET(request: Request) {
  if (!storeEnabled()) return Response.json({ enabled: false, items: [] });
  const limit = Math.min(Math.max(Number(new URL(request.url).searchParams.get("limit")) || 20, 1), 100);
  try {
    const items = await topList(limit);
    return Response.json({ enabled: true, items }, { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" } });
  } catch {
    return Response.json({ enabled: false, items: [] });
  }
}

/** Bir karşılaştırma sonucunu toplist'e işler. Skor sunucuda kodlardan yeniden hesaplanır. */
export async function POST(request: Request) {
  if (!storeEnabled()) return Response.json({ ok: false, reason: "no-store" });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "bad-json" }, { status: 400 });
  }
  const parsed = parseTopInput(body);
  if (!parsed.ok) return Response.json({ ok: false, reason: parsed.reason }, { status: 400 });

  // Hız sınırı: IP başına dakikada 8 kayıt (en iyi çaba)
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!(await rateLimit(`top:${ip}`, 8, 60))) return Response.json({ ok: false, reason: "rate-limited" }, { status: 429 });

  try {
    const res = await topAdd(parsed.entry);
    return Response.json({ ok: true, score: parsed.entry.score, rank: res?.rank ?? null, total: res?.total ?? null });
  } catch {
    return Response.json({ ok: false, reason: "store-error" }, { status: 502 });
  }
}

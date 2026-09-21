// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { presenceBeat, presenceCount } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Anlık aktif kullanıcı sayısı (son 45 saniyede nabız gönderen tarayıcılar). */
export async function GET() {
  try {
    return Response.json({ count: await presenceCount() });
  } catch {
    return Response.json({ count: null });
  }
}

/** Nabız: tarayıcı kimliğini işaretler, güncel sayıyı döndürür. */
export async function POST(request: Request) {
  let id = "";
  try {
    const body = (await request.json()) as { id?: unknown };
    id = typeof body.id === "string" ? body.id : "";
  } catch {
    /* boş gövde */
  }
  if (!/^[A-Za-z0-9-]{8,48}$/.test(id)) return Response.json({ count: null }, { status: 400 });
  try {
    return Response.json({ count: await presenceBeat(id) });
  } catch {
    return Response.json({ count: null });
  }
}

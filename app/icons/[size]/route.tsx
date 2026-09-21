// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { brandIcon } from "@/lib/brandIcon";

type Ctx = { params: Promise<{ size: string }> };

/** /icons/192, /icons/512, /icons/maskable-512 → PWA simgeleri (PNG). */
export async function GET(_req: Request, { params }: Ctx) {
  const { size } = await params;
  const maskable = size.startsWith("maskable-");
  const n = Number(size.replace("maskable-", ""));
  if (![180, 192, 512].includes(n)) return new Response("Not found", { status: 404 });
  const img = brandIcon(n, maskable);
  img.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return img;
}

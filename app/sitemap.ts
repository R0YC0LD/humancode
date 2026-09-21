// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { MetadataRoute } from "next";

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/hesapla", "/karsilastir", "/toplist", "/rehber", "/rehber/elementler", "/rehber/yasam-dongusu", "/rehber/sinerji", "/rehber/koken", "/lisans"];
  const nine = Array.from({ length: 9 }, (_, i) => i + 1);
  const paths = [...fixed, ...nine.map((n) => `/rehber/rakam/${n}`), ...nine.map((n) => `/rehber/hane/${n}`)];
  return paths.map((p) => ({ url: `${site}${p}`, changeFrequency: p === "/toplist" ? "hourly" : "monthly", priority: p === "" ? 1 : 0.6 }));
}

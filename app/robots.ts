// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { MetadataRoute } from "next";

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site}/sitemap.xml`,
  };
}

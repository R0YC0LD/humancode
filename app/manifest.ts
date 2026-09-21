// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { MetadataRoute } from "next";

/** Ana ekrana eklenebilir (PWA) uygulama bildirimi. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HumanCODE — Kodunu çöz",
    short_name: "HumanCODE",
    description: "Doğum tarihinden 9 haneli kodunu çöz, iki kişinin sinerjisini karşılaştır.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "tr",
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { DIGITS } from "./digits";
import { HANELER } from "./haneler";
import { ELEMENT_INFO, ORIGIN_SECTIONS, PERSONAL_YEAR_THEMES } from "./guide";
import { TOOLBOX } from "./attributes";
import { ELEMENT_ORDER } from "@/lib/numerology";

export interface SearchEntry {
  title: string;
  href: string;
  kind: string;
  text: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const d of DIGITS) {
    out.push({
      title: `${d.n} · ${d.baslik}`,
      href: `/rehber/rakam/${d.n}`,
      kind: "Rakam",
      text: [d.oz, ...d.guc, ...d.golge, ...d.meslek, d.iliski.not, d.ruh.ad, d.ruh.anahtar, TOOLBOX[d.n - 1].arketip, ...TOOLBOX[d.n - 1].aktif, ...TOOLBOX[d.n - 1].reaktif, TOOLBOX[d.n - 1].eksik].join(" "),
    });
    out.push({
      title: `Sinerjide ${d.n}: ${d.ruh.ad}`,
      href: "/rehber/sinerji",
      kind: "Sinerji",
      text: `${d.ruh.anahtar} ${d.ruh.metin}`,
    });
  }
  for (const h of HANELER) {
    out.push({
      title: `h${h.n} · ${h.ad}`,
      href: `/rehber/hane/${h.n}`,
      kind: "Hane",
      text: [h.olcer, h.formul, ...DIGITS.map((d) => d.hane[h.n - 1])].join(" "),
    });
  }
  for (const e of ELEMENT_ORDER) {
    const x = ELEMENT_INFO[e];
    out.push({ title: `${x.ad} elementi`, href: "/rehber/elementler", kind: "Element", text: `${x.oz} ${x.fazla} ${x.eksik}` });
  }
  for (const y of PERSONAL_YEAR_THEMES) {
    out.push({ title: `Kişisel yıl ${y.n}: ${y.baslik}`, href: "/rehber/yasam-dongusu", kind: "Döngü", text: y.metin });
  }
  for (const s of ORIGIN_SECTIONS) {
    out.push({ title: s.baslik, href: "/rehber/koken", kind: "Köken", text: s.paragraflar.join(" ") });
  }
  return out;
}

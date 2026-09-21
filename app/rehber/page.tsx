// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { GuideSearch } from "@/components/GuideSearch";
import { MyCodeBadge } from "@/components/MyCodeBadge";
import { DIGITS } from "@/content/digits";
import { HANELER } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/guide";
import { buildSearchIndex } from "@/content/searchIndex";

export const metadata: Metadata = {
  title: "Kod Rehberi",
  description: "Rakamlar, haneler, elementler, yaşam döngüsü ve sinerji: HumanCODE'un sözlüğü.",
};

export default function Page() {
  const index = buildSearchIndex();
  return (
    <div>
      <p className="eyebrow">Kod Rehberi</p>
      <h1 className="display" style={{ margin: "12px 0 20px", fontSize: "clamp(40px, 7vw, 88px)" }}>
        Rakamların
        <br />
        sözlüğü.
      </h1>
      <p className="lead" style={{ maxWidth: "58ch", marginBottom: 40 }}>
        9 rakamın her biri, 9 hanenin her birinde başka bir anlama gelir. Burada her rakam, her hane, elementler, yaşam
        döngüsü ve sinerji ayrı ayrı anlatılır. Yorumlar bu sitenin kendi metinleridir.
      </p>

      <GuideSearch index={index} />

      <section aria-labelledby="rakamlar" style={{ marginTop: 72 }}>
        <h2 id="rakamlar" className="h2" style={{ marginBottom: 24 }}>Rakamlar</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))" }}>
          {DIGITS.map((d) => (
            <Link key={d.n} href={`/rehber/rakam/${d.n}`} className="card" style={{ padding: 20, display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="mono" style={{ fontSize: 44, lineHeight: 1 }}>{d.n}</span>
                <span style={{ color: ELEMENT_INFO[d.element].renk, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {ELEMENT_INFO[d.element].ad}
                </span>
              </div>
              <h3 className="h3" style={{ margin: "10px 0 4px" }}>{d.baslik}</h3>
              <p style={{ color: "var(--hc-muted)", fontSize: 13, marginBottom: 10 }}>{d.kisa}</p>
              <MyCodeBadge digit={d.n} />
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="haneler" style={{ marginTop: 72 }}>
        <h2 id="haneler" className="h2" style={{ marginBottom: 24 }}>Haneler</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}>
          {HANELER.map((h) => (
            <Link key={h.n} href={`/rehber/hane/${h.n}`} className="card" style={{ padding: 20, display: "block" }}>
              <span className="mono" style={{ color: "var(--hc-accent)" }}>h{h.n}</span>
              <h3 className="h3" style={{ margin: "6px 0 8px" }}>{h.ad}</h3>
              <p className="mono" style={{ color: "var(--hc-muted)", fontSize: 12 }}>{h.formul}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="digerleri" style={{ marginTop: 72 }}>
        <h2 id="digerleri" className="h2" style={{ marginBottom: 24 }}>Diğer bölümler</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}>
          {[
            { href: "/rehber/elementler", t: "Elementler", d: "Hava, su, ateş, toprak ve nötr; eksik element ne anlatır." },
            { href: "/rehber/yasam-dongusu", t: "Yaşam döngüsü", d: "9 yıllık dönemler ve her kişisel yılın teması." },
            { href: "/rehber/sinerji", t: "Sinerji rehberi", d: "Ruh duygusu hanesindeki 9 rakamın ilişki anlamı." },
            { href: "/rehber/koken", t: "Sistemin kökeni ve sınırları", d: "Nereden geliyor, neyi ölçmez, bilimsel durumu." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="card" style={{ padding: 20, display: "block" }}>
              <h3 className="h3" style={{ marginBottom: 8 }}>{x.t}</h3>
              <p style={{ color: "var(--hc-muted)", fontSize: 13 }}>{x.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { DIGITS } from "@/content/digits";
import { AREAS, BAND_INFO } from "@/content/haneler";
import { DIGIT_POINTS } from "@/lib/numerology";

export const metadata: Metadata = {
  title: "Sinerji Rehberi",
  description: "Ruh duygusu hanesindeki 9 rakamın ilişki anlamı, skor formülü ve bantlar.",
};

const BY_POINTS = [...DIGITS].sort((a, b) => DIGIT_POINTS[b.n] - DIGIT_POINTS[a.n]);

export default function Page() {
  return (
    <article className="prose-hc">
      <p className="eyebrow">Sinerji rehberi</p>
      <h1 className="display" style={{ margin: "12px 0 16px", fontSize: "clamp(40px, 7vw, 80px)" }}>İki kodun ortak dili.</h1>
      <p className="lead" style={{ maxWidth: "62ch" }}>
        İki kişinin haneleri tek tek toplanır (sHn = reduce(A.hn + B.hn)). Çıkan sekiz hane, sekiz hayat alanını temsil eder.
        Bunların içinde belirleyici olanı sH8, yani <strong>Ruh Duygusu</strong> hanesidir.
      </p>

      <h2 className="h2">Sekiz alan</h2>
      <div style={{ display: "grid", gap: 8, margin: "16px 0" }}>
        {AREAS.map((a) => (
          <div key={a.n} className="card" style={{ padding: "12px 18px", display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, alignItems: "baseline" }}>
            <span className="mono" style={{ color: "var(--hc-accent)" }}>sH{a.n}</span>
            <span>
              <strong>{a.ad}</strong>
              <span style={{ color: "var(--hc-muted)" }}> · {a.kalip}</span>
            </span>
          </div>
        ))}
      </div>

      <h2 className="h2">Skor nasıl hesaplanır</h2>
      <p className="mono" style={{ fontSize: 15 }}>skor = yuvarla(0,60 × sH8 puanı + 0,25 × element puanı + 0,15 × sH1 puanı)</p>
      <p>Yuvarlama yarım yukarıdır. Puan tablosu (sH8 ve sH1 için aynı):</p>
      <div className="card" style={{ overflowX: "auto", margin: "16px 0" }}>
        <table className="mono" style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: "var(--hc-muted)", textAlign: "left" }}>
              <th scope="col" style={{ padding: "10px 16px", fontWeight: 500 }}>Rakam</th>
              <th scope="col" style={{ padding: "10px 16px", fontWeight: 500 }}>Puan</th>
              <th scope="col" style={{ padding: "10px 16px", fontWeight: 500, fontFamily: "var(--font-sans)" }}>Bağ</th>
            </tr>
          </thead>
          <tbody>
            {BY_POINTS.map((d) => (
              <tr key={d.n} style={{ borderTop: "1px solid var(--hc-border)" }}>
                <td style={{ padding: "10px 16px" }}>{d.n}</td>
                <td style={{ padding: "10px 16px" }}>{DIGIT_POINTS[d.n]}</td>
                <td style={{ padding: "10px 16px", fontFamily: "var(--font-sans)" }}>{d.ruh.anahtar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Bantlar:</p>
      <ul>
        {(Object.values(BAND_INFO)).map((b) => (
          <li key={b.ad}><strong>{b.aralik}</strong> · {b.ad}</li>
        ))}
      </ul>
      <p>
        Element puanı için <Link href="/rehber/elementler" style={{ color: "var(--hc-accent)" }}>element uyum tablosuna</Link> bak.
      </p>

      <h2 className="h2">Ruh duygusunda 9 rakam</h2>
      <div style={{ display: "grid", gap: 14, margin: "16px 0" }}>
        {DIGITS.map((d) => (
          <section key={d.n} id={`ruh-${d.n}`} className="card" style={{ padding: 24, scrollMarginTop: 100 }} aria-labelledby={`ruh-h-${d.n}`}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <span className="mono" style={{ fontSize: 44, lineHeight: 1, color: "var(--hc-accent)" }}>{d.n}</span>
              <h3 id={`ruh-h-${d.n}`} className="h3" style={{ margin: 0 }}>{d.ruh.ad}</h3>
              <span className="badge badge-muted" style={{ marginLeft: "auto" }}>{DIGIT_POINTS[d.n]} puan</span>
            </div>
            <p style={{ color: "var(--hc-muted)", margin: "8px 0 12px" }}>{d.ruh.anahtar}</p>
            <p style={{ margin: 0 }}>{d.ruh.metin}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

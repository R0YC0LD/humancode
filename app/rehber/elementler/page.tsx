// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { ELEMENT_INFO } from "@/content/guide";
import { ELEMENT_ORDER, elementPoints } from "@/lib/numerology";

export const metadata: Metadata = {
  title: "Elementler",
  description: "Hava, su, ateş, toprak ve nötr: element dağılımı, eksik element ve uyum puanları.",
};

const FOUR = ELEMENT_ORDER.filter((e) => e !== "notr");

export default function Page() {
  return (
    <article className="prose-hc">
      <p className="eyebrow">Elementler</p>
      <h1 className="display" style={{ margin: "12px 0 16px", fontSize: "clamp(40px, 7vw, 80px)" }}>Dört element, bir denge.</h1>
      <p className="lead" style={{ maxWidth: "62ch" }}>
        Kodundaki her rakam bir elemente bağlıdır: 1 ve 5 hava, 2 ve 7 su, 3 ve 6 ateş, 4 ve 8 toprak. 9 nötrdür. Dokuz hanede hangi
        elementin kaç kez çıktığı, baskın elementini verir.
      </p>

      <div style={{ display: "grid", gap: 14, margin: "32px 0" }}>
        {ELEMENT_ORDER.map((e) => {
          const x = ELEMENT_INFO[e];
          return (
            <section key={e} className="card" style={{ padding: 24, borderLeft: `3px solid ${x.renk}` }} aria-labelledby={`el-${e}`}>
              <h2 id={`el-${e}`} className="h3" style={{ margin: 0, color: x.renk }}>
                {x.ad}{" "}
                <span className="mono" style={{ color: "var(--hc-muted)", fontWeight: 500 }}>
                  · {x.rakamlar.map((n, i) => (
                    <span key={n}>
                      {i > 0 && ", "}
                      <Link href={`/rehber/rakam/${n}`} style={{ color: "var(--hc-text)" }}>{n}</Link>
                    </span>
                  ))}
                </span>
              </h2>
              <p style={{ margin: "10px 0 8px" }}>{x.oz}</p>
              <p style={{ margin: "0 0 8px" }}><strong>Fazla olunca:</strong> {x.fazla}</p>
              <p style={{ margin: 0 }}><strong>Yoksa:</strong> {x.eksik}</p>
            </section>
          );
        })}
      </div>

      <h2 className="h2">Baskın element nasıl bulunur?</h2>
      <p>
        h1&#8209;h9 dokuz hanedeki rakamlar elementlerine göre sayılır; en çok çıkan element baskındır. Eşitlik varsa, eşit
        olanlardan biri Karakter hanesinin (h1) elementi ise o kazanır; değilse hava, su, ateş, toprak, nötr sırası uygulanır.
      </p>

      <h2 className="h2">İki elementin uyumu</h2>
      <p>İki kişinin baskın elementleri karşılaştırılır ve skorun %25&apos;ini belirler.</p>
      <div className="card" style={{ overflowX: "auto", margin: "16px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <caption className="sr-only">Element uyum puanları</caption>
          <thead>
            <tr>
              <th style={{ padding: 12 }} />
              {FOUR.map((e) => (
                <th key={e} scope="col" style={{ padding: 12, color: ELEMENT_INFO[e].renk }}>{ELEMENT_INFO[e].ad}</th>
              ))}
              <th scope="col" style={{ padding: 12, color: ELEMENT_INFO.notr.renk }}>Nötr</th>
            </tr>
          </thead>
          <tbody className="mono">
            {[...FOUR, "notr" as const].map((a) => (
              <tr key={a} style={{ borderTop: "1px solid var(--hc-border)" }}>
                <th scope="row" style={{ padding: 12, textAlign: "left", color: ELEMENT_INFO[a].renk, fontFamily: "var(--font-sans)" }}>{ELEMENT_INFO[a].ad}</th>
                {[...FOUR, "notr" as const].map((b) => (
                  <td key={b} style={{ padding: 12, textAlign: "center" }}>{elementPoints(a, b)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
        <li>Su + Toprak ve Ateş + Hava: 100. Su toprağı besler, hava ateşi körükler.</li>
        <li>Aynı element: 70. Benzerlik anlaşmayı kolaylaştırır ama körleşme riski taşır.</li>
        <li>Taraflardan biri nötr baskın: 75.</li>
        <li>Toprak + Hava: 40. Ayrı dünyalar.</li>
        <li>Su + Ateş: 35. Biri diğerini söndürebilir.</li>
        <li>Hava + Su ve Ateş + Toprak: 60. Farklı hızlarda iki element; orta düzey uyum.</li>
      </ul>
    </article>
  );
}

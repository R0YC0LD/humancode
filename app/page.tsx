// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { HowItWorks } from "@/components/HowItWorks";
import { TopPreview } from "@/components/TopPreview";
import { Reveal } from "@/components/Reveal";
import { DIGITS } from "@/content/digits";
import { ELEMENT_INFO, FAQ } from "@/content/guide";

const QUOTES = [DIGITS[1], DIGITS[4], DIGITS[6]]; // 2, 5, 7

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="container-hc" style={{ paddingTop: 120 }} aria-labelledby="nasil">
        <Reveal>
          <p className="eyebrow">Sistem</p>
          <h2 id="nasil" className="h2" style={{ margin: "12px 0 16px" }}>
            9 hane nasıl çıkar?
          </h2>
          <p className="lead" style={{ maxWidth: "62ch", marginBottom: 48 }}>
            Gün, ay ve yıl üç ayrı haneye indirilir. Kalan altısı bu üçünün toplamlarından türer. Aşağıdaki tarihi değiştir; hesap
            adım adım yanında görünür.
          </p>
        </Reveal>
        <HowItWorks />
      </section>

      <section className="container-hc" style={{ paddingTop: 120 }} aria-labelledby="iki">
        <Reveal>
          <p className="eyebrow">Sinerji</p>
          <h2 id="iki" className="h2" style={{ margin: "12px 0 16px", maxWidth: "18ch" }}>
            İki kod yan yana koyulunca
          </h2>
          <p className="lead" style={{ maxWidth: "62ch", marginBottom: 32 }}>
            İki kişinin haneleri tek tek toplanır ve yeni bir piramit çıkar. Bu piramit, ilk izlenimden ilişkinin ruhuna kadar 8 hayat
            alanında nerede anlaştığınızı gösterir. Romantik, arkadaşlık, iş ortaklığı ve ebeveyn–çocuk için ayrı yorum.
          </p>
          <Link href="/karsilastir" className="btn btn-primary">
            İki kodu karşılaştır
          </Link>
        </Reveal>
      </section>

      <section className="container-hc" style={{ paddingTop: 120 }} aria-labelledby="top">
        <Reveal>
          <p className="eyebrow">Toplist</p>
          <h2 id="top" className="h2" style={{ margin: "12px 0 24px" }}>
            En uyumlu çiftler
          </h2>
        </Reveal>
        <div style={{ maxWidth: 720 }}>
          <TopPreview />
        </div>
      </section>

      <section className="container-hc" style={{ paddingTop: 120 }} aria-labelledby="rehber">
        <Reveal>
          <p className="eyebrow">Rehber</p>
          <h2 id="rehber" className="h2" style={{ margin: "12px 0 32px" }}>
            Rehberden
          </h2>
        </Reveal>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          {QUOTES.map((d, i) => (
            <Reveal key={d.n} index={i}>
              <Link href={`/rehber/rakam/${d.n}`} className="card" style={{ display: "block", padding: 24, height: "100%" }}>
                <p className="mono" style={{ fontSize: 56, lineHeight: 1, color: "var(--hc-accent)" }}>{d.n}</p>
                <h3 className="h3" style={{ margin: "14px 0 8px" }}>
                  {d.baslik} <span style={{ color: ELEMENT_INFO[d.element].renk, fontWeight: 500 }}>· {ELEMENT_INFO[d.element].ad}</span>
                </h3>
                <p style={{ color: "var(--hc-text-2)" }}>{d.oz}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-hc" style={{ paddingTop: 120 }} aria-labelledby="sss">
        <Reveal>
          <p className="eyebrow">SSS</p>
          <h2 id="sss" className="h2" style={{ margin: "12px 0 32px" }}>
            Sık sorulanlar
          </h2>
        </Reveal>
        <div style={{ maxWidth: 820, borderTop: "1px solid var(--hc-border)" }}>
          {FAQ.map((q) => (
            <details key={q.s} style={{ borderBottom: "1px solid var(--hc-border)", padding: "18px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 17, listStyle: "none" }}>{q.s}</summary>
              <p style={{ color: "var(--hc-text-2)", marginTop: 10, maxWidth: "64ch", lineHeight: 1.65 }}>{q.c}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

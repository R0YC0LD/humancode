// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import { ORIGIN_SECTIONS, ORIGIN_SOURCES } from "@/content/guide";

export const metadata: Metadata = {
  title: "Sistemin Kökeni ve Sınırları",
  description: "HumanCODE'un dayandığı numeroloji yönteminin kökeni, hesabı, sınırları ve bilimsel durumu.",
};

export default function Page() {
  return (
    <article className="prose-hc">
      <p className="eyebrow">Sistemin kökeni</p>
      <h1 className="display" style={{ margin: "12px 0 24px", fontSize: "clamp(40px, 7vw, 80px)" }}>Kökeni ve sınırları.</h1>
      {ORIGIN_SECTIONS.map((s) => (
        <section key={s.baslik}>
          <h2 className="h2">{s.baslik}</h2>
          {s.paragraflar.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
      <section>
        <h2 className="h2">Kaynaklar</h2>
        <p>Yöntemin çerçevesi için bakılan, kamuya açık tanıtım ve özet sayfaları:</p>
        <ul>
          {ORIGIN_SOURCES.map((k) => (
            <li key={k.url}>
              <a href={k.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--hc-accent)" }}>
                {k.ad}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

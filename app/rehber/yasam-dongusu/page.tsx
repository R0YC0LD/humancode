// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import { CycleTool } from "@/components/CycleTool";
import { PERSONAL_YEAR_THEMES } from "@/content/guide";

export const metadata: Metadata = {
  title: "Yaşam Döngüsü",
  description: "9 yıllık dönemler, kişisel yıl hesabı ve her yılın teması.",
};

export default function Page() {
  return (
    <article className="prose-hc">
      <p className="eyebrow">Yaşam döngüsü</p>
      <h1 className="display" style={{ margin: "12px 0 16px", fontSize: "clamp(40px, 7vw, 80px)" }}>9 yıllık dalga.</h1>
      <p className="lead" style={{ maxWidth: "62ch" }}>
        Hayat, doğum yılından başlayarak 9&apos;ar yıllık dönemlere bölünür. Her dönemin içindeki yılların bir teması vardır: 1&apos;den 9&apos;a
        kadar ilerler, 9&apos;dan sonra yeniden 1 gelir.
      </p>

      <h2 className="h2">Kişisel yıl nasıl hesaplanır</h2>
      <p className="mono">kişisel yıl = reduce(h1 + h2 + reduce(yıl rakamları toplamı))</p>
      <p>
        Buradaki yıl takvim yılbaşında değil, <strong>doğum gününde</strong> değişir. 11 Şubat doğumlu biri için 10 Şubat 2026 hâlâ 2025&apos;in
        yılıdır; 11 Şubat 2026&apos;dan itibaren yeni yıl başlar. 29 Şubat doğumlular için artık olmayan yıllarda doğum günü 1 Mart sayılır.
      </p>
      <p className="mono" style={{ fontSize: 14 }}>
        Örnek: 11.02.1980 doğumlu, 2026 yaş yılı → reduce(2 + 2 + reduce(2+0+2+6 = 10 → 1)) = reduce(5) = 5.
      </p>

      <h2 className="h2">Kendi döngünü gör</h2>
      <CycleTool />

      <h2 className="h2">Kişisel yıl temaları</h2>
      <div style={{ display: "grid", gap: 10, margin: "16px 0" }}>
        {PERSONAL_YEAR_THEMES.map((y) => (
          <div key={y.n} className="card" style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "48px 1fr", gap: 16 }}>
            <span className="mono" style={{ fontSize: 32, lineHeight: 1, color: "var(--hc-accent)" }}>{y.n}</span>
            <div>
              <h3 className="h3" style={{ margin: "0 0 4px" }}>{y.baslik}</h3>
              <p style={{ margin: 0 }}>{y.metin}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

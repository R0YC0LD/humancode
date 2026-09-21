// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telif ve Lisans",
  description: "HumanCODE'un telif hakkı ve kullanım koşulları / Copyright and license notice.",
};

export default function Page() {
  return (
    <div className="container-hc page-top" style={{ paddingBottom: 48 }}>
      <p className="eyebrow">Telif ve Lisans · Copyright and License</p>
      <h1 className="display" style={{ margin: "14px 0 24px", fontSize: "clamp(36px, 6vw, 72px)" }}>Tüm hakları saklıdır.</h1>
      <div className="prose-hc" style={{ display: "grid", gap: 40 }}>
        <section lang="tr" aria-labelledby="tr">
          <h2 id="tr" className="h3">Türkçe</h2>
          <p>
            <strong>© 2026 Onur Teryakioğlu.</strong> HumanCODE’un kaynak kodu, tasarımı, görselleri, tüm yorum metinleri, adı ve
            simgesi 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası telif sözleşmeleri kapsamında korunur.
          </p>
          <ul>
            <li>Siteyi bir kullanıcı olarak serbestçe kullanabilirsiniz.</li>
            <li>Kaynak kodunu, metinleri veya tasarımı kopyalayamaz, değiştiremez, yeniden yayımlayamaz, barındıramaz, satamaz, yapay zekâ modellerini eğitmek için kullanamaz ya da kendi ürününüz gibi gösteremezsiniz.</li>
            <li>“HumanCODE” adı ve simgesi izinsiz kullanılamaz.</li>
            <li>İzin için GitHub üzerinden <strong>@R0YC0LD</strong> ile iletişime geçin.</li>
          </ul>
          <p>Yorumlar numerolojiye dayanır; bilimsel bir test değildir, eğlence ve kendini tanıma amaçlıdır.</p>
        </section>
        <section lang="en" aria-labelledby="en">
          <h2 id="en" className="h3">English</h2>
          <p>
            <strong>© 2026 Onur Teryakioğlu. All rights reserved.</strong> The source code, design, graphics, all interpretive
            texts, name and logo of HumanCODE are protected by copyright.
          </p>
          <ul>
            <li>You may use the website freely as an end user.</li>
            <li>You may not copy, modify, republish, host, sell, use to train AI/ML models, or present the source code, texts or design as your own.</li>
            <li>The “HumanCODE” name and logo may not be used without permission.</li>
            <li>For permission, contact <strong>@R0YC0LD</strong> on GitHub.</li>
          </ul>
          <p>Interpretations are based on numerology; they are not a scientific test and are for entertainment and self-reflection.</p>
        </section>
      </div>
    </div>
  );
}

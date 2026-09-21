// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { TopRows } from "@/components/TopRows";
import { storeEnabled, topList } from "@/lib/store";

export const metadata: Metadata = {
  title: "Toplist",
  description: "Sitede karşılaştırılan çiftlerin uyumluluk skoruna göre sıralaması.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const enabled = storeEnabled();
  const items = enabled ? await topList(50).catch(() => []) : [];
  return (
    <div className="container-hc page-top" style={{ paddingBottom: 48 }}>
      <p className="eyebrow">Toplist</p>
      <h1 className="display" style={{ margin: "14px 0 16px", fontSize: "clamp(40px, 8vw, 96px)" }}>
        En uyumlu
        <br />
        <span style={{ color: "var(--hc-accent)" }}>çiftler.</span>
      </h1>
      <p className="lead" style={{ maxWidth: "58ch", marginBottom: 32 }}>
        Sitede iki kişi karşılaştırıldığında sonuç otomatik olarak buraya işlenir ve uyumluluk skoruna göre büyükten küçüğe sıralanır.
        Adlar sansürlü görünür (adın ve soyadın ilk 2 harfi); tam ad ve doğum tarihi saklanmaz.
      </p>
      {!enabled ? (
        <div className="callout" style={{ maxWidth: 640 }}>
          <strong>Toplist şu an etkin değil.</strong>{" "}
          <span style={{ color: "var(--hc-text-2)" }}>Depolama bağlanınca sonuçlar burada listelenir.</span>
        </div>
      ) : items.length === 0 ? (
        <div className="callout" style={{ maxWidth: 640 }}>
          <strong>Henüz kimse yok.</strong>{" "}
          <span style={{ color: "var(--hc-text-2)" }}>İlk sıraya sen yerleş: iki kişiyi karşılaştır.</span>
        </div>
      ) : (
        <div style={{ maxWidth: 820 }}>
          <TopRows items={items} />
        </div>
      )}
      <p style={{ marginTop: 32 }}>
        <Link href="/karsilastir" className="btn btn-primary">Bir çifti karşılaştır</Link>
      </p>
    </div>
  );
}

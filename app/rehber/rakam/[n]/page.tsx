// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MyCodeBadge } from "@/components/MyCodeBadge";
import { DIGITS, getDigit } from "@/content/digits";
import { HANELER, MODES } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/guide";
import { getToolbox } from "@/content/attributes";

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DIGITS.map((d) => ({ n: String(d.n) }));
}

function digitOf(n: string) {
  return /^[1-9]$/.test(n) ? getDigit(Number(n)) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = digitOf((await params).n);
  if (!d) return { title: "Bulunamadı" };
  return { title: `Rakam ${d.n} · ${d.baslik}`, description: d.oz.slice(0, 155) };
}

export default async function Page({ params }: Props) {
  const d = digitOf((await params).n);
  if (!d) notFound();
  const el = ELEMENT_INFO[d.element];
  const tb = getToolbox(d.n);
  const prev = d.n > 1 ? d.n - 1 : null;
  const next = d.n < 9 ? d.n + 1 : null;

  return (
    <article className="prose-hc">
      <p className="eyebrow">Rakam</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, flexWrap: "wrap", margin: "12px 0 8px" }}>
        <h1 className="display mono" style={{ color: "var(--hc-accent)" }}>{d.n}</h1>
        <div>
          <p className="h2" style={{ margin: 0 }}>{d.baslik}</p>
          <p style={{ color: "var(--hc-muted)", margin: "4px 0 10px" }}>{d.kisa}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge badge-muted" style={{ color: el.renk }}>{el.ad}</span>
            <span className="badge badge-accent">Arketip: {tb.arketip}</span>
            <MyCodeBadge digit={d.n} />
          </div>
        </div>
      </div>

      <p className="lead" style={{ maxWidth: "62ch", margin: "24px 0 8px" }}>{d.oz}</p>

      <h2 className="h2">Araç kutusu: dengedeyken ve dengeyi kaybedince</h2>
      <p>
        Her rakamın iki yüzü vardır. Kişi dengedeyken <strong>aktif</strong> taraf çalışır; stres ve zorlanma altında{" "}
        <strong>reaktif</strong> taraf devreye girer. İkisi de aynı rakamın araçlarıdır: fark, hangisinin ne zaman kullanıldığındadır.
      </p>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", margin: "16px 0" }}>
        <div className="card" style={{ padding: 20 }}>
          <span className="badge badge-ok">Aktif (dengedeyken)</span>
          <ul style={{ marginTop: 14 }}>{tb.aktif.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <span className="badge badge-warn">Reaktif (dengeyi kaybedince)</span>
          <ul style={{ marginTop: 14 }}>{tb.reaktif.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <h2 className="h2">Kodunda {d.n} yoksa</h2>
      <p>{tb.eksik}</p>

      <h2 className="h2">Güçlü yanlar</h2>
      <ul>{d.guc.map((x) => <li key={x}>{x}</li>)}</ul>

      <h2 className="h2">Gölge yanlar</h2>
      <ul>{d.golge.map((x) => <li key={x}>{x}</li>)}</ul>

      <h2 className="h2">Meslek eğilimleri</h2>
      <ul>{d.meslek.map((x) => <li key={x}>{x}</li>)}</ul>
      <p style={{ color: "var(--hc-muted)", fontSize: 13 }}>Bunlar eğilim örnekleridir; bir mesleği belirlemez ya da dışlamaz.</p>

      <h2 className="h2">Diğer rakamlarla ilişkisi</h2>
      <p>{d.iliski.not}</p>
      <p>
        <strong>Rahat çalıştığı rakamlar:</strong>{" "}
        {d.iliski.rahat.map((n, i) => (
          <span key={n}>
            {i > 0 && ", "}
            <Link href={`/rehber/rakam/${n}`} style={{ color: "var(--hc-accent)" }}>{n}</Link>
          </span>
        ))}
        <br />
        <strong>Emek isteyen rakamlar:</strong>{" "}
        {d.iliski.zor.map((n, i) => (
          <span key={n}>
            {i > 0 && ", "}
            <Link href={`/rehber/rakam/${n}`} style={{ color: "var(--hc-accent)" }}>{n}</Link>
          </span>
        ))}
      </p>

      <h2 className="h2">9 hanede {d.n}</h2>
      <p>Bu rakam kodunun hangi hanesinde çıkarsa, orada aşağıdaki anlama gelir.</p>
      <div style={{ display: "grid", gap: 10, margin: "16px 0 8px" }}>
        {HANELER.map((h, i) => (
          <div key={h.n} className="card" style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 16px" }}>
            <Link href={`/rehber/hane/${h.n}`} className="mono" style={{ color: "var(--hc-accent)" }}>h{h.n}</Link>
            <span style={{ fontWeight: 600 }}>{h.ad}</span>
            <span />
            <span style={{ color: "var(--hc-text-2)" }}>{d.hane[i]}</span>
          </div>
        ))}
      </div>

      <h2 className="h2">Sinerjide {d.n}</h2>
      <p>
        İki kişinin bir hanesi toplanınca {d.n} çıkarsa, o alanda ilişki türüne göre şunlar öne çıkar:
      </p>
      <div style={{ display: "grid", gap: 10, margin: "16px 0" }}>
        {MODES.map((m) => (
          <div key={m.key} className="card" style={{ padding: "14px 18px" }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>{m.ad}</p>
            <p style={{ margin: "0 0 6px" }}><span className="badge badge-ok" style={{ marginRight: 8 }}>Güçlü</span>{d.mode[m.key].guc}</p>
            <p style={{ margin: 0 }}><span className="badge badge-warn" style={{ marginRight: 8 }}>Dikkat</span>{d.mode[m.key].dikkat}</p>
          </div>
        ))}
      </div>
      <p>
        <Link href="/rehber/sinerji" style={{ color: "var(--hc-accent)" }}>Ruh duygusu hanesinde {d.n} → {d.ruh.ad}</Link>
      </p>

      <nav aria-label="Rakamlar arası" style={{ display: "flex", justifyContent: "space-between", marginTop: 48, gap: 16 }}>
        {prev ? <Link className="btn" href={`/rehber/rakam/${prev}`}>← Rakam {prev}</Link> : <span />}
        {next ? <Link className="btn" href={`/rehber/rakam/${next}`}>Rakam {next} →</Link> : <span />}
      </nav>
    </article>
  );
}

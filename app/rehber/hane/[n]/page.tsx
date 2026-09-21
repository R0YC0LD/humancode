// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MiniHane } from "@/components/MiniHane";
import { DIGITS } from "@/content/digits";
import { HANELER } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/guide";

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return HANELER.map((h) => ({ n: String(h.n) }));
}

const haneOf = (n: string) => (/^[1-9]$/.test(n) ? HANELER[Number(n) - 1] : null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const h = haneOf((await params).n);
  if (!h) return { title: "Bulunamadı" };
  return { title: `Hane ${h.n} · ${h.ad}`, description: h.olcer };
}

export default async function Page({ params }: Props) {
  const h = haneOf((await params).n);
  if (!h) notFound();
  const prev = h.n > 1 ? h.n - 1 : null;
  const next = h.n < 9 ? h.n + 1 : null;

  return (
    <article className="prose-hc">
      <p className="eyebrow">Hane {h.n}</p>
      <h1 className="display" style={{ margin: "12px 0 16px", fontSize: "clamp(40px, 7vw, 80px)" }}>{h.ad}</h1>
      <p className="lead" style={{ maxWidth: "62ch" }}>{h.olcer}</p>

      <h2 className="h2">Nasıl hesaplanır</h2>
      <p className="mono" style={{ fontSize: 16 }}>h{h.n} = {h.formul}</p>
      {h.deps.length > 0 && (
        <p>
          Bu hane şu hanelerden beslenir:{" "}
          {h.deps.map((d, i) => (
            <span key={d}>
              {i > 0 && ", "}
              <Link href={`/rehber/hane/${d + 1}`} style={{ color: "var(--hc-accent)" }}>h{d + 1}</Link>
            </span>
          ))}
          .
        </p>
      )}
      <MiniHane n={h.n} />

      <h2 className="h2">Her rakam bu hanede ne anlama gelir</h2>
      <div style={{ display: "grid", gap: 10, margin: "16px 0" }}>
        {DIGITS.map((d) => (
          <Link key={d.n} href={`/rehber/rakam/${d.n}`} className="card" style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, alignItems: "baseline" }}>
            <span className="mono" style={{ fontSize: 32, lineHeight: 1 }}>{d.n}</span>
            <span>
              <span style={{ fontWeight: 600 }}>{d.baslik}</span>{" "}
              <span style={{ color: ELEMENT_INFO[d.element].renk, fontSize: 12 }}>· {ELEMENT_INFO[d.element].ad}</span>
              <br />
              <span style={{ color: "var(--hc-text-2)" }}>{h.lead} {d.hane[h.n - 1]}</span>
            </span>
          </Link>
        ))}
      </div>

      <nav aria-label="Haneler arası" style={{ display: "flex", justifyContent: "space-between", marginTop: 48, gap: 16 }}>
        {prev ? <Link className="btn" href={`/rehber/hane/${prev}`}>← Hane {prev}</Link> : <span />}
        {next ? <Link className="btn" href={`/rehber/hane/${next}`}>Hane {next} →</Link> : <span />}
      </nav>
    </article>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pyramid, staticCells } from "./Pyramid";
import { ElementDonut } from "./ElementDonut";
import { CycleStrip } from "./CycleStrip";
import { Disclaimer } from "./Disclaimer";
import { Reveal } from "./Reveal";
import { SectionNav, type NavItem } from "./SectionNav";
import type { CodeSlots } from "./CodeSlots";
import { HANELER } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/elements";
import { formulaLine } from "@/lib/formula";
import { ek } from "@/lib/turkish";
import type { Summary } from "@/lib/summary";
import type { HaneDetail } from "@/lib/codeView";
import {
  ELEMENT_ORDER,
  cycleYear,
  elementCounts,
  formatBirth,
  personalYear,
  pinToString,
  todayYmd,
  type BirthDate,
  type Pin,
  type Ymd,
} from "@/lib/numerology";

const NAMES = HANELER.map((h) => h.ad);

const NAV_BASE: NavItem[] = [
  { id: "ozet", label: "Kısaca" },
  { id: "piramit", label: "Piramit" },
  { id: "hane", label: "Hane hane" },
  { id: "rakamlar", label: "Rakamların" },
  { id: "portre", label: "Portre" },
  { id: "element", label: "Element" },
];
const NAV_FULL: NavItem[] = [...NAV_BASE, { id: "dongu", label: "Döngü" }, { id: "sozluk", label: "Sözlük" }];
const NAV_SHORT: NavItem[] = [...NAV_BASE, { id: "sozluk", label: "Sözlük" }];

function SecHead({ no, id, title, lead }: { no: string; id: string; title: string; lead?: string }) {
  return (
    <>
      <div className="sec-head">
        <span className="no">{no}</span>
        <h2 id={id} className="h2">{title}</h2>
      </div>
      <div className="rule" />
      {lead && <p style={{ color: "var(--hc-muted)", margin: "-12px 0 24px", maxWidth: "64ch" }}>{lead}</p>}
    </>
  );
}

export function CodeResult({
  pin,
  birth,
  today: todayProp,
  onReplay,
  replayHref,
  name,
  imza,
  summary,
  details,
  slots,
}: {
  pin: Pin;
  birth?: BirthDate | null;
  today?: Ymd | null;
  onReplay?: () => void;
  /** Sunucuda çizilen sayfalarda "Tekrar çöz" bir bağlantıdır. */
  replayHref?: string;
  name?: string;
  imza: string;
  summary: Summary;
  details: HaneDetail[];
  slots: CodeSlots;
}) {
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  // Bugünün tarihi kullanıcının saatine göre istemcide alınır (sunucu saat dilimi doğum günü sınırını bozmasın)
  const [todayState, setTodayState] = useState<Ymd | null>(todayProp ?? null);
  useEffect(() => {
    if (!todayProp) setTodayState(todayYmd());
  }, [todayProp]);
  const today = todayProp ?? todayState;
  const counts = elementCounts(pin);
  const det = details[sel];
  const line = formulaLine(sel, pin, birth);
  const dom = summary.baskinElement;
  const missing = ELEMENT_ORDER.filter((e) => e !== "notr" && counts[e] === 0);
  const py = birth && today ? personalYear(birth, cycleYear(birth, today)) : null;

  const share = async () => {
    const url = `${window.location.origin}/kod/${pinToString(pin)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Bağlantıyı kopyala:", url);
    }
  };

  return (
    <div className="container-hc page-top">
      {/* ---------- Kahraman panel ---------- */}
      <header className="hero-panel">
        <p className="eyebrow">{name ? `${ek(name, "gen")} Kod Çözümü` : "Kod Çözümü"}{birth ? ` · ${formatBirth(birth).replaceAll("-", ".")}` : " · paylaşılan kod"}</p>
        <div className="code-tiles" role="img" aria-label={`Kodun: ${pin.join(" ")}`}>
          {pin.map((v, i) => (
            <div key={i} className={`code-tile${i === 8 ? " last" : ""}`} style={{ ["--i" as string]: i }}>
              <span>
                {v}
                <small>h{i + 1}</small>
              </span>
            </div>
          ))}
        </div>
        <p className="lead" style={{ marginTop: 18, maxWidth: "58ch" }}>
          {name ? `${name}, ` : ""}imzan: <strong style={{ color: "var(--hc-accent)" }}>{imza}</strong>. {summary.dikkatCekici}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
          {onReplay && (
            <button type="button" className="btn" onClick={onReplay}>Tekrar çöz</button>
          )}
          {!onReplay && replayHref && <Link className="btn" href={replayHref}>Tekrar çöz</Link>}
          <button type="button" className="btn" onClick={share}>{copied ? "Bağlantı kopyalandı" : "Kodunu paylaş"}</button>
          <Link className="btn btn-primary" href={birth ? `/karsilastir?a=${formatBirth(birth)}${name ? `&n1=${encodeURIComponent(name)}` : ""}` : "/karsilastir"}>
            Bir başkasıyla eşleştir
          </Link>
        </div>
        <span role="status" className="sr-only">{copied ? "Bağlantı panoya kopyalandı" : ""}</span>
        <div className="stats">
          <div className="stat"><span>Baskın element</span><b style={{ color: ELEMENT_INFO[dom].renk }}>{ELEMENT_INFO[dom].ad}</b></div>
          <div className="stat"><span>Ağır basan rakam</span><b>{summary.enCok.rakam} <small style={{ color: "var(--hc-muted)", fontSize: 14 }}>×{summary.enCok.adet}</small></b></div>
          <div className="stat"><span>Kodunda olmayan</span><b>{summary.eksikSayisi} rakam</b></div>
          {py !== null && <div className="stat"><span>Kişisel yıl</span><b style={{ color: "var(--hc-accent)" }}>{py}</b></div>}
        </div>
      </header>

      <SectionNav items={birth && today ? NAV_FULL : NAV_SHORT} />

      {/* ---------- 01 Kısaca ---------- */}
      <section aria-labelledby="ozet" style={{ marginTop: 64 }}>
        <SecHead no="01" id="ozet" title={name ? `Kısaca ${name}` : "Kısaca sen"} lead="Kodunun üç katmanından (dışarıda, içeride, ruhunda) birer güçlü ve birer dikkat noktası." />
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="panel" style={{ padding: 22 }}>
            <span className="badge badge-ok">Güçlü yanların</span>
            <ul className="list-tight" style={{ marginTop: 16, display: "grid", gap: 12 }}>
              {summary.guclu.map((h) => (
                <li key={h.etiket}>
                  <span className="eyebrow" style={{ color: "var(--hc-muted)" }}>{h.etiket} · {h.rakam}</span>
                  <br />
                  <strong style={{ fontSize: 17 }}>{h.deger}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel" style={{ padding: 22 }}>
            <span className="badge badge-warn">Dikkat edeceklerin</span>
            <ul className="list-tight" style={{ marginTop: 16, display: "grid", gap: 12 }}>
              {summary.dikkat.map((h) => (
                <li key={h.etiket}>
                  <span className="eyebrow" style={{ color: "var(--hc-muted)" }}>{h.etiket} · {h.rakam}</span>
                  <br />
                  <strong style={{ fontSize: 17 }}>{h.deger}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="callout" style={{ marginTop: 14 }}>
          <strong>Nasıl okumalı?</strong>{" "}
          <span style={{ color: "var(--hc-text-2)" }}>
            Aşağıda önce piramit, sonra her hane ve her rakam açıklanır. Sonra bunlar birleştirilerek Kod Portresi çıkar. Terimlerin karşılığı en altta, sözlükte.
          </span>
        </div>
      </section>

      {/* ---------- 02 Piramit ---------- */}
      <section aria-labelledby="piramit" style={{ marginTop: 80 }}>
        <SecHead no="02" id="piramit" title="Piramit" lead="Bir haneye tıkla; hesabı ve anlamı yanda açılır." />
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", alignItems: "start" }}>
          <Pyramid cells={staticCells(pin)} names={NAMES} selected={sel} onSelect={setSel} title="Kod piramidi" />
          <aside className="panel" style={{ padding: 24 }} aria-live="polite">
            <p className="eyebrow">h{sel + 1} · {HANELER[sel].ad}</p>
            <p className="mono" style={{ fontSize: 56, lineHeight: 1, margin: "14px 0" }}>{pin[sel]}</p>
            <p style={{ color: "var(--hc-muted)", fontSize: 13, marginBottom: 6 }}>{HANELER[sel].olcer}</p>
            <p className="mono" style={{ fontSize: 13, margin: "12px 0", padding: "8px 10px", background: "var(--hc-bg)", border: "1px solid var(--hc-border)" }}>
              {HANELER[sel].formul}
              {line && (
                <>
                  <br />
                  <span style={{ color: "var(--hc-accent)" }}>{line}</span>
                </>
              )}
            </p>
            <h3 className="h3" style={{ marginTop: 16 }}>{det.rakam} · {det.arketip}</h3>
            <p style={{ color: "var(--hc-text-2)", margin: "8px 0 12px" }}>{det.metin}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge badge-muted">{det.elementAd}</span>
              <Link href={`/rehber/rakam/${det.rakam}`} className="badge badge-accent">Rakam {det.rakam} rehberi →</Link>
              <Link href={`/rehber/hane/${sel + 1}`} className="badge badge-accent">Hane {sel + 1} rehberi →</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- 03 Hane hane ---------- */}
      <section aria-labelledby="hane" style={{ marginTop: 80 }}>
        <SecHead no="03" id="hane" title="Hane hane kodun" lead="Dokuz hanenin her biri: ne anlattığı, senin kodunda nasıl hesaplandığı ve sana ne söylediği." />
        {slots.hane}
      </section>

      {/* ---------- 04 Rakamların ---------- */}
      <section aria-labelledby="rakamlar" style={{ marginTop: 80 }}>
        <SecHead no="04" id="rakamlar" title="Kodundaki rakamlar" lead="Kodunda geçen her rakamın kısa anlamı; en çok geçenden başlar." />
        {slots.rakamlar}
      </section>

      {/* ---------- 05 Portre ---------- */}
      <section aria-labelledby="portre" style={{ marginTop: 80 }}>
        <SecHead no="05" id="portre" title="Kod Portresi" lead="Rakamların birbirine göre durumundan kurulur: aynı kod her zaman aynı portreyi, farklı kodlar farklı portreleri verir." />
        {slots.portre}
      </section>

      {/* ---------- 06 Element ---------- */}
      <Reveal>
        <section aria-labelledby="element" style={{ marginTop: 80 }}>
          <SecHead no="06" id="element" title="Element dağılımı" lead="Her rakam bir elemente bağlıdır; dokuz hanedeki dağılım baskın elementini verir." />
          <ElementDonut counts={counts} />
          <div className="prose-hc" style={{ marginTop: 24 }}>
            <p><strong>Baskın: {ELEMENT_INFO[dom].ad}.</strong> {ELEMENT_INFO[dom].oz} {ELEMENT_INFO[dom].fazla}</p>
            {missing.map((e) => (
              <p key={e}><strong>Eksik: {ELEMENT_INFO[e].ad}.</strong> {ELEMENT_INFO[e].eksik}</p>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---------- 07 Döngü ---------- */}
      {birth && today && (
        <Reveal>
          <section aria-labelledby="dongu" style={{ marginTop: 80 }}>
            <SecHead no="07" id="dongu" title="Yaşam döngüsü" lead="9'ar yıllık dönemler ve içinde bulunduğun yılın teması." />
            <CycleStrip birth={birth} today={today} />
          </section>
        </Reveal>
      )}

      {/* ---------- Sözlük ---------- */}
      <section aria-labelledby="sozluk" style={{ marginTop: 80 }}>
        <SecHead no={birth && today ? "08" : "07"} id="sozluk" title="Sözlük" lead="Bu sayfada geçen terimler ne demek?" />
        {slots.glossary}
      </section>

      <Disclaimer />
    </div>
  );
}

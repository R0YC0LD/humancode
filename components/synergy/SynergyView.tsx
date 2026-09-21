// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";
import type { ReactNode } from "react";
import { Pyramid } from "../Pyramid";
import { staticCells } from "@/lib/cells";
import { ScoreRing } from "../ScoreRing";
import { Disclaimer } from "../Disclaimer";
import { type NavItem } from "../SectionNav";
import { Glossary } from "../Glossary";
import { ModeShell } from "./ModeShell";
import { getDigit } from "@/content/digits";
import { AREAS, BAND_INFO, MODES } from "@/content/haneler";
import { ELEMENT_INFO } from "@/content/elements";
import { elementPairNote } from "@/content/guide";
import { GLOSSARY_CODE, GLOSSARY_SYNERGY } from "@/content/glossary";
import { SCIENCE_DISCLAIMER } from "@/content/pairVoices";
import { computeScore, pickAreas, pinToString, type Mode, type Pin } from "@/lib/numerology";
import { buildChemistry, synergySeed } from "@/lib/chemistry";
import { buildAreaStory } from "@/lib/pairStory";
import { buildPortrait } from "@/lib/portrait";
import { buildSummary } from "@/lib/summary";
import { ek } from "@/lib/turkish";

const AREA_NAMES = AREAS.map((a) => a.ad);

const fmt = (n100: number) => (n100 / 100).toFixed(2);

const NAV: NavItem[] = [
  { id: "ozet", label: "Özet" },
  { id: "kimya", label: "Kimya" },
  { id: "sp", label: "Piramit" },
  { id: "alanlar", label: "Alanlar" },
  { id: "hesap", label: "Skor" },
  { id: "iki", label: "İki kod" },
  { id: "sozluk", label: "Sözlük" },
];

const barColor = (pts: number) => (pts >= 75 ? "var(--hc-success)" : pts >= 55 ? "var(--hc-text)" : pts >= 45 ? "var(--hc-warn)" : "var(--hc-accent)");

/**
 * Sinerji sonucu (sunucuda çizilebilir). İlişki türüne bağlı metinler tüm türler için üretilir;
 * ModeShell yalnızca hangisinin görüneceğini değiştirir.
 */
export function SynergyView({
  pinA,
  pinB,
  labelA,
  labelB,
  nameA,
  nameB,
  initialMode,
  actions,
}: {
  pinA: Pin;
  pinB: Pin;
  /** Doğum tarihi etiketleri (gösterim için). */
  labelA: string;
  labelB: string;
  nameA: string;
  nameB: string;
  initialMode: Mode;
  /** Kahraman paneldeki düğmeler (paylaş, tekrar çöz…). */
  actions?: ReactNode;
}) {
  const names = { A: nameA, B: nameB };
  const r = computeScore(pinA, pinB);
  const { best, friction } = pickAreas(r.sh);
  const band = BAND_INFO[r.band];
  const ruh = getDigit(r.sh[7]).ruh;
  const chem = buildChemistry(pinA, pinB, "romantik", names);
  const tipsByMode = MODES.map((m) => ({ key: m.key, tips: buildChemistry(pinA, pinB, m.key, names).ipuclari }));
  const seed = synergySeed(pinA, pinB);
  const stories = AREAS.map((_, i) => buildAreaStory(i, pinA, pinB, names, seed));
  const c8 = 60 * r.sh8Points;
  const cEl = 25 * r.elementPoints;
  const cK = 15 * r.characterPoints;
  const total100 = c8 + cEl + cK;

  return (
    <div className="container-hc page-top">
      <header className="hero-panel">
        <p className="eyebrow">Sinerji Çözümü</p>
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", alignItems: "center", marginTop: 14 }}>
          <div>
            <h1 className="display" style={{ fontSize: "clamp(34px, 6vw, var(--hc-big-title))" }}>
              {nameA} <span style={{ color: "var(--hc-accent)" }}>×</span> {nameB}
            </h1>
            <p className="mono" style={{ color: "var(--hc-muted)", fontSize: 12, marginTop: 10 }}>
              {labelA} · {labelB}
            </p>
            <p className="lead" style={{ marginTop: 16, maxWidth: "52ch" }}>
              {band.ad} ({band.aralik}). {ek(nameA, "gen")} ve {ek(nameB, "gen")} bağının özü: <strong>{ruh.anahtar.toLowerCase()}</strong>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              {actions}
              <Link className="btn" href="/toplist">Toplist</Link>
            </div>
          </div>
          <div style={{ justifySelf: "center" }}>
            <ScoreRing score={r.score} size={200} />
          </div>
        </div>
        <div className="stats">
          <div className="stat"><span>Bağın özü</span><b style={{ fontSize: 16 }}>{ruh.ad}</b></div>
          <div className="stat"><span>Baskın elementler</span><b style={{ fontSize: 16 }}>{ELEMENT_INFO[r.elementA].ad} + {ELEMENT_INFO[r.elementB].ad}</b></div>
          <div className="stat"><span>En güçlü alan</span><b style={{ fontSize: 16 }}>{AREAS[best[0].index].ad}</b></div>
          <div className="stat"><span>En zorlu alan</span><b style={{ fontSize: 16 }}>{AREAS[friction[0].index].ad}</b></div>
        </div>
      </header>

      <ModeShell initialMode={initialMode} nav={NAV}>

      <section id="ozet" aria-label="Özet" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", marginTop: 32 }}>
        <div className="panel" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ color: "var(--hc-success)" }}>En iyi anlaştığınız alanlar</p>
          <ul style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {best.map((a) => (
              <li key={a.index}>
                <a href={`#alan-${a.index}`} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                  <span className="mono" style={{ color: "var(--hc-success)" }}>{a.digit}</span>
                  <span>{AREAS[a.index].ad}</span>
                  <span className="mono" style={{ marginLeft: "auto", color: "var(--hc-muted)" }}>{a.points}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ color: "var(--hc-warn)" }}>Sürtüşme çıkabilecek alanlar</p>
          <ul style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {friction.map((a) => (
              <li key={a.index}>
                <a href={`#alan-${a.index}`} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                  <span className="mono" style={{ color: "var(--hc-warn)" }}>{a.digit}</span>
                  <span>{AREAS[a.index].ad}</span>
                  <span className="mono" style={{ marginLeft: "auto", color: "var(--hc-muted)" }}>{a.points}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <p className="eyebrow">Bu ilişkiyi ne taşır</p>
          <p style={{ marginTop: 12, color: "var(--hc-text-2)" }}>
            <strong>{ruh.ad}.</strong> Baskın elementleriniz {ELEMENT_INFO[r.elementA].ad} ({nameA}) ve {ELEMENT_INFO[r.elementB].ad} ({nameB}). {elementPairNote(r.elementA, r.elementB)}
          </p>
        </div>
      </section>

      <section aria-labelledby="kimya" style={{ marginTop: 72 }}>
        <h2 id="kimya" className="h2" style={{ marginBottom: 8 }}>Kimya ve sözleşme</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 24, maxWidth: "62ch" }}>
          İki kodun karşılaşması bir tür kimyasal tepkime gibi okunur: ortaya çıkan karışımın örtük bir “sözleşmesi” vardır.
        </p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
          <article className="panel" style={{ padding: 24 }}>
            <p className="eyebrow">{chem.baslik}</p>
            <p style={{ color: "var(--hc-text-2)", lineHeight: 1.7, margin: "10px 0" }}>{chem.ozet}</p>
            <p style={{ color: "var(--hc-text-2)", lineHeight: 1.7, margin: 0 }}>{chem.karsilasma}</p>
          </article>
          <article className="panel" style={{ padding: 24 }}>
            <p className="eyebrow">{nameA} ve {ek(nameB, "gen")} örtük sözleşmesi</p>
            <p style={{ color: "var(--hc-text-2)", lineHeight: 1.7, margin: "10px 0 16px" }}>{chem.sozlesme}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <span className="badge badge-ok">Dengedeyken</span>
              {chem.aktif.map((a) => <span key={a} style={{ color: "var(--hc-text-2)", fontSize: 13 }}>{a}</span>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span className="badge badge-warn">Dengeyi kaybedince</span>
              {chem.reaktif.map((a) => <span key={a} style={{ color: "var(--hc-text-2)", fontSize: 13 }}>{a}</span>)}
            </div>
          </article>
        </div>
        <h3 className="h3" style={{ margin: "28px 0 12px" }}>{nameA} ve {nameB} için işe yarayanlar</h3>
        {tipsByMode.map((tm) => (
          <ul key={tm.key} data-m={tm.key} style={{ display: "grid", gap: 10, maxWidth: 780 }}>
            {tm.tips.map((t) => (
              <li key={t.alan} className="panel" style={{ padding: "14px 18px" }}>
                <span className="badge badge-accent" style={{ marginRight: 10 }}>{t.alan}</span>
                <span style={{ color: "var(--hc-text-2)" }}>{t.metin}</span>
              </li>
            ))}
          </ul>
        ))}
      </section>

      <section aria-labelledby="sp" style={{ marginTop: 72 }}>
        <h2 id="sp" className="h2" style={{ marginBottom: 8 }}>Sinerji piramidi</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 24 }}>Her hane, iki kişinin aynı hanelerinin toplamıdır (sHn = reduce(A.hn + B.hn)). Tıklayınca ilgili alana gider.</p>
        <div style={{ maxWidth: 620 }}>
          <Pyramid cells={staticCells(r.sh)} names={AREA_NAMES} count={8} tag="sH" hrefPrefix="#alan-" title="Sinerji piramidi" />
        </div>
      </section>

      <section aria-labelledby="alanlar" style={{ marginTop: 72 }}>
        <h2 id="alanlar" className="h2" style={{ marginBottom: 8 }}>Alan alan çözümleme</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 24, maxWidth: "64ch" }}>
          Her alan, o alana özgü haneden okunur: {nameA} ve {nameB} kendi kodlarındaki karşılık gelen rakamla, birlikte ise iki rakamın toplamıyla yorumlanır.
        </p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))" }}>
          {AREAS.map((a, i) => {
            const st = stories[i];
            return (
              <article key={a.n} id={`alan-${i}`} tabIndex={-1} className="panel" style={{ padding: 24, scrollMarginTop: 120 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="mono" style={{ fontSize: 40, lineHeight: 1 }}>{st.sh}</span>
                  <div style={{ flex: 1 }}>
                    <p className="eyebrow">sH{a.n} · h{a.n}</p>
                    <h3 className="h3">{a.ad}</h3>
                  </div>
                  <span className="mono" style={{ color: "var(--hc-muted)" }} aria-label={`${st.points} puan`}>{st.points}</span>
                </div>
                <div className="bar" style={{ marginTop: 12 }} aria-hidden="true">
                  <i style={{ width: `${st.points}%`, background: barColor(st.points) }} />
                </div>
                <p style={{ color: "var(--hc-muted)", fontStyle: "italic", margin: "12px 0 4px" }}>{a.kalip}</p>
                <p style={{ color: "var(--hc-muted)", fontSize: 13, margin: 0 }}>
                  {MODES.map((m) => (
                    <span key={m.key} data-m={m.key}>{a.baglam[m.key]}</span>
                  ))}
                </p>

                <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                  <p style={{ margin: 0, color: "var(--hc-text-2)" }}>
                    <span className="badge badge-muted" style={{ marginRight: 8 }}>{nameA} · {st.digitA}</span>
                    {st.kisiA}
                  </p>
                  <p style={{ margin: 0, color: "var(--hc-text-2)" }}>
                    <span className="badge badge-muted" style={{ marginRight: 8 }}>{nameB} · {st.digitB}</span>
                    {st.kisiB}
                  </p>
                </div>

                <div style={{ display: "grid", gap: 12, marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--hc-border)" }}>
                  <p style={{ margin: 0, color: "var(--hc-text-2)" }}>
                    <span className="badge badge-ok" style={{ marginRight: 8 }}>Güçlü</span>
                    {st.guc}
                  </p>
                  <p style={{ margin: 0, color: "var(--hc-text-2)" }}>
                    <span className="badge badge-warn" style={{ marginRight: 8 }}>Dikkat</span>
                    {st.dikkat}
                  </p>
                </div>

                <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--hc-border)", display: "grid", gap: 10 }}>
                  <p style={{ margin: 0, color: "var(--hc-text-2)" }}>
                    <span className="badge badge-accent" style={{ marginRight: 8 }}>Birbirlerine karşı</span>
                    {st.tutum}
                  </p>
                  {st.nedenler.map((n, k) => (
                    <p key={k} style={{ margin: 0, color: "var(--hc-muted)", fontSize: 14, lineHeight: 1.65 }}>{n}</p>
                  ))}
                </div>

                <details style={{ marginTop: 16 }}>
                  <summary style={{ cursor: "pointer", color: "var(--hc-muted)", fontSize: 13 }}>Bilim notu: {st.bilim.konu}</summary>
                  <p style={{ color: "var(--hc-text-2)", fontSize: 13.5, lineHeight: 1.65, margin: "10px 0 4px" }}>{st.bilim.not}</p>
                  <p className="mono" style={{ color: "var(--hc-muted)", fontSize: 11, margin: 0 }}>Kaynak: {st.bilim.kaynak}</p>
                </details>
              </article>
            );
          })}
        </div>
        <p style={{ color: "var(--hc-muted)", fontSize: 12.5, marginTop: 20, maxWidth: "72ch" }}>{SCIENCE_DISCLAIMER}</p>
      </section>

      <section aria-labelledby="hesap" style={{ marginTop: 72 }}>
        <h2 id="hesap" className="h2" style={{ marginBottom: 8 }}>Skor nasıl çıktı?</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 20 }}>
          Ruh duygusu %60, element uyumu %25, karakter %15. Aynı iki tarih her zaman aynı skoru verir.
        </p>
        <div className="panel" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--hc-muted)" }}>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Bileşen</th>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Değer</th>
                <th className="mono" style={{ padding: "12px 16px", fontWeight: 500 }}>Puan</th>
                <th className="mono" style={{ padding: "12px 16px", fontWeight: 500 }}>Ağırlık</th>
                <th className="mono" style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>Katkı</th>
              </tr>
            </thead>
            <tbody className="mono">
              <tr style={{ borderTop: "1px solid var(--hc-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-sans)" }}>Ruh duygusu (sH8)</td>
                <td style={{ padding: "12px 16px" }}>{r.sh[7]}</td>
                <td style={{ padding: "12px 16px" }}>{r.sh8Points}</td>
                <td style={{ padding: "12px 16px" }}>0.60</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>{fmt(c8)}</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--hc-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-sans)" }}>
                  Element ({ELEMENT_INFO[r.elementA].ad} + {ELEMENT_INFO[r.elementB].ad})
                </td>
                <td style={{ padding: "12px 16px" }}>—</td>
                <td style={{ padding: "12px 16px" }}>{r.elementPoints}</td>
                <td style={{ padding: "12px 16px" }}>0.25</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>{fmt(cEl)}</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--hc-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-sans)" }}>Karakter (sH1)</td>
                <td style={{ padding: "12px 16px" }}>{r.sh[0]}</td>
                <td style={{ padding: "12px 16px" }}>{r.characterPoints}</td>
                <td style={{ padding: "12px 16px" }}>0.15</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>{fmt(cK)}</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--hc-border-strong)" }}>
                <td colSpan={4} style={{ padding: "12px 16px", fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Toplam → yuvarlanmış skor
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700 }}>
                  {fmt(total100)} → <span style={{ color: "var(--hc-accent)" }}>{r.score}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="iki" style={{ marginTop: 72 }}>
        <h2 id="iki" className="h2" style={{ marginBottom: 8 }}>İki kod, tek tek</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 24, maxWidth: "62ch" }}>
          Sinerjiyi anlamak için önce her birinizin kodunu bilmek yardımcı olur. Tam portre için kodların sayfasına geçin.
        </p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
          {[{ l: nameA, p: pinA }, { l: nameB, p: pinB }].map(({ l, p }) => {
            const pt = buildPortrait(p);
            const sm = buildSummary(p);
            return (
              <article key={l + pinToString(p)} className="panel" style={{ padding: 24 }}>
                <p className="eyebrow">{l}</p>
                <Pyramid cells={staticCells(p)} showLabels={false} title={`${l} piramidi`} />
                <p style={{ margin: "14px 0 6px" }}>
                  <strong>İmza:</strong> <span style={{ color: "var(--hc-accent)" }}>{pt.imza}</span>
                </p>
                <p style={{ color: "var(--hc-text-2)", margin: "0 0 10px" }}>{sm.dikkatCekici}</p>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--hc-muted)" }}>
                  Güçlü: {sm.guclu.map((g) => g.deger).join(", ")} · Dikkat: {sm.dikkat.map((g) => g.deger).join(", ")}
                </p>
                <Link href={`/kod/${pinToString(p)}`} style={{ color: "var(--hc-accent)", fontSize: 13 }}>{ek(l, "gen")} tam kod portresi →</Link>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="sozluk" style={{ marginTop: 72 }}>
        <h2 id="sozluk" className="h2" style={{ marginBottom: 8 }}>Sözlük</h2>
        <p style={{ color: "var(--hc-muted)", marginBottom: 20 }}>Bu sayfada geçen terimler ne demek?</p>
        <Glossary terms={[...GLOSSARY_SYNERGY, ...GLOSSARY_CODE.slice(0, 6)]} />
      </section>

      </ModeShell>

      <Disclaimer />
    </div>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BirthField } from "./BirthField";
import { FullNameFields } from "./FullNameFields";
import { ShareButton } from "./synergy/ShareButton";
import { RippleButton } from "./HesaplaClient";
import { EMPTY_FIELDS, fieldsFromDate, loadSavedBirth, loadSavedName, loadSavedSurname, nameError, saveName, saveSurname, validateFields, type BirthFields } from "@/lib/birthForm";
import { cleanName } from "@/lib/names";
import { computePin, formatBirth, parseBirth, pinToString, type BirthDate, type Mode } from "@/lib/numerology";
import { isMode } from "@/content/haneler";
import { TRANSITION } from "@/lib/motion";

const DecodeScene = dynamic(() => import("./DecodeScene").then((m) => m.DecodeScene), { ssr: false });
const SynergyView = dynamic(() => import("./synergy/SynergyView").then((m) => m.SynergyView), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100dvh" }} aria-busy="true" />,
});

type Phase = "form" | "scene" | "result";
const dot = (d: BirthDate) => formatBirth(d).replaceAll("-", ".");

export function KarsilastirClient({
  initialA,
  initialB,
  initialM,
  initialN1,
  initialN2,
  initialScene,
}: {
  initialA: string | null;
  initialB: string | null;
  initialM: string | null;
  initialN1: string;
  initialN2: string;
  initialScene: boolean;
}) {
  const init = useMemo(() => {
    const da = parseBirth(initialA);
    const db = parseBirth(initialB);
    const ok = da && db && validateFields(fieldsFromDate(da)).ok && validateFields(fieldsFromDate(db)).ok;
    return { da, db, both: !!ok };
  }, [initialA, initialB]);
  const [fa, setFa] = useState<BirthFields>(init.da ? fieldsFromDate(init.da) : EMPTY_FIELDS);
  const [fb, setFb] = useState<BirthFields>(init.db ? fieldsFromDate(init.db) : EMPTY_FIELDS);
  const [na, setNa] = useState(initialN1);
  const [nb, setNb] = useState(initialN2);
  const [sa, setSa] = useState("");
  const [sb, setSb] = useState("");
  const [rank, setRank] = useState<number | null>(null);
  const [inTop, setInTop] = useState(true);
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>(init.both ? (initialScene ? "scene" : "result") : "form");
  const [a, setA] = useState<BirthDate | null>(init.both ? init.da : null);
  const [b, setB] = useState<BirthDate | null>(init.both ? init.db : null);
  const mode: Mode = isMode(initialM) ? initialM : "romantik";

  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    if (!init.da) {
      const saved = parseBirth(loadSavedBirth());
      if (saved) setFa(fieldsFromDate(saved));
    }
    if (!initialN1) {
      const sn = loadSavedName();
      if (sn) setNa(sn);
    }
    const ss = loadSavedSurname();
    if (ss) setSa(ss);
    if (init.both && initialScene && init.da && init.db) {
      window.history.replaceState(
        null,
        "",
        `/karsilastir?a=${formatBirth(init.da)}&b=${formatBirth(init.db)}&m=${mode}${initialN1 ? `&n1=${encodeURIComponent(initialN1)}` : ""}${initialN2 ? `&n2=${encodeURIComponent(initialN2)}` : ""}`,
      );
    }
  }, [init, initialN1, initialN2, initialScene, mode]);

  const ra = validateFields(fa);
  const rb = validateFields(fb);
  const errA = touched && !ra.ok ? (ra.error ?? "Birinci tarihi gir.") : null;
  const errB = touched && !rb.ok ? (rb.error ?? "İkinci tarihi gir.") : null;
  const nErrA = touched ? nameError(na) : null;
  const nErrB = touched ? nameError(nb) : null;
  const sErrA = touched ? nameError(sa) : null;
  const sErrB = touched ? nameError(sb) : null;
  const cna = cleanName(na);
  const cnb = cleanName(nb);
  const pinA = useMemo(() => (a ? computePin(a) : null), [a]);
  const pinB = useMemo(() => (b ? computePin(b) : null), [b]);

  const urlFor = (m: Mode, da = a, db = b, n1 = cna, n2 = cnb) =>
    da && db
      ? `/karsilastir?a=${formatBirth(da)}&b=${formatBirth(db)}&m=${m}${n1 ? `&n1=${encodeURIComponent(n1)}` : ""}${n2 ? `&n2=${encodeURIComponent(n2)}` : ""}`
      : "/karsilastir";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!ra.ok || !rb.ok || nameError(na) || nameError(nb) || nameError(sa) || nameError(sb)) return;
    setNa(cna);
    setNb(cnb);
    saveName(cna);
    saveSurname(cleanName(sa));
    setRank(null);
    setA(ra.date);
    setB(rb.date);
    window.history.replaceState(null, "", urlFor(mode, ra.date, rb.date, cna, cnb));
    // Sonuç otomatik toplist'e işlenir (yalnızca ad, skor ve kod; doğum tarihi gönderilmez)
    if (inTop) {
      void fetch("/api/toplist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          a: { ad: cna, soyad: cleanName(sa), pin: pinToString(computePin(ra.date)) },
          b: { ad: cnb, soyad: cleanName(sb), pin: pinToString(computePin(rb.date)) },
        }),
      })
        .then((r) => r.json())
        .then((j: { ok?: boolean; rank?: number | null }) => {
          if (j.ok && typeof j.rank === "number" && j.rank > 0) setRank(j.rank);
        })
        .catch(() => {});
    }
    setPhase("scene");
  };

  if (phase === "scene" && pinA && pinB && a && b) {
    return <DecodeScene pinA={pinA} pinB={pinB} labelA={cna || dot(a)} labelB={cnb || dot(b)} onDone={() => setPhase("result")} />;
  }

  if (phase === "result" && pinA && pinB && a && b) {
    return (
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={TRANSITION.scene}>
        <SynergyView
          pinA={pinA}
          pinB={pinB}
          labelA={dot(a)}
          labelB={dot(b)}
          nameA={cna || "Birinci kişi"}
          nameB={cnb || "İkinci kişi"}
          initialMode={mode}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setPhase("scene")}>Tekrar çöz</button>
              <ShareButton />
              {rank !== null && <span className="badge badge-accent" style={{ alignSelf: "center" }}>Toplist’te {rank}. sıra</span>}
            </>
          }
        />
      </motion.div>
    );
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="page-glow" aria-hidden="true" />
      <div className="container-hc page-top" style={{ position: "relative", paddingBottom: 96, minHeight: "70dvh" }}>
        <p className="eyebrow">Sinerji Çözümü</p>
        <h1 className="display" style={{ margin: "14px 0 20px" }}>
          İki kod.
          <br />
          <span style={{ color: "var(--hc-accent)" }}>Bir sinerji.</span>
        </h1>
        <p className="lead" style={{ maxWidth: "56ch", marginBottom: 40 }}>
          İki kişinin adını ve doğum tarihini gir; hane hane hangi alanda anlaştığınızı ve nerede sürtüştüğünüzü, isimlerle yazılmış yorumlarla gör. Giriş gerekmez.
        </p>
        <form onSubmit={submit} noValidate>
          <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", maxWidth: 780 }}>
            <div>
              <FullNameFields id="ka" who="Birinci kişinin" ad={na} soyad={sa} onAd={setNa} onSoyad={setSa} errorAd={nErrA} errorSoyad={sErrA} autoFocus />
              <BirthField id="ka" legend="Doğum tarihi" value={fa} onChange={setFa} error={errA} />
            </div>
            <div>
              <FullNameFields id="kb" who="İkinci kişinin" ad={nb} soyad={sb} onAd={setNb} onSoyad={setSb} errorAd={nErrB} errorSoyad={sErrB} placeholderAd="ör. Nehir" placeholderSoyad="ör. Kaya" />
              <BirthField id="kb" legend="Doğum tarihi" value={fb} onChange={setFb} error={errB} />
            </div>
          </div>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "20px 0 12px", maxWidth: 560, color: "var(--hc-text-2)", fontSize: 14, cursor: "pointer" }}>
            <input type="checkbox" checked={inTop} onChange={(e) => setInTop(e.target.checked)} style={{ marginTop: 4, accentColor: "var(--hc-accent)" }} />
            <span>
              Sonucu <strong>Toplist</strong>’te göster. Herkese açık listede adlar sansürlü görünür (adın ve soyadın ilk 2 harfi, ör. <strong>On*** Yı***</strong>), yanında uyumluluk skoru ve kodlar yer alır. Tam ad ve doğum tarihleri hiçbir yerde saklanmaz.
            </span>
          </label>
          <RippleButton type="submit">Sinerjiyi çöz</RippleButton>
        </form>
      </div>
    </div>
  );
}

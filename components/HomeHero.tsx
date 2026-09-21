// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BirthField } from "./BirthField";
import { FullNameFields } from "./FullNameFields";
import { MatrixRain } from "./MatrixRain";
import { RippleButton } from "./HesaplaClient";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EMPTY_FIELDS, fieldsFromDate, loadSavedBirth, loadSavedName, loadSavedSurname, nameError, saveName, saveSurname, validateFields, type BirthFields } from "@/lib/birthForm";
import { cleanName } from "@/lib/names";
import { formatBirth, parseBirth } from "@/lib/numerology";

export function HomeHero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [f, setF] = useState<BirthFields>(EMPTY_FIELDS);
  const [name, setName] = useState("");
  const [sur, setSur] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const saved = parseBirth(loadSavedBirth());
    if (saved) setF(fieldsFromDate(saved));
    setName(loadSavedName());
    setSur(loadSavedSurname());
  }, []);

  const res = validateFields(f);
  const error = touched && !res.ok ? (res.error ?? "Doğum tarihini gir.") : null;

  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: "100dvh", display: "flex", alignItems: "center" }} aria-labelledby="hero-title">
      {!reduce && (
        <div style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}>
          <MatrixRain speed={0.7} alpha={0.85} className="rain-bg" startTier={1} deferStart />
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 45%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.85) 100%)" }} />
      <div className="container-hc" style={{ position: "relative", paddingTop: "var(--hc-top)", paddingBottom: 72 }}>
        <p className="eyebrow">Her insanın bir kodu var</p>
        <h1 id="hero-title" className="display" style={{ margin: "16px 0 24px", fontSize: "clamp(52px, 10vw, 128px)" }}>
          Kodunu
          <br />
          <span style={{ color: "var(--hc-accent)" }} className="caret">
            çöz
          </span>
        </h1>
        <p className="lead" style={{ maxWidth: "52ch", marginBottom: 40 }}>
          Doğum tarihinden 9 haneli bir kod çıkar. İki kişinin kodunu yan yana koy, hangi alanda anlaştığınızı ve nerede
          sürtüştüğünüzü hane hane gör. Yapay zeka yok: sabit matematik, yazılmış yorumlar.
        </p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setTouched(true);
            if (res.ok && !nameError(name) && !nameError(sur)) {
              const clean = cleanName(name);
              saveName(clean);
              saveSurname(cleanName(sur));
              router.push(`/hesapla?d=${formatBirth(res.date)}&n=${encodeURIComponent(clean)}&scene=1`);
            }
          }}
          style={{ maxWidth: 460 }}
        >
          <FullNameFields id="hero" ad={name} soyad={sur} onAd={setName} onSoyad={setSur} errorAd={touched ? nameError(name) : null} errorSoyad={touched ? nameError(sur) : null} />
          <BirthField id="hero" legend="Doğum tarihin" value={f} onChange={setF} error={error} />
          <RippleButton type="submit">Kodunu çöz</RippleButton>
        </form>
      </div>
    </section>
  );
}

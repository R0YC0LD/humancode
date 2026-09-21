// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BirthField } from "./BirthField";
import { FullNameFields } from "./FullNameFields";
import { RippleButton } from "./HesaplaClient";
import { EMPTY_FIELDS, fieldsFromDate, loadSavedBirth, loadSavedName, loadSavedSurname, nameError, saveName, saveSurname, validateFields, type BirthFields } from "@/lib/birthForm";
import { cleanName } from "@/lib/names";
import { formatBirth, parseBirth } from "@/lib/numerology";

export function HomeHero() {
  const router = useRouter();
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
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="container-hc home-hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span>♥</span> Birlikte daha iyi</div>
          <h1 id="hero-title" className="display">Sizin uyumunuz<br /><em>nasıl?</em></h1>
          <p className="lead">İki doğum tarihini girin, ilişkinizin güçlü taraflarını birlikte keşfedin.</p>
          <div className="hero-points" aria-label="Özellikler"><span>♡ Eğlenceli</span><span>✦ Kişisel</span><span>⌁ Sadece size özel</span></div>
        </div>
        <div className="compatibility-card">
          <div className="compatibility-card-head"><div><span className="mini-label">İlk adım</span><h2>Önce seni tanıyalım</h2></div><span className="step-pill">1 / 2</span></div>
          <p className="card-note">Kendi uyum profilini oluşturmak için bilgilerini gir.</p>
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
          className="hero-form"
        >
          <FullNameFields id="hero" ad={name} soyad={sur} onAd={setName} onSoyad={setSur} errorAd={touched ? nameError(name) : null} errorSoyad={touched ? nameError(sur) : null} />
          <BirthField id="hero" legend="Doğum tarihin" value={f} onChange={setF} error={error} />
          <RippleButton type="submit">Profilimi oluştur <span aria-hidden="true">→</span></RippleButton>
        </form>
      </div>
        <div className="hero-trust"><span className="trust-heart">♥</span><span>Sonuçların sadece senin cihazında hesaplanır.</span></div>
      </div>
    </section>
  );
}

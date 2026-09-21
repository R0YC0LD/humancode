// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BirthField } from "./BirthField";
import { FullNameFields } from "./FullNameFields";
import { MatrixRain } from "./MatrixRain";
import { EMPTY_FIELDS, fieldsFromDate, loadSavedBirth, loadSavedName, loadSavedSurname, nameError, saveBirth, saveName, saveSurname, validateFields, type BirthFields } from "@/lib/birthForm";
import { cleanName } from "@/lib/names";
import { computePin, formatBirth, parseBirth, todayYmd, type BirthDate, type Ymd } from "@/lib/numerology";
import { TRANSITION } from "@/lib/motion";

// Ağır ekranlar yalnızca gerektiğinde yüklenir (ilk açılış hızlı kalır)
const DecodeScene = dynamic(() => import("./DecodeScene").then((m) => m.DecodeScene), { ssr: false });
const CodeResultLive = dynamic(() => import("./CodeResultLive"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100dvh" }} aria-busy="true" />,
});

type Phase = "form" | "scene" | "result";

export function HesaplaClient({ initialD, initialScene, initialName }: { initialD: string | null; initialScene: boolean; initialName: string }) {
  // URL'deki tarih sunucudan gelir: ilk çizim doğru olur (form -> sonuç sıçraması / ekran kayması yok)
  const init = useMemo(() => {
    const d = parseBirth(initialD);
    return d && validateFields(fieldsFromDate(d)).ok ? d : null;
  }, [initialD]);
  const [fields, setFields] = useState<BirthFields>(init ? fieldsFromDate(init) : EMPTY_FIELDS);
  const [name, setName] = useState(initialName);
  const [sur, setSur] = useState("");
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>(init ? (initialScene ? "scene" : "result") : "form");
  const [date, setDate] = useState<BirthDate | null>(init);
  const [today, setToday] = useState<Ymd | null>(null);

  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return; // StrictMode çift çalıştırmasında bir kez çalışsın
    booted.current = true;
    setToday(todayYmd());
    if (init) {
      if (initialScene) window.history.replaceState(null, "", `/hesapla?d=${formatBirth(init)}${initialName ? `&n=${encodeURIComponent(initialName)}` : ""}`);
      return;
    }
    const saved = parseBirth(loadSavedBirth());
    if (saved) setFields(fieldsFromDate(saved));
    const sn = loadSavedName();
    if (sn && !initialName) setName(sn);
    const ss = loadSavedSurname();
    if (ss) setSur(ss);
  }, [init, initialScene, initialName]);

  const res = validateFields(fields);
  const error = touched && !res.ok ? (res.error ?? "Doğum tarihini gir.") : null;
  const nErr = touched ? nameError(name) : null;
  const sErr = touched ? nameError(sur) : null;
  const pin = useMemo(() => (date ? computePin(date) : null), [date]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!res.ok || nameError(name) || nameError(sur)) return;
    const clean = cleanName(name);
    saveSurname(cleanName(sur));
    setName(clean);
    saveName(clean);
    setDate(res.date);
    setToday(todayYmd());
    saveBirth(formatBirth(res.date));
    window.history.replaceState(null, "", `/hesapla?d=${formatBirth(res.date)}&n=${encodeURIComponent(clean)}`);
    setPhase("scene");
  };

  if (phase === "scene" && pin) {
    return <DecodeScene pinA={pin} labelA={cleanName(name) || (date ? formatBirth(date).replaceAll("-", ".") : undefined)} onDone={() => setPhase("result")} />;
  }

  if (phase === "result" && pin) {
    return (
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={TRANSITION.scene}>
        <CodeResultLive pin={pin} birth={date} today={today} name={cleanName(name)} onReplay={() => setPhase("scene")} />
      </motion.div>
    );
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.16, pointerEvents: "none" }}>
        <MatrixRain speed={0.6} alpha={0.8} className="rain-bg" />
      </div>
      <div className="container-hc page-top" style={{ position: "relative", paddingBottom: 96, minHeight: "70dvh" }}>
        <p className="eyebrow">Kod Çözümü</p>
        <h1 className="display" style={{ margin: "14px 0 20px" }}>
          Adını, soyadını ve doğum tarihini gir.
          <br />
          <span style={{ color: "var(--hc-accent)" }}>Kodun çözülsün.</span>
        </h1>
        <p className="lead" style={{ maxWidth: "56ch", marginBottom: 40 }}>
          Gün, ay ve yıldan 9 hane türetilir. Hesap tarayıcında yapılır; tarihin sunucuya gönderilmez.
        </p>
        <form onSubmit={submit} noValidate style={{ maxWidth: 480 }}>
          <FullNameFields id="hesapla" ad={name} soyad={sur} onAd={setName} onSoyad={setSur} errorAd={nErr} errorSoyad={sErr} autoFocus />
          <BirthField id="hesapla" legend="Doğum tarihi" value={fields} onChange={setFields} error={error} />
          <RippleButton type="submit">Kodunu çöz</RippleButton>
        </form>
      </div>
    </div>
  );
}

/** Basışta ışık dalgası veren birincil buton. */
export function RippleButton({ children, type = "button", onClick, disabled }: { children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type={type}
      className="btn btn-primary"
      disabled={disabled}
      style={{ marginTop: 8, minWidth: 200 }}
      onClick={(e) => {
        const b = e.currentTarget;
        const r = b.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 2;
        const s = document.createElement("span");
        s.className = "ripple";
        s.style.width = s.style.height = `${size}px`;
        s.style.left = `${e.clientX - r.left - size / 2}px`;
        s.style.top = `${e.clientY - r.top - size / 2}px`;
        b.appendChild(s);
        setTimeout(() => s.remove(), 700);
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

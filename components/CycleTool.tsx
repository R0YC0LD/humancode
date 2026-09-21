// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useState } from "react";
import { BirthField } from "./BirthField";
import { CycleStrip } from "./CycleStrip";
import { EMPTY_FIELDS, fieldsFromDate, loadSavedBirth, validateFields, type BirthFields } from "@/lib/birthForm";
import { parseBirth, todayYmd, type Ymd } from "@/lib/numerology";

/** Doğum tarihini gir → yaşam döngüsü şeridi ve bu yılki kişisel yıl. */
export function CycleTool() {
  const [f, setF] = useState<BirthFields>(EMPTY_FIELDS);
  const [today, setToday] = useState<Ymd | null>(null);

  useEffect(() => {
    setToday(todayYmd());
    const s = parseBirth(loadSavedBirth());
    if (s) setF(fieldsFromDate(s));
  }, []);

  const res = validateFields(f);
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ maxWidth: 420 }}>
        <BirthField id="cycle" legend="Doğum tarihin" value={f} onChange={setF} error={res.ok ? null : res.error && f.y.length === 4 ? res.error : null} />
      </div>
      {res.ok && today ? (
        <CycleStrip birth={res.date} today={today} />
      ) : (
        <p style={{ color: "var(--hc-muted)" }}>Doğum tarihini girince dönemlerin ve bu yılki kişisel yılın burada görünür.</p>
      )}
    </div>
  );
}

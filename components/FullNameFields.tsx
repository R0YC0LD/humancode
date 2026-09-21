// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { NameField } from "./NameField";

/** Ad ve soyad yan yana. Yorumlarda yalnızca ad kullanılır; toplist'te ikisinin ilk 2 harfi görünür. */
export function FullNameFields({
  id,
  who,
  ad,
  soyad,
  onAd,
  onSoyad,
  errorAd,
  errorSoyad,
  autoFocus,
  placeholderAd = "ör. Onur",
  placeholderSoyad = "ör. Yılmaz",
}: {
  id: string;
  /** Etiket öneki, ör. "Birinci kişinin". */
  who?: string;
  ad: string;
  soyad: string;
  onAd: (v: string) => void;
  onSoyad: (v: string) => void;
  errorAd?: string | null;
  errorSoyad?: string | null;
  autoFocus?: boolean;
  placeholderAd?: string;
  placeholderSoyad?: string;
}) {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
      <NameField id={`${id}-ad`} label={who ? `${who} adı` : "Ad"} value={ad} onChange={onAd} error={errorAd} autoFocus={autoFocus} placeholder={placeholderAd} />
      <NameField id={`${id}-soyad`} label={who ? `${who} soyadı` : "Soyad"} value={soyad} onChange={onSoyad} error={errorSoyad} placeholder={placeholderSoyad} autoComplete="family-name" />
    </div>
  );
}

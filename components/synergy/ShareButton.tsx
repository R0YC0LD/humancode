// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useState } from "react";

/** Geçerli adresi (adlar ve ilişki türü dahil) panoya kopyalar. */
export function ShareButton({ label = "Karşılaştırmayı paylaş" }: { label?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Bağlantıyı kopyala:", url);
    }
  };
  return (
    <button type="button" className="btn btn-primary" onClick={share}>
      {copied ? "Bağlantı kopyalandı" : label}
    </button>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import { HesaplaClient } from "@/components/HesaplaClient";
import { CodeResult } from "@/components/CodeResult";
import { codeSlots } from "@/components/CodeSlots";
import { buildHaneDetails } from "@/lib/codeView";
import { buildPortrait } from "@/lib/portrait";
import { buildSummary } from "@/lib/summary";
import { cleanName } from "@/lib/names";
import { computePin, formatBirth, isFuture, isValidDate, parseBirth } from "@/lib/numerology";

export const metadata: Metadata = {
  title: "Kod Çözümü",
  description: "Doğum tarihinden 9 haneli HumanCODE'unu çöz: piramit, element dağılımı ve yaşam döngüsü.",
};

type Props = { searchParams: Promise<{ [k: string]: string | string[] | undefined }> };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;

export default async function Page({ searchParams }: Props) {
  const q = await searchParams;
  const d = parseBirth(one(q.d));
  const scene = one(q.scene) === "1";
  const name = cleanName(one(q.n));
  const now = new Date();
  const valid = d && isValidDate(d) && !isFuture(d, { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate() + 1 });

  // Doğrudan sonuç bağlantısı: ağır bölümler sunucuda çizilir (hızlı açılış, az JS)
  if (d && valid && !scene) {
    const pin = computePin(d);
    return (
      <CodeResult
        pin={pin}
        birth={d}
        name={name}
        replayHref={`/hesapla?d=${formatBirth(d)}&scene=1${name ? `&n=${encodeURIComponent(name)}` : ""}`}
        imza={buildPortrait(pin).imza}
        summary={buildSummary(pin)}
        details={buildHaneDetails(pin)}
        slots={codeSlots(pin, d)}
      />
    );
  }
  return <HesaplaClient initialD={one(q.d)} initialScene={scene} initialName={name} />;
}

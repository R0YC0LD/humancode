// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeResult } from "@/components/CodeResult";
import { codeSlots } from "@/components/CodeSlots";
import { buildHaneDetails } from "@/lib/codeView";
import { buildPortrait } from "@/lib/portrait";
import { buildSummary } from "@/lib/summary";
import { isConsistentPin, pinFromString } from "@/lib/numerology";

type Props = { params: Promise<{ pin: string }> };

function parse(raw: string) {
  const p = pinFromString(raw);
  return p && isConsistentPin(p) ? p : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pin } = await params;
  const p = parse(pin);
  if (!p) return { title: "Kod bulunamadı" };
  const img = `/api/og?pin=${pin}`;
  return {
    title: `Kod Çözümü ${p.slice(0, 8).join("")}·${p[8]}`,
    description: "Paylaşılan bir HumanCODE. Kendi kodunu çöz.",
    openGraph: { images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [img] },
  };
}

export default async function Page({ params }: Props) {
  const { pin } = await params;
  const p = parse(pin);
  if (!p) notFound();
  // Ağır bölümler sunucuda çizilir: istemciye yalnızca etkileşimli kısım gider.
  return (
    <CodeResult
      pin={p}
      imza={buildPortrait(p).imza}
      summary={buildSummary(p)}
      details={buildHaneDetails(p)}
      slots={codeSlots(p)}
    />
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import Link from "next/link";
import { KarsilastirClient } from "@/components/KarsilastirClient";
import { SynergyView } from "@/components/synergy/SynergyView";
import { ShareButton } from "@/components/synergy/ShareButton";
import { isMode } from "@/content/haneler";
import { cleanName } from "@/lib/names";
import { computePin, formatBirth, isFuture, isValidDate, parseBirth, pinToString, type BirthDate, type Mode } from "@/lib/numerology";

type Props = { searchParams: Promise<{ [k: string]: string | string[] | undefined }> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = await searchParams;
  const base: Metadata = {
    title: "Sinerji Çözümü",
    description: "İki kişinin adını ve doğum tarihini karşılaştır; hane hane hangi alanda anlaştığınızı ve nerede sürtüştüğünüzü gör.",
  };
  const a = parseBirth(one(q.a));
  const b = parseBirth(one(q.b));
  if (!a || !b) return base;
  // Paylaşım görseli doğum tarihi değil, yalnızca türetilmiş kodları taşır.
  const img = `/api/og?a=${pinToString(computePin(a))}&b=${pinToString(computePin(b))}`;
  return {
    ...base,
    openGraph: { images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [img] },
  };
}

function okDate(d: BirthDate | null): d is BirthDate {
  const now = new Date();
  return !!d && isValidDate(d) && !isFuture(d, { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate() + 1 });
}

export default async function Page({ searchParams }: Props) {
  const q = await searchParams;
  const a = parseBirth(one(q.a));
  const b = parseBirth(one(q.b));
  const n1 = cleanName(one(q.n1));
  const n2 = cleanName(one(q.n2));
  const scene = one(q.scene) === "1";
  const m = one(q.m) ?? null;
  const mode: Mode = isMode(m) ? m : "romantik";

  // Doğrudan sonuç bağlantısı: sonuç sayfası sunucuda çizilir (hızlı açılış, az JS)
  if (okDate(a) && okDate(b) && !scene) {
    const qs = `a=${formatBirth(a)}&b=${formatBirth(b)}&m=${mode}${n1 ? `&n1=${encodeURIComponent(n1)}` : ""}${n2 ? `&n2=${encodeURIComponent(n2)}` : ""}`;
    return (
      <SynergyView
        pinA={computePin(a)}
        pinB={computePin(b)}
        labelA={formatBirth(a).replaceAll("-", ".")}
        labelB={formatBirth(b).replaceAll("-", ".")}
        nameA={n1 || "Birinci kişi"}
        nameB={n2 || "İkinci kişi"}
        initialMode={mode}
        actions={
          <>
            <Link className="btn" href={`/karsilastir?${qs}&scene=1`}>Tekrar çöz</Link>
            <ShareButton />
          </>
        }
      />
    );
  }
  return (
    <KarsilastirClient
      initialA={one(q.a) ?? null}
      initialB={one(q.b) ?? null}
      initialM={m}
      initialN1={n1}
      initialN2={n2}
      initialScene={scene}
    />
  );
}

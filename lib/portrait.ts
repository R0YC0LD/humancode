// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { getDigit } from "@/content/digits";
import { getToolbox } from "@/content/attributes";
import { elementOf, elementPoints, type ElementKey, type Pin } from "./numerology";
import { pick1, pickN, seedOf } from "./variety";

export type Relation = "ayni" | "besleyen" | "catisan" | "denge" | "farkli";

/** İki elementin ilişkisi (puan tablosuyla aynı çiftlere dayanır). */
export function relationOf(a: ElementKey, b: ElementKey): Relation {
  if (a === "notr" || b === "notr") return "denge";
  if (a === b) return "ayni";
  const p = elementPoints(a, b);
  if (p === 100) return "besleyen";
  if (p === 40 || p === 35) return "catisan";
  return "farkli";
}

export interface PortraitSection {
  id: string;
  baslik: string;
  metin: string;
  aktif?: string[];
  reaktif?: string[];
}

export interface Portrait {
  imza: string;
  /** indeks 0 → rakam 1 */
  counts: number[];
  dominant: number[];
  missing: number[];
  sections: PortraitSection[];
}

export function digitCounts(pin: Pin): number[] {
  const c = Array(9).fill(0) as number[];
  for (const d of pin) c[d - 1]++;
  return c;
}

export const listTR = (xs: string[]) =>
  xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`;

/** Dış (h1) ile iç (h6) arasındaki köprü cümleleri; ilişki türüne göre 3 varyant. */
const BRIDGE_DIS_IC: Record<Relation | "ayniRakam", string[]> = {
  ayniRakam: [
    "Dışarıdaki sen ile içerideki sen aynı dili konuşuyor: tutarlılık ve iç huzur bunun armağanı. Bedeli, gölge tarafın da iki kat yankılanması.",
    "Maskenle yüzün arasında neredeyse hiç fark yok. Bu seni okunaklı ve güvenilir yapar; kendine karşı fazla dürüst olduğunda yorulabilirsin.",
    "Dışarıya verdiğin ile içeride yaşadığın örtüşüyor. Bu nadir bir bütünlük; aynı zamanda saklanacak bir yerin olmadığı anlamına da gelir.",
  ],
  ayni: [
    "İkisi de aynı elementten beslendiği için dış ve iç benin birbirini anlıyor; çatışma azdır, körleşme riski vardır.",
    "Aynı elementin iki ayrı tonu: dışarıdaki hız ile içerideki hız birbirini tanır, ama aynı kör noktayı da paylaşırlar.",
    "Dış ve iç sesin akrabadır; biri konuşurken diğeri sık sık başını sallar. Farklı bir bakış için bilinçli bir dış ses gerekir.",
  ],
  besleyen: [
    "İki taraf birbirini besliyor: dışarıdaki senin yakıtı içerideki sende, içerideki sabit zemin dışarıdaki sende. Bu birleşim seni gerçekte olduğundan daha kolay görünür kılar.",
    "Dış duruşun ile iç dünyan birbirini tamamlıyor; biri eksik bıraktığını diğeri kapatıyor. Dengeli günlerde çok verimli bir eşleşme.",
    "Bu iki katman birbirini büyütür: dışarıda yaptığın iç dünyanı, iç dünyandakiler dışarıdaki tavrını güçlendirir.",
  ],
  catisan: [
    "İki katman farklı dillerde konuşuyor: dışarıdan gösterdiğin ile içeride yaşadığın arasında sürekli bir çekim var. Yorulduğunda ikisinden biri sesini yükseltir.",
    "Dış ve iç sesin birbirini tam anlamıyor; başkaları seni bir türlü, sen kendini başka türlü tanırsın. Kendine ‘şu an hangi ses konuşuyor’ diye sormak işe yarar.",
    "Dışarıdaki senin yaptığı, içerideki senin istediğine her zaman uymuyor. Bu gerilim dürüstçe yönetilirse derinlik, bastırılırsa yorgunluk üretir.",
  ],
  denge: [
    "Katmanlardan biri nötr, bütünleyici bir tonda; bu, dış ile iç arasında kolayca köprü kurmanı sağlar.",
    "İki sesten biri dengeleyici: çatışmayı yumuşatır, uyumu kolaylaştırır. Yumuşaklığın keyfine kapılıp sınır koymayı unutmamak gerek.",
    "Dış ile iç arasında ince bir geçit var; ikisi arasında rahat gidip gelirsin. Bu esneklik, ‘gerçek sen hangisi’ sorusunu bulanıklaştırabilir.",
  ],
  farkli: [
    "İki katman farklı hızlarda çalışıyor: biri diğerini bekletiyor. Köprü kurmak biraz emek ister ama sonuçta zengin bir iç-dış çeşitliliği verir.",
    "Dış ve iç sesin ne düşmanı ne akrabası: birbirinden habersiz iki komşu gibi. Zaman zaman aralarında iletişimi bilinçle kurmak gerekir.",
    "Dışarıdaki tavrınla içerideki isteğin arasında orta düzeyde bir mesafe var; bu, kendini sürprizli ama biraz tutarsız biri olarak yaşamana yol açabilir.",
  ],
};

const OPEN_AKIS = ["Hayatının genel akışı", "Yaşamının ritmi", "Seni yolda tutan tempo"];
const OPEN_RUH = ["Ruhunun temel rengi", "Derinlerde seni yönlendiren duygu", "Kararlarının altında yatan ton"];

const OPEN_DOMINANT: ((n: number, c: number, a: string) => string)[] = [
  (n, c, a) => `${n} rakamı kodunda ${c} kez yer alıyor; ${a} teması hayatında sıradan bir ton değil, bir ana renk.`,
  (n, c, a) => `Kodun ${n} etrafında toplanıyor (${c} kez). ${a} arketipi, kararlarında ve tepkilerinde sık sık öne çıkar.`,
  (n, c, a) => `${c} hanede ${n} var. Bu tekrar, ${a} özelliklerinin hem güçlü yanını hem gölgesini büyüttüğü anlamına gelir.`,
];

const OPEN_DENGELI: ((list: string) => string)[] = [
  (l) => `Kodunda hiçbir rakam üç kez ya da fazla geçmiyor; en sık çıkanlar ${l}. Tek bir tema yerine çeşitli sesler var: bu esneklik getirir, karşılığında hiçbir temaya tam yaslanamama riski taşır.`,
  (l) => `Rakamlar dengeli dağılmış (en sık: ${l}). Her durumda farklı bir yanın öne geçebilir; bu seni tahmin edilmesi zor ama uyumlu biri yapar.`,
  (l) => `Ağır basan tek bir rakam yok (öne çıkanlar: ${l}). Kimliğin tek bir ana renk değil, birkaç ton arasındaki bir dans.`,
];

/** Bir Pin için deterministik, çeşitli "Kod Portresi". */
export function buildPortrait(pin: Pin): Portrait {
  const seed = seedOf(pin);
  const counts = digitCounts(pin);
  const max = Math.max(...counts);
  const dominant = max >= 3 ? counts.flatMap((c, i) => (c === max ? [i + 1] : [])) : [];
  const missing = counts.flatMap((c, i) => (c === 0 ? [i + 1] : []));
  const [h1, , , h4, h5, h6, h7, h8, h9] = pin;

  const t8 = getToolbox(h8);
  const sections: PortraitSection[] = [];

  // 1) Dış ve iç
  const rel: Relation | "ayniRakam" = h1 === h6 ? "ayniRakam" : relationOf(elementOf(h1), elementOf(h6));
  sections.push({
    id: "dis-ic",
    baslik: "Dışarıdaki sen, içerideki sen",
    metin: `Dışarıdan ${getToolbox(h1).arketip} tipi gibi görünürsün: ${getDigit(h1).hane[0]} İçeride ise ${getToolbox(h6).arketip} tarafın konuşur: ${getDigit(h6).hane[5]} ${pick1(BRIDGE_DIS_IC[rel], seed, 1)}`,
  });

  // 2) Akış ve ders
  sections.push({
    id: "akis",
    baslik: "Hayatın akışı ve tekrar eden ders",
    metin: `${pick1(OPEN_AKIS, seed, 2)} ${getToolbox(h4).arketip} tonunda: ${getDigit(h4).hane[3]} Hayatın sana tekrar tekrar öğrettiği konu ise ${getToolbox(h5).arketip} çizgisinde: ${getDigit(h5).hane[4]}`,
  });

  // 3) Ruh rengi
  sections.push({
    id: "ruh",
    baslik: "Ruhunun rengi",
    metin: `${pick1(OPEN_RUH, seed, 3)} ${t8.arketip} tonunda: ${getDigit(h8).hane[7]} İç çocuğunun tarafı ise şöyle: ${getDigit(h7).hane[6]}`,
    aktif: pickN(t8.aktif, 4, seed, 4),
    reaktif: pickN(t8.reaktif, 3, seed, 5),
  });

  // 4) Ağır basan rakam
  if (dominant.length) {
    const shown = dominant.slice(0, 2);
    const first = shown[0];
    const tb = getToolbox(first);
    const intro = pick1(OPEN_DOMINANT, seed, 6)(first, max, tb.arketip);
    const more = shown.length > 1 ? ` (${shown[1]} de ${max} kez geçiyor; iki ana renk yan yana.)` : "";
    sections.push({
      id: "rakam",
      baslik: "Kodunda ağır basan rakam",
      metin: `${intro}${more} ${getDigit(first).oz}`,
      aktif: pickN(tb.aktif, 4, seed, 7),
      reaktif: pickN(tb.reaktif, 3, seed, 8),
    });
  } else {
    const top = counts
      .map((c, i) => ({ n: i + 1, c }))
      .sort((a, b) => b.c - a.c || a.n - b.n)
      .slice(0, 3)
      .map((x) => String(x.n));
    sections.push({
      id: "rakam",
      baslik: "Kodunda ağır basan rakam",
      metin: pick1(OPEN_DENGELI, seed, 6)(listTR(top)),
    });
  }

  // 5) Eksik rakamlar
  if (missing.length) {
    const shown = missing.length > 3 ? pickN(missing, 3, seed, 9).sort((a, b) => a - b) : missing;
    sections.push({
      id: "eksik",
      baslik: "Kodunda olmayanlar",
      metin: `Kodunda ${listTR(missing.map(String))} rakam${missing.length > 1 ? "ları" : "ı"} hiç geçmiyor. ${shown.map((n) => getToolbox(n).eksik).join(" ")}`,
    });
  }

  // 6) Yaşam duyusu
  const imza = `${getToolbox(h1).arketip} · ${getToolbox(h6).arketip} · ${t8.arketip}`;
  sections.push({
    id: "duyu",
    baslik: "Genel yaşam duyusu",
    metin: `${getDigit(h9).hane[8]} Kodunun imzası: ${imza}.`,
  });

  return { imza, counts, dominant, missing, sections };
}

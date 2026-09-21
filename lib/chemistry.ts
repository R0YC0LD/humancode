// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { getDigit } from "@/content/digits";
import { getToolbox } from "@/content/attributes";
import { AREAS } from "@/content/haneler";
import { computeScore, type Band, type Mode, type Pin } from "./numerology";
import { relationOf, type Relation } from "./portrait";
import { ek } from "./turkish";
import { pick1, pickN, seedOf } from "./variety";

const BAND_OPEN: Record<Band, string[]> = {
  yuksek: [
    "İkiniz arasında kolay akan, az sürtünmeli bir kimya var.",
    "Bu eşleşme, bir arada durmanın çoğu zaman az efor istediği nadir kombinasyonlardan.",
    "Kimyanız yüksek: birbirinizin dilini öğrenmek için uzun süre harcamanız gerekmiyor.",
  ],
  uyumlu: [
    "Aranızda sağlam bir uyum var; küçük ayarlarla çok iyi çalışan bir ikili.",
    "Kimyanız iyi: farklılıklar sürtünme yaratabilir ama çoğu zaman tamamlayıcı işler.",
    "Bu bağ, birbirinizi tanıdıkça güçlenen türden.",
  ],
  emek: [
    "Bu bağ kendiliğinden akmıyor; emek istiyor, ama emek veren çiftlerde sonuç sağlam olur.",
    "Kimyanız karmaşık: bazı alanlar çok iyi, bazıları sürekli ayar ister.",
    "Bu eşleşme kolay değil ama zor da değil: bilinçli ve açık iletişim büyük fark yaratır.",
  ],
  zorlayici: [
    "Bu kombinasyon zorlayıcı: farklılıklar öne çıkıyor ve sürtünme kaçınılmaz.",
    "Kimyanız sert: birbirinizi tetikleyen yanlarınız çok. Bilinçle yönetilirse güçlü bir büyüme alanı da olabilir.",
    "Aranızdaki gerilim yüksek; net sınırlar ve açık sözleşmeler bu bağın en önemli araçları.",
  ],
};

const MEETING: Record<Relation, string[]> = {
  ayni: [
    "Baskın elementleriniz aynı olduğu için birbirinizi kolay anlarsınız; ortak kör noktanızı dışarıdan biri size göstermeli.",
    "İkiniz de benzer bir tempoda yaşıyorsunuz: bu rahatlık getirir, yenilenmeyi zorlaştırır.",
  ],
  besleyen: [
    "Baskın elementleriniz birbirini besliyor: biriniz yakıtı, diğeriniz zemini getiriyor.",
    "Bir tarafın eksik bıraktığını diğeri kapatıyor; dengeli günlerde çok verimli bir tamamlayıcılık.",
  ],
  catisan: [
    "Baskın elementleriniz karşıt yönlerde: biri hızlandırırken diğeri yavaşlatmak isteyebilir; bu fark yönetilmezse çekişmeye döner.",
    "Farklı dünyalardan geliyorsunuz; ortak dil bulmak emek ister, ama bulununca çok şey öğretir.",
  ],
  denge: [
    "Baskın elementlerden biri nötr: bu dengeleyici bir zemin, uyum kolay kurulur.",
    "Bir taraf bütünleyici bir tonda; bu, iki kişi arasındaki gerilimi yumuşatan bir tampon işlevi görür.",
  ],
  farkli: [
    "Farklı hızlarda iki element: tamamlayıcı olabilir ama ortak tempo kurmak biraz emek ister.",
    "Baskın elementleriniz ne birbirini besliyor ne çatışıyor; ilişkinin gidişatını alışkanlıklar belirleyecek.",
  ],
};

export interface Chemistry {
  baslik: string;
  ozet: string;
  karsilasma: string;
  sozlesme: string;
  aktif: string[];
  reaktif: string[];
  ipuclari: { alan: string; metin: string }[];
}

/** Sinerji tohumu: A×B ve B×A aynı sonucu verir (sinerji haneleri ve skor simetrik). */
export function synergySeed(a: Pin, b: Pin): number {
  const r = computeScore(a, b);
  return seedOf([...r.sh, r.score]);
}

export interface AreaExtra {
  ipucu: string;
  aktif: string[];
  reaktif: string[];
}

/** Bir alan için (digit = o alandaki sinerji rakamı) çeşitlendirilmiş ek içerik. */
export function areaExtra(areaIndex: number, digit: number, mode: Mode, seed: number): AreaExtra {
  const tb = getToolbox(digit);
  return {
    ipucu: tb.ipucu[mode],
    aktif: pickN(tb.aktif, 2, seed, areaIndex * 2 + 1),
    reaktif: pickN(tb.reaktif, 2, seed, areaIndex * 2 + 2),
  };
}

export function buildChemistry(a: Pin, b: Pin, mode: Mode, names?: { A: string; B: string }): Chemistry {
  const r = computeScore(a, b);
  const seed = synergySeed(a, b);
  const sh8 = r.sh[7];
  const tb = getToolbox(sh8);
  const ruh = getDigit(sh8).ruh;
  const relation = relationOf(r.elementA, r.elementB);

  // İpuçları: sH8, sH5 (ders), sH4 (düzen), sonra sH6, sH1... Aynı rakam iki kez öneri vermesin.
  const order = [7, 4, 3, 5, 0, 1, 2, 6];
  const used = new Set<number>();
  const ipuclari: { alan: string; metin: string }[] = [];
  for (const i of order) {
    if (used.has(r.sh[i])) continue;
    used.add(r.sh[i]);
    ipuclari.push({ alan: AREAS[i].ad, metin: getToolbox(r.sh[i]).ipucu[mode] });
    if (ipuclari.length === 3) break;
  }

  return {
    baslik: ruh.ad,
    ozet: `${names ? `${names.A} ile ${names.B}: ` : ""}${pick1(BAND_OPEN[r.band], seed, 1)} Bağın özü: ${ruh.anahtar.toLowerCase()}.`,
    karsilasma: names
      ? `${ek(names.A, "gen")} ${getToolbox(a[0]).arketip} tonu ile ${ek(names.B, "gen")} ${getToolbox(b[0]).arketip} tonu karşılaşıyor. ${pick1(MEETING[relation], seed, 2)}`
      : `${getToolbox(a[0]).arketip} ile ${getToolbox(b[0]).arketip} karşılaşması. ${pick1(MEETING[relation], seed, 2)}`,
    sozlesme: tb.sozlesme,
    aktif: pickN(tb.aktif, 4, seed, 3),
    reaktif: pickN(tb.reaktif, 3, seed, 4),
    ipuclari,
  };
}

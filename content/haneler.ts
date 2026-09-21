// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Mode } from "@/lib/numerology";

export interface HaneInfo {
  n: number;
  ad: string;
  /** Piramitte bu haneyi besleyen hanelerin 0 tabanlı indeksleri. */
  deps: number[];
  formul: string;
  olcer: string;
  lead: string;
}

export const HANELER: HaneInfo[] = [
  {
    n: 1,
    ad: "Karakter",
    deps: [],
    formul: "reduce(gün)",
    olcer: "Doğum gününden gelir. Dışarıya yansıyan duruşu ve ilk refleksi anlatır.",
    lead: "Karakter hanende bu rakam:",
  },
  {
    n: 2,
    ad: "Sosyal Bilinçlilik",
    deps: [],
    formul: "reduce(ay)",
    olcer: "Doğum ayından gelir. Toplulukla, çevreyle ve ortak yaşamla kurulan ilişkiyi anlatır.",
    lead: "Sosyal bilinçlilik hanende bu rakam:",
  },
  {
    n: 3,
    ad: "Küresel Bilinçlilik",
    deps: [],
    formul: "reduce(yıl rakamları toplamı)",
    olcer: "Doğum yılından gelir. Dünyaya, çağa ve büyük resme bakışı anlatır.",
    lead: "Küresel bilinçlilik hanende bu rakam:",
  },
  {
    n: 4,
    ad: "Yaşam Döngüsü",
    deps: [0, 1, 2],
    formul: "reduce(h1 + h2 + h3)",
    olcer: "İlk üç hanenin toplamıdır. Hayatın genel ritmini ve akışını anlatır.",
    lead: "Yaşam döngüsü hanende bu rakam:",
  },
  {
    n: 5,
    ad: "Yaşam Dersi",
    deps: [0, 3],
    formul: "reduce(h1 + h4)",
    olcer: "Karakter ile yaşam döngüsünün birleşimidir. Hayatın sana tekrar tekrar öğrettiği konuyu anlatır.",
    lead: "Yaşam dersi hanende bu rakam:",
  },
  {
    n: 6,
    ad: "İçsel Benlik",
    deps: [0, 1],
    formul: "reduce(h1 + h2)",
    olcer: "Karakter ile sosyal bilinçliliğin birleşimidir. Maske düştüğünde kalan kişiyi anlatır.",
    lead: "İçsel benlik hanende bu rakam:",
  },
  {
    n: 7,
    ad: "İçsel Çocuk",
    deps: [1, 2],
    formul: "reduce(h2 + h3)",
    olcer: "Sosyal ve küresel bilinçliliğin birleşimidir. Oyun, mizah ve kırılgan tarafı anlatır.",
    lead: "İçsel çocuk hanende bu rakam:",
  },
  {
    n: 8,
    ad: "Ruh Duygusu",
    deps: [5, 6],
    formul: "reduce(h6 + h7)",
    olcer: "İçsel benlik ile içsel çocuğun birleşimidir. Ruhun temel duygusal rengini anlatır; sinerjide belirleyici hane budur.",
    lead: "Ruh duygusu hanende bu rakam:",
  },
  {
    n: 9,
    ad: "Yaşam Duyusu",
    deps: [0, 1, 2, 3, 4, 5, 6, 7],
    formul: "reduce(h1 + h2 + … + h8)",
    olcer: "Sekiz hanenin toplamıdır. Hayata bakışın genel tonunu özetler; piramitten ayrı gösterilir.",
    lead: "Yaşam duyusu hanende bu rakam:",
  },
];

export interface AreaInfo {
  n: number;
  ad: string;
  kalip: string;
  baglam: Record<Mode, string>;
}

/** Sinerji hanelerinin hayat alanları (sH1..sH8). */
export const AREAS: AreaInfo[] = [
  {
    n: 1,
    ad: "İlk izlenim",
    kalip: "Birbirinizi ilk gördüğünüzde…",
    baglam: {
      romantik: "Tanışma anı ve ilk çekim: dışarıdan nasıl bir çift gibi göründüğünüz.",
      arkadaslik: "İlk tanışmadaki sıcaklık ve dışarıdan görünen ikiliniz.",
      is: "İlk toplantı, ilk izlenim ve birlikte müşteriye çıktığınızda yarattığınız etki.",
      aile: "Ebeveyn ile çocuğun birbirini ilk tanıyışı ve dışarıya birlikte nasıl göründükleri.",
    },
  },
  {
    n: 2,
    ad: "Sosyal hayat",
    kalip: "Kalabalıkta…",
    baglam: {
      romantik: "Ortak arkadaşlar, davetler ve ikili olarak kalabalık içinde davranışınız.",
      arkadaslik: "Arkadaş grubu içindeki rolünüz ve ortak çevre.",
      is: "Ağ kurma, etkinlikler ve müşteri ilişkilerinde birlikte nasıl göründüğünüz.",
      aile: "Akraba, okul ve komşu ilişkilerinde aile olarak duruşunuz.",
    },
  },
  {
    n: 3,
    ad: "Dünya görüşü",
    kalip: "Hayata bakışınız…",
    baglam: {
      romantik: "Değerler, uzun vadeli hedefler ve nasıl bir hayat kurmak istediğiniz.",
      arkadaslik: "Neye önem verdiğiniz, hangi konularda benzer düşündüğünüz.",
      is: "Vizyon, etik yaklaşım ve şirketi nereye götürmek istediğiniz.",
      aile: "Değerlerin aktarımı: neyin doğru, neyin önemli sayıldığı.",
    },
  },
  {
    n: 4,
    ad: "Günlük düzen",
    kalip: "Aynı evde / aynı takımda…",
    baglam: {
      romantik: "Birlikte yaşama, ev işleri, para ve gündelik rutin.",
      arkadaslik: "Birlikte seyahat, ortak plan ve pratik işleri paylaşma biçimi.",
      is: "İş bölümü, takvim, teslim ve gündelik işleyiş.",
      aile: "Ev düzeni, saatler, sorumluluklar ve pratik yaşam.",
    },
  },
  {
    n: 5,
    ad: "Ders ve çatışma",
    kalip: "Sizi en çok zorlayan…",
    baglam: {
      romantik: "İlişkinin tekrarlayan tartışma konusu ve birbirinizden öğrendiğiniz ders.",
      arkadaslik: "Dostluğu sınayan konu ve birbirinize öğrettiğiniz şey.",
      is: "Ortaklığı zorlayan karar tipi ve birbirinizden edinilen beceri.",
      aile: "Ailedeki tekrarlayan gerilim ve karşılıklı öğrenme alanı.",
    },
  },
  {
    n: 6,
    ad: "Maske düştüğünde",
    kalip: "Baş başayken…",
    baglam: {
      romantik: "İkinizin yalnızken, rol yapmadan nasıl olduğunuz.",
      arkadaslik: "Kalabalık dağıldığında, samimi sohbetin niteliği.",
      is: "Kapalı kapılar ardında, gerçek fikirlerin söylendiği anlar.",
      aile: "Çocuğun ve ebeveynin rol yapmadan, baş başa kaldığı zamanlar.",
    },
  },
  {
    n: 7,
    ad: "Eğlence ve oyun",
    kalip: "Birlikte eğlenirken…",
    baglam: {
      romantik: "Mizah, oyun, tatil ve çocuksu taraflarınızın birbirine uyumu.",
      arkadaslik: "Birlikte gülme, oyun ve serbest zaman geçirme tarzınız.",
      is: "Ekip morali, kutlama ve zor günlerde birbirinize hafiflik katma biçimi.",
      aile: "Birlikte oyun, tatil ve aile içindeki neşe.",
    },
  },
  {
    n: 8,
    ad: "İlişkinin ruhu",
    kalip: "Bu bağın özü…",
    baglam: {
      romantik: "Bağın asıl karakteri; ilişkiyi ayakta tutan ve zorlayan temel duygu.",
      arkadaslik: "Dostluğun ana rengi; yıllar geçse de değişmeyen özü.",
      is: "Ortaklığın ruhu; kriz anında geriye kalan ortak zemin.",
      aile: "Aile bağının asıl duygusu; uzaklaşsanız da sizi birbirine bağlayan şey.",
    },
  },
];

export const MODES: { key: Mode; ad: string }[] = [
  { key: "romantik", ad: "Romantik" },
  { key: "arkadaslik", ad: "Arkadaşlık" },
  { key: "is", ad: "İş ortaklığı" },
  { key: "aile", ad: "Ebeveyn–çocuk" },
];

export const MODE_KEYS: Mode[] = ["romantik", "arkadaslik", "is", "aile"];

export function isMode(v: string | null | undefined): v is Mode {
  return !!v && (MODE_KEYS as string[]).includes(v);
}

export const BAND_INFO = {
  yuksek: { ad: "Yüksek sinerji", aralik: "80+", renk: "var(--hc-success)" },
  uyumlu: { ad: "Uyumlu", aralik: "60–79", renk: "var(--hc-text)" },
  emek: { ad: "Emek ister", aralik: "40–59", renk: "var(--hc-warn)" },
  zorlayici: { ad: "Zorlayıcı", aralik: "<40", renk: "var(--hc-accent)" },
} as const;

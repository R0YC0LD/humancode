// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** Sonuç sayfalarında "bu terim ne demek" sorusunu sayfa içinde cevaplayan sözlük. */
export interface Term {
  terim: string;
  aciklama: string;
}

export const GLOSSARY_CODE: Term[] = [
  { terim: "Kod (pin)", aciklama: "Doğum tarihinden türetilen 9 rakamlık dizi. İlk üçü doğrudan tarihten gelir (gün, ay, yıl), kalan altısı bunların toplamlarından çıkar." },
  { terim: "Hane", aciklama: "Kodun 9 basamağından her biri. Her hane hayatın başka bir alanını anlatır: dışa yansıyan duruş, toplumla ilişki, iç dünya gibi." },
  { terim: "Piramit", aciklama: "9 hanenin birbirini nasıl beslediğini gösteren şema. Üstteki hanelerin toplamı alttaki haneleri üretir; en alttaki h9 tümünün özeti." },
  { terim: "İndirgeme (reduce)", aciklama: "Bir sayıyı tek haneye düşürme kuralı: rakamlar toplanır, sonuç hâlâ 9'dan büyükse tekrarlanır. 29 → 2+9 = 11 → 1+1 = 2." },
  { terim: "Arketip", aciklama: "Her rakamın kısa bir karakter adı (Yaratıcı, Besleyen, Organizatör…). Rakamın ana temasını tek kelimede özetler." },
  { terim: "Dengedeyken / Dengeyi kaybedince", aciklama: "Her rakamın iki yüzü vardır: kişi iyi durumdayken öne çıkan güçlü (aktif) yanlar ve stres altında devreye giren (reaktif) yanlar. İkisi de aynı rakamın araçlarıdır." },
  { terim: "Ağır basan rakam", aciklama: "Kodunda 3 kez ya da daha fazla geçen rakam. O rakamın teması hayatında ana renk gibidir; hem güçlü hem gölge yanı büyür." },
  { terim: "Eksik rakam", aciklama: "Kodunda hiç geçmeyen rakam. Bu bir kusur değil; o temanın kendiliğinden gelmediğini, bilinçli çaba istediğini anlatır." },
  { terim: "Element", aciklama: "Rakamlar dört elemente ve nötre bağlıdır: 1-5 hava, 2-7 su, 3-6 ateş, 4-8 toprak, 9 nötr. Dokuz hanedeki dağılım baskın elementini verir." },
  { terim: "Kişisel yıl", aciklama: "İçinde bulunduğun yaş yılının teması (1'den 9'a). Takvim yılbaşında değil, doğum gününde değişir." },
];

export const GLOSSARY_SYNERGY: Term[] = [
  { terim: "Sinerji kodu", aciklama: "İki kişinin aynı hanelerinin toplanıp indirgenmesiyle çıkan 8 haneli yeni kod (sH1–sH8). Her hane ilişkinin bir alanını gösterir." },
  { terim: "sH8 · İlişkinin ruhu", aciklama: "Sinerjinin belirleyici hanesi. Bağın asıl karakterini verir ve skorun %60'ını oluşturur." },
  { terim: "Örtük sözleşme", aciklama: "İki kodun karışımının, kimse yazmadığı halde geçerli olan kuralı: bu ilişkide neyin beklendiği ve neyin sorun çıkardığı." },
  { terim: "Skor", aciklama: "0,60 × ruh duygusu puanı + 0,25 × element uyumu + 0,15 × karakter puanı, en yakın tam sayıya yuvarlanır. 80+ yüksek sinerji, 60–79 uyumlu, 40–59 emek ister, 40 altı zorlayıcı." },
  { terim: "Güçlü / Dikkat", aciklama: "Her alanda hem işleyen yönü hem de sürtüşme çıkarabilecek yönü gösterir. İkisi birlikte okunmalıdır." },
  { terim: "İpucu", aciklama: "O alandaki rakam ve seçtiğin ilişki türü için uygulanabilir tek bir öneri." },
];

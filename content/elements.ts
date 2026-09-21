// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { ElementKey } from "@/lib/numerology";

export const ELEMENT_INFO: Record<
  ElementKey,
  { ad: string; rakamlar: number[]; oz: string; fazla: string; eksik: string; renk: string }
> = {
  hava: {
    ad: "Hava",
    rakamlar: [1, 5],
    oz: "Hareket, fikir ve iletişim. Hava elementi bir şeyi başlatan ve yayan taraftır.",
    fazla: "Zihin hızlanır, eylem dağılır; konuşma çok, tamamlama az olabilir.",
    eksik: "Kodunda hava yoksa, yeni bir şeye başlamak ve fikri dışarı söylemek sana yorucu gelebilir. Bunu bilinçli bir alışkanlıkla telafi edebilirsin: küçük bir adımı hemen atmak.",
    renk: "#0b6fb0",
  },
  su: {
    ad: "Su",
    rakamlar: [2, 7],
    oz: "Duygu, sezgi ve derinlik. Su elementi hissetme ve ilişki kurma tarafıdır.",
    fazla: "Duygular yoğunlaşır, ruh hali dalgalanır; başkasının hissini kendi hissi sanma riski artar.",
    eksik: "Kodunda su yoksa, kendi duygunu adlandırmak ve başkasınınkini fark etmek daha çok emek ister. Duyguyu yazıyla ya da bir arkadaşla konuşarak kelimeye dökmek işe yarar.",
    renk: "#2f52c4",
  },
  ates: {
    ad: "Ateş",
    rakamlar: [3, 6],
    oz: "Coşku, ifade ve sıcaklık. Ateş elementi görünür olan, ısıtan ve harekete geçiren taraftır.",
    fazla: "Tepki hızlanır, alınganlık artar; enerji parlayıp çabuk sönebilir.",
    eksik: "Kodunda ateş yoksa, kendini ifade etmek ve coşkuyu ortaya koymak zor gelebilir. Küçük gruplarda ve güvendiğin ortamlarda ses çıkarmak alıştırma sağlar.",
    renk: "#c2410c",
  },
  toprak: {
    ad: "Toprak",
    rakamlar: [4, 8],
    oz: "Yapı, emek ve sonuç. Toprak elementi somutlaştıran ve sürdüren taraftır.",
    fazla: "Katılık ve kontrol artar; değişim korkusu güçlenir.",
    eksik: "Kodunda toprak yoksa, düzen kurmak, bütçe yönetmek ve sürdürülebilir alışkanlık edinmek daha fazla çaba ister. Sabit bir takvim ve küçük rutinler destek olur.",
    renk: "#8a6420",
  },
  notr: {
    ad: "Nötr",
    rakamlar: [9],
    oz: "Bütünleme ve denge. 9 rakamı bir elemente bağlı değildir; diğerlerini dengeleyen ve tamamlayan taraftır.",
    fazla: "Sınırlar bulanıklaşır; herkesin yükünü taşıma eğilimi artar.",
    eksik: "Kodunda 9 yoksa bu bir eksiklik değil; sadece tamamlama ve bırakma temasının doğrudan hane olarak yer almadığını gösterir.",
    renk: "#6b6168",
  },
};

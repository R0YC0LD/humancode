// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { ElementKey } from "@/lib/numerology";

export { ELEMENT_INFO } from "./elements";

export const PERSONAL_YEAR_THEMES: { n: number; baslik: string; metin: string }[] = [
  { n: 1, baslik: "Başlangıç yılı", metin: "Yeni bir döngü açılır. Ertelenen karar, yeni iş ya da yeni yön için en uygun zemin. Kendi adımını atmak, yardım beklemekten daha verimli olur." },
  { n: 2, baslik: "Ortaklık yılı", metin: "Hız yavaşlar, ilişkiler öne çıkar. İşbirliği, sabır ve dinleme öne çıkar. Tek başına sonuç almak zordur; ortak kurmak kolaydır." },
  { n: 3, baslik: "İfade yılı", metin: "Görünür olma, üretme ve paylaşma zamanı. Yaratıcı projeler, sosyal çevre ve iletişim genişler. Dağılmamak için birkaç işe odaklanmak gerekir." },
  { n: 4, baslik: "Temel atma yılı", metin: "Emek ve düzen yılı. Bütçe, sağlık, ev ve iş yapısı gibi temelleri sağlamlaştırmak için uygun. Sonuçlar hemen değil, sabırla gelir." },
  { n: 5, baslik: "Değişim yılı", metin: "Hareket ve sürpriz. Taşınma, iş değişikliği, seyahat ya da yeni bir ilişki gündeme gelebilir. Esnek kalmak, aşırılığa kaçmamak önemli." },
  { n: 6, baslik: "Sorumluluk yılı", metin: "Ev, aile ve yakın çevre öne çıkar. Bakım vermek ve almak gündemde. Kendine ayrılan zaman, verilen özenden eksik kalmamalı." },
  { n: 7, baslik: "İçe dönüş yılı", metin: "Yavaşlama, araştırma ve iç değerlendirme zamanı. Dışa dönük büyümeden çok, düşünmek, öğrenmek ve toparlanmak için uygun." },
  { n: 8, baslik: "Sonuç yılı", metin: "Emeğin karşılığı, para ve pozisyon konuları öne çıkar. Yönetim, yatırım ve uzun vadeli hedefler için güçlü bir yıl; dengeyi korumak gerekir." },
  { n: 9, baslik: "Kapanış yılı", metin: "Bir döngünün sonu. Bırakılması gereken alışkanlık, ilişki ya da iş konusunda tamamlama zamanı. Yeni başlangıç için yer açılır." },
];

export interface SourceLink {
  ad: string;
  url: string;
}

/** Köken sayfasında gösterilen kaynaklar (yalnızca kamuya açık tanıtım/özet sayfaları). */
export const ORIGIN_SOURCES: SourceLink[] = [
  { ad: "Human Pin Code: The Sacred Maths in Your Birth Date (Goodreads)", url: "https://www.goodreads.com/book/show/575600.Human_Pin_Code_" },
  { ad: "Human Pin Code: Relationships (Goodreads)", url: "https://www.goodreads.com/book/show/11659590-human-pin-code-relationships" },
  { ad: "Human Pin Code (WorldCat kaydı)", url: "https://search.worldcat.org/title/Human-pin-code-:-the-sacred-maths-of-your-birth-date/oclc/50851348" },
  { ad: "Sacred scientific code hidden in your DOB (IOL)", url: "https://www.iol.co.za/business-report/technology/sacred-scientific-code-hidden-in-your-dob-229661" },
  { ad: "The Human Pincode (resmi site)", url: "https://humanpincode.com/" },
  { ad: "Douglas Forbes: Analysis & What is Pincodes", url: "http://humanpincode.blogspot.com/p/home.html" },
];

export const ORIGIN_SECTIONS: { baslik: string; paragraflar: string[] }[] = [
  {
    baslik: "Sistem nereden geliyor?",
    paragraflar: [
      "HumanCODE'un dayandığı yöntem, Güney Afrikalı yazar Douglas Forbes'un “Human Pin Code” adlı kitabıyla (ardından “Human Pin Code: Relationships”) yaygınlaşan bir numeroloji anlatımıdır. Kitap, doğum gününden, ayından ve yılından dokuz rakam türetip bunları bir piramide dizer. Forbes yöntemini “doğum tarihinin kutsal geometrisi” diye tanıtır.",
      "Yöntemin yazar tarafından yapılan anlatımında her rakamın yaklaşık on “aktif” ve on “reaktif” özelliği vardır. Bunlar bir kişilik “araç kutusu” gibi sunulur: kişi dengedeyken aktif, zorlandığında ya da yıprandığında reaktif taraf devreye girer. HumanCODE bu çerçeveyi kendi metinleriyle uygular; rakam sayfalarındaki iki liste bu fikre karşılık gelir.",
      "İlişkiler kitabında iki kişinin kodları birleştirilir ve ortaya çıkan “sinerji kodu”, iki kişi arasındaki kimyasal tepkime ve örtük sözleşme olarak okunur. Sitedeki sinerji çözümü bu fikirden esinlenir; skor formülü ise HumanCODE'a aittir.",
    ],
  },
  {
    baslik: "Forbes'un iddiaları ve doğrulanabilirlik",
    paragraflar: [
      "Tanıtım metinlerinde Forbes'un yöntemi yaklaşık 22–30 bin kişi üzerinde, 22–25 yıl boyunca denediği ve yüksek bir isabet oranı bulduğu belirtilir. Bu rakamlar (kaynaklara göre değişiyor) yazarın kendi beyanıdır; bağımsız bir çalışmayla doğrulanmış değildir ve hakemli bir yayına dayanmaz.",
      "Kitabın içeriği telifli olduğundan HumanCODE kitaptan metin almaz. Buradaki tüm yorumlar bu sitenin kendi metinleridir; kaynaklardan yalnızca genel çerçeve (dokuz konum, aktif/reaktif ayrımı, arketip fikri, sinerji kodu) esinlenilmiştir. Kamuya açık ikinci el özetlerde konum adları ve hesap ayrıntıları birbirinden biraz farklı verildiği için, HumanCODE'un hane adları ve formülleri bu sitenin kendi tanımıdır.",
    ],
  },
  {
    baslik: "Hesap nasıl çalışıyor?",
    paragraflar: [
      "Tüm hesaplar tek bir kurala dayanır: sayı 9'dan büyük olduğu sürece rakamları toplanır (29 → 11 → 2). 11 ve 22 gibi “master sayılar” ayrıca korunmaz. Doğum tarihinin günü, ayı ve yılından ilk üç hane türetilir; kalan altısı bunların toplamlarından çıkar. Formüller bu rehberdeki her hane sayfasında ve hesaplayıcıda görünür.",
      "İki kişinin sinerjisi, karşılıklı hanelerin toplanıp aynı kuralla indirgenmesiyle bulunur. Sonuçtaki skor sabit bir formüldür: ruh duygusu haneleri %60, iki kişinin baskın elementlerinin uyumu %25, karakter hanesi %15 ağırlık taşır. Aynı iki tarih her zaman aynı skoru verir.",
      "Kod Portresi ve sinerji yorumları da aynı şekilde deterministiktir: rakamların kodda kaç kez geçtiği, hangilerinin hiç geçmediği ve hanelerin birbirine göre durumu belirli kurallarla metin varyantlarına dönüşür. Rastgelelik ve yapay zeka yoktur.",
    ],
  },
  {
    baslik: "Yöntemin sınırları",
    paragraflar: [
      "Bu sistem, kişiye ait bilgiyi yalnızca doğum tarihinden çıkarır. Toplam yalnızca 729 farklı kod vardır (9 × 9 × 9); yani dünya nüfusu 729 gruba bölünür. Aynı kodu paylaşan milyonlarca insanın hayatı birbirinden çok farklıdır. Kod, bir insanın kişiliğini, geçmişini ya da kararlarını belirlemez.",
      "Hesap kuralları arasındaki bazı tercihler (örneğin master sayıların ayrıca ele alınmaması) yöntemin türevlerine göre değişir. HumanCODE bunlardan birini seçer ve tutarlı uygular; bu, diğer kaynaklarla sonuçların farklı çıkabileceği anlamına gelir.",
      "Metinlerin zenginleşmesi ya da ayrıntılanması, tahminlerin daha doğru olduğu anlamına gelmez. Ayrıntı, okuyana daha fazla “kendinden bir şey bulma” imkânı verir; isabet ölçüsü değildir.",
    ],
  },
  {
    baslik: "Bu sistemin bilimsel durumu",
    paragraflar: [
      "Numeroloji bilimsel bir yöntem değildir. Doğum tarihi rakamlarının kişilik, ilişki uyumu ya da yaşam olayları ile ilişkili olduğunu gösteren, tekrarlanabilir bir bilimsel kanıt yoktur. Bu tür sistemlerin öngörü gücünü destekleyen, kontrollü çalışmalarla doğrulanmış bir bulgu bulunmaz.",
      "Bu tür metinlerin “isabetli” hissettirmesinin bilinen bir açıklaması vardır: geniş ve olumlu genellemeleri insanlar kendilerine özgü sanma eğilimindedir (Barnum etkisi). Ayrıca insanlar okudukları metinden kendilerine uyanları hatırlar, uymayanları unutur (doğrulama yanlılığı). Hem güçlü hem gölge yanları aynı anda yazmak (aktif ve reaktif) bu etkiyi ortadan kaldırmaz.",
      "Bu nedenle HumanCODE'u, kendini tanımaya yönelik bir düşünce aracı ve eğlence olarak kullanın: okuduğunuz cümle size bir şey düşündürüyorsa değerli olabilir, ama bu, cümlenin doğru olduğunu kanıtlamaz. Bir ilişkiye, işe ya da hayat kararına dair sonuçlar bu tür bir analize dayandırılmamalıdır.",
    ],
  },
];

export const FAQ: { s: string; c: string }[] = [
  {
    s: "HumanCODE kodumu nasıl hesaplıyor?",
    c: "Doğum tarihinizin gün, ay ve yıl rakamlarını tek haneye indirir; sonra bu üç haneyi birbirine ekleyerek toplam dokuz hane çıkarır. Tüm formüller açık ve rehberde yazılıdır.",
  },
  {
    s: "Yapay zeka kullanılıyor mu?",
    c: "Hayır. Hesaplar sabit matematiktir, yorumlar önceden yazılmış editoryal metinlerdir. Aynı tarih her zaman aynı sonucu verir.",
  },
  {
    s: "Kayıt olmadan kullanabilir miyim?",
    c: "Evet. Kod hesaplama ve iki kişi karşılaştırma tarayıcınızda çalışır; tarihiniz sunucuya gönderilmez.",
  },
  {
    s: "Uyum skoru nasıl bulunuyor?",
    c: "Ruh duygusu sinerjisi %60, baskın element uyumu %25, karakter sinerjisi %15 ağırlıkla toplanır ve yuvarlanır. 80 ve üzeri yüksek sinerji, 60–79 uyumlu, 40–59 emek ister, 40 altı zorlayıcıdır.",
  },
  {
    s: "Douglas Forbes kim, bu site onun yöntemi mi?",
    c: "Forbes, “Human Pin Code” kitabının yazarı. HumanCODE onun çerçevesinden (dokuz konum, aktif/reaktif ayrımı, arketipler, sinerji) esinlenir ama tüm metinleri ve skor formülü bu sitenin kendisine aittir; kitaptan metin alınmamıştır.",
  },
  {
    s: "Metinler neden bu kadar çeşitli?",
    c: "Kod Portresi ve sinerji yorumları, kodundaki rakamların sayısına, eksiklerine ve hanelerin birbirine göre durumuna göre kurallarla birleştirilen metin parçalarından oluşur. 729 kodun her biri farklı bir portre verir. Yapay zeka ya da rastgelelik yoktur.",
  },
  {
    s: "Sonuçlar ne kadar güvenilir?",
    c: "Numeroloji bilimsel bir test değildir. HumanCODE, kendini tanımaya yönelik bir düşünce aracı ve eğlence amaçlıdır; hayat kararlarını buna dayandırmayın.",
  },
];

export const DISCLAIMER =
  "Bu analiz numerolojiye dayanır. Bilimsel bir kişilik veya uyum testi değildir; kendini tanımaya yönelik bir düşünce aracı ve eğlence amaçlıdır. Hayatına dair kararları buna dayandırma.";

/** İki baskın elementin uyum notu (puanlar lib/numerology.ts → elementPoints ile aynı çiftler). */
export function elementPairNote(a: ElementKey, b: ElementKey): string {
  if (a === "notr" || b === "notr") return "Taraflardan biri nötr baskın: dengeleyici ve uyum sağlayıcı bir zemin.";
  if (a === b) return "Aynı element: birbirinizi kolay anlarsınız, ama aynı kör noktayı paylaşma riski var.";
  const pair = [a, b].sort().join("+");
  switch (pair) {
    case "su+toprak":
      return "Su toprağı besler: biri duygu ve sezgi getirir, diğeri yapı ve süreklilik.";
    case "ates+hava":
      return "Hava ateşi körükler: biri fikir ve hareket getirir, diğeri coşku ve ifade.";
    case "hava+toprak":
      return "Ayrı dünyalar: biri hareket ve fikir, diğeri düzen ve süreklilik ister.";
    case "ates+su":
      return "Biri diğerini söndürebilir: coşku ile duygusal derinlik zaman zaman çatışır.";
    default:
      return "Farklı hızlarda iki element: köprü kurmak biraz emek ister, ama tamamlayıcı olabilir.";
  }
}

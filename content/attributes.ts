// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Mode } from "@/lib/numerology";

/**
 * Forbes anlatımındaki "araç kutusu" fikrinin (her rakamın dengedeyken öne çıkan "aktif" ve
 * dengeyi kaybedince tetiklenen "reaktif" tarafları) HumanCODE'a özgü, özgün ifadeli karşılığı.
 * Her rakam için 10 aktif + 10 reaktif öğe; hepsi kısa isim tamlamasıdır, cümle içine gömülebilir.
 */
export interface DigitToolbox {
  n: number;
  /** Yaygın anlatımlardaki arketip adı (kaynakça: rehber › köken). */
  arketip: string;
  aktif: string[];
  reaktif: string[];
  /** Bu rakam kodda hiç yoksa ne anlama gelir. */
  eksik: string;
  /** Sinerji hanesinde bu rakam çıktığında ilişkinin örtük "sözleşmesi". */
  sozlesme: string;
  /** Alan + ilişki türüne göre işe yarayan, uygulanabilir öneri. */
  ipucu: Record<Mode, string>;
}

export const TOOLBOX: DigitToolbox[] = [
  {
    n: 1,
    arketip: "Yaratıcı",
    aktif: ["girişimcilik", "özgüven", "cesaret", "yön belirleme", "kararlılık", "bağımsızlık", "öncülük", "doğrudan konuşma", "özgün fikir", "harekete geçirme"],
    reaktif: ["kibir", "saldırganlık", "tahammülsüzlük", "dinlememe", "emir verme", "rekabet takıntısı", "inat", "yalnız kalma", "sabırsızlık", "eleştiriye kapanma"],
    eksik: "Kodunda 1 yok: ilk adımı atma refleksi kendiliğinden gelmez. Kimse yolu açmayacak; kendine izin vermek bilinçli bir alışkanlığa dönüşmeli. Küçük ama net bir “başlıyorum” cümlesi bu eksiği büyük ölçüde kapatır.",
    sozlesme: "İkiniz de son sözü söyleyebilecek kadar güçlüsünüz; yazılmayan anlaşma, yetkinin sırayla ve açıkça devredilmesi.",
    ipucu: {
      romantik: "Haftada bir kez kararı bilerek diğerine bırakın; kim haklı değil, kim ne istiyor konuşulsun.",
      arkadaslik: "Planı sırayla yapın: bu ay sen seç, gelecek ay ben. Liderlik yarışı şakaya dönüşür.",
      is: "Karar alanlarını yazılı bölün (kim neyde son sözü söylüyor) ve üç ayda bir gözden geçirin.",
      aile: "Kuralları tartışma anında değil, sakin bir zamanda birlikte koyun; sonra ikisi de aynı kurala bağlı olsun.",
    },
  },
  {
    n: 2,
    arketip: "Besleyen",
    aktif: ["sakinlik", "işbirliği", "empati", "denge kurma", "sabırlı dinleme", "nazik diplomasi", "sezgi", "destek olma", "uyum", "barıştırma"],
    reaktif: ["aşırı duygusallık", "savunmacılık", "içine atma", "onay bağımlılığı", "kırılganlık", "pasif direniş", "karar verememe", "alınganlık", "kendini ihmal", "tepkisel sessizlik"],
    eksik: "Kodunda 2 yok: ilişkilerde ince ayar, yani karşındakinin ne hissettiğini sormadan fark etme daha çok emek ister. “Sen nasılsın, gerçekten?” sorusunu alışkanlık yapmak bu boşluğu doldurur.",
    sozlesme: "Örtük anlaşma karşılıklı bakım: biri yorulduğunda diğeri fark eder. Ama ikiniz de ihtiyacını dile getirmezse anlaşma sessizce bozulur.",
    ipucu: {
      romantik: "Haftalık “bu hafta beni ne yordu” konuşması yapın; biriken kırgınlık küçükken çözülür.",
      arkadaslik: "Sıra bende diye net teklif edin; “ne yapalım” döngüsünü biriniz bilerek kırsın.",
      is: "Zor kararlar için bir sahibi olsun; uyum uğruna ertelenen karar iki tarafı da yorar.",
      aile: "Beklentileri yüksek sesle söyleyin; sezilmesini beklemek ikinizi de kırar.",
    },
  },
  {
    n: 3,
    arketip: "Organizatör",
    aktif: ["stratejik düşünme", "anlatım gücü", "iyimserlik", "ilham verme", "yaratıcı çeşitlilik", "espri", "ikna", "organize etme", "hız", "sosyallik"],
    reaktif: ["dedikodu", "dağınıklık", "yarım bırakma", "yüzeysellik", "abartı", "dikkat çekme telaşı", "eleştiriye alınganlık", "gevezelik", "dağılma", "ağır konuları geçiştirme"],
    eksik: "Kodunda 3 yok: kendini ifade etmek, fikri yüksek sesle söylemek ve hafif kalabilmek bilinçli çaba ister. Küçük gruplarda konuşmayı alıştırmak (ve yazmak) boşluğu kapatır.",
    sozlesme: "Örtük anlaşma: birlikte üretmek ve konuşmak. Ağır konuların da hafiflik uğruna ertelenmemesi bu anlaşmanın dürüst yanı.",
    ipucu: {
      romantik: "Zor konuşmaları espriyle değil, önceden söylenmiş bir “ciddi konuşalım” ile açın.",
      arkadaslik: "Söz verdiğiniz buluşmaları takvime yazın; fikir bolluğu yürütülmediği sürece güven aşındırır.",
      is: "Her fikir için bir “sahibi ve teslim tarihi” belirleyin; başlayan iş bitmeden yenisi açılmasın.",
      aile: "Gündelik görevleri görünür bir listeye bağlayın; neşe işlerin yerini almasın, işlerin yanında dursun.",
    },
  },
  {
    n: 4,
    arketip: "Araştırmacı",
    aktif: ["mantıklı düşünme", "düzen", "sorumluluk", "dayanıklılık", "ayrıntıya dikkat", "sistem kurma", "güvenilirlik", "sabır", "araştırma", "pratik çözüm"],
    reaktif: ["asilik", "otoriterlik", "katılık", "şüphecilik", "kontrol takıntısı", "değişime direnç", "sürekli eleştiri", "inatçı ısrar", "resmi soğukluk", "ayrıntıda boğulma"],
    eksik: "Kodunda 4 yok: düzen kurmak, bütçe tutmak ve rutin sürdürmek kendiliğinden gelmez. Sabit bir takvim ve küçük, tekrarlanan alışkanlıklar boşluğu kapatır.",
    sozlesme: "Örtük anlaşma: söz verilen yapılır. Ama şüphe girerse sorular sorulmadan varsayımlar yapılır; bu yüzden şeffaflık bu bağın zorunlu şartı.",
    ipucu: {
      romantik: "Endişeyi varsayım olarak taşımayın; sorun, sorusuz yorumlanmasın. Haftada bir açık soru saati koyun.",
      arkadaslik: "Yılda bir kez birlikte hiç denemediğiniz bir şey yapın; rutin dostluğu korur ama tek başına yetmez.",
      is: "Süreçleri yazın ama her çeyrekte bir kuralı bilerek gevşetip sonucunu ölçün.",
      aile: "Kuralları sabit tutun, istisnaları da açıkça tanımlayın; kimin ne zaman esneyebileceği baştan belli olsun.",
    },
  },
  {
    n: 5,
    arketip: "Mucit",
    aktif: ["macera", "analitik merak", "özgür ruh", "çabuk uyum", "çok yönlülük", "iletişim", "keşif", "esneklik", "canlılık", "hızlı öğrenme"],
    reaktif: ["erteleme", "aşırılık", "sabırsızlık", "sorumluluktan kaçış", "dağınık enerji", "bağlılık korkusu", "tutarsızlık", "sıkılınca bırakma", "dürtüsellik", "dikkatsizlik"],
    eksik: "Kodunda 5 yok: değişime ayak uydurmak ve rutinin dışına çıkmak daha yorucu gelebilir. Küçük, kontrollü sürprizler (yeni bir yol, yeni bir tarif) esnekliği besler.",
    sozlesme: "Örtük anlaşma: birbirinize ilham vermek. Bunun bağımlılığa dönüşmemesi için ayrı geçirilen zaman anlaşmanın parçası olmalı.",
    ipucu: {
      romantik: "Ayrı vakti bilinçli planlayın; ayrı kalmak bağı zayıflatmaz, canlı tutar.",
      arkadaslik: "Her planın yanında küçük bir taahhüt olsun (tarih, yer, kim ayarlıyor); serbestlik ancak o zaman keyifli.",
      is: "Aynı anda en fazla üç iş yürütün; yeni fikir ancak eskilerden biri kapanınca kuyruğa girsin.",
      aile: "Rutini oyunlaştırın: sorumluluk listesi dönüşümlü olsun, kimse aynı işi kalıcı yüklenmesin.",
    },
  },
  {
    n: 6,
    arketip: "Büyüleyen",
    aktif: ["şefkat", "vizyon", "kabul", "bakım verme", "estetik duygusu", "sıcaklık", "sorumluluk", "uyumlu ortam kurma", "cömertlik", "koruyuculuk"],
    reaktif: ["kin tutma", "karışma", "müdahaleci ilgi", "mükemmeliyetçilik", "karşılık bekleyen fedakârlık", "kontrolcü sevgi", "dedikodu", "mağdur rolü", "aşırı yük alma", "başkasını düzeltme"],
    eksik: "Kodunda 6 yok: bakım verme ve bakım almak, estetik ve yuva kurma konusunda daha çok bilinç gerekir. Kendine düzenli ve küçük bakım rutinleri koymak boşluğu kapatır.",
    sozlesme: "Örtük anlaşma: birbirinizi ‘yuvanız’ yapmak. İlginin kontrole dönüşmemesi için yardımın istenince verilmesi anlaşmanın şartı.",
    ipucu: {
      romantik: "Yardım teklif etmeden önce sorun: “Çözüm mü istiyorsun, dinlenmek mi?” Cevap ilgiyi kontrolden ayırır.",
      arkadaslik: "Başkalarının derdine harcadığınız enerjiden bir payı birbirinize ayırın; dostluk da bakım ister.",
      is: "Kalite çıtasını iki seviyeye bölün: kusursuz olması gerekenler ve yeterince iyi olanlar.",
      aile: "Fedakârlığı sessizce biriktirmeyin; ne yaptığınızı ve karşılığında ne istediğinizi bir kez açıkça söyleyin.",
    },
  },
  {
    n: 7,
    arketip: "İdealist",
    aktif: ["bilgelik", "doğruluk", "iç gözlem", "derin analiz", "odaklanma", "sezgi", "sade yaşam", "ince ayrım", "sadakat", "araştırıcılık"],
    reaktif: ["endişe", "kapanma", "gizlilik", "aşırı analiz", "mesafe koyma", "güvensizlik", "ulaşılmazlık", "mükemmel cümleyi bekleme", "soğuma", "duyguyu zihne çevirme"],
    eksik: "Kodunda 7 yok: durup içe bakmak, yalnız kalmak ve derinleşmek doğal bir refleks değil. Günlük sessiz bir pencere (yürüyüş, yazı, telefonsuz yarım saat) boşluğu kapatır.",
    sozlesme: "Örtük anlaşma: birbirinizin iç dünyasına saygı. Ama söylenmeyen şey hissedilmez; bu yüzden duyguyu kısa cümlelerle dile getirmek anlaşmanın şartı.",
    ipucu: {
      romantik: "Haftada bir telefonsuz akşam ve tek bir cümlelik “bugün içimde şu var” alışkanlığı kurun.",
      arkadaslik: "İletişim sorumluluğunu sırayla üstlenin; aylarca sessizlik kimsenin kasıtlı kararı olmasın.",
      is: "Bilgiyi kısa haftalık notlarla paylaşın; derin çalışma değerlidir ama ekibin haberdar olması gerekir.",
      aile: "Ortak akşam yemeğinde “bugünün en iyi ve en zor anı” gibi küçük bir soru duygu konuşmasını kolaylaştırır.",
    },
  },
  {
    n: 8,
    arketip: "Güvenilir",
    aktif: ["hırs", "kararlılık", "güç", "kaynak yönetimi", "sonuç odaklılık", "liderlik", "dayanıklılık", "adalet duygusu", "uzun vadeli plan", "disiplin"],
    reaktif: ["gücü kötüye kullanma", "saplantı", "sertlik", "iş bağımlılığı", "statü kaygısı", "duyguyu bastırma", "kontrolcülük", "acımasız rekabet", "değeri parayla ölçme", "tükenene kadar çalışma"],
    eksik: "Kodunda 8 yok: para, otorite ve uzun vadeli hedefler konusunda kendine güvenmek bilinçli çaba ister. Net bir bütçe ve yazılı bir 12 aylık hedef listesi boşluğu kapatır.",
    sozlesme: "Örtük anlaşma: birlikte ağır işleri kaldırmak. Bu yoğunluğun boğucu olmaması için ‘iş dışı’ alanın anlaşmada yeri açıkça yazılı olmalı.",
    ipucu: {
      romantik: "Haftada bir “sıfır plan” zamanı koyun: para, iş ve sorumluluk masaya gelmesin.",
      arkadaslik: "Görüşmelerin yarısı iş, para ve statü dışında bir konuya ayrılsın; hafiflik bilinçli seçilir.",
      is: "Pay, rol ve karar yetkisi bugün yazılsın; sonradan çıkan belirsizlik güçlü ortaklıkları en hızlı bitirir.",
      aile: "Sevgiyi destekle ve kaynakla ifade ediyorsanız, ayrıca sözle ve zamanla da gösterin.",
    },
  },
  {
    n: 9,
    arketip: "Çocuk",
    aktif: ["insanseverlik", "bilgelik", "bütünlük", "affetme", "geniş perspektif", "cömertlik", "hayal gücü", "kapsayıcılık", "bırakabilme", "ilham"],
    reaktif: ["amaçsızlık", "bunalma", "sınırsızlık", "kurban rolü", "geçmişe takılma", "kaçış", "dağınık vizyon", "herkesi kurtarma", "kapanmamış işler", "gerçeklikten kopma"],
    eksik: "Kodunda 9 yok: bu bir eksik değil; bırakma ve tamamlama teması kodunda doğrudan bir hane olarak yer almıyor. Yine de bir şeyi bilinçli kapatmak (kutlamak, teşekkür etmek) sana iyi gelebilir.",
    sozlesme: "Örtük anlaşma: hatalar affedilir, hafiflik korunur. Ama aynı davranış sürekli affedilirse ilişki de gelişmez; sınırların zaman zaman konuşulması gerekir.",
    ipucu: {
      romantik: "Affetmeyi bir kural olarak değil, bir seçim olarak yapın; sınırınızı da aynı nezaketle söyleyin.",
      arkadaslik: "Geniş çevrenize ayırdığınız zamandan bir bölümünü sadece ikinize ayırın.",
      is: "Vizyonu somut teslimlere bölün; nakit akışı ve tarihler için bir sorumlu belirleyin.",
      aile: "Herkes için geçerli üç net kural belirleyin; geri kalan her şey esnek kalabilir.",
    },
  },
];

export function getToolbox(n: number): DigitToolbox {
  const t = TOOLBOX[n - 1];
  if (!t) throw new RangeError(`Rakam yok: ${n}`);
  return t;
}

/** 9 yıllık dönemlerin (0–8, 9–17 …) genel teması; editoryal metin. */
export const PERIOD_THEMES: { baslik: string; metin: string }[] = [
  { baslik: "Dünyayı tanıma", metin: "Aile, okul ve ilk ilişkiler kodun ilk tonunu belirler. Öğrendiğin en kalıcı şey, ortamın sana nasıl davrandığıdır." },
  { baslik: "Kimlik arayışı", metin: "Arkadaş grupları ve ilk büyük duygular öne çıkar. Ne olduğunu değil, ne olmadığını keşfetme dönemi." },
  { baslik: "Yola çıkış", metin: "Meslek, ayrılık ve ilk büyük kararlar. Hatalar pahalı görünür ama en hızlı öğreten dönemdir." },
  { baslik: "Kök salma", metin: "İş, ev ve aile kurmak ya da bunları bilinçle ertelemek. Emek ve sorumluluk yoğunlaşır." },
  { baslik: "Değerleri yeniden tartma", metin: "Kurduğun hayatın sana gerçekten uyup uymadığını sorgulama dönemi. Sessiz bir yeniden düzenleme çoğu zaman gürültülü bir krizden daha iyidir." },
  { baslik: "Yeniden kurma", metin: "Deneyim artık bir kaynak. İş, ilişki ve öncelikler, öğrendiklerinle yeniden dizilebilir." },
  { baslik: "Duygusal olgunluk", metin: "Kim olduğun konusunda daha az kanıt, daha çok sükûnet gerekir. İlişkiler sayıdan çok derinlikle ölçülür." },
  { baslik: "Bırakma ve serbestleşme", metin: "Yükler hafifler, ifade özgürleşir. Yaşam boyu ertelenen ilgi alanlarına dönmek için uygun bir dönem." },
  { baslik: "Bütünleme", metin: "Yaşananları bir hikâye olarak yeniden okuma zamanı. Öğrettiklerini aktarmak en verimli yol olabilir." },
  { baslik: "Sadeleşme", metin: "Az şeyle çok şey yapabilme. Ne kalması gerektiği, ne bırakılabileceğinden daha net görünür." },
  { baslik: "Miras", metin: "Etki, yaptıklarından çok neyi taşıdığınla ölçülür." },
  { baslik: "Bilgelik", metin: "Bakış uzar, tempo yavaşlar. Eski düğümler çözülür ya da artık önemsizleşir." },
];

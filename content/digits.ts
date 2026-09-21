// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { ElementKey, Mode } from "@/lib/numerology";

export interface ModeLine {
  guc: string;
  dikkat: string;
}

export interface DigitInfo {
  n: number;
  baslik: string;
  kisa: string;
  element: ElementKey;
  oz: string;
  guc: string[];
  golge: string[];
  meslek: string[];
  iliski: { rahat: number[]; zor: number[]; not: string };
  /** Bu rakam h1..h9'un her birinde ne anlama gelir (sırasıyla). */
  hane: [string, string, string, string, string, string, string, string, string];
  /** Sinerji hanesinde bu rakam çıkarsa, moda göre yorum. */
  mode: Record<Mode, ModeLine>;
  /** Ruh Duygusu (sH8) hanesinde bu rakamın ilişki anlamı. */
  ruh: { ad: string; anahtar: string; metin: string };
}

export const DIGITS: DigitInfo[] = [
  {
    n: 1,
    baslik: "Öncü",
    kisa: "Başlatan",
    element: "hava",
    oz: "1, sayı dizisinin başıdır ve öyle davranır: birinin başlatması gerekiyorsa o başlatır. Bağımsızlık, karar verme ve doğrudan eylem bu rakamın çekirdeğidir. Soruya cevap aramaz, cevabı yürürken bulur.",
    guc: ["Karar verme hızı", "Belirsizlikte harekete geçme cesareti", "Kendi ayakları üzerinde durabilme"],
    golge: ["Dinlemeyi geçiştirme", "Her şeyi kendi yapmak zorunda hissetme", "Rekabeti ilişkiye taşıma"],
    meslek: ["Girişimci, kurucu", "Ekip lideri, yönetici", "Pilot, sporcu, acil müdahale", "İş geliştirme ve satış"],
    iliski: {
      rahat: [3, 5, 9],
      zor: [1, 8],
      not: "1'ler en rahat, kendi alanını koruyan ve ona alan tanıyan rakamlarla çalışır. İki 1 yan yana gelince ortak proje kadar ortak kaptanlık sorunu da gelir.",
    },
    hane: [
      "İlk refleksin öne çıkmak; tarif beklemeden yolu açan kişisin.",
      "Toplulukta arkada değil önde durursun; gruba yön vermeyi doğal sayarsın.",
      "Dünyayı bireysel girişim üzerinden okursun: herkes kendi işini kurmalı, kendi yolunu çizmeli.",
      "Hayatın atılımlarla ilerler; her dönemde sıfırdan başlama cesareti gerekir.",
      "Ders: tek başına yetmediğini kabul etmek. Yardım istemek seni küçültmez.",
      "İçinde, sözünün geçmesini isteyen sessiz bir yön duygusu var.",
      "İçindeki çocuk oyunda bile birinci olmak ister; her şeyi yarışa çevirir.",
      "Duygularını konuşarak değil eylemle gösterirsin: bir şey başlatır, bir şey yapıp bırakırsın.",
      "Genel yaşam duyun: hayat, senin adım atmanı bekleyen boş bir sayfa.",
    ],
    mode: {
      romantik: {
        guc: "İkiniz de girişkensiniz; ilişkiyi durgunluğa bırakmaz, plan yapar ve yola çıkarsınız.",
        dikkat: "İkiniz de son sözü söylemek ister; küçük konular bile yetki tartışmasına döner.",
      },
      arkadaslik: {
        guc: "Birlikteyken cesaretiniz artar; tek başınıza denemeyeceğiniz şeyleri denersiniz.",
        dikkat: "Kimin lider olduğu sessizce bir yarışa dönüşebilir; kimse söylemez ama herkes sayar.",
      },
      is: {
        guc: "Karar hızı yüksek bir ikilisiniz; işler bekletilmeden başlar.",
        dikkat: "Rol ve yetki yazıya dökülmezse iki kaptanlı bir gemi olursunuz.",
      },
      aile: {
        guc: "Birbirinizden bağımsız durmayı öğrenirsiniz; kimse kimseyi boğmaz.",
        dikkat: "Otorite sorusu sık gündeme gelir; kimin kararının geçerli olduğu baştan netleşmeli.",
      },
    },
    ruh: {
      ad: "Güç mücadelesi",
      anahtar: "Birinin önde olması gerekiyor",
      metin:
        "Bağın özü iki güçlü iradenin aynı odada bulunması. Kimse geri adım atmayı sevmediği için ilişki, çoğu zaman kimin haklı olduğu üzerinden ilerler. İyi tarafı şu: kimse kimsenin gölgesinde erimez, ikiniz de ayakta kalırsınız. Kötü tarafı: küçük anlaşmazlıklar ilkesel savaşa dönebilir. Bu bağ, ortak bir hedef bulduğunda iyi çalışır; hedef olmayınca enerji birbirine yönelir. Gündelik hayatta rolleri önceden paylaşmak (bugün kim karar veriyor) ve “kazanmak” yerine “çözmek” kelimesini seçmek işe yarar.",
    },
  },
  {
    n: 2,
    baslik: "Denge Kuran",
    kisa: "Eşlik eden",
    element: "su",
    oz: "2, iki şeyin arasındaki boşluğu görür ve orayı doldurur. İşbirliği, sezgi ve duyarlılık bu rakamın çekirdeğidir. Sahneye çıkmaktan çok, sahnenin çalışmasını sağlar.",
    guc: ["Ortamdaki gerilimi erken sezme", "Arabuluculuk", "Sabırla dinleme"],
    golge: ["Çatışmadan kaçıp içine atma", "Onay bağımlılığı", "Kendi ihtiyacını ikinci sıraya koyma"],
    meslek: ["Arabulucu, diplomat", "Danışman, terapist yardımcısı", "Hemşire, bakım mesleği", "Kurumsal destek ve koordinasyon"],
    iliski: {
      rahat: [6, 9, 4],
      zor: [1, 8],
      not: "2'ler kendisine yer açan ve onları duyan rakamlarla açılır. Baskın rakamlar karşısında sessizce küçülürler; bu küçülme dışarıdan uyum gibi görünür.",
    },
    hane: [
      "İlk refleksin ortamı okumak; kimin ne hissettiğini söylemeden anlarsın.",
      "Toplulukta köprü olursun; farklı grupları birbirine tanıştıran kişi sensin.",
      "Dünyayı ilişkiler ağı olarak görürsün: her şey birbirine bağlı, kimse tek başına değil.",
      "Hayatın ortaklıklarla şekillenir; önemli dönüşler bir başkasıyla birlikte gelir.",
      "Ders: hayır demek. Uyum, her şeye evet demek değildir.",
      "İçinde derin bir aidiyet ihtiyacı var; kabul edilmek senin için hava gibi.",
      "İçindeki çocuk incinmeye açık; küçük bir soğukluk bile uzun süre iz bırakır.",
      "Duygularını hissettirerek anlatırsın; söze dökmediğinde bile karşındaki anlar.",
      "Genel yaşam duyun: hayat, iki tarafı uzlaştırılması gereken bir denge.",
    ],
    mode: {
      romantik: {
        guc: "Birbirinizin ruh halini sözsüz okursunuz; ilişkide ısı ve yumuşaklık kolay kurulur.",
        dikkat: "İkiniz de çatışmadan kaçtığı için sorunlar konuşulmadan birikir.",
      },
      arkadaslik: {
        guc: "Yanınızda insan rahatlar; sır tutmak ve destek olmak konusunda güvenilirsiniz.",
        dikkat: "Kimse plan yapmadığı için buluşmalar “sen ne istersin” döngüsüne girebilir.",
      },
      is: {
        guc: "Karşılıklı dinleme iyi işler; ekip içi sürtüşmeyi ikiniz de erkenden yumuşatırsınız.",
        dikkat: "Zor bir kararı kimse üstlenmek istemez; sorumluluk havada kalabilir.",
      },
      aile: {
        guc: "Evde ortak bir sakinlik üretirsiniz; birbirinizin yükünü fark edip paylaşırsınız.",
        dikkat: "Söylenmeyen beklentiler kırgınlığa dönüşür; ihtiyaçları açıkça dile getirmek gerekir.",
      },
    },
    ruh: {
      ad: "Besleyici bağ",
      anahtar: "En kolay kurulan bağ",
      metin:
        "Bağın özü karşılıklı bakım. İkiniz de diğerinin ihtiyacını sormadan fark edersiniz; bu yüzden ilişki gündelik hayatta yorucu değil, dinlendirici. Sıcaklık, güven ve sabır bu bağın doğal malzemesi. Risk tam bu rahatlığın içinde: iki taraf da uyum uğruna kendi itirazını saklarsa, sorunlar çok geç ve tek seferde patlar. Bu bağda en sağlam alışkanlık, memnuniyetsizliği küçükken söylemek. Rahat ilişkiler kendi kendine iyi kalır sanılır; oysa sizinki, sözü hâlâ açıkça kullanmayı gerektirir.",
    },
  },
  {
    n: 3,
    baslik: "İfade Eden",
    kisa: "Üreten",
    element: "ates",
    oz: "3, içindekini dışarı taşır: söz, resim, espri, proje. Yaratıcılık ve coşku bu rakamın çekirdeğidir. Fikirleri çok, başlama isteği güçlü, görünür olmak konusunda rahattır.",
    guc: ["Anlatma ve ikna", "Yaratıcı çeşitlilik", "Ortamı canlandırma"],
    golge: ["Dağınıklık, yarım kalan işler", "Eleştiriye alınganlık", "Derin konuları espriyle geçiştirme"],
    meslek: ["Yazar, tasarımcı, yönetmen", "Eğitmen, sunucu", "Pazarlama ve içerik", "Girişimci ekiplerde fikir insanı"],
    iliski: {
      rahat: [1, 5, 6],
      zor: [4, 7],
      not: "3'ler kendisini dinleyen ve çeşitliliği seven rakamlarla parlar. Aşırı düzen isteyen ya da çok az konuşan rakamlar yanında enerjileri sönebilir.",
    },
    hane: [
      "İlk refleksin konuşmak, paylaşmak, ortamı hareketlendirmek.",
      "Toplulukta dikkat çekersin; grubun enerjisini yükselten ya da yönü değiştiren kişisin.",
      "Dünyayı hikâyeler ve fikirler üzerinden okursun; anlatılabilen her şey değişebilir.",
      "Hayatın çok yönlü akar; aynı anda birkaç yolu birden yürüme eğilimin var.",
      "Ders: odaklanmak. Her fikri bitirmek gerekmez ama birkaçını sonuna kadar götürmek gerekir.",
      "İçinde ifade edilmemiş bir yaratıcılık birikimi var; susturulduğunda huzursuzluk olarak döner.",
      "İçindeki çocuk oyun, renk ve tempo ister; eğlence senin için bir gereksinim, lüks değil.",
      "Duygularını sözle ve mizahla taşırsın; ağır bir şeyi hafifleterek söylemeyi seçersin.",
      "Genel yaşam duyun: hayat, denenmesi gereken çok sayıda kapı.",
    ],
    mode: {
      romantik: {
        guc: "Birlikteyken konuşma, mizah ve keşif hiç bitmez; sıkıcı bir ilişki değil.",
        dikkat: "İkiniz de eğlenceye odaklanınca zor konuşmalar ertelenir.",
      },
      arkadaslik: {
        guc: "Ortamı canlandıran, plan üreten bir ikilisiniz; yanınızda vakit çabuk geçer.",
        dikkat: "Söz verip yetişemediğiniz buluşmalar birikirse güven aşınır.",
      },
      is: {
        guc: "Fikir üretimi hızlı; aynı anda çok iş yürütür, çok şey başarırsınız.",
        dikkat: "İş bitince aranıza mesafe girer; kapanış ve teslim sorumluluğu kimseye yazılmamışsa iş yarım kalır.",
      },
      aile: {
        guc: "Evde neşe, konuşma ve yaratıcı çözümler eksik olmaz.",
        dikkat: "Gündelik düzen ve sıradan görevler gözden kaçar; ortak bir liste işe yarar.",
      },
    },
    ruh: {
      ad: "Verimli ama geçici bağ",
      anahtar: "Çok iş biter, iş bitince mesafe",
      metin:
        "Bağın özü ortak üretim. Birlikteyken çok şey yaparsınız: projeler, seyahatler, planlar. Bağ, bir hedefe bakarken güçlü; hedef bittiğinde ise yönsüz kalabilir. İş bitince aranıza girebilecek mesafe, aslında bağın sönmesi değil, ortak yönün kaybolması. Bu yüzden yeni bir ortak hedef, yeni bir merak, yeni bir yolculuk ilişkiyi taze tutar. Bağın zorlandığı yer derin duygusal konular; ikiniz de o anda konuyu hafifletmeye eğilirsiniz. Hafiflemeyi bir kere bırakıp konunun ağırlığını taşımaya cesaret etmek, bu bağı bir üst kata taşır.",
    },
  },
  {
    n: 4,
    baslik: "Kurucu",
    kisa: "Sağlamlaştıran",
    element: "toprak",
    oz: "4, sözü işe, fikri yapıya dönüştürür. Düzen, sabır ve güvenilirlik bu rakamın çekirdeğidir. Hızlı sonuç yerine dayanıklı sonuç ister; temeli atmadan duvar örmez.",
    guc: ["Planlama ve süreklilik", "Ayrıntıya dikkat", "Sözünü tutma"],
    golge: ["Değişime direnç", "Şüphecilik, kontrol ihtiyacı", "Esnek olmaması gereken yerde bile katı olma"],
    meslek: ["Mühendis, mimar", "Muhasebe, denetim", "Proje ve operasyon yönetimi", "Teknik ustalık, inşaat"],
    iliski: {
      rahat: [2, 6, 8],
      zor: [3, 5],
      not: "4'ler ne beklediğini bilen ve söylenen şeyi yapan rakamlarla iyi çalışır. Ani fikir değiştiren rakamlar onlar için yorucudur.",
    },
    hane: [
      "İlk refleksin plan yapmak; belirsiz durumda önce neyin sağlam olduğuna bakarsın.",
      "Toplulukta güvenilir kişi olarak tanınırsın; iş ve yük sana emanet edilir.",
      "Dünyayı kurallar, kurumlar ve emek üzerinden okursun; sağlam sistemler kalıcıdır.",
      "Hayatın adım adım, biriktirerek ilerler; büyük sıçramalar yerine küçük yatırımlar getirir.",
      "Ders: esnemek. Her plan bozulduğunda dünya yıkılmaz; bazen yeniden planlamak yeterli.",
      "İçinde güvende olma ihtiyacı var; belirsizlik seni gereğinden fazla yorar.",
      "İçindeki çocuk ritüel ve tahmin edilebilirlik ister; sürpriz, önceden haber verilince keyifli olur.",
      "Duygularını yavaş ve az söylersin; ama bir kere söylediğinde arkasında durursun.",
      "Genel yaşam duyun: hayat, emekle kurulan bir yapı.",
    ],
    mode: {
      romantik: {
        guc: "Güven, düzen ve sadakat üzerine kurulu, birbirine söz veren bir ilişki.",
        dikkat: "Şüphe, ilişkiye sızabilir; sorular sorulmadan varsayımlar yapılırsa mesafe oluşur. Şeffaflık zorunlu.",
      },
      arkadaslik: {
        guc: "Uzun yıllar sürebilecek, sağlam bir dostluk; söz verdiğiniz şey yapılır.",
        dikkat: "Yeni bir şeyi denemek ikinize de zor gelir; dostluk rutine sıkışabilir.",
      },
      is: {
        guc: "Sistemli, kaliteye önem veren bir ortaklık; yapı ve takip güçlü.",
        dikkat: "Hız gereken yerde temkin hızınızı keser; her karar fazla düşünülebilir.",
      },
      aile: {
        guc: "Evde düzen, öngörülebilirlik ve güven duygusu.",
        dikkat: "Kurallar konusunda katılaşma; kimse esnemezse ev gerginleşir.",
      },
    },
    ruh: {
      ad: "Temkinli bağ",
      anahtar: "Şüphe var; şeffaflık zorunlu",
      metin:
        "Bağın özü güven ihtiyacı. İkiniz de kolay kolay tam açılmazsınız; bu yüzden ilişki yavaş kurulur, ama oturduğunda sağlam durur. Şüphe bu bağın gölgesi: söylenmeyen şey varsa hayal gücü boşluğu doldurur, çoğu zaman en kötü senaryoyla. Bu nedenle net konuşmak, kararları ve niyetleri açıkça söylemek bu ilişkide lüks değil, zorunluluk. Sağlam yanı ise sözün gerçekten değerli olması: bu bağda verilen söz tutulur. Küçük ritüeller (düzenli buluşma, haftalık konuşma, ortak bir hedef listesi) ilişkiyi rahatlatır. Zorlayıcı olan, ani değişikliklerle nasıl başa çıkıldığıdır.",
    },
  },
  {
    n: 5,
    baslik: "Gezgin",
    kisa: "Hareket eden",
    element: "hava",
    oz: "5, kıpırdanmadan duramaz: yeni yer, yeni insan, yeni bilgi. Merak, esneklik ve değişim bu rakamın çekirdeğidir. Kuralı önce dener, sonra kabul eder.",
    guc: ["Uyum sağlama", "Hızlı öğrenme", "İletişim ve ağ kurma"],
    golge: ["Taahhüt korkusu", "Aşırılığa kayma (yeme, harcama, hız)", "Sıkılınca çekip gitme"],
    meslek: ["Gazeteci, editör", "Seyahat ve etkinlik", "Pazarlama, ürün keşfi", "Danışmanlık, çok projeli işler"],
    iliski: {
      rahat: [1, 3, 9],
      zor: [4, 7],
      not: "5'ler alan tanıyan ve merakı paylaşan rakamlarla iyi anlaşır. Sürekli yerinde durma beklentisi yükleyen rakamlara sıkışmış hisseder.",
    },
    hane: [
      "İlk refleksin denemek; önce yapar, sonra düşünürsün.",
      "Toplulukta herkesle konuşabilen, çevre ve çeşitlilik toplayan kişisin.",
      "Dünyayı sınırlar aşılan bir yer olarak görürsün; yer, kültür ve fikir çeşitliliği seni besler.",
      "Hayatın ani dönüşlerle akar; ne zaman şehir, iş ya da rota değişeceği önceden bilinmez.",
      "Ders: bir şeyin içinde kalmak. Derinlik ancak sıkıldığın yerde geçmeyi bırakınca başlar.",
      "İçinde özgürlük ihtiyacı var; bağlandığını hissettiğinde kaçış yolu ararsın.",
      "İçindeki çocuk meraklı ve yerinde duramaz; yeni bir oyuncak, yeni bir şehir, yeni bir kelime ister.",
      "Duygularını hareketle ve konuşmayla taşırsın; sessiz kalmak sana ağır gelir.",
      "Genel yaşam duyun: hayat, keşfedilecek bir yolculuk.",
    ],
    mode: {
      romantik: {
        guc: "İlişki hareketli ve konuşkan; keşfedecek yeni yerler ve fikirler hiç bitmez.",
        dikkat: "Konuşmak ve ilham vermek bir bağımlılık haline gelebilir; yalnız kalma süresi kısalır, yorgunluk birikir.",
      },
      arkadaslik: {
        guc: "Birbirinizi kışkırtan, hep bir yere gidilen bir dostluk; yanınızda sıkılınmaz.",
        dikkat: "Söz verilen ama yapılmayan planlar çoğalır; ciddi bir konu açıldığında ikiniz de konuyu değiştirebilirsiniz.",
      },
      is: {
        guc: "Hızlı öğrenen, esnek bir ikili; koşullar değiştiğinde kolay uyum sağlarsınız.",
        dikkat: "Odak sık kayar; başlanan işlerin çoğu bitirilmeden yenisine geçilir.",
      },
      aile: {
        guc: "Evde hareket, misafir ve konuşma eksik olmaz; hayat renkli.",
        dikkat: "Rutin ve sorumluluk bir yük gibi hissedilir; kim neyi yapacak, açıkça yazılmalı.",
      },
    },
    ruh: {
      ad: "İlham veren bağ",
      anahtar: "Çok konuşan, ilham verici; bağımlılık riski",
      metin:
        "Bağın özü sürekli akış. Birlikteyken konuşma hiç kesilmez, fikirler birbirini tetikler, yeni yerler ve yeni planlar sürekli gündemde. Bu bağ insanı canlı tutar. Riski ise tam bu tempoda: birbirinizden aldığınız ilham ve heyecana alışırsınız; sessizlik, sıradanlık ya da ayrı kalma ikinize de yoksunluk gibi gelebilir. Bağımlılık, iyi hissettiren bir şeyin yerini alması için ortaya çıkar. Ayrı vakit geçirmek, bu ilişkide bir tehdit değil, ilişkinin sağlıklı kalmasının şartı. Ortak taahhütleri küçük ve net tutmak (bu ay şu iş, bu hafta şu buluşma) bağı sağlamlaştırır.",
    },
  },
  {
    n: 6,
    baslik: "Bakım Veren",
    kisa: "Sorumluluk alan",
    element: "ates",
    oz: "6, çevresindeki insanların iyi olmasından sorumlu hisseder. Sorumluluk, estetik ve sıcaklık bu rakamın çekirdeğidir. Evi, ilişkiyi, ekibi bir arada tutan kişidir.",
    guc: ["Sıcaklık ve çekicilik", "Sorumluluk alma", "Güzellik ve uyum duygusu"],
    golge: ["Kontrolcü ilgi", "Herkesi kurtarma çabası", "Mükemmeliyetçilik"],
    meslek: ["Sağlık ve bakım", "İç mimari, moda, tasarım", "Eğitim, danışmanlık", "Konukseverlik ve organizasyon"],
    iliski: {
      rahat: [2, 3, 9],
      zor: [1, 7],
      not: "6'lar minnettarlığı gösteren ve alan bırakmayı bilen rakamlarla iyi anlaşır. İlgi sınırı zorlanırsa, hemen küser ya da bunaltıcı olur.",
    },
    hane: [
      "İlk refleksin ilgilenmek; kimin neye ihtiyacı olduğunu hemen fark edersin.",
      "Toplulukta bir araya getiren kişisin; kalabalığın sıcaklığı seninle başlar.",
      "Dünyayı bakım ve sorumluluk zinciri olarak görürsün; herkes birbirine karşı biraz borçludur.",
      "Hayatın ev, aile ve yakın çevre etrafında şekillenir; kök salma ihtiyacı belirleyici.",
      "Ders: kendini de bakılacaklar listesine koymak. Başkasını doldurmak için boşalmak gerekmez.",
      "İçinde güzel ve düzgün olan şeye karşı güçlü bir çekim var; uyumsuzluk seni rahatsız eder.",
      "İçindeki çocuk sevilmek ister; takdir gördüğünde açılır, görmediğinde kapanır.",
      "Duygularını ilgi ve hizmetle gösterirsin; sevgi bir yemek, bir hediye, bir yardım olarak gelir.",
      "Genel yaşam duyun: hayat, sorumluluğunu üstlenmek gereken bir yuva.",
    ],
    mode: {
      romantik: {
        guc: "Sıcak, çekici, sosyal bir ilişki; birlikte olunca ortam güzelleşir.",
        dikkat: "İlgi kontrole dönebilir; “senin iyiliğin için” cümlesi sık duyulursa taraflardan biri bunalır.",
      },
      arkadaslik: {
        guc: "Birbirinizi kollayan, sofra ve sohbet kuran bir dostluk.",
        dikkat: "Başkalarının sorunlarını üstlenmek iki tarafı da yorabilir; sınır çizmek gerekir.",
      },
      is: {
        guc: "Sorumluluk bilinci yüksek; müşteriye ve ekibe karşı özenli bir ortaklık.",
        dikkat: "Her şeyin kusursuz olması beklentisi hız ve karar sürecini yavaşlatır.",
      },
      aile: {
        guc: "Yuva duygusu güçlü; herkesin karnının, yatağının ve derdinin düşünüldüğü bir ev.",
        dikkat: "Fedakârlık sessizce hesaplanırsa kırgınlık doğar; beklentiyi açıkça söylemek gerekir.",
      },
    },
    ruh: {
      ad: "Tutkulu bağ",
      anahtar: "Tutkulu, sosyal, çekici",
      metin:
        "Bağın özü çekim ve sorumluluk. İlişkiye hem sıcaklık hem estetik hem de güçlü bir bağlanma duygusu hâkim; sosyal çevre bu bağı destekler, birlikte olmak gösterişsiz ama etkileyici. Tutku burada yalnızca romantik anlamda değil, ortak bir yaşam kurma isteği olarak ortaya çıkar. Zorlandığı yer, ilginin kontrol ile karıştığı nokta: ikiniz de karşıdakini “düzeltme” refleksi taşıyabilirsiniz. Bu bağı korumak için birbirinizin tarzına ve hızına saygı, ihtiyaç duyulduğunda değil, sorulduğunda yardım etmek işe yarar. Yardım teklifinin baskıya dönüştüğü an, ilişkinin rahatsız olmaya başladığı andır.",
    },
  },
  {
    n: 7,
    baslik: "Derinleşen",
    kisa: "İçe bakan",
    element: "su",
    oz: "7, yüzeyde kalmaz: bir şeyin nasıl çalıştığını, neden var olduğunu ve altında ne yattığını çözmeye çalışır. Analiz, yalnızlık ve derinlik bu rakamın çekirdeğidir. Az konuşur, konuştuğunda tartılmış konuşur.",
    guc: ["Analitik derinlik", "Konsantrasyon", "Sezgi ve ince ayrım yapma"],
    golge: ["Kapanma, ulaşılmaz olma", "Aşırı analiz", "Duyguyu zihne çevirme"],
    meslek: ["Araştırmacı, bilim insanı", "Veri, yazılım, teknik uzman", "Yazar, editör", "Hukuk, denetim, arşiv"],
    iliski: {
      rahat: [2, 4, 9],
      zor: [3, 5],
      not: "7'ler yalnız kalma ihtiyacına saygı gösteren ve gürültü yapmayan rakamlarla rahat eder. Sürekli sosyalleşme baskısı onları çekilmeye iter.",
    },
    hane: [
      "İlk refleksin gözlemlemek; hemen tepki vermez, önce anlamaya çalışırsın.",
      "Toplulukta mesafeli ama saygı gören kişisin; az konuşur, söylediğin dikkate alınır.",
      "Dünyayı görünenin altındaki mekanizmalar üzerinden okursun; yüzey seni tatmin etmez.",
      "Hayatın içe dönük dönemlerle akar; her birinde bir şeyi derinlemesine öğrenirsin.",
      "Ders: paylaşmak. Bildiğini, hissettiğini ve ihtiyacını söylemeden kimse bilmez.",
      "İçinde kimseyi almadığın bir oda var; orada kendi düşüncenle baş başa kalmaya ihtiyaç duyarsın.",
      "İçindeki çocuk merak eder, sorar, sökerek öğrenir; tek başına oyun kurmaktan hoşlanır.",
      "Duygularını yavaş, seçilmiş ve az kelimeyle taşırsın; söylediğinde ciddiyetle söylersin.",
      "Genel yaşam duyun: hayat, çözülmesi gereken bir anlam bulmacası.",
    ],
    mode: {
      romantik: {
        guc: "Mahrem, derin bir bağ; az kelimeyle çok şey anlatabilirsiniz.",
        dikkat: "İletişim zor; ikiniz de içinizi açmakta gecikince soğuma riski doğar.",
      },
      arkadaslik: {
        guc: "Gösterişsiz ama derin bir dostluk; uzun sessizlikler rahatsız etmez.",
        dikkat: "Birbirinize ulaşma sorumluluğunu karşıya bırakırsanız aylar konuşmadan geçebilir.",
      },
      is: {
        guc: "Derin analiz ve titiz çalışma; hata bulma ve doğru yeri işaret etme konusunda güçlü.",
        dikkat: "Bilgi paylaşımı yetersiz kalır; ekibin geri kalanı ne olduğunu geç öğrenir.",
      },
      aile: {
        guc: "Evde huzur, sessiz alan ve karşılıklı saygı.",
        dikkat: "Duygular konuşulmadığı için aynı evde yaşayıp birbirinden uzak kalmak mümkün.",
      },
    },
    ruh: {
      ad: "Mahrem ama uzak bağ",
      anahtar: "Mahrem ama iletişim zor; soğuma riski",
      metin:
        "Bağın özü derin, sessiz bir anlayış. İkiniz de yüzeysel konuşmayı sevmez, birbirinizin iç dünyasına saygı duyarsınız; bu yüzden bağ çoğu zaman özel ve korunaklı hissettirir. Zorluk, duygu ve ihtiyacın söze dökülmesinde: ikiniz de içeride tartıp çözer, dışarı taşımayı geciktirirsiniz. Sonuç, sessizliğin zamanla soğumaya dönüşmesi. Bunu önlemek için küçük ama düzenli bir konuşma ritmi (haftada bir, telefonsuz bir akşam) kurmak ve “bugün içimde şu var” cümlesini kullanmayı alışkanlık haline getirmek yeterli olur. Bağ zorlanmaz, ama ilgi görmeyen mahremiyet uzaklığa dönüşür.",
    },
  },
  {
    n: 8,
    baslik: "Sonuç Alan",
    kisa: "Güç ve düzen",
    element: "toprak",
    oz: "8, işin karşılığını ister: emek, para, statü, etki. Güç, otorite ve maddi düzen bu rakamın çekirdeğidir. Zorlu koşullarda dayanır, uzun vadeli bir hedefi bırakmaz.",
    guc: ["Sonuç odaklılık", "Kaynak ve zaman yönetimi", "Baskı altında dayanıklılık"],
    golge: ["İş ve başarı ile özdeşleşme", "Duyguyu ikinci plana atma", "Kontrol ve sertlik"],
    meslek: ["Finans, yatırım", "Yönetim, operasyon", "Gayrimenkul, ticaret", "Hukuk ve büyük ölçekli organizasyon"],
    iliski: {
      rahat: [2, 4, 6],
      zor: [1, 8],
      not: "8'ler sonuç ve emeğe saygı gösteren rakamlarla iyi anlaşır. İki 8 birbirinin kaynağı ve otoritesi üzerinden rekabet edebilir.",
    },
    hane: [
      "İlk refleksin sonuca bakmak; bir durumda neyin işe yarayacağını hızla tartarsın.",
      "Toplulukta ağırlığı olan kişisin; sözün, konumun ya da kaynağın nedeniyle dinlenirsin.",
      "Dünyayı güç ve kaynak dengesi olarak okursun; emeğin karşılığının alındığı bir düzen.",
      "Hayatın yükselme ve sınanma dönemleriyle akar; birikim ve kayıp sert dalgalanabilir.",
      "Ders: değerin, başarıdan bağımsız olduğunu kabul etmek.",
      "İçinde güçlü bir sorumluluk ve yüksek beklenti var; kendine en sert sen davranırsın.",
      "İçindeki çocuk onaylanmak ister; başarı, sevgi için bir bilet gibi görülebilir.",
      "Duygularını sert görünen bir dille, destek ve kaynak sağlayarak gösterirsin.",
      "Genel yaşam duyun: hayat, karşılığı emeğe göre ödenen bir mücadele.",
    ],
    mode: {
      romantik: {
        guc: "Ciddi, derin bağlanan bir ilişki; birlikte büyük hedefler kurabilirsiniz.",
        dikkat: "Ağır, dar bir çift alanı oluşabilir; dışarıda nefes almak şart, yoksa yük birbirinize biner.",
      },
      arkadaslik: {
        guc: "Sözünüzün geçtiği, birbirine destek olan, sağlam bir arkadaşlık.",
        dikkat: "Konular hep iş, para ve statü etrafında dönebilir; hafiflik için bilinçli alan açmak gerekir.",
      },
      is: {
        guc: "Güçlü hedef ve kaynak yönetimi; büyük ve uzun vadeli işler için ideal.",
        dikkat: "Kâr ve pay konuşulmazsa iş ortaklığı hızla otorite mücadelesine döner.",
      },
      aile: {
        guc: "Ailede güvenlik ve maddi düzen konusunda sağlam bir zemin.",
        dikkat: "Sevgi çoğunlukla sağlanan destekle ifade edilir; duygusal yakınlık ayrıca konuşulmalı.",
      },
    },
    ruh: {
      ad: "Ağır ve yoğun bağ",
      anahtar: "Ağır, dar; dışarıda nefes almak şart",
      metin:
        "Bağın özü yoğunluk. İkiniz de ilişkiyi ciddiye alırsınız; birlikte büyük işler yapabilir, birbirinize ağır sorumluluklar yükleyebilirsiniz. Bu yoğunluk, güvenli olduğunda çok güçlü; baskı arttığında ise dar ve boğucu. Çift alanı zamanla kendi içine kapanabilir: iş, para, sorumluluk, plan, hepsi aynı masada. Bu bağ için en önemli şey dışarıda nefes almak: ortak olmayan hobiler, ayrı arkadaş grupları, amaçsız geçirilen zaman. Yükü bölüşmek kadar hafifliği de bilinçli olarak eklemek gerekir. Sertlik ile netliği birbirine karıştırmamak, bu ilişkinin sağlığı için belirleyici.",
    },
  },
  {
    n: 9,
    baslik: "Tamamlayan",
    kisa: "Bırakan, bütünleyen",
    element: "notr",
    oz: "9, bir döngünün son rakamıdır ve buna göre davranır: bütüne bakar, bırakmayı bilir, kendisinden büyük bir şeye hizmet etmek ister. Şefkat, geniş bakış ve tamamlama bu rakamın çekirdeğidir.",
    guc: ["Geniş perspektif", "Affetme ve bırakma", "Farklı insanlarla iş görme"],
    golge: ["Her şeyi sırtlanma", "Kapanmamış konuları uzun süre taşıma", "Somut kişisel ihtiyacı görünmez kılma"],
    meslek: ["Sivil toplum, sosyal hizmet", "Sanat ve edebiyat", "Öğretmenlik, danışmanlık", "Uluslararası ve çok kültürlü işler"],
    iliski: {
      rahat: [1, 5, 6],
      zor: [4, 8],
      not: "9'lar geniş bakışı ve esnekliği paylaşan rakamlarla iyi anlaşır. Katı beklenti ve sıkı kontrol bulunan ortamlarda kendi vizyonu boğulur.",
    },
    hane: [
      "İlk refleksin geniş bakmak; bir durumun yalnızca kendini değil herkesi nasıl etkilediğini düşünürsün.",
      "Toplulukta herkesi kapsayan kişisin; farklı görüşteki insanlar yanında rahat eder.",
      "Dünyayı ortak bir bütün olarak görürsün; sınırlar arasındaki farktan çok benzerlik dikkatini çeker.",
      "Hayatın tamamlanan ve yeniden başlayan dönemlerle akar; bırakma anları belirleyici.",
      "Ders: bırakmak. Bitmiş olanı taşımak, yeni olanı taşımana engel olur.",
      "İçinde derin bir merhamet ve bir de kimseye söylemediğin yorgunluk var.",
      "İçindeki çocuk hayal kurar, sanat ve hikâyeye kapılır; dünyayı daha iyi hayal eder.",
      "Duygularını herkes için taşırsın; başkalarının acısını kendi acın gibi hissedebilirsin.",
      "Genel yaşam duyun: hayat, paylaşıldığında anlam kazanan bir bütün.",
    ],
    mode: {
      romantik: {
        guc: "Oyuncu, hoşgörülü ve affedici bir ilişki; birbirinizin hatalarına yer bırakırsınız.",
        dikkat: "Sınırlar bulanıklaşabilir; kim neyi üstleniyor, ne zaman hayır diyor, konuşulmalı.",
      },
      arkadaslik: {
        guc: "Geniş çevrelere açık, cömert bir dostluk; farklı insanları birleştirirsiniz.",
        dikkat: "Başkalarının sorunlarına fazla zaman ayırıp birbirinize kalan ilgi azalabilir.",
      },
      is: {
        guc: "Geniş vizyonlu, insan odaklı bir ortaklık; anlamlı projeler için elverişli.",
        dikkat: "Nakit akışı ve teslim tarihleri gibi sıradan konular arka planda kalır.",
      },
      aile: {
        guc: "Hoşgörü, yumuşak dil ve geniş bir ev; herkese yer var.",
        dikkat: "Herkes herkesi affedince kalıcı kurallar oluşmayabilir; ortak sınırlar ayrıca konulmalı.",
      },
    },
    ruh: {
      ad: "Oyuncu ve affedici bağ",
      anahtar: "Oyuncu, affedici",
      metin:
        "Bağın özü hoşgörü. İkiniz de hatanın insani olduğunu bilir, kırgınlığı uzun süre taşımazsınız; bu, ilişkiye hafiflik ve oyun alanı açar. Birlikteyken hem gülmek hem derin konuşmak mümkün. Bu bağın zorlandığı yer, sınırlar: bulanık sınırlarda kimin neyi üstlendiği, hangi sözün ciddiye alınması gerektiği belirsizleşir. Affetmek güzel, ama aynı davranışı sürekli affetmek ilişkiyi eğitir; kimseyi de olgunlaştırmaz. Sınırları ve sözleri zaman zaman açıkça konuşmak, bu bağın hafifliğini korurken zeminini de sağlamlaştırır.",
    },
  },
];

export function getDigit(n: number): DigitInfo {
  const d = DIGITS[n - 1];
  if (!d) throw new RangeError(`Rakam yok: ${n}`);
  return d;
}

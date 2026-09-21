// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/**
 * Sinerji alanlarına özgü anlatımlar. Hepsi HumanCODE'un kendi editoryal metinleridir.
 * Yer tutucular: {A}, {B} (ad), {A:gen} (Onur’un), {B:dat}, {A:abl}, {B:ile} vb. (lib/turkish.ts).
 * Dizinler: [alan 0..7][rakam-1 0..8]. Alanlar: 0 ilk izlenim, 1 sosyal hayat, 2 dünya görüşü,
 * 3 günlük düzen, 4 ders ve çatışma, 5 baş başayken, 6 eğlence ve oyun, 7 ilişkinin ruhu.
 */

/** Bir kişinin, kendi hanesindeki rakamıyla o alanda nasıl olduğu ({A} = kişinin adı). */
export const PERSON_LINES: string[][] = [
  // 0 İlk izlenim (h1 Karakter)
  [
    "{A} ilk anda kendinden emin ve doğrudan görünür; odaya girdiğinde yön belirleyen taraf gibi algılanır.",
    "{A} ilk anda sakin ve ulaşılabilir görünür; karşısındakini rahatlatan, dinlemeyi bilen biri izlenimi verir.",
    "{A} ilk anda canlı ve konuşkandır; espriyle buzları eritir ve akılda kalır.",
    "{A} ilk anda ölçülü ve güvenilir görünür; az konuşur ama söylediğinin arkasında duracağı hissini verir.",
    "{A} ilk anda meraklı ve hareketli görünür; kalıplara sığmayan, sohbeti her yöne çekebilen biri gibi algılanır.",
    "{A} ilk anda sıcak ve özenli görünür; ilgisi ve tarzıyla ortamı yumuşatan biri izlenimi bırakır.",
    "{A} ilk anda sessiz, gözlemci ve biraz gizemli görünür; ölçülü konuşur, tanınması zaman ister.",
    "{A} ilk anda ağırlığı olan biri gibi görünür; duruşuyla ciddiyet ve otorite izlenimi verir.",
    "{A} ilk anda geniş bakan ve hoşgörülü görünür; farklı insanların yanında kolayca rahatlar.",
  ],
  // 1 Sosyal hayat (h2 Sosyal Bilinçlilik)
  [
    "{A} kalabalıkta grubun önüne geçer; organize eden, yön veren ve gerektiğinde ilk adımı tek başına atan taraftır.",
    "{A} kalabalıkta köprü kurar; farklı insanları tanıştırır, gerilimi fark edip yumuşatır.",
    "{A} kalabalıkta ortamı canlandırır; hikâye anlatır, güldürür, herkesi konuşmaya dahil eder.",
    "{A} kalabalıkta güvenilir olan kişidir; sözünü tutar, işi üstlenir ama gösterişten hoşlanmaz.",
    "{A} kalabalıkta herkesle konuşabilir; çok farklı çevreleri bir arada tutar ve yeni insanlara açıktır.",
    "{A} kalabalıkta ev sahibi gibi davranır; herkesin rahat olup olmadığına bakar, sofrayı ve sohbeti sıcak tutar.",
    "{A} kalabalıkta geri planda durur; az kişiyle derin sohbeti, çok kişiyle yüzeysel konuşmaya tercih eder.",
    "{A} kalabalıkta ağırlığı olan taraftır; sözü dinlenir, bağlantıları ve konumu çevresini etkiler.",
    "{A} kalabalıkta herkesi kapsar; farklı görüşteki insanlar yanında rahat eder, kimseyi dışarıda bırakmaz.",
  ],
  // 2 Dünya görüşü (h3 Küresel Bilinçlilik)
  [
    "{A} hayata bireysel girişim üzerinden bakar; herkesin kendi yolunu çizmesi gerektiğine inanır.",
    "{A} hayatı ilişkiler ağı olarak görür; işbirliği ve karşılıklı destek onun için temel değerdir.",
    "{A} hayatı anlatılabilen ve değiştirilebilen bir hikâye olarak görür; fikir ve ifade özgürlüğüne önem verir.",
    "{A} sağlam kurallara ve emeğe dayalı bir düzeni savunur; kalıcı olan şeylere güvenir.",
    "{A} sınırların aşılabileceğine inanır; çeşitlilik, seyahat ve yeni deneyimler onun için değerdir.",
    "{A} sorumluluk ve bakım zincirine inanır; herkesin birbirine karşı bir borcu olduğunu düşünür.",
    "{A} görünenin altındaki anlamı arar; yüzeysel cevapları yetersiz bulur, derinlik ve doğruluğa değer verir.",
    "{A} emeğin karşılığının alındığı, kaynakların yönetildiği bir dünya görür; sonuç ve adalet ön plandadır.",
    "{A} dünyayı ortak bir bütün olarak görür; farklılıklardan çok ortak insanlığı öne çıkarır.",
  ],
  // 3 Günlük düzen (h4 Yaşam Döngüsü)
  [
    "{A} günlük hayatı atılımlarla yaşar; yeni bir şey başlatmayı, rutini sürdürmeye tercih eder.",
    "{A} günlük hayatta ortaklıkları kollar; ev ve iş düzeninin herkes için işlemesine dikkat eder.",
    "{A} günü çok yönlü geçirir; aynı anda birkaç işe girişir, planı esnek tutar.",
    "{A} günlük düzeni kurar ve sürdürür; takvim, liste ve rutin onu rahatlatır.",
    "{A} günlük hayatta değişkendir; rutin ona sıkıcı gelir, planı ani değişebilir.",
    "{A} günlük hayatı ev ve sevdikleri etrafında kurar; yemek, temizlik ve bakım işlerini önemser.",
    "{A} günlük hayatta sessiz zaman ister; düzenli yalnız vakit ve derin çalışma saatleri onun için şarttır.",
    "{A} günlük hayatı hedeflere göre kurar; para, zaman ve enerji yönetimini sıkı tutar.",
    "{A} günlük hayatta akışa güvenir; sıradan işleri arka plana atabilir, insanlara ve büyük resme odaklanır.",
  ],
  // 4 Ders ve çatışma (h5 Yaşam Dersi)
  [
    "{A} için tekrarlayan ders, tek başına yetmediğini kabul etmek; çatışmada haklı çıkmaya odaklanma eğilimi vardır.",
    "{A} için ders, hayır diyebilmek; çatışmada kaçıp içine atma ve sonradan patlama riski taşır.",
    "{A} için ders, odaklanmak ve ciddi konuları geçiştirmemek; çatışmada espriye sığınabilir.",
    "{A} için ders, esnemek; çatışmada kuralı ve planı savunup ısrar edebilir.",
    "{A} için ders, bir şeyin içinde kalabilmek; çatışma büyüyünce kaçma ya da konuyu değiştirme eğilimi vardır.",
    "{A} için ders, kendini de bakılacaklar listesine koymak; çatışmada karşılık beklediği fedakârlığı hatırlatabilir.",
    "{A} için ders, paylaşmak; çatışmada içine kapanıp geri çekilir, zaman zaman soğuk görünür.",
    "{A} için ders, değerin başarıdan bağımsız olduğunu kabul etmek; çatışmada sertleşip kontrolü ele alabilir.",
    "{A} için ders, bırakmak; çatışmada uzun süre affeder gibi görünüp içinde taşıyabilir.",
  ],
  // 5 Baş başayken (h6 İçsel Benlik)
  [
    "{A} baş başayken yön ve karar hakkı ister; içinde sözünün geçmesi gereken sessiz bir yön duygusu taşır.",
    "{A} baş başayken aidiyet ve yakınlık arar; onaylanmak ve fark edilmek onun için hava gibidir.",
    "{A} baş başayken konuşkan ve yaratıcıdır; ifade edilmemiş fikirleri ve duyguları paylaşmak ister.",
    "{A} baş başayken güvende hissetmek ister; belirsizlik onu yorar, tahmin edilebilirlik rahatlatır.",
    "{A} baş başayken özgürlük hissi ister; bağlanmaya yaklaştıkça bir kaçış yolu arar.",
    "{A} baş başayken güzel ve uyumlu bir ortam ister; sevgisini ilgi ve hizmetle gösterir.",
    "{A} baş başayken sessizliğe ve kendi düşüncesine ihtiyaç duyar; içinde kimseyi almadığı bir oda vardır.",
    "{A} baş başayken sorumluluğu ve beklentisi yüksektir; kendine ve ilişkiye karşı sert bir çıta koyar.",
    "{A} baş başayken merhametli ama yorgundur; herkesin yükünü taşıdığını kimseye söylemeyebilir.",
  ],
  // 6 Eğlence ve oyun (h7 İçsel Çocuk)
  [
    "{A} oyunda bile birinci olmak ister; eğlenceyi yarışa çevirmeye meyillidir.",
    "{A} eğlencede uyumu ve birlikteliği arar; kimse dışarıda kalmasın diye oyunu ayarlar.",
    "{A} eğlencenin merkezindedir; espri, renk ve tempo onun için lüks değil ihtiyaçtır.",
    "{A} eğlenceyi planlı sever; ritüeller ve önceden bilinen keyifler onu rahatlatır.",
    "{A} eğlencede merak ve hareket ister; yeni yer, yeni oyun, yeni insan onu canlandırır.",
    "{A} eğlenceyi sofra, hediye ve güzel anlarla kurar; takdir edilmek onu açar.",
    "{A} eğlenceyi kendi hızında ve az kişiyle sever; tek başına merak edip keşfetmek de onun için oyundur.",
    "{A} eğlenceyi de ciddiye alabilir; başarı ve onaylanma ihtiyacı oyuna karışabilir.",
    "{A} eğlencede hayalperesttir; hikâye, sanat ve ortak bir hayal onu neşelendirir.",
  ],
  // 7 İlişkinin ruhu (h8 Ruh Duygusu)
  [
    "{A} duygusunu eylemle gösterir; konuşmak yerine bir şey başlatır ya da yapıp bırakır.",
    "{A} duygusunu hissettirerek anlatır; söze dökmese de karşısındaki fark eder.",
    "{A} duygusunu sözle ve mizahla taşır; ağır bir şeyi hafifleterek söylemeyi seçer.",
    "{A} duygusunu yavaş ve az söyler; ama bir kez söylediğinde arkasında durur.",
    "{A} duygusunu hareket ve konuşmayla taşır; sessizlik ona ağır gelir.",
    "{A} duygusunu ilgi ve hizmetle gösterir; sevgi bir yemek, bir yardım olarak gelir.",
    "{A} duygusunu seçilmiş, az kelimeyle taşır; söylediğinde ciddidir.",
    "{A} duygusunu destek ve kaynak sağlayarak gösterir; sert görünen bir dilin ardında koruma vardır.",
    "{A} duygusunu herkes için taşır; başkasının acısını kendi acısı gibi hissedebilir.",
  ],
];

/** İki kişinin sinerji rakamı (sHn) için, o alandaki ortak durum: güçlü ve dikkat. */
export const TOGETHER: { guc: string; dikkat: string }[][] = [
  // 0 İlk izlenim
  [
    { guc: "Yan yana durunca kararlı ve cesur bir ikili gibi görünürsünüz; ortama enerji katarsınız.", dikkat: "İkiniz de öne çıkmak isteyince dışarıdan kimin lider olduğu sessiz bir yarışa dönebilir." },
    { guc: "Yan yana durunca ılık ve güven veren bir çift izlenimi bırakırsınız; insanlar yanınızda rahat eder.", dikkat: "Fazla uyumlu görünmek, farklarınızı dışarıdan saklamanıza yol açabilir." },
    { guc: "İlk temasta konuşkan, esprili ve akılda kalıcı bir ikilisiniz.", dikkat: "Gösteri yapma eğilimi samimiyeti gölgede bırakabilir." },
    { guc: "Dışarıdan ölçülü, güvenilir ve sağlam bir ikili gibi görünürsünüz.", dikkat: "İkiniz de temkinli olduğunuz için tanışmada mesafeli ve soğuk algılanabilirsiniz." },
    { guc: "Hareketli, meraklı ve dinamik görünürsünüz; sizinle tanışan kişi sıkılmaz.", dikkat: "Odağınız hızla dağılabilir; karşınızdaki sizi oturaklı bir çift olarak görmeyebilir." },
    { guc: "Sıcak, çekici ve özenli bir çift izlenimi bırakırsınız; ortamı güzelleştirirsiniz.", dikkat: "Kusursuz görünme çabası, ilk izlenimi gergin bir performansa çevirebilir." },
    { guc: "Gizemli, içine dönük ve derin bir ikili gibi görünürsünüz; merak uyandırırsınız.", dikkat: "İkiniz de az konuştuğunuz için yeni tanışanlar sizi ulaşılmaz bulabilir." },
    { guc: "Ağırlığı olan, ciddi ve etkileyici bir ikili izlenimi bırakırsınız.", dikkat: "Fazla ciddi ya da baskın görünmek, yaklaşmak isteyenleri çekingen bırakabilir." },
    { guc: "Hoşgörülü, oyuncu ve kapsayıcı bir ikili gibi görünürsünüz; insanlar size kolayca açılır.", dikkat: "Sınırlarınız net görünmediği için çevreniz sizi her şeye evet diyen biri sanabilir." },
  ],
  // 1 Sosyal hayat
  [
    { guc: "Ortak çevrenizde girişken ve öncü bir ikilisiniz; planları siz başlatırsınız.", dikkat: "Arkadaş grubunda kimin sözünün geçtiği konusu sessiz bir rekabete dönebilir." },
    { guc: "Ortak çevrenizde birbirinizi kollar, sosyal alanınızı birlikte genişletirsiniz.", dikkat: "İkiniz de çatışmadan kaçındığı için çevrenizdeki sorunlar konuşulmadan büyüyebilir." },
    { guc: "Kalabalıkta birbirinizi besleyen, sık davet edilen bir ikilisiniz.", dikkat: "Sosyal takvim öyle dolabilir ki baş başa vakit ikinci plana düşer." },
    { guc: "Ortak çevrenizde güvenilir ve istikrarlı bir ikili olarak bilinirsiniz.", dikkat: "Yeni çevrelere açılmak ikiniz için de zor; sosyal hayatınız küçük bir halkada kapanabilir." },
    { guc: "Ortak çevreniz geniş ve renklidir; birbirinizi yeni insanlarla tanıştırırsınız.", dikkat: "Çok sayıda ilişki içinde derinlik kaybolabilir; ortak arkadaşlıklar yüzeyde kalabilir." },
    { guc: "Kapısı ve sofrası açık, birlikte ağırlamayı seven bir ikilisiniz.", dikkat: "Çevrenizin sorunlarını üstlenmek ikinizi de yorabilir; sınır çizmek gerekir." },
    { guc: "Az ama derin arkadaşlıklar kurar, ortak çevrenizi seçici tutarsınız.", dikkat: "Sosyalleşmeyi sürekli ertelemek ilişkiyi dünyadan soyutlayabilir." },
    { guc: "Ortak çevrenizde ağırlığı olan, sözü dinlenen bir ikilisiniz; bağlantılarınız güçlüdür.", dikkat: "Sosyal ortam statü ve iş ilişkileri etrafında dönebilir; samimi arkadaşlık geri planda kalabilir." },
    { guc: "Ortak çevreniz geniş, hoşgörülü ve kapsayıcıdır; farklı insanları bir araya getirirsiniz.", dikkat: "Herkese vakit ayırırken birbirinize kalan zaman azalabilir." },
  ],
  // 2 Dünya görüşü
  [
    { guc: "Hayattan beklentileriniz iddialı ve net; birlikte büyük bir hedefe yürüyebilirsiniz.", dikkat: "İkiniz de kendi yolunu çizmek istiyorsanız ortak hayat tanımı üzerinde çekişebilirsiniz." },
    { guc: "Değerleriniz birbirini tamamlar; işbirliği ve karşılıklı destek ortak zemininizdir.", dikkat: "Uyum uğruna büyük farkları konuşmadan geçmek, sonradan sürpriz olarak dönebilir." },
    { guc: "Hayata merak ve iyimserlikle bakarsınız; fikir alışverişi ilişkinizin motoru olur.", dikkat: "Planlar konuşulup kalabilir; fikirler somut adımlara dönüşmeyebilir." },
    { guc: "Uzun vadeli, güvenilir ve sağlam bir hayat kurma konusunda hemfikirsiniz.", dikkat: "Değişime direnç, hayat hedeflerinin yenilenmesini zorlaştırabilir." },
    { guc: "Yeni deneyimlere ve çeşitliliğe açık ortak bir vizyonunuz var.", dikkat: "Hedefler sık değişirse ortak bir yol haritası kurmak zorlaşır." },
    { guc: "Aile, sorumluluk ve güzel bir yaşam kurma konusunda uyumlu değerlere sahipsiniz.", dikkat: "Beklentiler yükseldikçe ideal ilişki hayali gerçekle çelişebilir." },
    { guc: "Anlam, derinlik ve doğruluk ortak değerlerinizdir; konuşmalarınız yüzeysel kalmaz.", dikkat: "Düşünceler paylaşılmayıp içeride tutulursa farklı fikirler sessizce ayrışabilir." },
    { guc: "Emek, başarı ve uzun vadeli güvenlik konusunda ortak bir zeminiz var.", dikkat: "Değer ölçüsü başarı ve para olduğunda duygusal ihtiyaçlar gölgede kalabilir." },
    { guc: "Geniş bir insanlık bakışını paylaşır, birlikte anlamlı bir hayat hayal edersiniz.", dikkat: "Vizyon büyük, gündelik adımlar küçük kalırsa hayaller havada kalabilir." },
  ],
  // 3 Günlük düzen
  [
    { guc: "Gündelik hayatı hızlı ve kararlı yönetirsiniz; işler bekletilmeden başlar.", dikkat: "Kararı kimin vereceği, evdeki ya da ekipteki küçük konularda bile tartışma çıkarabilir." },
    { guc: "Gündelik işleri birbirinizi kollayarak paylaşırsınız; ortak ritim kendiliğinden kurulur.", dikkat: "İhtiyaçlar söylenmediği için yük dengesizliği fark edilmeden birikebilir." },
    { guc: "Gündelik hayatta fikirli, esnek ve neşelisiniz; işler bir şekilde halledilir.", dikkat: "Rutin işler ikinizde de ihmal edilebilir; görünür bir liste yardımcı olur." },
    { guc: "Düzenli, planlı ve öngörülebilir bir gündelik hayat kurarsınız.", dikkat: "Kurallar katılaşırsa küçük sapmalar bile gerginlik yaratabilir." },
    { guc: "Rutini renklendirir, gündelik hayata hareket katarsınız.", dikkat: "Sorumluluklar dönüşümlü ve yazılı değilse düzen sürekli aksayabilir." },
    { guc: "Evinizi ya da ekibinizi bir yuva gibi sarıp sarmalarsınız; bakım ve estetik ön plandadır.", dikkat: "Kimin ne kadar emek verdiği sessizce hesaplanırsa kırgınlık doğar." },
    { guc: "Gündelik hayatta birbirinize alan tanır, sessiz ve düzenli bir ritim kurarsınız.", dikkat: "İletişim azalınca aynı evde ayrı yaşamaya benzer bir mesafe oluşabilir." },
    { guc: "Gündelik hayatı hedefe göre, disiplinli biçimde yönetirsiniz; para ve zaman kontrol altındadır.", dikkat: "Her şeyi verimliliğe vurmak dinlenmeyi ve keyfi gölgede bırakabilir." },
    { guc: "Gündelik hayatta esnek ve hoşgörülüsünüz; küçük aksaklıklar büyümez.", dikkat: "Sıradan ama gerekli işler (fatura, tarih, temizlik) arka planda kalabilir." },
  ],
  // 4 Ders ve çatışma
  [
    { guc: "Tartışmaları açık ve doğrudan yaparsınız; havayı uzun süre bulutlu tutmazsınız.", dikkat: "Haklı çıkma isteği, tartışmanın konusunu kim kazandı sorusuna çevirebilir." },
    { guc: "Çatışmada birbirinizi yatıştırma yeteneğiniz güçlü; kırıcı sözler nadir çıkar.", dikkat: "İkiniz de içinize attığınız için gerçek sorunlar geç ve tek seferde patlar." },
    { guc: "Çatışmayı konuşarak ve mizahla çözmeye yatkınsınız.", dikkat: "Konu ağırlaşınca espriyle geçiştirmek, sorunun altında kalmasına yol açabilir." },
    { guc: "Çatışmada kurallı ve ayrıntılı bir çözüm arar, verilen sözü ciddiye alırsınız.", dikkat: "Şüphe ve savunmada ısrar çatışmayı uzatabilir; şeffaflık gerekir." },
    { guc: "Çatışmadan çabuk çıkar, yeni bir sayfa açmakta gecikmezsiniz.", dikkat: "Zor konular ertelenip konu değiştirilirse aynı sorun yeni kılıkta döner." },
    { guc: "Çatışmada birbirinizi kırmamaya özen gösterir, onarıcı davranırsınız.", dikkat: "Kırgınlık biriktirip sonra hatırlatma eğilimi ilişkiyi yorabilir." },
    { guc: "Çatışmada sakin ve düşünceli kalır, kelimelerinizi seçersiniz.", dikkat: "Sessizlik ve geri çekilme, konuşulmayan bir mesafe olarak büyüyebilir." },
    { guc: "Çatışmada ciddi ve sonuca odaklı bir çözüm ararsınız; hafife alınan bir sorun kalmaz.", dikkat: "Sertleşme ve güç mücadelesi, konuyu ilişkiden daha büyük bir savaşa çevirebilir." },
    { guc: "Çatışmada affedici ve bütüncüsünüz; kırgınlıklar uzun sürmez.", dikkat: "Aynı davranışın sürekli affedilmesi, gerçek değişimi geciktirebilir." },
  ],
  // 5 Baş başayken
  [
    { guc: "Baş başayken samimi, doğrudan ve cesur bir ilişki kurarsınız.", dikkat: "İkiniz de kontrol istediği için yakınlık anlarında bile yetki konusu araya girebilir." },
    { guc: "Baş başayken birbirinize şefkatle yaklaşır, güvenli bir alan kurarsınız.", dikkat: "Duygular sorulmadan varsayılırsa yanlış anlaşılmalar birikebilir." },
    { guc: "Baş başayken konuşma, gülme ve keşif hiç bitmez.", dikkat: "Konuşma bolluğu, sessiz yakınlığın ve ağır duyguların önüne geçebilir." },
    { guc: "Baş başayken güvenli, sadık ve tutarlı bir yakınlık kurarsınız.", dikkat: "Duygu paylaşımı yavaş ilerlediği için yakınlık gecikebilir." },
    { guc: "Baş başayken hareketli ve tutkulu bir yakınlık yaşarsınız; birbirinizi yenilersiniz.", dikkat: "Yakınlık arttığında kaçış ihtiyacı ya da birbirine bağımlılık gündeme gelebilir." },
    { guc: "Baş başayken sıcak, şefkatli ve çekici bir atmosfer kurarsınız.", dikkat: "İlginin kontrole dönüşmemesi için yardım ile müdahale arasındaki çizgi konuşulmalı." },
    { guc: "Baş başayken sessiz ama derin bir anlayış kurarsınız.", dikkat: "Duygu ve ihtiyaçlar söze dökülmediği için soğuma riski var." },
    { guc: "Baş başayken yoğun, ciddi ve derin bir bağlanma yaşarsınız.", dikkat: "Baş başa alan iş, para ve sorumlulukla dolarsa nefes almak zorlaşır." },
    { guc: "Baş başayken oyuncu, hoşgörülü ve açık bir yakınlık kurarsınız.", dikkat: "Sınırlar ve beklentiler bulanık kalırsa yakınlık yorucu hâle gelebilir." },
  ],
  // 6 Eğlence ve oyun
  [
    { guc: "Eğlenceyi birlikte başlatan, cesur ve enerjik bir ikilisiniz.", dikkat: "Oyun yarışa dönüşürse kaybeden taraf keyfi kaçırabilir." },
    { guc: "Eğlence anlayışınız uyumlu ve yumuşak; birlikte olmak yeter.", dikkat: "İkiniz de sen ne istersin dediği için ortak bir plan çıkmayabilir." },
    { guc: "Birlikte eğlenirken kahkaha, yaratıcılık ve tempo hiç eksik olmaz.", dikkat: "Sürekli eğlence, ağır konuşmaları erteleyen bir kaçışa dönüşebilir." },
    { guc: "Eğlencede keyifli ritüelleriniz ve güvenli alışkanlıklarınız vardır.", dikkat: "Yeni bir şey denemek ikinize de zor gelir; eğlence rutine sıkışabilir." },
    { guc: "Yeni yerler, yeni denemeler ve macera eğlence anlayışınızın merkezindedir.", dikkat: "Sürekli yenilik arayışı sakin ve sıradan anların tadını kaçırabilir." },
    { guc: "Eğlenceyi güzel sofralar, sürprizler ve paylaşılan anlarla yaşarsınız.", dikkat: "Herkesi memnun etme çabası kendi keyfinizi geri plana itebilir." },
    { guc: "Eğlenceniz sessiz, zeki ve keşif dolu; küçük ortak dünyalarınız var.", dikkat: "Sosyal eğlenceyi sürekli ertelemek ilişkiyi tekdüzeleştirebilir." },
    { guc: "Eğlenceyi de kararlı ve planlı yaşarsınız; tatil ve etkinlikler iyi organize olur.", dikkat: "Eğlence de görev gibi ele alınırsa rahatlamak zorlaşır." },
    { guc: "Birlikte oyuncu, hayalperest ve yumuşak bir eğlence dünyası kurarsınız.", dikkat: "Hayal büyük, plan küçük kalırsa eğlence sürekli ertelenir." },
  ],
  // 7 İlişkinin ruhu
  [
    { guc: "Bağınızın özü iki güçlü iradenin karşılıklı saygısı; kimse kimsenin gölgesinde erimez.", dikkat: "Güç mücadelesi ilişkinin ana teması olabilir; ortak hedef bulunmazsa enerji birbirine yönelir." },
    { guc: "Bağınızın özü karşılıklı bakım; birbirinizin ihtiyacını sormadan fark edersiniz.", dikkat: "Rahatlık içinde itirazlar saklanırsa sorunlar geç ve tek seferde çıkar." },
    { guc: "Bağınızın özü ortak üretim; birlikteyken çok şey başarırsınız.", dikkat: "Ortak hedef bittiğinde aranızda yön kaybı ve mesafe oluşabilir." },
    { guc: "Bağınızın özü güven; oturduğunda çok sağlam durur.", dikkat: "Şüphe girerse varsayımlar boşluğu doldurur; şeffaflık zorunludur." },
    { guc: "Bağınızın özü ilham ve akış; birbirinizi canlı tutarsınız.", dikkat: "Bu tempoya bağımlılık oluşabilir; ayrı geçirilen zaman yoksunluk hissettirebilir." },
    { guc: "Bağınızın özü çekim ve sorumluluk; sıcak, tutkulu ve sosyal bir bağdır.", dikkat: "İlgi kontrole dönüşürse birbirinizi düzeltme refleksi ilişkiyi yorar." },
    { guc: "Bağınızın özü derin, sessiz bir anlayış; mahrem ve korunaklıdır.", dikkat: "Duygular dile getirilmezse sessizlik zamanla soğumaya dönüşür." },
    { guc: "Bağınızın özü yoğunluk; büyük işleri birlikte kaldırabilirsiniz.", dikkat: "Dar ve ağır bir çift alanı oluşabilir; dışarıda nefes almak şarttır." },
    { guc: "Bağınızın özü hoşgörü; hataya yer bırakır, hafifliği ve oyunu korursunuz.", dikkat: "Bulanık sınırlar ve sürekli af ilişkiyi eğitmez; sınırlar zaman zaman konuşulmalı." },
  ],
];

export type RelKey = "ayniRakam" | "ayni" | "besleyen" | "catisan" | "denge" | "farkli";

/** İki kişinin o alandaki rakamlarının ilişkisine göre, birbirlerine karşı tutumları. */
export const ATTITUDE: Record<RelKey, string>[] = [
  {
    ayniRakam: "{A} ile {B} dışarıdan birbirine çok benziyor; ilk temasta aynı dili konuştuğunuzu hissedersiniz ama aynı kör noktayı da paylaşırsınız.",
    ayni: "{A} ile {B} aynı elementin farklı tonlarısınız; birbirinizin tarzını hemen kavrar, ilk bakışta akraba gibi durursunuz.",
    besleyen: "{A}, {B:gen} ilk izlenimde eksik bıraktığı tarafı tamamlıyor; yan yana durunca biriniz diğerinin ışığını büyütüyor.",
    catisan: "{A} ile {B} ilk bakışta zıt kutuplar gibi durur; biri hızlı, diğeri ağır bir imaj çizer ve çevreniz ne düşüneceğini bilemez.",
    denge: "{A} ile {B} arasında dengeleyici bir ton var; biriniz keskin çıkarsa diğeri ilk temasta yumuşatır.",
    farkli: "{A} ile {B} birbirinden farklı imajlar çiziyor; ne çatışıyor ne örtüşüyor: nasıl tanıştınız dedirten bir çift.",
  },
  {
    ayniRakam: "{A} ile {B} sosyal çevrede aynı rolü paylaşıyor; grupta iki kişi aynı görevi almak istediğinde nazik bir rol bölüşümü gerekir.",
    ayni: "{A} ile {B} kalabalıkta benzer tempoda hareket eder; aynı insanlara ısınır, aynı ortamlardan sıkılırsınız.",
    besleyen: "{A} ile {B} sosyal ortamda birbirini tamamlar; biriniz ortamı açar, diğeri derinleştirir.",
    catisan: "{A} ile {B} kalabalıkta farklı ihtiyaçlarla hareket eder; biriniz kalmak isterken diğeri gitmek isteyebilir.",
    denge: "{A} ile {B} arasında sosyal bir tampon var; grup içinde çatışmayı yumuşatan taraf çoğu zaman ikinizden biridir.",
    farkli: "{A} ile {B} farklı çevrelerin insanları gibisiniz; ortak arkadaşlıklar kurmak emek ister ama çevrenizi genişletir.",
  },
  {
    ayniRakam: "{A} ile {B} hayata çok benzer bakıyor; birbirinizin değerlerini onaylamak kolay, ortak kör noktaları fark etmek zor.",
    ayni: "{A} ile {B} temel değerlerde aynı kökten besleniyor; ayrıntılarda ayrışsanız da yön birliğini hissedersiniz.",
    besleyen: "{A}, {B:gen} dünya görüşünü besliyor; biriniz fikri, diğeriniz o fikri hayata geçirecek zemini getiriyor.",
    catisan: "{A} ile {B} hayattan beklentilerde zıt uçlarda olabilir; biri özgürlük, diğeri güvenlik ararken ortak vizyon yazılı olmalı.",
    denge: "{A} ile {B} değerlerde birbirini yumuşatıyor; biriniz keskin çizgiler çizerse diğeri esnek bir yol bulur.",
    farkli: "{A} ile {B} dünyaya farklı pencerelerden bakıyor; birbirinizden öğreneceğiniz çok şey var ama varsayımlar konuşulmalı.",
  },
  {
    ayniRakam: "{A} ile {B} gündelik hayatta aynı tempoyu paylaşıyor; işler akar ama ikinizin de aksattığı konuları kimse yakalamaz.",
    ayni: "{A} ile {B} gündelik ritimde benzer beklentilere sahip; ev ve iş düzeni büyük ölçüde sorunsuz oturur.",
    besleyen: "{A} ile {B} gündelik işlerde tamamlayıcı; biriniz başlatır, diğeri sürdürür ve verimli bir düzen çıkar.",
    catisan: "{A} ile {B} gündelik hızda çatışabilir; biri planlı, diğeri anlık yaşamak isterse küçük konular sürekli sürtüşme çıkarır.",
    denge: "{A} ile {B} gündelik hayatta birbirini dengeler; biriniz sertleşirse diğeri işi yumuşatır.",
    farkli: "{A} ile {B} gündelik hayatta farklı alışkanlıklara sahip; karşılıklı bir ev kuralları listesi çoğu gerginliği önler.",
  },
  {
    ayniRakam: "{A} ile {B} çatışmada aynı refleksi gösteriyor; ikiniz de aynı anda geri çekilir ya da aynı anda yükselirsiniz.",
    ayni: "{A} ile {B} çatışmada benzer bir dil kullanıyor; birbirinizi çabuk anlar ama ikiniz de aynı yerde takılabilirsiniz.",
    besleyen: "{A}, {B:gen} çatışmadaki eksik tarafını tamamlıyor; biriniz ateşi düşürürken diğeri çözümü getirebilir.",
    catisan: "{A} ile {B} çatışmada zıt tepkiler veriyor; biri konuşmak, diğeri susmak ister ve bu fark asıl tartışmayı büyütür.",
    denge: "{A} ile {B} çatışmayı yumuşatan bir tampona sahip; kırılmadan konuşabilme şansınız yüksek.",
    farkli: "{A} ile {B} çatışmayı farklı ele alıyor; biriniz hemen çözmek, diğeriniz düşünmek ister; bunu önceden konuşmak işe yarar.",
  },
  {
    ayniRakam: "{A} ile {B} maske düştüğünde birbirine çok benziyor; kendi gölge yanlarınızı karşınızda görmek hem rahatlatır hem yorar.",
    ayni: "{A} ile {B} baş başayken aynı ihtiyaçları paylaşıyor; ifade etmeseniz de birbirinize yakın hissedersiniz.",
    besleyen: "{A} ile {B} yalnızken birbirini besliyor; biriniz güven, diğeri enerji getiriyor.",
    catisan: "{A} ile {B} baş başayken farklı yakınlık ihtiyaçları taşıyor; biri yakınlık, diğeri alan isteyebilir.",
    denge: "{A} ile {B} baş başayken dengeleyici bir yumuşaklığa sahip; savunmalarınız kolay iner.",
    farkli: "{A} ile {B} yakınlığı farklı dillerle kuruyor; birbirinizin sevgi dilini öğrenmek zaman alır ama bağı derinleştirir.",
  },
  {
    ayniRakam: "{A} ile {B} aynı oyunu seviyor; birlikte aynı şeye gülmek kolay ama ikiniz de aynı şeyden sıkılırsınız.",
    ayni: "{A} ile {B} benzer bir mizah ve tempo paylaşıyor; birbirinizle eğlenmek için çaba gerekmez.",
    besleyen: "{A}, {B:gen} eğlence anlayışını besliyor; biriniz fikir, diğeriniz enerji getirir.",
    catisan: "{A} ile {B} eğlencede zıt uçlarda olabilir; biri hareket, diğeri huzur isterse ortak zevk bilinçle aranmalı.",
    denge: "{A} ile {B} eğlencede birbirinin sertliğini yumuşatıyor; kimse dışarıda kalmaz.",
    farkli: "{A} ile {B} farklı şeylerden keyif alıyor; birbirinizin dünyasını denemek ilişkiyi zenginleştirir.",
  },
  {
    ayniRakam: "{A} ile {B} ruhun derinliğinde aynı yerde duruyor; birbirinizi gerçekten anlar ama aynı yaralara aynı tepkileri verirsiniz.",
    ayni: "{A} ile {B} ruhen aynı elementten besleniyor; birbirinizin duygu dilini bir bakışta çözersiniz.",
    besleyen: "{A} ile {B} ruhen birbirini besliyor; biriniz duyguyu, diğeriniz o duygunun zeminini sağlıyor.",
    catisan: "{A} ile {B} ruhen zıt kutuplar; birbirinizi anlamak emek ister ama bulunan ortak dil çok güçlü olur.",
    denge: "{A} ile {B} ruhen dengeleyici bir ortaklık kuruyor; iniş çıkışlarda birbirinizin tamponu olursunuz.",
    farkli: "{A} ile {B} ruhen farklı ritimlerde; tanıdıkça uyum kurulur, acele edilirse yanlış anlaşılma çıkar.",
  },
];

/** "Neden-sonuç" cümlelerinin sonuç kısımları: [alan] → iyi / gergin tonlar. */
export const OUTCOMES: { iyi: string[]; gergin: string[] }[] = [
  {
    iyi: ["dışarıdan uyumlu ve dikkat çeken bir çift izlenimi doğar", "tanışan kişiler sizinle konuşmaktan keyif alır"],
    gergin: ["dışarıdan bu ikisi nasıl anlaşıyor dedirten bir soğukluk oluşabilir", "ilk tanışmalarda dinamiğiniz karşı tarafı çekingen bırakabilir"],
  },
  {
    iyi: ["ortak çevrenizde birbirinizi destekleyen bir ikili olarak görülürsünüz", "kalabalıkta birbirinizin sosyal alanını genişletirsiniz"],
    gergin: ["kalabalıkta biriniz öne çıkarken diğeri geri çekilebilir", "ortak arkadaş grubunda taraf tutma ya da kıyaslanma hissi doğabilir"],
  },
  {
    iyi: ["uzun vadeli hedefler konusunda aynı yöne bakmak kolaylaşır", "değerler konusunda birbirinize güvenli bir zemin sunarsınız"],
    gergin: ["hayattan beklentiler konusunda konuşulmadan varsayılan farklar birikebilir", "büyük kararlarda ben böyle düşünmüştüm tartışmaları çıkabilir"],
  },
  {
    iyi: ["gündelik işler kendiliğinden bir düzene oturur", "ev ya da ekip içindeki iş bölümü büyük ölçüde sorunsuz işler"],
    gergin: ["gündelik işlerde kimin neyi yapacağı sessiz bir gerilim konusu olabilir", "tempo farkı, düzende küçük ama sürekli bir sürtüşme üretebilir"],
  },
  {
    iyi: ["sürtüşme çıktığında bile birbirinizden bir şey öğrenirsiniz", "tartışmalar çoğu zaman bir çözüme dönüşür"],
    gergin: ["aynı tartışma farklı kılıklarda geri dönebilir", "geri çekilme ve baskı döngüsü ilişkinin ana çatışma ekseni olabilir"],
  },
  {
    iyi: ["baş başayken maskeler kolayca düşer ve derin bir yakınlık kurulur", "yalnızken birbirinize rahat ve güvenli bir alan açarsınız"],
    gergin: ["baş başayken söylenmeyenler ağırlaşabilir", "yakınlık kurmak için önce bir güven sınavından geçmeniz gerekebilir"],
  },
  {
    iyi: ["birlikte gülmek ve oynamak ilişkinin en sağlam yakıtı olur", "ortak eğlence anlayışı ikinizi de canlandırır"],
    gergin: ["eğlence anlayışları ayrıştığı için ortak zevk bulmak emek ister", "birinizin oyun isteği diğerinin ciddiyetine çarpabilir"],
  },
  {
    iyi: ["bağın özü sizi yıllarca birbirine bağlayabilecek kadar güçlü olur", "zor zamanlarda dönebileceğiniz ortak bir zemin oluşur"],
    gergin: ["bağın özü zaman zaman sizi zorlayan bir yük gibi hissedilebilir", "kriz anında ortak zeminin ne kadar sağlam olduğu sınanır"],
  },
];

/**
 * Her alan için genel psikoloji bulgusu. Bu notlar numerolojiyi doğrulamaz; alanın gerçek hayatta
 * neden önemli olduğunu kaynaklı, ihtiyatlı bir dille hatırlatır.
 */
export const SCIENCE: { konu: string; not: string; kaynak: string }[] = [
  {
    konu: "İlk izlenim",
    not: "Araştırmalarda insanlar bir yüzün güvenilirliği hakkında saniyenin onda biri kadar sürede yargıya varabiliyor. Bu yargılar güçlü ama her zaman isabetli değil; zamanla ve gerçek davranışla güncellenirler.",
    kaynak: "Willis ve Todorov, 2006",
  },
  {
    konu: "Sosyal hayat",
    not: "İnsanların kendilerine benzeyen kişilerle arkadaşlık kurma eğilimi (homofili) sosyal ağ araştırmalarında sık bildirilen bir bulgu. Ortak çevre, ilişkiye dışarıdan destek de sağlayabilir.",
    kaynak: "McPherson, Smith-Lovin ve Cook, 2001",
  },
  {
    konu: "Dünya görüşü",
    not: "Tutum ve değer benzerliği çekimin ve ilişki memnuniyetinin orta düzeyde bir yordayıcısı olarak raporlanıyor; ama benzerlik tek başına ilişkinin sürüp sürmeyeceğini belirlemiyor.",
    kaynak: "Byrne'ın çekim çalışmaları ve sonraki gözden geçirmeler",
  },
  {
    konu: "Günlük düzen",
    not: "Ev işlerinin adil paylaşıldığı algısı, birçok çalışmada ilişki memnuniyetiyle birlikte görülüyor. Sorun çoğu zaman iş yükünün kendisinden çok, nasıl konuşulduğunda çıkıyor.",
    kaynak: "Ev içi iş bölümü ve ilişki memnuniyeti literatürü",
  },
  {
    konu: "Ders ve çatışma",
    not: "John Gottman'ın gözlem çalışmalarında bir tartışmanın nasıl başladığı (sert mi, yumuşak mı) nasıl biteceğinin önemli bir göstergesi olarak bulunmuş; eleştiri ve küçümseme en zarar veren kalıplar arasında sayılıyor. Bu çalışmaların kapsamı ve yöntemi tartışılıyor.",
    kaynak: "Gottman ve Levenson'ın çift gözlem çalışmaları",
  },
  {
    konu: "Baş başayken",
    not: "Yakınlık araştırmalarında kişinin kendini açması ve karşısındakinin buna duyarlı karşılık vermesi yakınlığın temel bileşeni olarak tanımlanıyor.",
    kaynak: "Reis ve Shaver, yakınlık süreci modeli",
  },
  {
    konu: "Eğlence ve oyun",
    not: "Çiftlerin birlikte yeni ve heyecan verici etkinlikler yapmasının ilişki memnuniyetiyle ilişkili olduğu bulunmuş; alışkanlık zamanla memnuniyeti düşürebiliyor.",
    kaynak: "Aron ve arkadaşları, 2000",
  },
  {
    konu: "İlişkinin ruhu",
    not: "Bağlanma kuramı, yakın ilişkilerin duygusal özünü güven ve yakınlık ihtiyacı üzerinden anlatır. Karşılıklı duyarlılık ve güven, uzun süreli ilişkilerde öne çıkan ortak paydalardır.",
    kaynak: "Bowlby; yetişkinlerde Hazan ve Shaver, 1987",
  },
];

export const SCIENCE_DISCLAIMER =
  "Bu notlar genel psikoloji bulgularıdır ve numerolojiyi doğrulamaz. Numerolojinin doğum tarihinden kişilik ya da ilişki uyumu çıkardığına dair bilimsel kanıt yoktur; bu sayfadaki yorumlar düşünmek ve konuşmak için bir başlangıç noktasıdır.";

<div align="center">

# HumanCODE

**Doğum tarihini 9 haneli bir koda çevir. İki kişiyi alan alan karşılaştır.**
Yapay zeka yok, rastgelelik yok: sabit matematik ve elle yazılmış yorumlar.

🌐 [English](README.md) · **Türkçe** &nbsp;|&nbsp; 🔗 **[Canlı site](https://humanpin.vercel.app)**

![Lisans: Özel](https://img.shields.io/badge/lisans-%C3%B6zel%20%C2%B7%20t%C3%BCm%20haklar%C4%B1%20sakl%C4%B1d%C4%B1r-red)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Testler](https://img.shields.io/badge/test-94%20ge%C3%A7iyor-brightgreen)
![Lighthouse](https://img.shields.io/badge/Lighthouse-92%2B%20%C2%B7%20100%20eri%C5%9Filebilirlik%2FSEO-brightgreen)
![Mobil öncelikli](https://img.shields.io/badge/mobil%20%C3%B6ncelikli%20%C2%B7%20PWA-blueviolet)

<img src="docs/screenshots/hero-mobile.jpg" alt="HumanCODE telefonda: ana sayfa, kod sonucu ve uyum sonucu" width="100%">

</div>

> ⚠️ **Özel (kapalı lisanslı) proje.** © 2026 **Onur Teryakioğlu**. Tüm hakları saklıdır. Kaynak yalnızca inceleme amacıyla görünür:
> **kopyalayamaz, yeniden kullanmak için çatallayamaz, barındıramaz, değiştiremez, dağıtamaz, satamaz, kendi ürününüz gibi gösteremez
> ya da yapay zekâ modellerini eğitmek için kullanamazsınız.**
> Bkz. [LICENSE.tr.md](LICENSE.tr.md) ([English](LICENSE)).

---

## Nedir?

HumanCODE, bir doğum tarihini **9 haneli bir koda** (dokuz “hane”den oluşan bir piramit) çevirir, her rakamı açıklar ve iki kişiyi
**sekiz hayat alanında**, tamamen deterministik bir skorla karşılaştırır. Arayüz Türkçedir; depo dokümantasyonu iki dillidir.

| | |
|---|---|
| 🔢 **Kod çözümü** | Gün, ay, yıl → 9 hane, element dengesi, yaşam döngüsü, kişisel yıl |
| 💞 **Sinerji** | İki kod → 8 haneli sinerji piramidi, 0–100 uyum skoru ve kişilerin **adlarıyla** yazılmış alan alan yorumlar |
| 🧬 **Portre** | Deterministik “kod portresi”: dış ve iç benlik, tekrar eden ders, ağır basan ve eksik rakamlar |
| 📖 **Rehber** | 9 rakam, 9 hane, elementler, yaşam döngüsü, sinerji rehberi, kaynaklar ve sınırlar |
| 🏆 **Toplist** | Her karşılaştırma otomatik eklenir, skora göre sıralanır. Adlar sansürlüdür (`On*** Yı***`) |
| 🟢 **Canlı sayaç** | O an sitede olan kişi sayısı, arkada akan Matrix yağmurunda rakam olarak düşer |
| 🎬 **Çözme sahnesi** | Sesli, tam ekran Matrix tarzı açılış (atlanabilir, `prefers-reduced-motion`’a saygılı) |

## Ekran görüntüleri

<table>
<tr>
<td width="50%"><img src="docs/screenshots/desktop-home.jpg" alt="Ana sayfa"><br><sub><b>Ana sayfa</b>: ad, soyad, doğum tarihi</sub></td>
<td width="50%"><img src="docs/screenshots/desktop-guide.jpg" alt="Rehber sayfası"><br><sub><b>Rehber</b>: her rakam açıklanır</sub></td>
</tr>
<tr>
<td colspan="2"><img src="docs/screenshots/desktop-result.jpg" alt="Kod sonucu"><br><sub><b>Kod sonucu</b>: üst panel, kısa özet, etkileşimli piramit, hane hane kartlar</sub></td>
</tr>
<tr>
<td colspan="2"><img src="docs/screenshots/desktop-compare.jpg" alt="Uyum sonucu"><br><sub><b>Uyum</b>: skor halkası, kimya ve sözleşme, sinerji piramidi, alan kartları (örnek adlarla)</sub></td>
</tr>
</table>

## Tasarım ilkeleri

- **Deterministik.** Aynı girdi → her zaman aynı çıktı. Yapay zekâ çağrısı yok, yorumlarda `Math.random()` yok.
  Metin çeşitliliği kurallardan (rakam sayıları, eksik rakamlar, element ilişkileri) ve tohumlu bir seçiciden gelir.
- **Matematiksel olarak doğrulanmış.** Tüm formüller elle doğrulanmış vektörlerle birim test edilir (aşağıya bakın).
- **Mobil öncelikli.** Dokunmaya uygun (`touch-action: manipulation`, ≥ 44 px hedefler), güvenli alan (safe-area) uyumlu,
  PWA olarak kurulabilir, 345 px’te yatay taşma yok, tık sesi yalnızca gerçek dokunuşta çalar (kaydırırken değil).
- **Hızlı.** Sonuç sayfaları sunucuda çizilir; yalnızca etkileşimli kısımlar hidrasyon alır. Lighthouse (mobil) 92+.
- **Dürüst.** Numeroloji bilim değildir. Her sonuçta uyarı var, her alanda isteğe bağlı bir *bilim notu* (numerolojiyi
  **doğrulamayan**, gerçek psikoloji bulguları) ve rehberde “bilimsel durum” bölümü bulunur.
- **Gizlilik gözeten.** Hesaplar tarayıcıda yapılır. Toplist’e yalnızca sansürlü ad, skor ve kod gider; tam ad ve doğum tarihi
  hiçbir yerde saklanmaz.

## Matematik nasıl çalışır?

`reduce(n)`: `n > 9` olduğu sürece rakamlarını topla (`29 → 11 → 2`). Master sayı yok.

| Hane | Formül |
|---|---|
| h1 Karakter | `reduce(gün)` |
| h2 Sosyal bilinçlilik | `reduce(ay)` |
| h3 Küresel bilinçlilik | `reduce(yıl rakamları toplamı)` |
| h4 Yaşam döngüsü | `reduce(h1 + h2 + h3)` |
| h5 Yaşam dersi | `reduce(h1 + h4)` |
| h6 İçsel benlik | `reduce(h1 + h2)` |
| h7 İçsel çocuk | `reduce(h2 + h3)` |
| h8 Ruh duygusu | `reduce(h6 + h7)` |
| h9 Yaşam duyusu | `reduce(h1 + … + h8)` |

**Sinerji:** n = 1..8 için `sHn = reduce(A.hn + B.hn)`. **Skor:**
`round(0,60 · sH8 puanı + 0,25 · element puanı + 0,15 · sH1 puanı)`, tam sayı aritmetiğiyle hesaplanır (kayan nokta yuvarlama
hatası yok). Bantlar: 80+ yüksek sinerji · 60–79 uyumlu · 40–59 emek ister · < 40 zorlayıcı.

Doğrulanmış vektörler: `11.02.1980 → 2,2,9,4,6,4,2,6 | 8`, `29.05.1969 → 2,5,7,5,7,7,3,1 | 1`,
`Sinerji(01.01.1972, 10.04.1984) = 2,5,5,3,5,7,1,8 → skor 54`. Toplam yalnızca 9 × 9 × 9 = **729** olası kod vardır.

## Teknoloji

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Canvas 2D · Web Audio ·
Vercel (barındırma, toplist için Blob, canlı sayaç için Runtime Cache) · Vitest.

## Proje yapısı

```
app/            rotalar: /, /hesapla, /karsilastir, /kod/[pin], /toplist, /rehber/*, /api/*
components/     arayüz: çözme sahnesi, piramit (SVG), sonuç görünümleri, formlar, üst/alt bilgi
components/synergy/  sunucuda çizilen sinerji görünümü + küçük istemci kabuğu
content/        tüm yorum metinleri (rakamlar, haneler, alanlar, rehber, sözlük)
lib/            numeroloji çekirdeği, sahne zaman çizelgesi, portre/kimya/çift-hikâye motorları,
                Türkçe ek yardımcısı, ad + sansür, toplist mantığı, depolama bağdaştırıcısı
docs/           ekran görüntüleri
```

## Yerelde çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 94 birim test
npm run build
```

İsteğe bağlı (toplist ve canlı sayaç): bir Vercel Blob deposu ve `BLOB_READ_WRITE_TOKEN`. Yoksa bu iki özellik sessizce kapanır,
site geri kalanıyla çalışır.

**Ses dosyaları dahil değildir** (üçüncü taraf dosyalar). Ses için kendi lisanslı dosyalarınızı `public/audio/` altına koyun
(`tik.mp3`, `acilis.mp3`, `tikla.mp3`, `arka-plan.mp3`). Bkz. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Dokümantasyon

- [docs/ENVANTER.md](docs/ENVANTER.md): tasarım envanteri
- [LICENSE](LICENSE) · [LICENSE.tr.md](LICENSE.tr.md) · [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) · [CONTRIBUTING.md](CONTRIBUTING.md)

## Geliştirici ve telif

**© 2026 Onur Teryakioğlu** · GitHub [@R0YC0LD](https://github.com/R0YC0LD) · Tüm hakları saklıdır.
“HumanCODE” adı ve simgesi geliştiriciye aittir. İzin talepleri için GitHub’dan iletişime geçin.

<sub>Yorumlar numerolojiye dayanır. Bilimsel bir kişilik veya uyum testi değildir; eğlence ve kendini tanıma amaçlıdır.
Hayat kararlarınızı buna dayandırmayın.</sub>

# Third-party notices / Üçüncü taraf bildirimleri

HumanCODE's own code, texts and design are © 2026 Onur Teryakioğlu, all rights reserved ([LICENSE](LICENSE)).
The components below belong to their respective owners and are used under their own licenses.

HumanCODE'un kendi kodu, metinleri ve tasarımı © 2026 Onur Teryakioğlu'na aittir, tüm hakları saklıdır ([LICENSE.tr.md](LICENSE.tr.md)).
Aşağıdaki bileşenler kendi sahiplerine aittir ve kendi lisansları altında kullanılır.

## Runtime dependencies / Çalışma zamanı bağımlılıkları

| Package | Version | License |
|---|---|---|
| [next](https://github.com/vercel/next.js) | 16.3.5 | MIT |
| [react](https://github.com/facebook/react), react-dom | 19.2.8 | MIT |
| [framer-motion](https://github.com/motiondivision/motion) | 13.4.0 | MIT |
| [@vercel/blob](https://github.com/vercel/storage) | 2.8.0 | Apache-2.0 |
| [@vercel/functions](https://github.com/vercel/vercel) | 3.9.8 | Apache-2.0 |

## Development dependencies / Geliştirme bağımlılıkları

| Package | Version | License |
|---|---|---|
| tailwindcss, @tailwindcss/postcss | 4.3.3 | MIT |
| typescript | 5.9.3 | Apache-2.0 |
| vitest | 5.0.1 | MIT |
| eslint, eslint-config-next | 9.39.5 / 16.3.5 | MIT |
| @types/node, @types/react, @types/react-dom | - | MIT |

Their transitive dependencies are covered by their own licenses; see `package-lock.json` and each package's `LICENSE` file.
Geçişli bağımlılıklar kendi lisanslarına tabidir; `package-lock.json` ve her paketin `LICENSE` dosyasına bakın.

## Fonts / Yazı tipleri

| Font | License |
|---|---|
| [Inter](https://rsms.me/inter/) (via `next/font/google`) | SIL Open Font License 1.1 |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (via `next/font/google`) | SIL Open Font License 1.1 |

## Audio / Ses

The sound files used on the live site (button click, digit ticks, opening sound, ambient loop) were supplied by the
Owner from third-party sources. **They are not included in this repository** and are not covered by this project's
license. To run the site with sound, place your own licensed files at:

Canlı sitede kullanılan ses dosyaları (buton tıklaması, hane sesleri, açılış sesi, ambiyans döngüsü) Hak Sahibi tarafından
üçüncü taraf kaynaklardan sağlanmıştır. **Bu depoda bulunmazlar** ve bu projenin lisansı kapsamında değildir. Sesli çalıştırmak
için kendi lisanslı dosyalarınızı şu yollara koyun:

```
public/audio/tik.mp3        # digit tick / hane sesi
public/audio/acilis.mp3     # opening sound / açılış sesi
public/audio/tikla.mp3      # UI click / arayüz tıklaması
public/audio/arka-plan.mp3  # ambient loop / ambiyans döngüsü
```

The site works without these files (sounds are skipped silently). / Site bu dosyalar olmadan da çalışır (sesler sessizce atlanır).

## Reference design / Referans tasarım

An archived third-party article page was used privately as a visual reference during design (typography scale, dark
palette, spacing rhythm). No part of it is included in this repository or in the site.
Tasarım sırasında üçüncü taraf bir makale sayfası özel olarak görsel referans olarak incelenmiştir (yazı ölçeği, koyu palet,
boşluk ritmi). Hiçbir parçası bu depoda veya sitede yer almaz.

## Research references / Araştırma kaynakları

The general framework ideas (nine positions, active/reactive traits, archetypes, "synergy code") were inspired by public
descriptions of Douglas Forbes's *Human Pin Code*. No text was copied; all interpretive texts are original. See the
in-app page `/rehber/koken` for the source list.
Genel çerçeve fikirleri (dokuz konum, aktif/reaktif özellikler, arketipler, "sinerji kodu") Douglas Forbes'un *Human Pin Code*
kitabının kamuya açık tanımlarından esinlenmiştir. Metin kopyalanmamıştır; tüm yorum metinleri özgündür. Kaynak listesi için
uygulamadaki `/rehber/koken` sayfasına bakın.

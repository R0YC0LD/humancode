# Referans site envanteri (Abduzeedo makale sayfası)

Kaynak: yerel `_reference/index.html` (üçüncü taraf telifli içerik olduğu için **depoya dahil değildir**) (Astro çıktısı, CSS satır içi, 4 JS dosyası, 11 görsel).

## 1. Tema tokenları → `tokens.css`

| Referans | HumanCODE |
|---|---|
| `--bg-color: #000` (dark) | `--hc-bg` |
| `--background-secondary: #111` | `--hc-surface` |
| `--background-tertiary: #1a1a1a` | `--hc-surface-2` |
| `--border-color: #222` | `--hc-border` |
| `--info-border-color: rgba(255,255,255,.3)` | `--hc-border-strong` |
| `--text-primary: #fff`, `--text-secondary: #ddd`, `--text-tertiary: #bbb` | `--hc-text`, `--hc-text-2`, `--hc-muted` |
| `#d11210` (tek vurgu) | `--hc-accent-deep`; siyah üstünde okunurluk için açık tonu `--hc-accent: #ff5f56` (referanstaki `#ff5f56` mac noktasından) |
| `#27c93f`, `#ffbd2e` (kod bloğu noktaları) | `--hc-success`, `--hc-warn` |
| `--spacing-main 24px` (mobil 16px), `--top-spacing 128px`, `--header-height 72px`, `--font-size-base 14px`, `--big-title 72px` | `--hc-space`, `--hc-top`, `--hc-header-h`, `--hc-font-size`, `--hc-big-title` |
| Fontlar: `mundial-hair` (lisanslı, pakette yok), monospace `Fira Code / JetBrains Mono` | Inter (gövde) + JetBrains Mono (rakamlar) |

Referansın açık teması (`#fff` zemin) kullanılmadı; HumanCODE yalnızca koyu.

## 2. Bileşen envanteri

| Referans bloğu | HumanCODE'da |
|---|---|
| Sabit büyük harfli üst bar, 12 kolon ızgara | `Header.tsx` (cam efekti yalnızca burada) |
| Kalın 4px ilerleme çubuğu | `ProgressBar.tsx` (3px, accent) |
| "Skip to main content" bağlantısı | `layout.tsx` |
| Makale gövdesi, başlık, bilgi satırları | `.prose-hc`, rehber sayfaları |
| Alt bilgi (3 hücre, büyük harf) | `Footer.tsx` |
| Kart / görsel akışı | `.card` (rakam, hane, alan kartları) |

## 3. Animasyon envanteri

| Referans | Karar |
|---|---|
| Astro View Transitions (`ClientRouter`) fade | Kaldırıldı; `template.tsx` içinde Framer Motion fade |
| `prefers-reduced-motion` kuralı | Korundu (globals.css + sahne ayrı sadeleşmiş mod) |
| Tema geçiş animasyonu (600 ms renk geçişi) | Kaldırıldı (tek tema) |
| Başlık daralması (`is-collapsed`) | Kaldırıldı; mobilde menü düğmesi |

## 4. Ölü kod / atılanlar

Carbon Ads yükleyicisi, Cloudflare Insights beacon'ı, RSS/sitemap bağlantıları, Shiki/dracula kod vurgulama, `g` tuşuyla açılan ızgara yer paylaşımı, `data-astro-*` öznitelikleri, tema geçiş betiği. Görseller (Utopia Tokyo ekran görüntüleri) yeni sitede kullanılmadı; `_reference/` içinde duruyor.

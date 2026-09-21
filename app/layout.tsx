// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressBar } from "@/components/ProgressBar";
import { SiteAudio } from "@/components/SiteAudio";
import { LivePresence } from "@/components/LivePresence";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const jbmono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin", "latin-ext"], display: "swap" });

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  authors: [{ name: "Onur Teryakioğlu" }],
  creator: "Onur Teryakioğlu",
  publisher: "Onur Teryakioğlu",
  other: { copyright: "© 2026 Onur Teryakioğlu. Tüm hakları saklıdır. / All rights reserved." },
  applicationName: "HumanCODE",
  icons: { apple: "/icons/180" },
  appleWebApp: { capable: true, title: "HumanCODE", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  title: { default: "HumanCODE — Kodunu çöz", template: "HumanCODE — %s" },
  description:
    "Doğum tarihinden 9 haneli kodunu çöz, iki kişinin sinerjisini alan alan karşılaştır. Yapay zeka yok: sabit matematik ve yazılmış yorumlar.",
  openGraph: {
    type: "website",
    siteName: "HumanCODE",
    locale: "tr_TR",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "HumanCODE" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fffaf7",
  colorScheme: "light",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} ${jbmono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          İçeriğe geç
        </a>
        <ProgressBar />
        <SiteAudio />
        <LivePresence />
        <Header />
        <main id="main-content" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}

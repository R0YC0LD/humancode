// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import Link from "next/link";
import { LiveBadge } from "./LiveBadge";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hc-border)", marginTop: 96 }}>
      <div
        className="container-hc"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 16,
          padding: "28px var(--hc-space) calc(28px + env(safe-area-inset-bottom))",
          fontSize: 12,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--hc-muted)",
        }}
      >
        <Link href="/" aria-label="HumanCODE">
          <Wordmark size={13} />
        </Link>
        <span>Numerolojiye dayanır · Eğlence amaçlıdır · Yapay zeka yok</span>
        <span>Tarihin tarayıcında hesaplanır</span>
        <span>© 2026 Onur Teryakioğlu · <Link href="/lisans" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>Tüm hakları saklıdır</Link></span>
        <LiveBadge />
      </div>
    </footer>
  );
}

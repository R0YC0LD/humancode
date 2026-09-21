// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { GuideNav } from "@/components/GuideNav";
import { Disclaimer } from "@/components/Disclaimer";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-hc page-top">
      <div className="guide-grid">
        <aside className="guide-side">
          <details className="guide-toc" open>
            <summary style={{ cursor: "pointer", fontWeight: 700, marginBottom: 12 }} className="guide-toc-summary">
              İçindekiler
            </summary>
            <GuideNav />
          </details>
        </aside>
        <div className="guide-main">
          {children}
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { Reveal } from "./Reveal";
import type { Portrait } from "@/lib/portrait";

/** Kod Portresi bölümleri (sunucuda çizilebilir). */
export function PortraitSections({ portrait }: { portrait: Portrait }) {
  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 880 }}>
      {portrait.sections.map((sec, i) => (
        <Reveal key={sec.id} index={i % 3}>
          <article className="panel" style={{ padding: 24 }}>
            <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="h3" style={{ margin: "6px 0 10px" }}>{sec.baslik}</h3>
            <p style={{ color: "var(--hc-text-2)", lineHeight: 1.75, margin: 0, maxWidth: "68ch" }}>{sec.metin}</p>
            {(sec.aktif || sec.reaktif) && (
              <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                {sec.aktif && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <span className="badge badge-ok">Dengedeyken</span>
                    {sec.aktif.map((a) => <span key={a} style={{ color: "var(--hc-text-2)", fontSize: 13 }}>{a}</span>)}
                  </div>
                )}
                {sec.reaktif && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <span className="badge badge-warn">Dengeyi kaybedince</span>
                    {sec.reaktif.map((a) => <span key={a} style={{ color: "var(--hc-text-2)", fontSize: 13 }}>{a}</span>)}
                  </div>
                )}
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

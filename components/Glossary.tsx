// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Term } from "@/content/glossary";

/** "Bu terim ne demek?" sorusunu sayfa içinde cevaplar. */
export function Glossary({ terms }: { terms: Term[] }) {
  return (
    <dl className="gloss panel" style={{ padding: "6px 22px 22px", margin: 0 }}>
      {terms.map((t) => (
        <div key={t.terim}>
          <dt>{t.terim}</dt>
          <dd>{t.aciklama}</dd>
        </div>
      ))}
    </dl>
  );
}

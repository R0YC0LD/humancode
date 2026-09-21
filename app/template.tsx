// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** Sayfa geçişi: saf CSS (istemci JS'i yok); içerik hidrasyonu beklemeden görünür. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

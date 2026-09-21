// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { EmptyState } from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      eyebrow="404"
      title="Kod bulunamadı."
      text="Aradığın sayfa yok ya da bağlantıdaki kod geçerli bir HumanCODE değil."
      actions={[
        { href: "/", label: "Ana sayfa", primary: true },
        { href: "/rehber", label: "Rehber" },
      ]}
    />
  );
}

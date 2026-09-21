// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { Metadata } from "next";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Profil" };

export default function Page() {
  return (
    <EmptyState
      eyebrow="Profil"
      title="Hesap yok, profil yok."
      text="Bu sürümde kayıt ya da giriş bulunmuyor. Hesaplar tarayıcında yapılır ve sunucuya kaydedilmez; son girdiğin tarih yalnızca bu cihazda hatırlanır."
      actions={[{ href: "/hesapla", label: "Kodunu çöz", primary: true }]}
    />
  );
}

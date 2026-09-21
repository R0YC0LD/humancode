// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { EmptyState } from "@/components/EmptyState";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <EmptyState eyebrow="Hata" title="Bir şey ters gitti." text="Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar denemek genellikle yeter." />
      <div className="container-hc" style={{ marginTop: -180, position: "relative" }}>
        <button type="button" className="btn btn-primary" onClick={reset}>
          Tekrar dene
        </button>
      </div>
    </div>
  );
}

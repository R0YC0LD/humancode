// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** IntersectionObserver ile görünür alana girince kademeli (60 ms) belirir. */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${seen ? "is-in" : ""} ${className}`} style={{ "--i": index } as CSSProperties}>
      {children}
    </div>
  );
}

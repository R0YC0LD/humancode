// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import type { PyramidCellView } from "@/components/Pyramid";

/** Tamamı çözülmüş (kilitli) hücre görünümleri; sunucu bileşenlerinden de çağrılabilir. */
export function staticCells(pin: number[]): PyramidCellView[] {
  return pin.map((v) => ({ value: v, state: "locked" as const, since: 1, flash: false, scale: 1, chars: 99 }));
}

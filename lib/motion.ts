// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** Tek hareket dili: tüm bileşenler süre ve easing'i buradan alır. */
export const DUR = { fast: 0.15, normal: 0.3, scene: 0.6 } as const;
export const EASE = [0.16, 1, 0.3, 1] as const;
export const STAGGER = 0.06;
export const TRANSITION = {
  fast: { duration: DUR.fast, ease: EASE },
  normal: { duration: DUR.normal, ease: EASE },
  scene: { duration: DUR.scene, ease: EASE },
} as const;

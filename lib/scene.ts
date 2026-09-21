// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** Matrix sahnesi zaman çizelgesi. Tüm süreler ms. Saf fonksiyonlar; DOM bilmez. */

export interface Timeline {
  rainEnd: number;
  condenseEnd: number;
  /** Her hane için kilitlenme anı. */
  lockAt: number[];
  scrambleMs: number;
  openAt: number;
  total: number;
  /** Yalnızca çift sahnede: sinerji birleşmesi. */
  mergeAt?: number;
  mergeStep?: number;
  mergeTravel?: number;
  mergeSettle?: number;
}

const idx = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Tek kişi: yağmur 0–1.2 sn, yoğunlaşma 1.2–2.0, kilitlenme 2.0–5.0 (h1 → h9), açılış 5.0–6.0. */
export const SINGLE: Timeline = {
  rainEnd: 1200,
  condenseEnd: 2000,
  lockAt: idx(9).map((i) => 2600 + 300 * i), // ilk kutu 2000'de karışmaya başlar, son kutu 5000'de kilitlenir
  scrambleMs: 600,
  openAt: 5000,
  total: 6000,
};

/** İki kişi: iki kod aynı anda çözülür, ardından ortada sinerji piramidi oluşur. */
export const PAIR: Timeline = {
  rainEnd: 1200,
  condenseEnd: 2000,
  lockAt: idx(9).map((i) => 2600 + 200 * i),
  scrambleMs: 600,
  mergeAt: 4200,
  mergeStep: 100,
  mergeTravel: 500,
  mergeSettle: 400,
  openAt: 5800,
  total: 6400,
};

export type CellState = "hidden" | "scramble" | "locked";

export interface CellVisual {
  state: CellState;
  /** Gösterilecek rakam (hidden'da null). */
  value: number | null;
  /** Kilitlenmeden bu yana 0..1 (dalga için); kilitli değilse 0. */
  since: number;
  /** Tek karelik beyaz flash (kilitlenmeyi izleyen ilk ~70 ms). */
  flash: boolean;
  /** Yay (spring) ölçeği: hafif overshoot. */
  scale: number;
  /** Etiketten kaç harf yazıldı (18 ms/harf). */
  chars: number;
}

export const FLASH_MS = 70;
export const WAVE_MS = 700;
export const TYPE_MS_PER_CHAR = 18;

/** Karışma sırasında gösterilen sahte rakam; deterministik (aynı t, i → aynı değer). */
export function scrambleDigit(cell: number, tick: number): number {
  return ((cell * 7919 + tick * 104729 + ((tick * tick) % 13)) % 9) + 1;
}

/**
 * i. hanenin t anındaki görünümü.
 * Karışma penceresi [lock - scrambleMs, lock); hızlı başlar, yavaşlayarak durur.
 */
export function cellVisual(
  digit: number,
  cell: number,
  t: number,
  lock: number,
  scrambleMs: number,
  labelLength: number,
): CellVisual {
  const start = lock - scrambleMs;
  if (t < start) {
    return { state: "hidden", value: null, since: 0, flash: false, scale: 1, chars: 0 };
  }
  if (t < lock) {
    const u = (t - start) / scrambleMs; // 0..1
    const tick = Math.floor(16 * (1 - (1 - u) * (1 - u)));
    return { state: "scramble", value: scrambleDigit(cell, tick), since: 0, flash: false, scale: 1, chars: 0 };
  }
  const dt = t - lock;
  const u = Math.min(dt / 320, 1);
  // sönümlü yay: 1.16 → 1 (overshoot)
  const scale = u >= 1 ? 1 : 1 + 0.16 * Math.exp(-6 * u) * Math.cos(12 * u);
  return {
    state: "locked",
    value: digit,
    since: Math.min(dt / WAVE_MS, 1),
    flash: dt < FLASH_MS,
    scale,
    chars: Math.min(labelLength, Math.floor(dt / TYPE_MS_PER_CHAR)),
  };
}

/** Bir çizginin (kaynak → hedef) çizim ilerlemesi 0..1; hedef kilitlenmeden ~400 ms önce başlar. */
export function linkProgress(t: number, targetLock: number): number {
  const p = (t - (targetLock - 400)) / 450;
  return Math.min(Math.max(p, 0), 1);
}

/** Çift sahnede k. sinerji hanesinin birleşme evresi. */
export interface MergeVisual {
  /** Hayalet rakamların yolculuk ilerlemesi 0..1 (ease-out). */
  travel: number;
  /** Hayaletler görünür mü. */
  ghosts: boolean;
  /** Hedef sinerji hücresinin görünümü. */
  cell: CellVisual;
}

export function easeOutCubic(x: number): number {
  const c = Math.min(Math.max(x, 0), 1);
  return 1 - Math.pow(1 - c, 3);
}

export function mergeVisual(
  sDigit: number,
  k: number,
  t: number,
  tl: Required<Pick<Timeline, "mergeAt" | "mergeStep" | "mergeTravel" | "mergeSettle">>,
  labelLength: number,
): MergeVisual {
  const start = tl.mergeAt + k * tl.mergeStep;
  const arrive = start + tl.mergeTravel;
  const lock = arrive + tl.mergeSettle;
  const travel = easeOutCubic((t - start) / tl.mergeTravel);
  const ghosts = t >= start && t < arrive;
  if (t < arrive) {
    return {
      travel,
      ghosts,
      cell: { state: "hidden", value: null, since: 0, flash: false, scale: 1, chars: 0 },
    };
  }
  return { travel: 1, ghosts: false, cell: cellVisual(sDigit, 20 + k, t, lock, tl.mergeSettle, labelLength) };
}

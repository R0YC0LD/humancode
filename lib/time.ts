// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** "az önce", "5 dk önce", "3 sa önce", "2 gün önce". */
export function timeAgo(t: number | undefined, now: number = Date.now()): string {
  if (!t) return "";
  const s = Math.max(0, Math.floor((now - t) / 1000));
  if (s < 60) return "az önce";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} sa önce`;
  return `${Math.floor(h / 24)} gün önce`;
}

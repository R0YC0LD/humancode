// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
/** Kullanıcının girdiği görünen ad: temizleme, doğrulama, kaba dil filtresi. */

export const NAME_MAX = 24;

const tr = (s: string) => s.toLocaleLowerCase("tr");

/** Kelime başlarını büyük harfe çevirir (Türkçe kurallarıyla): "onur can" → "Onur Can". */
export function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase("tr") + tr(w.slice(1)) : w))
    .join(" ");
}

/** Harf, boşluk, tire, kesme ve nokta dışını atar; fazla boşlukları sadeleştirir; uzunluğu kısıtlar. */
export function cleanName(raw: string | null | undefined): string {
  if (!raw) return "";
  const kept = raw
    .normalize("NFC")
    .replace(/[^\p{L}\s.'’-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NAME_MAX)
    .trim();
  return titleCase(kept);
}

// Herkese açık listede görünecek adlar için kısa, kaba bir engel listesi (kök eşleşme).
const BLOCK = ["orospu", "piç", "yarrak", "amk", "sikt", "sikik", "siktir", "göt", "ibne", "fuck", "shit", "bitch", "nigg", "porn"];

export function isCleanForPublic(name: string): boolean {
  const n = tr(name).replace(/[\s.'’-]/g, "");
  return !BLOCK.some((b) => n.includes(b));
}

/** Ad geçerli mi (en az 2 harf)? */
export function isValidName(name: string): boolean {
  return (name.match(/\p{L}/gu) ?? []).length >= 2;
}

/** Bir sözcüğün ilk 2 harfi ve *** ("Onur" → "On***"). */
export function maskWord(w: string): string {
  return [...w.trim()].slice(0, 2).join("") + "***";
}

/** Herkese açık listede gösterilen ad: adın ilk 2 harfi + soyadın ilk 2 harfi ("On*** Yı***"). */
export function maskFullName(ad: string, soyad: string): string {
  const first = cleanName(ad).split(" ")[0] ?? "";
  const last = cleanName(soyad).split(" ").pop() ?? "";
  return `${maskWord(first)} ${maskWord(last)}`;
}

/** Eski (sansürsüz) kayıtları da güvenle sansürler; zaten sansürlüyse dokunmaz. */
export function ensureMasked(name: string): string {
  if (name.includes("*")) return name;
  return name
    .split(" ")
    .filter(Boolean)
    .map(maskWord)
    .join(" ");
}

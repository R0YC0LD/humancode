// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { isFuture, isValidDate, todayYmd, type BirthDate } from "./numerology";

export interface BirthFields {
  d: string;
  m: string;
  y: string;
}

export const EMPTY_FIELDS: BirthFields = { d: "", m: "", y: "" };

export type FieldResult = { ok: true; date: BirthDate } | { ok: false; error: string | null };

/** Alanları doğrular. Tamamen boşsa hata mesajı vermez (null). */
export function validateFields(f: BirthFields, now = new Date()): FieldResult {
  if (!f.d && !f.m && !f.y) return { ok: false, error: null };
  if (!f.d || !f.m || f.y.length < 4) return { ok: false, error: "Gün, ay ve 4 haneli yılı gir." };
  const date = { day: Number(f.d), month: Number(f.m), year: Number(f.y) };
  if (date.year < 1900) return { ok: false, error: "Yıl 1900 veya sonrası olmalı." };
  if (date.month < 1 || date.month > 12) return { ok: false, error: "Ay 1 ile 12 arasında olmalı." };
  if (!isValidDate(date)) return { ok: false, error: "Bu tarih takvimde yok." };
  if (isFuture(date, todayYmd(now))) return { ok: false, error: "Doğum tarihi gelecekte olamaz." };
  return { ok: true, date };
}

export function fieldsFromDate(d: BirthDate | null): BirthFields {
  return d ? { d: String(d.day), m: String(d.month), y: String(d.year) } : EMPTY_FIELDS;
}

const KEY = "hc:birth";

export function loadSavedBirth(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveBirth(s: string) {
  try {
    window.localStorage.setItem(KEY, s);
  } catch {
    /* depolama kapalı olabilir */
  }
}

const NAME_KEY = "hc:name";

export function loadSavedName(): string {
  try {
    return window.localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveName(s: string) {
  try {
    window.localStorage.setItem(NAME_KEY, s);
  } catch {
    /* depolama kapalı olabilir */
  }
}

/** Ad geçerli mi? Boşsa null (hata gösterme), kısaysa mesaj. */
export function nameError(name: string): string | null {
  const letters = (name.match(/\p{L}/gu) ?? []).length;
  if (letters >= 2) return null;
  return "Adını yaz (en az 2 harf).";
}

const SURNAME_KEY = "hc:surname";

export function loadSavedSurname(): string {
  try {
    return window.localStorage.getItem(SURNAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveSurname(s: string) {
  try {
    window.localStorage.setItem(SURNAME_KEY, s);
  } catch {
    /* depolama kapalı olabilir */
  }
}

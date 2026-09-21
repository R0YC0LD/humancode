// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { describe, expect, it } from "vitest";
import { validateFields } from "./birthForm";

const now = new Date(2026, 8, 19);

describe("validateFields", () => {
  it("boş → hata mesajı yok", () => expect(validateFields({ d: "", m: "", y: "" }, now)).toEqual({ ok: false, error: null }));
  it("eksik alan", () => expect(validateFields({ d: "1", m: "", y: "1990" }, now).ok).toBe(false));
  it("geçerli", () => expect(validateFields({ d: "11", m: "2", y: "1980" }, now)).toEqual({ ok: true, date: { day: 11, month: 2, year: 1980 } }));
  it("31 Nisan yok", () => expect(validateFields({ d: "31", m: "4", y: "1990" }, now).ok).toBe(false));
  it("29 Şubat artık olmayan yıl yok", () => expect(validateFields({ d: "29", m: "2", y: "2001" }, now).ok).toBe(false));
  it("gelecek tarih reddedilir, bugün kabul", () => {
    expect(validateFields({ d: "20", m: "9", y: "2026" }, now).ok).toBe(false);
    expect(validateFields({ d: "19", m: "9", y: "2026" }, now).ok).toBe(true);
  });
  it("1900 öncesi reddedilir", () => expect(validateFields({ d: "1", m: "1", y: "1899" }, now).ok).toBe(false));
});

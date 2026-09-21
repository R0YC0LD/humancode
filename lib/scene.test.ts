// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { describe, expect, it } from "vitest";
import { cellVisual, linkProgress, mergeVisual, PAIR, SINGLE, scrambleDigit } from "./scene";

describe("sahne zaman çizelgesi", () => {
  it("tek: ilk kutu 2000'de karışmaya başlar, son kutu 5000'de kilitlenir, toplam 6 sn", () => {
    expect(SINGLE.lockAt[0] - SINGLE.scrambleMs).toBe(2000);
    expect(SINGLE.lockAt[8]).toBe(5000);
    expect(SINGLE.total).toBe(6000);
    expect(SINGLE.lockAt).toHaveLength(9);
  });
  it("çift: kilitler artan, birleşme son kilitten sonra, toplam 6.4 sn", () => {
    for (let i = 1; i < 9; i++) expect(PAIR.lockAt[i]).toBeGreaterThan(PAIR.lockAt[i - 1]);
    expect(PAIR.mergeAt).toBe(PAIR.lockAt[8]);
    expect(PAIR.total).toBeLessThanOrEqual(6500);
  });
  it("her iki sahnenin toplam süresi 4.5–6.5 sn aralığında", () => {
    for (const tl of [SINGLE, PAIR]) {
      expect(tl.total).toBeGreaterThanOrEqual(4500);
      expect(tl.total).toBeLessThanOrEqual(6500);
    }
  });
});

describe("cellVisual", () => {
  const lock = 2600;
  it("başlamadan önce gizli", () => {
    expect(cellVisual(4, 0, 1000, lock, 600, 10).state).toBe("hidden");
    expect(cellVisual(4, 0, 1999, lock, 600, 10).state).toBe("hidden");
  });
  it("karışma penceresinde 1..9 arası sahte rakam", () => {
    for (let t = 2000; t < lock; t += 7) {
      const v = cellVisual(4, 3, t, lock, 600, 10);
      expect(v.state).toBe("scramble");
      expect(v.value).toBeGreaterThanOrEqual(1);
      expect(v.value).toBeLessThanOrEqual(9);
    }
  });
  it("kilit anında doğru rakam + flash; 70 ms sonra flash yok", () => {
    const a = cellVisual(4, 0, lock, lock, 600, 10);
    expect(a.state).toBe("locked");
    expect(a.value).toBe(4);
    expect(a.flash).toBe(true);
    expect(cellVisual(4, 0, lock + 71, lock, 600, 10).flash).toBe(false);
  });
  it("kilitten sonra hep doğru rakam", () => {
    for (let t = lock; t < lock + 3000; t += 13) expect(cellVisual(7, 2, t, lock, 600, 12).value).toBe(7);
  });
  it("etiket 18 ms/harf yazılır ve uzunluğu aşmaz", () => {
    expect(cellVisual(1, 0, lock + 18 * 5, lock, 600, 10).chars).toBe(5);
    expect(cellVisual(1, 0, lock + 10000, lock, 600, 10).chars).toBe(10);
  });
  it("yay ölçeği 1'e yakınsar", () => {
    expect(Math.abs(cellVisual(1, 0, lock + 2000, lock, 600, 5).scale - 1)).toBeLessThan(1e-6);
  });
  it("scrambleDigit deterministik, 1..9", () => {
    for (let c = 0; c < 9; c++)
      for (let k = 0; k < 20; k++) {
        const v = scrambleDigit(c, k);
        expect(v).toBe(scrambleDigit(c, k));
        expect(v).toBeGreaterThanOrEqual(1);
        expect(v).toBeLessThanOrEqual(9);
      }
  });
});

describe("linkProgress / merge", () => {
  it("çizgi hedef kilitlenmeden 400 ms önce başlar ve 0..1 sınırında kalır", () => {
    expect(linkProgress(2000, 2600)).toBe(0);
    expect(linkProgress(2200, 2600)).toBe(0);
    expect(linkProgress(3000, 2600)).toBe(1);
    const mid = linkProgress(2400, 2600);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });
  it("birleşme: hayalet rakamlar yolculuk boyunca görünür, varınca hücre karışıp kilitlenir", () => {
    const tl = { mergeAt: 4200, mergeStep: 100, mergeTravel: 500, mergeSettle: 400 };
    expect(mergeVisual(5, 0, 4100, tl, 8).ghosts).toBe(false);
    expect(mergeVisual(5, 0, 4300, tl, 8).ghosts).toBe(true);
    expect(mergeVisual(5, 0, 4750, tl, 8).cell.state).toBe("scramble");
    const done = mergeVisual(5, 0, 4200 + 500 + 400, tl, 8);
    expect(done.cell.state).toBe("locked");
    expect(done.cell.value).toBe(5);
  });
});

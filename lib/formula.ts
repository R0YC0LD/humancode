// © 2026 Onur Teryakioğlu. All rights reserved. Proprietary; see LICENSE.
import { HANELER } from "@/content/haneler";
import { digitSum, reduce, type BirthDate, type Pin } from "./numerology";

/** Bir hanenin gerçek değerlerle yazılmış hesabı. */
export function formulaLine(i: number, pin: Pin, birth?: BirthDate | null): string | null {
  const h = HANELER[i];
  if (i === 0) return birth ? `reduce(${birth.day}) = ${pin[0]}` : null;
  if (i === 1) return birth ? `reduce(${birth.month}) = ${pin[1]}` : null;
  if (i === 2) {
    if (!birth) return null;
    const ds = String(birth.year).split("").join(" + ");
    return `reduce(${ds} = ${digitSum(birth.year)}) = ${pin[2]}`;
  }
  const parts = h.deps.map((d) => pin[d]);
  const sum = parts.reduce((a, b) => a + b, 0);
  return `reduce(${parts.join(" + ")} = ${sum}) = ${reduce(sum)}`;
}

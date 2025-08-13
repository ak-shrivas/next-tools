// utils/cgpa.ts
import { Formula } from "@/types/cgpa";

/**
 * Predefined formula set.
 * You can expand this list as you verify formulas from university docs.
 */
export const FORMULAS: Formula[] = [
  { id: "cbse_9_5", label: "CBSE (× 9.5)", multiplier: 9.5, notes: "Standard CBSE conversion" },
  { id: "anna_10", label: "Anna University (× 10)", multiplier: 10, notes: "Anna University" },
  { id: "vtu_10_minus_075", label: "VTU ( (CGPA - 0.75) × 10 )", multiplier: 10, offset: -7.5, notes: "VTU style (approx)" },
  { id: "generic_4_to_100", label: "Generic (4-point → %)", multiplier: 25, notes: "CGPA/4 × 100" },
  { id: "generic_5_to_100", label: "Generic (5-point → %)", multiplier: 20, notes: "CGPA/5 × 100" },
];

/**
 * Apply formula to convert CGPA -> Percentage.
 * Formula semantics: percent = cgpa * multiplier + offset
 * Note: For formulas like (CGPA - 0.75) * 10, offset should be handled outside by mapping.
 */
export function applyFormulaToPercentage(cgpa: number, formula: Formula, customMultiplier?: number | null, customOffset?: number | null): number {
  const m = customMultiplier ?? formula.multiplier ?? 0;
  // formula.offset is used as an additive constant: percent = cgpa * multiplier + offset
  // For VTU-like formula ((cgpa - 0.75) * 10) we approximate by setting offset = (-0.75 * 10) = -7.5 in list
  const o = customOffset ?? formula.offset ?? 0;
  const pct = cgpa * m + o;
  return roundToTwo(pct);
}

export function applyFormulaToCgpa(percent: number, formula: Formula, customMultiplier?: number | null, customOffset?: number | null): number | null {
  const m = customMultiplier ?? formula.multiplier ?? 0;
  const o = customOffset ?? formula.offset ?? 0;
  if (m === 0) return null;
  const cgpa = (percent - o) / m;
  return roundToTwo(cgpa);
}

function roundToTwo(v: number) {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}

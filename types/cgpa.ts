// types/cgpa.ts
export type Formula = {
  id: string;
  label: string;
  multiplier: number;
  offset?: number; // optional constant
  notes?: string;
  example?: string;
};

export type ConverterInputs = {
  direction: "cgpaToPercent" | "percentToCgpa";
  cgpa?: number;
  percent?: number;
  formulaId: string;
  customMultiplier?: number | null;
  customOffset?: number | null;
  name?: string; // optional student name for share
};

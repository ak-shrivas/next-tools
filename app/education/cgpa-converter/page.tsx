// app/education/cgpa-converter/page.tsx
"use client";

import React, { useState } from "react";
import ConverterForm from "@/components/CGPAConverter/ConverterForm";
import ResultCard from "@/components/CGPAConverter/ResultCard";
import { CalculatorLayout } from "@/components/layouts/CalculatorLayout";
import { FORMULAS } from "@/utils/cgpa";
import { Formula, ConverterInputs } from "@/types/cgpa";
import { ShareModal } from "@/components/WaterCalculator/ShareModal"; // reuse your share modal

export default function CGPAConverterPage() {
  const [resultValue, setResultValue] = useState<number | null>(null);
  const [lastInputs, setLastInputs] = useState<ConverterInputs | null>(null);

  const handleResult = (value: number, inputs: ConverterInputs) => {
    setResultValue(value);
    setLastInputs(inputs);
    // update URL for shareable SEO-friendly link (query params)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("formula", inputs.formulaId);
      if (inputs.cgpa !== undefined && inputs.cgpa !== null) params.set("cgpa", String(inputs.cgpa));
      if (inputs.percent !== undefined && inputs.percent !== null) params.set("percent", String(inputs.percent));
      if (inputs.name) params.set("name", inputs.name);
      params.set("shared", "false"); // default not shared until user shares
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", url);
    }
  };

  // For ShareModal we pass the lastInputs as props
  const shareProps = lastInputs
    ? {
        name: lastInputs.name,
        resultLiters: resultValue ?? 0, // note: ShareModal earlier expected resultLiters; re-use but semantics differ - we'll pass as number
        age: undefined,
        weight: undefined,
        height: undefined,
        gender: undefined,
        weightUnit: undefined,
        heightUnit: undefined,
        activity: undefined,
        climate: undefined,
      }
    : null;

  return (
    <>
      <CalculatorLayout
        title="📊 CGPA ↔ Percentage Converter"
        left={
          <section>
            <ConverterForm onResult={handleResult} />
          </section>
        }
        right={
          <section className="flex flex-col gap-4 items-start w-full">
            <ResultCard
              inputs={
                lastInputs
                  ? {
                      direction: lastInputs.direction,
                      cgpa: lastInputs.cgpa,
                      percent: lastInputs.percent,
                      formula: FORMULAS.find((f) => f.id === lastInputs.formulaId) ?? FORMULAS[0],
                      customMultiplier: lastInputs.customMultiplier ?? null,
                      customOffset: lastInputs.customOffset ?? null,
                      name: lastInputs.name,
                    }
                  : null
              }
            />
          </section>
        }
      />
      {/* include ShareModal instance so dispatch event will open it (it listens for event) */}
      {lastInputs && (
        <ShareModal
          // NOTE: reusing ShareModal props shape — pass name and resultLiters as numeric result
          name={lastInputs.name}
          resultLiters={resultValue ?? 0}
          // leave other optional inputs undefined
        />
      )}
    </>
  );
}

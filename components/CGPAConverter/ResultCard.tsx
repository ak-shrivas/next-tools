// components/CGPAConverter/ResultCard.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Formula } from "@/types/cgpa";
import { buildShareUrl } from "@/utils/url";
import { applyFormulaToPercentage, applyFormulaToCgpa } from "@/utils/cgpa";
import { Share2 } from "lucide-react";

type Props = {
  inputs: {
    direction: "cgpaToPercent" | "percentToCgpa";
    cgpa?: number;
    percent?: number;
    formula: Formula;
    customMultiplier?: number | null;
    customOffset?: number | null;
    name?: string;
  } | null;
};

export default function ResultCard({ inputs }: Props) {
  const [animatedValue, setAnimatedValue] = useState<number | null>(null);

  const computed = useMemo(() => {
    if (!inputs) return null;
    const { direction, cgpa, percent, formula, customMultiplier, customOffset } = inputs;
    if (direction === "cgpaToPercent") {
      if (cgpa == null) return null;
      const p = applyFormulaToPercentage(cgpa, formula, customMultiplier, customOffset);
      return { label: `${p}%`, numeric: p, explanation: `Used ${formula.label}` };
    } else {
      if (percent == null) return null;
      const g = applyFormulaToCgpa(percent, formula, customMultiplier, customOffset);
      return { label: `${g ?? "--"} CGPA`, numeric: g ?? null, explanation: `Used ${formula.label}` };
    }
  }, [inputs]);

  // animate value when computed changes
  useEffect(() => {
    if (!computed || computed.numeric == null) {
      setAnimatedValue(null);
      return;
    }
    const from = 0;
    const to = computed.numeric;
    let current = from;
    const step = Math.max( (to - from) / 20, 0.1);
    setAnimatedValue(from);
    const id = setInterval(() => {
      current = Math.min(current + step, to);
      setAnimatedValue(Math.round(current * 100) / 100);
      if (current >= to) clearInterval(id);
    }, 15);
    return () => clearInterval(id);
  }, [computed]);

  if (!inputs || !computed) {
    return (
      <div className="p-4 rounded-xl bg-white border">
        <p className="text-gray-500">Enter CGPA or percentage to see result.</p>
      </div>
    );
  }

  const shareLink = buildShareUrl("/education/cgpa-converter", {
    formula: inputs.formula.id,
    cgpa: inputs.cgpa,
    percent: inputs.percent,
    multiplier: inputs.customMultiplier ?? "",
    offset: inputs.customOffset ?? "",
    name: inputs.name ?? "",
    shared: "true",
    // liters etc not relevant here
  });

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-1">
            {inputs.name ? `${inputs.name}'s` : "Your"} Result
          </h3>
          <p className="text-xs text-gray-500">{computed.explanation}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              // also open share modal for richer sharing if available
              window.dispatchEvent(new Event("open-share-modal"));
              alert("Share link copied to clipboard!");
            }}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded"
          >
            <Share2 className="w-4 h-4 text-white" />
            Share
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-4">
        <div className="text-4xl font-bold text-blue-900">
          {animatedValue == null ? computed.label : `${animatedValue}${directionToSuffix(inputs.direction)}`}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div>{computed.explanation}</div>
        <div className="mt-2">Formula: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{inputs.formula.multiplier} × CGPA {inputs.formula.offset ? `+ ${inputs.formula.offset}` : ""}</code></div>
      </div>
    </div>
  );
}

function directionToSuffix(dir: "cgpaToPercent" | "percentToCgpa") {
  return dir === "cgpaToPercent" ? "%" : "";
}

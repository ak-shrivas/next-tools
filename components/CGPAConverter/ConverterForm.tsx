// components/CGPAConverter/ConverterForm.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FORMULAS, applyFormulaToCgpa, applyFormulaToPercentage } from "@/utils/cgpa";
import { Formula, ConverterInputs } from "@/types/cgpa";

type Props = {
  onResult: (value: number, inputs: ConverterInputs) => void;
  initial?: Partial<ConverterInputs>;
};

export default function ConverterForm({ onResult, initial }: Props) {
  const [direction, setDirection] = useState<"cgpaToPercent" | "percentToCgpa">(
    initial?.direction ?? "cgpaToPercent"
  );
  const [cgpa, setCgpa] = useState<number | undefined>(initial?.cgpa);
  const [percent, setPercent] = useState<number | undefined>(initial?.percent);
  const [formulaId, setFormulaId] = useState<string>(initial?.formulaId ?? FORMULAS[0].id);
  const [customMultiplier, setCustomMultiplier] = useState<number | null>(initial?.customMultiplier ?? null);
  const [customOffset, setCustomOffset] = useState<number | null>(initial?.customOffset ?? null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [name, setName] = useState<string | undefined>(initial?.name);

  // computed selected formula
  const selectedFormula: Formula = useMemo(() => {
    return FORMULAS.find((f) => f.id === formulaId) ?? FORMULAS[0];
  }, [formulaId]);

  // Live compute result and call onResult
  useEffect(() => {
    if (direction === "cgpaToPercent") {
      if (cgpa === undefined || cgpa === null || isNaN(cgpa)) return;
      const pct = applyFormulaToPercentage(cgpa, selectedFormula, customMultiplier, customOffset);
      onResult(pct, {
        direction,
        cgpa,
        percent: pct,
        formulaId,
        customMultiplier,
        customOffset,
        name,
      });
    } else {
      if (percent === undefined || percent === null || isNaN(percent)) return;
      const g = applyFormulaToCgpa(percent, selectedFormula, customMultiplier, customOffset);
      if (g === null) return;
      onResult(g, {
        direction,
        cgpa: g,
        percent,
        formulaId,
        customMultiplier,
        customOffset,
        name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, cgpa, percent, formulaId, customMultiplier, customOffset, name]);

  // helper for quick preset selection
  const handlePreset = (id: string) => {
    setFormulaId(id);
    setAdvancedOpen(false);
  };

  // Save to local history
  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem("cgpa_history" || "[]") || "[]");
    const entry = {
      ts: Date.now(),
      direction,
      cgpa,
      percent,
      formulaId,
      name,
    };
    history.unshift(entry);
    localStorage.setItem("cgpa_history", JSON.stringify(history.slice(0, 20)));
    alert("Saved to history");
  };

  const reset = () => {
    setCgpa(undefined);
    setPercent(undefined);
    setCustomMultiplier(null);
    setCustomOffset(null);
    setName("");
    setFormulaId(FORMULAS[0].id);
    setAdvancedOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* minimal */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Select Board / University</label>
        <select
          value={formulaId}
          onChange={(e) => setFormulaId(e.target.value)}
          className="input w-full"
        >
          {FORMULAS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
          <option value="custom">Custom formula...</option>
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="direction"
              checked={direction === "cgpaToPercent"}
              onChange={() => setDirection("cgpaToPercent")}
            />
            CGPA → %
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="direction"
              checked={direction === "percentToCgpa"}
              onChange={() => setDirection("percentToCgpa")}
            />
            % → CGPA
          </label>
        </div>
      </div>

      {direction === "cgpaToPercent" ? (
        <div>
          <label className="text-sm font-medium text-gray-700">Enter CGPA</label>
          <input
            type="number"
            step="0.01"
            value={cgpa ?? ""}
            onChange={(e) => setCgpa(e.target.value === "" ? undefined : Number(e.target.value))}
            className="input w-full"
            placeholder="e.g. 8.2"
          />
        </div>
      ) : (
        <div>
          <label className="text-sm font-medium text-gray-700">Enter Percentage</label>
          <input
            type="number"
            step="0.01"
            value={percent ?? ""}
            onChange={(e) => setPercent(e.target.value === "" ? undefined : Number(e.target.value))}
            className="input w-full"
            placeholder="e.g. 78.5"
          />
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-700">Your Name (optional)</label>
        <input
          type="text"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          className="input w-full"
          placeholder="e.g. Priya"
        />
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => setAdvancedOpen((s) => !s)} className="px-3 py-2 bg-gray-100 rounded">
          {advancedOpen ? "Hide Advanced" : "Advanced"}
        </button>
        <button type="button" onClick={saveToHistory} className="px-3 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
        <button type="button" onClick={reset} className="px-3 py-2 border rounded">
          Reset
        </button>
      </div>

      {/* advanced */}
      {advancedOpen && (
        <div className="bg-gray-50 border p-3 rounded space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Custom multiplier (optional)</label>
            <input
              type="number"
              step="0.01"
              value={customMultiplier ?? ""}
              onChange={(e) => setCustomMultiplier(e.target.value === "" ? null : Number(e.target.value))}
              className="input w-full"
              placeholder={`Default: ${selectedFormula.multiplier}`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Custom offset (optional)</label>
            <input
              type="number"
              step="0.01"
              value={customOffset ?? ""}
              onChange={(e) => setCustomOffset(e.target.value === "" ? null : Number(e.target.value))}
              className="input w-full"
              placeholder={`Default: ${selectedFormula.offset ?? 0}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Quick presets</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {FORMULAS.map((f) => (
                <button key={f.id} onClick={() => handlePreset(f.id)} className="px-2 py-1 border rounded text-sm">
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

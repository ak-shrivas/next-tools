import { Info } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: React.ReactNode;
  tooltip?: string;
};

export function RangeInputField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  tooltip,
}: Props) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 relative">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && (
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onClick={() => setShowTip(!showTip)}
          >
            <Info size={14} className="text-gray-400" />
            {showTip && (
              <div className="absolute z-10 w-60 text-xs text-white bg-gray-800 p-2 rounded shadow-md top-full left-0 mt-1">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="input w-full"
        />
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-blue-600"
      />

      <div className="flex justify-between text-xs text-gray-400">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

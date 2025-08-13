"use client";

import { useEffect, useMemo, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Info } from "lucide-react";

type Props = {
  label: string;
  value: string; // e.g. "2025-08-01"
  onChange: (val: string) => void;
  loanTenureYears: number; // <- passed from form
  tooltip?: string;
};

// Custom full-width input for DatePicker
const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <input
    type="text"
    className="input w-full cursor-pointer"
    onClick={onClick}
    value={value}
    readOnly
    ref={ref}
    style={{ width: "100%" }}
  />
));
CustomInput.displayName = "CustomInput";

export function DatePickerWithSlider({
  label,
  value,
  onChange,
  loanTenureYears,
  tooltip,
}: Props) {
  const totalMonths = loanTenureYears * 12;

  const baseDate = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + 1); // start from next month
    return d;
  }, []);

  const monthList = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalMonths; i++) {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() + i);
      list.push({
        index: i,
        label: date.toLocaleString("default", { month: "short", year: "numeric" }),
        date,
        iso: date.toISOString().slice(0, 7),
      });
    }
    return list;
  }, [baseDate, totalMonths]);

  const selectedIndex = monthList.findIndex((m) => m.iso === value);
  const [index, setIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const selectedDate = monthList[index].date;

  // Sync output with slider
  useEffect(() => {
    onChange(monthList[index].iso);
  }, [index]);

  const [showTip, setShowTip] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-1 mb-1">
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

      {/* Full-width month-year calendar */}
      
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) {
            const iso = date.toISOString().slice(0, 7);
            const idx = monthList.findIndex((m) => m.iso === iso);
            if (idx !== -1) setIndex(idx);
            onChange(iso);
          }
        }}
        dateFormat="MMM yyyy"
        showMonthYearPicker
        className="input w-full"
      />

      {/* Slider synced with calendar */}
      <input
        type="range"
        min={0}
        max={monthList.length - 1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="w-full mt-1"
      />

      <div className="text-xs text-gray-600 mt-1">
        Selected: <strong>{monthList[index].label}</strong>
      </div>
    </div>
  );
}

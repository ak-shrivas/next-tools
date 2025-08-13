"use client";
import { useState } from "react";

type AmortizationEntry = {
  month: number;
  calendarMonth: string;
  calendarYear: number;
  payment: number;
  interest: number;
  principal: number;
  opening: number;
  balance: number;
  totalInterestPaid: number;
};

export function AmortizationTableGrouped({
  data,
}: {
  data: AmortizationEntry[];
}) {
  const groupedByYear = data.reduce((acc, entry) => {
    const year = entry.calendarYear;
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {} as Record<number, AmortizationEntry[]>);

  const [openYears, setOpenYears] = useState<number[]>([]);

  const toggleYear = (year: number) => {
    setOpenYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedByYear).map(([year, months]) => (
        <div key={year} className="border rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleYear(Number(year))}
          >
            <span className="font-medium text-lg">📅 {year}</span>
            <span>{openYears.includes(Number(year)) ? "🔽" : "▶️"}</span>
          </button>

          {openYears.includes(Number(year)) && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2">Month</th>
                    <th className="p-2">Opening</th>
                    <th className="p-2">Principal</th>
                    <th className="p-2">Interest</th>
                    <th className="p-2">Payment</th>
                    <th className="p-2">Closing</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((entry) => (
                    <tr key={entry.month} className="border-t">
                      <td className="p-2">{`${entry.calendarMonth} ${entry.calendarYear}`}</td>
                      <td className="p-2">
                        ₹{Math.round(entry.opening).toLocaleString("en-IN")}
                      </td>
                      <td className="p-2">
                        ₹{Math.round(entry.principal).toLocaleString("en-IN")}
                      </td>
                      <td className="p-2">
                        ₹{Math.round(entry.interest).toLocaleString("en-IN")}
                      </td>
                      <td className="p-2">
                        ₹{Math.round(entry.payment).toLocaleString("en-IN")}
                      </td>
                      <td className="p-2">
                        ₹{Math.round(entry.balance).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

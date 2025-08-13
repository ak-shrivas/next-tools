// components/WaterCalculator/WaterBreakdownChart.tsx
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function WaterBreakdownChart({ totalLiters }: { totalLiters: number }) {
  const water = +(totalLiters * 0.75).toFixed(1);
  const food = +(totalLiters * 0.15).toFixed(1);
  const other = +(totalLiters * 0.1).toFixed(1);

  const data = {
    labels: ["Direct Water", "Food", "Other Fluids"],
    datasets: [
      {
        label: "Daily Hydration Sources",
        data: [water, food, other],
        backgroundColor: ["#145dfb", "#389906", "#ea7e0c"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-blue-0 to-blue-200 border border-blue-200 shadow-md rounded-lg p-3 mt-2">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Hydration Breakdown</h4>
      <Pie data={data} />
      <p className="text-xs text-gray-500 mt-2">* Estimated sources of hydration based on average dietary intake.</p>
    </div>
  );
}

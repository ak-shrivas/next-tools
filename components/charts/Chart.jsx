// File: components/Chart.jsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export function Chart({ data }) {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Outstanding Balance Over Time</h3>
      <Line
        data={{
          labels: data.map((d) => `${d.month}`),
          datasets: [
            {
              label: 'Remaining Balance',
              data: data.map((d) => d.balance),
              borderColor: '#2563eb',
              backgroundColor: '#93c5fd',
              fill: true,
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
}
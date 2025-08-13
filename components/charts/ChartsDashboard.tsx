import { Description, Tab } from "@headlessui/react";
import clsx from "clsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { calculateEMIWithPrepayment } from "@/utils/emiCalculator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  result: ReturnType<typeof calculateEMIWithPrepayment>;
  formData: {
    amount: number;
    downPayment: number;
    processingFee: number;
    lumpSum: number;
    extraMonthly: number;
  };
  chartRefs: React.RefObject<HTMLDivElement | null>[];
};

export function ChartsDashboard({ result, formData, chartRefs }: Props) {
  const { amortizationData, loanAmount, totalInterestWithPrepay, processingFeeAmount } = result;

  const labels = amortizationData.map((d) => `${d.calendarMonth} ${d.calendarYear}`);
  const monthsPaid = amortizationData.length;

  // 📈 Balance Line Chart
  const balanceLine = {
    labels,
    datasets: [
      {
        label: "Loan Balance Left (₹)",
        data: amortizationData.map((d) => d.balance),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  // 📊 EMI Composition Chart
  const splitBar = {
    labels,
    datasets: [
      {
        label: "Principal",
        data: amortizationData.map((d) => d.principal),
        backgroundColor: "#10b981",
      },
      {
        label: "Interest",
        data: amortizationData.map((d) => d.interest),
        backgroundColor: "#f59e0b",
      },
    ],
  };

  // 🥧 Payment Distribution Chart
  const paymentPie = {
    labels: [
      "EMI Principal",
      "Interest Paid",
      "Down Payment",
      "Processing Fee",
      "Lump Sum Payment",
      "Extra Monthly Payment",
    ],
    datasets: [
      {
        label: "Amount (₹)",
        data: [
          loanAmount,
          totalInterestWithPrepay,
          formData.downPayment,
          processingFeeAmount,
          formData.lumpSum,
          formData.extraMonthly * monthsPaid,
        ],
        backgroundColor: [
          "#2563eb",
          "#f97316",
          "#10b981",
          "#64748b",
          "#f43f5e",
          "#8b5cf6",
        ],
      },
    ],
  };

  // 📉 Principal vs Interest % Chart
  const stackedPercentBar = {
    labels,
    datasets: [
      {
        label: "Principal %",
        data: amortizationData.map((row) => {
          const total = row.principal + row.interest;
          return (row.principal / total) * 100;
        }),
        backgroundColor: "#10b981",
      },
      {
        label: "Interest %",
        data: amortizationData.map((row) => {
          const total = row.principal + row.interest;
          return (row.interest / total) * 100;
        }),
        backgroundColor: "#f97316",
      },
    ],
  };

  // 🔻 Cumulative Interest Chart
  const cumulativeInterestLine = {
    labels,
    datasets: [
      {
        label: "Cumulative Interest Paid (₹)",
        data: amortizationData.map((d) => d.totalInterestPaid),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
      },
    ],
  };
  const [chart1Ref, chart2Ref, chart3Ref] = chartRefs;


  const chartTabs = [
    {
      name: "Payment Distribution",
      chart: (
        <div className="w-full max-w-md mx-auto"> {/* Adjust width here */}
          <Pie data={paymentPie} />
        </div>
      ),
      description: "This pie chart visualizes how your total payments are distributed across principal, interest, fees, and prepayments."
    },
    {
      name: "Balance Over Time",
      chart: <Line data={balanceLine} />,
      description: "This chart shows how your outstanding loan balance decreases over time as you make EMI payments."
    },
    {
      name: "EMI Breakdown (₹)",
      chart: (
        <Bar
          data={splitBar}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { x: { stacked: true }, y: { stacked: true } },
          }}
        />
      ),
      description: "This stacked bar chart breaks down each EMI into principal and interest portions over the loan term."
    },
    
    {
      name: "Principal vs Interest %",
      chart: (
        <Bar
          data={stackedPercentBar}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: {
              x: { stacked: true },
              y: {
                stacked: true,
                max: 100,
                ticks: {
                  callback: (value) => `${value}%`,
                },
              },
            },
          }}
        />
      ),
      description: "This chart shows the percentage of each EMI that goes towards principal vs interest, helping you understand how your payments evolve over time."
    },
    {
      name: "Cumulative Interest",
      chart: <Line data={cumulativeInterestLine} />,
      description: "This line chart tracks the cumulative interest paid over the life of the loan, showing how much you pay in total interest as you progress through your EMIs."
    },
  ];

  return (
    <div className="w-full mt-8">
      <Tab.Group>
        <Tab.List className="flex justify-between items-center gap-2 rounded bg-gray-100 p-2 mb-4">
          {chartTabs.map((tab, idx) => (
            <Tab key={idx} className={({ selected }) =>
              clsx(
                "px-4 py-2 text-md rounded font-medium font-semibold focus:outline-none bg-blue-100",
                selected ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-300"
              )
            }>
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {chartTabs.map((tab, idx) => (
            <Tab.Panel key={idx} className="bg-white p-4 rounded shadow-md">
              <p className="text-sm font-semibold text-gray-600 mb-4">{tab.description}</p>
              {tab.chart}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Hidden Chart Container for Export */}
      <div className="absolute left-[-9999px] top-0 opacity-0 pointer-events-none" aria-hidden>
      <div ref={chart3Ref}><Pie data={paymentPie} /></div>
        <div ref={chart1Ref}><Line data={balanceLine} /></div>
        <div ref={chart2Ref}>
          <Bar
            data={splitBar}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: { x: { stacked: true }, y: { stacked: true } },
            }}
          />
        </div>
       
      </div>

    </div>
    
  );
}

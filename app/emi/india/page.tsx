"use client";

import { useState, useRef } from "react";
import { calculateEMIWithPrepayment } from "@/utils/emiCalculator";
import { exportAmortizationToCSV } from "@/utils/exportToCSV";
import { exportAmortizationToPDF } from "@/utils/exportToPDF";
import { EMIForm } from "@/components/forms/EMIForm";
import { ResultSummary } from "@/components/results/ResultSummary";
import { Chart } from "@/components/charts/Chart";
import { AmortizationTable } from "@/components/tables/AmortizationTable";
import { AmortizationTableGrouped } from "@/components/tables/AmortizationTableGrouped";
import { CalculatorLayout } from "@/components/layouts/CalculatorLayout";
import { ChartsDashboard } from "@/components/charts/ChartsDashboard";
import { exportFullEMIReport } from "@/utils/exportFullReport";


export default function EmiIndiaPage() {
  const [formData, setFormData] = useState({
    amount: 1000000,
    downPayment: 200000,
    rate: 8.5,
    tenure: 10,
    extraMonthly: 0,
    lumpSum: 0,
    lumpSumDate: '',
    processingFee: 0,
    startDate: '',
  });

  const [tableView, setTableView] = useState<"monthly" | "yearly">("yearly");


  const result = calculateEMIWithPrepayment(formData);

  const chart1Ref = useRef<HTMLDivElement | null>(null);
  const chart2Ref = useRef<HTMLDivElement | null >(null); 
  const chart3Ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
        {/* 🔹 Inputs Full Width */}
        <CalculatorLayout 
            title={
                "🏦 EMI Calculator"
            }
            left={
                <section>
                   
                    <EMIForm formData={formData} setFormData={setFormData} />
                </section>
            }
            
            right={
                <section className="flex flex-col gap-4 items-start">
                    <ResultSummary result={result} formData={formData} />
                    <div className="w-full bg-white p-4 rounded-xl shadow-md">
                        <Chart data={result.chartData} />
                    </div>
                </section>
            }
        />

        <ChartsDashboard
            result={result}
            formData={formData}
            chartRefs={[chart1Ref, chart2Ref, chart3Ref]}
        /> 

        {/* 🔹 Optional Table Full Width */}
        <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">📋 Amortization Schedule</h2>

            {/* Toggle Buttons */}
            <div className="flex justify-between ">
                <div className="flex items-center gap-4 text-sm mb-4">
                    <span className="font-medium">View As:</span>
                    <button
                        className={`px-3 py-1 rounded ${tableView === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        onClick={() => setTableView("yearly")}
                    >
                    Yearly
                    </button>
                    <button
                        className={`px-3 py-1 rounded ${tableView === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        onClick={() => setTableView("monthly")}
                    >
                    Monthly
                   </button>
                </div>
                <div className="flex gap-4 text-sm mb-4">
                    <button
                        onClick={() =>
                            exportAmortizationToPDF(result.amortizationData, {
                                loanAmount: result.loanAmount,
                                downPayment: formData.downPayment ?? 0,
                                processingFeeAmount: result.processingFeeAmount,
                                emi: result.emi,
                                totalInterestWithPrepay: result.totalInterestWithPrepay,
                                totalInterestWithoutPrepay: result.totalInterestWithoutPrepay,
                                interestSaved: result.interestSaved,
                                monthsSaved: result.monthsSaved,
                                totalPayment:
                                  result.emi * result.amortizationData.length +
                                  result.processingFeeAmount +
                                  (formData.downPayment ?? 0),
                                monthsPaid: result.amortizationData.length,
                              })
                              
                        }
                        className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                    >
                        📤 Download PDF
                    </button>
                    {/* <button
                        onClick={() => exportAmortizationToCSV(result.amortizationData)}
                        className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                        >
                        📤 Download Schedule (CSV)
                    </button> */}

                    <button
                        onClick={() => {
                            const url = new URL(window.location.href);
                            Object.entries(formData).forEach(([key, val]) =>
                            url.searchParams.set(key, String(val))
                            );
                            navigator.clipboard.writeText(url.toString());
                            alert("📎 Shareable link copied!");
                        }}
                        className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                        >
                        📎 Copy Shareable Link
                    </button>
                    {/* <button
                        onClick={() =>
                            exportFullEMIReport({
                            chartRefs: [chart1Ref, chart2Ref, chart3Ref],
                            summary: {
                                loanAmount: result.loanAmount,
                                emi: result.emi,
                                totalInterestWithPrepay: result.totalInterestWithPrepay,
                                totalInterestWithoutPrepay: result.totalInterestWithoutPrepay,
                                interestSaved: result.interestSaved,
                                monthsSaved: result.monthsSaved,
                                processingFeeAmount: result.processingFeeAmount,
                                downPayment: formData.downPayment,
                            },
                            amortizationData: result.amortizationData,
                            })
                        }
                        >
                        Download Full Report 📄
                    </button> */}
                </div>
                

            </div>
                    
        {/* Render Table */}
        <div className="mt-2">
            {tableView === "monthly" ? (
            <AmortizationTable data={result.amortizationData} />
            ) : (
            <AmortizationTableGrouped data={result.amortizationData} />
            )}
           
        </div>
        </section>

    </div>

  );
}

import { RangeInputField } from "@/components/fields/RangeInputField";
import { DatePickerWithSlider } from "@/components/fields/DatePickerWIthSlider";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  formData: {
    amount: number;
    downPayment: number;
    rate: number;
    tenure: number;
    extraMonthly: number;
    lumpSum: number;
    lumpSumDate: string;
    processingFee: number;
    startDate: string,
  };
  setFormData: (data: any) => void;
};

export function EMIForm({ formData, setFormData }: Props) {
  
  const searchParams = useSearchParams();
  useEffect(() => {
    const updatedForm = {
      amount: Number(searchParams.get("amount") || 1000000),
      downPayment: Number(searchParams.get("downPayment") || 200000),
      rate: Number(searchParams.get("rate") || 8.5),
      tenure: Number(searchParams.get("tenure") || 10),
      extraMonthly: Number(searchParams.get("extraMonthly") || 0),
      lumpSum: Number(searchParams.get("lumpSum") || 0),
      lumpSumDate: Number(searchParams.get("lumpSumDate") || ""),
      processingFee: Number(searchParams.get("processingFee") || 0),
      startDate: searchParams.get("startDate") || "",
    };
    setFormData(updatedForm);
  }, []);

  // 🔁 Set default EMI start month on first mount
  useEffect(() => {
    if (!formData.startDate) {
      const today = new Date();
      today.setMonth(today.getMonth() + 1); // Move to next month
      const defaultStart = today.toISOString().slice(0, 7); // "YYYY-MM"
      setFormData({ ...formData, startDate: defaultStart });
    }
  }, [formData, setFormData]);

  return (
    <div className="space-y-6">
      {/* Loan Details */}
      <div className="grid grid-cols-1 gap-4">
        <RangeInputField
          label="Loan Amount (₹)"
          tooltip="Total loan amount you're borrowing from the bank."
          value={formData.amount}
          onChange={(val) => setFormData({ ...formData, amount: val })}
          min={100000}
          max={10000000}
          step={10000}
        />
        <RangeInputField
          label="Interest Rate (%)"
          tooltip="Annual interest rate offered by your lender."
          value={formData.rate}
          onChange={(val) => setFormData({ ...formData, rate: val })}
          min={1}
          max={40}
          step={0.1}
        />
        <RangeInputField
          label="Loan Tenure (Years)"
          tooltip="Total number of years to repay the loan."
          value={formData.tenure}
          onChange={(val) => setFormData({ ...formData, tenure: val })}
          min={1}
          max={30}
          step={1}
        />
      </div>

      {/* Prepayment Options */}
      <fieldset className="p-4 border rounded-md bg-gray-50">
        <legend className="text-sm font-medium text-gray-700 mb-2">
          💸 Prepayment Options (Optional)
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RangeInputField
            label="Down Payment (₹)"
            min={0}
            max={formData.amount}
            step={1000}
            value={formData.downPayment}
            onChange={(val) => setFormData({ ...formData, downPayment: val })}
          />
          <RangeInputField
            label="Extra Monthly Payment (₹)"
            tooltip="Optional amount paid each month in addition to your EMI."
            value={formData.extraMonthly}
            onChange={(val) => setFormData({ ...formData, extraMonthly: val })}
            min={0}
            max={100000}
            step={1000}
          />
          
          <RangeInputField
            label="Processing Fee (%)"
            tooltip="One-time fee charged by the lender for processing your loan."
            value={formData.processingFee}
            onChange={(val) => setFormData({ ...formData, processingFee: val })}
            min={1}
            max={20}
            step={0.1}
          />
          <DatePickerWithSlider
            label="EMI Start Date"
            tooltip="Select the month when your EMI payments will begin"
            value={formData.lumpSumDate}
            onChange={(val) => setFormData({ ...formData, startDate: val })}
            loanTenureYears={formData.tenure}
          />
          <RangeInputField
            label="One-Time Prepayment (₹)"
            tooltip="One-time bulk payment (e.g. bonus or savings) to reduce your loan."
            value={formData.lumpSum}
            onChange={(val) => setFormData({ ...formData, lumpSum: val })}
            min={0}
            max={1000000}
            step={10000}
          />

          <DatePickerWithSlider
            label="One-Time Prepayment Month"
            tooltip="Select the month you'd like to make a One-Time Pre-payment"
            value={formData.lumpSumDate}
            onChange={(val) => setFormData({ ...formData, lumpSumDate: val })}
            loanTenureYears={formData.tenure}
          />
        </div>
      </fieldset>
    </div>
  );
}

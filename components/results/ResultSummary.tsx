import { calculateEMIWithPrepayment } from "@/utils/emiCalculator";

type Props = {
  result: ReturnType<typeof calculateEMIWithPrepayment>;
  formData: {
    amount: number;
    downPayment: number;
    processingFee: number;
  };
};

export function ResultSummary({ result, formData }: Props) {
  const {
    loanAmount,
    emi,
    totalInterestWithPrepay,
    totalInterestWithoutPrepay,
    monthsSaved,
    processingFeeAmount,
    amortizationData,
  } = result;

  const downPayment = formData.downPayment ?? 0;
  const monthsPaid = amortizationData.length;
  const totalPayment = emi * monthsPaid + processingFeeAmount + downPayment;

  const format = (n: number) =>
    n.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4 text-base">
      <h2 className="text-xl font-bold text-blue-700 mb-4">EMI Summary</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
        <div>Loan Amount (After Down Payment)</div>
        <div className="text-right font-medium text-gray-900">{format(loanAmount)}</div>

        <div>Down Payment</div>
        <div className="text-right text-gray-900">{format(downPayment)}</div>

        <div>Processing Fee</div>
        <div className="text-right text-gray-900">{format(processingFeeAmount)}</div>

        <div>Monthly EMI</div>
        <div className="text-right font-semibold text-green-700">{format(emi)}</div>

        <div>Total Interest Paid (without prepayment)</div>
        <div className="text-right text-gray-900">{format(totalInterestWithoutPrepay)}</div>

        <div>Total Interest Paid (with prepayment)</div>
        <div className="text-right text-gray-900">{format(totalInterestWithPrepay)}</div>
        <div>Loan Duration</div>
        <div className="text-right text-gray-900">
          {monthsPaid} months{" "}
          {monthsSaved > 0 && (
            <span className="text-green-600 font-medium">(-{monthsSaved} saved)</span>
          )}
        </div>

        <div className="font-semibold text-gray-800">Total Payable (EMI + Fees)</div>
        <div className="text-right font-bold text-blue-700 text-lg">{format(totalPayment)}</div>
      </div>
    </div>
  );
}

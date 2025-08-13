// utils/emiCalculator.ts

export type EMIFormData = {
  amount: number;
  downPayment: number;
  rate: number;
  tenure: number; // in years
  extraMonthly: number;
  lumpSum: number;
  lumpSumDate?: string; // "YYYY-MM-DD"
  startDate?: string;   // "YYYY-MM"
  processingFee: number; // percentage
};

type AmortizationRow = {
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

type EMIResult = {
  emi: number;
  loanAmount: number;
  totalInterestWithPrepay: number;
  totalInterestWithoutPrepay: number;
  interestSaved: number;
  monthsSaved: number;
  processingFeeAmount: number;
  chartData: { month: string; balance: number }[];
  amortizationData: AmortizationRow[];
};

export function calculateEMIWithPrepayment(formData: EMIFormData): EMIResult {
  const {
    amount,
    downPayment,
    rate,
    tenure,
    extraMonthly,
    lumpSum,
    lumpSumDate,
    startDate,
    processingFee,
  } = formData;

  const loanAmount = amount - downPayment;
  if (loanAmount <= 0) throw new Error("Loan amount must be greater than 0");

  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;

  const emi = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const start = startDate
    ? new Date(startDate + "-01")
    : (() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1); // EMI starts next month by default
        d.setDate(1);
        return d;
      })();

  const lumpSumMonth = lumpSumDate
    ? (() => {
        const lumpDate = new Date(lumpSumDate);
        const diffInMonths =
          lumpDate.getFullYear() * 12 +
          lumpDate.getMonth() -
          (start.getFullYear() * 12 + start.getMonth());
        return Math.max(1, diffInMonths + 1); // ensure at least 1
      })()
    : -1;

  let balance = loanAmount;
  let month = 1;
  let totalInterestWithPrepay = 0;
  const totalInterestWithoutPrepay = emi * months - loanAmount;

  const amortizationData: AmortizationRow[] = [];

  while (balance > 0.5 && month <= 1000) {
    const paymentDate = new Date(start);
    paymentDate.setMonth(start.getMonth() + month - 1);

    const opening = balance;
    const interest = opening * monthlyRate;
    const principal = Math.min(emi + extraMonthly - interest, balance);
    const totalPayment = principal + interest;

    // Lump sum prepayment
    if (month === lumpSumMonth && lumpSum > 0) {
      balance -= lumpSum;
    }

    balance -= principal;
    totalInterestWithPrepay += interest;

    amortizationData.push({
      month,
      calendarMonth: paymentDate.toLocaleString("default", { month: "short" }),
      calendarYear: paymentDate.getFullYear(),
      payment: totalPayment,
      interest,
      principal,
      opening,
      balance: Math.max(0, balance),
      totalInterestPaid: totalInterestWithPrepay,
    });

    month++;
  }

  const processingFeeAmount = loanAmount * (processingFee / 100);

  return {
    emi,
    loanAmount,
    totalInterestWithPrepay,
    totalInterestWithoutPrepay,
    interestSaved: totalInterestWithoutPrepay - totalInterestWithPrepay,
    monthsSaved: months - amortizationData.length,
    processingFeeAmount,
    chartData: amortizationData.map((row) => ({
      month: `${row.calendarMonth} ${row.calendarYear}`,
      balance: row.balance,
    })),
    amortizationData,
  };
}

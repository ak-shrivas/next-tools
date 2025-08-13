import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportAmortizationToPDF(
  data: {
    calendarMonth: string;
    calendarYear: number;
    opening: number;
    principal: number;
    interest: number;
    payment: number;
    balance: number;
    totalInterestPaid: number;
  }[],
  summary: {
    loanAmount: number;
    downPayment: number;
    processingFeeAmount: number;
    emi: number;
    totalInterestWithPrepay: number;
    totalInterestWithoutPrepay: number;
    interestSaved: number;
    monthsSaved: number;
    totalPayment: number;
    monthsPaid: number;
  },
  fileName = "EMI-Calculator"
) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("EMI Schedule Report", 14, 20);

  doc.setFontSize(13);
  doc.text("Summary", 14, 30);

  const format = (n: number | undefined) =>
    typeof n === "number" && !isNaN(n)
      ? "Rs. " + Math.round(n).toLocaleString("en-IN").replace(/\u202F/g, "")
      : "—";   
      
  const summaryData = [
    ["Loan Amount", format(summary.loanAmount)],
    ["Down Payment", format(summary.downPayment)],
    ["Processing Fee", format(summary.processingFeeAmount)],
    ["Monthly EMI", format(summary.emi)],
    ["Total Interest (with prepayment)", format(summary.totalInterestWithPrepay)],
    ["Total Interest (without prepayment)", format(summary.totalInterestWithoutPrepay)],
    ["Interest Saved", format(summary.interestSaved)],
    ["Loan Duration", `${summary.monthsPaid} months`],
    ["Months Saved", `${summary.monthsSaved} months`],
    ["Total Payable (EMI + Fees)", format(summary.totalPayment)],
  ];

  autoTable(doc, {
    head: [["Label", "Value"]],
    body: summaryData,
    startY: 35,
    theme: "striped",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  // Table Data for PDF matching web table columns
  // const tableData = data.map((row) => [
  //   `${row.calendarMonth} ${row.calendarYear}`,                          // Month
  //   format(row.payment),                                                 // Payment
  //   format(row.interest),                                                // Interest
  //   format(row.principal),                                               // Principal
  //   format(row.balance),                                                 // Balance Left
  //   format(row.totalInterestPaid),                                       // Total Interest
  // ]);

  // autoTable(doc, {
  //   head: [["Month", "Payment", "Interest", "Principal", "Balance Left", "Total Interest"]],
  //   body: tableData,
  //   startY: doc.lastAutoTable.finalY + 10,
  //   styles: { fontSize: 8 },
  //   theme: "grid",
  // });

  // Group rows by year
  const rowsGroupedByYear: Record<number, any[][]> = {};
  for (const row of data) {
    const year = row.calendarYear;
    if (!rowsGroupedByYear[year]) rowsGroupedByYear[year] = [];

    rowsGroupedByYear[year].push([
      `${row.calendarMonth} ${row.calendarYear}`,
      format(row.payment),
      format(row.interest),
      format(row.principal),
      format(row.balance),
      format(row.totalInterestPaid),
    ]);
  }

  let startY = doc.lastAutoTable.finalY + 10;

  for (const year of Object.keys(rowsGroupedByYear)) {
    doc.setFontSize(12);
    doc.text(`Year: ${year}`, 14, startY);

    autoTable(doc, {
      head: [["Month", "Payment", "Interest", "Principal", "Balance Left", "Total Interest"]],
      body: rowsGroupedByYear[Number(year)],
      startY: startY + 5,
      styles: { fontSize: 8 },
      theme: "grid",
    });

    startY = doc.lastAutoTable.finalY + 10;
  }


  // Footer
  doc.setFontSize(10);
  doc.text("Generated using EMIPro.in — Smart Financial Tools", 14, doc.internal.pageSize.height - 10);


  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const finalFileName =  `${fileName}-${timestamp}.pdf`;

  doc.save(finalFileName);  

}

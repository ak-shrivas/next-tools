export function AmortizationTable({ data }) {
    return (
      <div className="overflow-x-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">📅 Month-by-Month Loan Breakdown</h2>
        <table className="min-w-full text-sm text-left border rounded shadow">
          <thead className="bg-gray-100 text-xs font-semibold text-gray-700">
            <tr>
              <th className="p-2">Month</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Interest</th>
              <th className="p-2">Principal</th>
              <th className="p-2">Balance Left</th>
              <th className="p-2">Total Interest</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.month} className="border-t hover:bg-gray-50">
                <td className="p-2">{`${row.calendarMonth} ${row.calendarYear}`}</td>
                <td className="p-2">₹{row.payment.toFixed(0)}</td>
                <td className="p-2">₹{row.interest.toFixed(0)}</td>
                <td className="p-2">₹{row.principal.toFixed(0)}</td>
                <td className="p-2">₹{row.balance.toFixed(0)}</td>
                <td className="p-2">₹{row.totalInterestPaid.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
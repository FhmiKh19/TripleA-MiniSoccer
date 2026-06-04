import StatusBadge from "../../components/ui/StatusBadge";

const months = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 75 },
  { month: "May", value: 82 },
  { month: "Jun", value: 60 },
];

const transactions = [
  { id: "TRX-9001", customer: "Rudi", field: "Field A", date: "10 May 2026", duration: "2h", amount: "Rp 360.000", status: "Approved" },
  { id: "TRX-9002", customer: "Dewi", field: "Field C", date: "10 May 2026", duration: "1h", amount: "Rp 170.000", status: "Approved" },
  { id: "TRX-9003", customer: "Tono", field: "Field B", date: "11 May 2026", duration: "2h", amount: "Rp 400.000", status: "Approved" },
  { id: "TRX-9004", customer: "Rina", field: "Field D", date: "11 May 2026", duration: "1h", amount: "Rp 190.000", status: "Approved" },
  { id: "TRX-9005", customer: "Dian", field: "Field A", date: "12 May 2026", duration: "2h", amount: "Rp 360.000", status: "Approved" },
];

function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue This Month</p>
          <h2 className="mt-2 text-3xl font-extrabold text-brand-gold">Rp 48.500.000</h2>
        </div>
        <div className="rounded-xl bg-brand-dark p-5 shadow-sm">
          <p className="text-sm text-gray-300">Successful Transactions</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">247</h2>
        </div>
        <div className="rounded-xl bg-brand-dark p-5 shadow-sm">
          <p className="text-sm text-gray-300">Total Hours Rented</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">562 Hours</h2>
        </div>
      </div>

      <div className="rounded-xl bg-brand-dark p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Revenue Trend (Last 6 Months)</h3>
        <div className="flex gap-4">
          <div className="flex flex-col justify-between text-xs text-gray-300">
            <span>90M</span>
            <span>70M</span>
            <span>50M</span>
            <span>30M</span>
            <span>10M</span>
          </div>
          <div className="flex h-56 flex-1 items-end justify-around rounded-lg bg-[#2a2112] p-4">
            {months.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div className="w-8 rounded-t bg-brand-gold transition-all duration-200 hover:bg-brand-goldLight" style={{ height: `${item.value * 2}px` }} />
                <span className="text-xs text-gray-300">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <h3 className="border-b border-gray-100 px-5 py-4 text-lg font-bold text-brand-dark">Recent Successful Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Field</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3">{row.field}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.duration}</td>
                  <td className="px-4 py-3 font-semibold text-brand-gold">{row.amount}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;

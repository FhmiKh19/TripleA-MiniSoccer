import StatusBadge from "../../components/ui/StatusBadge";
import { formatRupiah, ownerMonths, ownerStats, ownerTransactions } from "../../data/seeder";

const ownerIconMap = {
  money: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2v4h4V10c0-1.1-.9-2-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18v-2a2 2 0 012-2h12a2 2 0 012 2v2" />
    </svg>
  ),
  calendar: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v3m8-3v3M4 9h16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
    </svg>
  ),
  check: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  x: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {ownerStats.map((stat) => (
          <div key={stat.id} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="text-brand-gold">{ownerIconMap[stat.icon] || ownerIconMap.money}</div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            </div>
            <p className="text-3xl font-extrabold text-gray-900">
              {stat.title.toLowerCase().includes("pendapatan") ? formatRupiah(stat.value) : stat.value}
            </p>
            <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-brand-dark">Pendapatan Bulanan</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ownerMonths.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">{item.month}</p>
              <p className="mt-2 text-xl font-bold text-brand-dark">{formatRupiah(item.income)}</p>
              <p className="mt-1 text-sm text-gray-500">Booking: {item.totalBooking}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <h3 className="border-b border-gray-100 px-5 py-4 text-lg font-bold text-brand-dark">Transaksi Owner</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">Booking Code</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Field</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">DP</th>
                <th className="px-4 py-3 text-left">Income Received</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerTransactions.map((transaction) => (
                <tr key={transaction.bookingCode} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{transaction.bookingCode}</td>
                  <td className="px-4 py-3">{transaction.customerName}</td>
                  <td className="px-4 py-3">{transaction.fieldName}</td>
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">{transaction.time}</td>
                  <td className="px-4 py-3 text-brand-gold">{formatRupiah(transaction.totalPrice)}</td>
                  <td className="px-4 py-3">{formatRupiah(transaction.downPayment)}</td>
                  <td className="px-4 py-3">{formatRupiah(transaction.incomeReceived)}</td>
                  <td className="px-4 py-3"><StatusBadge status={transaction.paymentStatus} /></td>
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

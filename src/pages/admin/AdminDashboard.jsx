import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { adminStats, bookings, formatRupiah } from "../../data/seeder";

const iconByIndex = [
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v3m8-3v3M4 9h16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2" /><path strokeWidth="2" d="M8 10l2-2 4 0 2 2-1 3-3 2-3-2z" /></svg>,
  <svg key="4" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l4-4m0 4l-4-4m11 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="5" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  <svg key="6" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2v4h4V10c0-1.1-.9-2-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18v-2a2 2 0 012-2h12a2 2 0 012 2v2" /></svg>,
];

const recentBookings = [...bookings]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.title.toLowerCase().includes("pendapatan") ? formatRupiah(stat.value) : stat.value}
            icon={iconByIndex[index % iconByIndex.length]}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <h2 className="border-b border-gray-100 px-5 py-4 text-lg font-bold text-brand-dark">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Field</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.bookingCode} className="border-b border-gray-100 last:border-none">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{booking.bookingCode}</td>
                  <td className="px-4 py-3">{booking.customerName}</td>
                  <td className="px-4 py-3">{booking.fieldName}</td>
                  <td className="px-4 py-3">{booking.date}, {booking.startTime}</td>
                  <td className="px-4 py-3"><StatusBadge status={booking.bookingStatus} /></td>
                  <td className="px-4 py-3">
                    <button className="text-sm font-semibold text-brand-gold transition-all duration-200 hover:text-brand-dark">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

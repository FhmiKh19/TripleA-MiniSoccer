import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

const stats = [
  { title: "Today's Bookings", value: 28, color: "text-brand-gold" },
  { title: "Pending Verification", value: 7, color: "text-amber-500" },
  { title: "Active Fields", value: 6, color: "text-green-600" },
  { title: "Pending Cancellations", value: 3, color: "text-red-600" },
];

const recentBookings = [
  { id: "TRX-1001", customer: "Budi Santoso", field: "Field A", date: "13 May 2026, 18:00", status: "Approved" },
  { id: "TRX-1002", customer: "Andi Pratama", field: "Field B", date: "13 May 2026, 19:00", status: "Waiting Verification" },
  { id: "TRX-1003", customer: "Rizki Nanda", field: "Field C", date: "13 May 2026, 20:00", status: "Waiting Payment" },
  { id: "TRX-1004", customer: "Dimas Fajar", field: "Field A", date: "14 May 2026, 16:00", status: "Cancelled" },
  { id: "TRX-1005", customer: "Yoga Putra", field: "Field B", date: "14 May 2026, 21:00", status: "Approved" },
];

const iconByIndex = [
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v3m8-3v3M4 9h16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2" /><path strokeWidth="2" d="M8 10l2-2 4 0 2 2-1 3-3 2-3-2z" /></svg>,
  <svg key="4" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l4-4m0 4l-4-4m11 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={iconByIndex[index]} color={stat.color} />
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
                <tr key={booking.id} className="border-b border-gray-100 last:border-none">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{booking.id}</td>
                  <td className="px-4 py-3">{booking.customer}</td>
                  <td className="px-4 py-3">{booking.field}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
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

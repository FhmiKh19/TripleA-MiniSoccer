import { useMemo } from "react";
import MetricCard from "../../components/ui/MetricCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { bookingList, slotList } = useAppData();
  const { currentUser } = useAuth();

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      todayBookings: bookingList.filter((b) => b.date === today).length,
      pendingVerify: bookingList.filter((b) => b.paymentStatus === "Menunggu Verifikasi DP").length,
      activeSlots:   slotList.filter((s) => s.status === "Tersedia").length,
      blockedSlots:  slotList.filter((s) => s.status === "Dipesan").length,
    };
  }, [bookingList, slotList]);

  const recent = bookingList.slice(-5).reverse();

  const metricIcons = {
    today: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    verify: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    available: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    booked: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Admin Panel</p>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Dasbor Operasional
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">Selamat datang kembali, {currentUser?.name?.split(' ')[0] || 'Admin'} 👋</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs text-slate-400"
             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <svg className="h-4 w-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Booking Hari Ini"        value={stats.todayBookings} accent="gold"  icon={metricIcons.today}     subtitle="Total booking masuk hari ini" />
        <MetricCard title="Menunggu Verifikasi DP"  value={stats.pendingVerify} accent="blue"  icon={metricIcons.verify}    subtitle="Pembayaran perlu dikonfirmasi" />
        <MetricCard title="Slot Tersedia"            value={stats.activeSlots}  accent="green" icon={metricIcons.available}  subtitle="Slot yang masih bisa dipesan" />
        <MetricCard title="Slot Terisi"              value={stats.blockedSlots} accent="white" icon={metricIcons.booked}     subtitle="Slot yang sudah terbooking" />
      </div>

      {/* Recent bookings table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: '#141B28', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h3 className="font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Booking Terbaru</h3>
            <p className="text-xs text-slate-500">5 booking terakhir yang masuk</p>
          </div>
          <span className="badge-gold">{recent.length} data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {["Kode Booking", "Pelanggan", "Lapangan", "Jadwal", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl opacity-40">📋</span>
                      <p className="mt-3 text-sm text-slate-500">Belum ada data booking</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recent.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="font-mono text-xs font-bold text-brand-gold">{b.bookingCode}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar-gold h-7 w-7 rounded-lg text-xs">
                          {b.customerName?.charAt(0)}
                        </div>
                        <span>{b.customerName}</span>
                      </div>
                    </td>
                    <td>{b.fieldName}</td>
                    <td>
                      <span className="text-xs text-slate-400">{b.date}</span>
                      <br />
                      <span className="text-xs font-semibold text-white">{b.startTime}</span>
                    </td>
                    <td><StatusBadge status={b.paymentStatus} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

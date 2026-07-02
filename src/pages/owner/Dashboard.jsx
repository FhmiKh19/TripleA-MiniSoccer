import { useEffect, useState } from "react";
import MetricCard from "../../components/ui/MetricCard";
import RevenueChart from "../../components/owner/RevenueChart";
import PeakHoursChart from "../../components/owner/PeakHoursChart";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { formatRupiah } from "../../data/seeder";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function Dashboard() {
  const { fetchStatistik, bookingList } = useAppData();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistik()
      .then((res) => setStats(res))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [fetchStatistik]);

  const weeklyData = WEEKDAYS.map((label) => ({ label, bookings: 0 }));
  if (stats?.reservasi_per_bulan) {
    stats.reservasi_per_bulan.forEach((item, idx) => {
      if (weeklyData[idx]) weeklyData[idx].bookings = item.total;
    });
  }

  const peakHoursData = Array.from({ length: 17 }, (_, i) => ({
    hour: `${String(i + 7).padStart(2, "0")}:00`,
    count: 0,
  }));

  const recentTransactions = bookingList
    .filter((b) => b.paymentStatus === "DP Sudah Dibayar" || b.paymentStatus === "Lunas")
    .slice(-5)
    .reverse();

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="skeleton h-8 w-48 rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
        </div>
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  const metricIcons = {
    reservasi: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    revenue: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    jam: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    popular: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Owner Panel</p>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Dasbor Pemilik
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">Halo, {currentUser?.name?.split(' ')[0] || 'Owner'} 👋 — Berikut statistik bisnismu</p>
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
        <MetricCard title="Total Reservasi"    value={stats?.total_reservasi ?? 0}              accent="gold"  icon={metricIcons.reservasi} subtitle="Semua waktu" />
        <MetricCard title="Total Pendapatan"   value={formatRupiah(stats?.total_pendapatan ?? 0)} accent="green" icon={metricIcons.revenue}    subtitle="Sudah terverifikasi" />
        <MetricCard title="Jam Tersewa"        value={`${stats?.jam_tersewa ?? 0} jam`}          accent="blue"  icon={metricIcons.jam}        subtitle="Total jam booking" />
        <MetricCard title="Lapangan Terpopuler" value={stats?.lapangan_terpopuler ?? "-"}          accent="gold"  icon={metricIcons.popular}   subtitle="Paling banyak dipesan" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={weeklyData} />
        <PeakHoursChart data={peakHoursData} />
      </div>

      {/* Recent transactions */}
      <div className="overflow-hidden rounded-2xl" style={{ background: '#141B28', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h3 className="font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Transaksi Terbaru</h3>
            <p className="text-xs text-slate-500">Booking yang sudah terbayar</p>
          </div>
          <span className="badge-green">{recentTransactions.length} transaksi</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {["Kode Booking", "Pelanggan", "Tanggal", "DP", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl opacity-40">💰</span>
                      <p className="mt-3 text-sm text-slate-500">Belum ada transaksi</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentTransactions.map((b) => (
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
                    <td><span className="text-xs text-slate-400">{b.date}</span></td>
                    <td><span className="font-semibold text-emerald-400">{formatRupiah(b.downPayment)}</span></td>
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

import { useEffect, useState } from "react";
import MetricCard from "../../components/ui/MetricCard";
import PageHeader from "../../components/ui/PageHeader";
import RevenueChart from "../../components/owner/RevenueChart";
import PeakHoursChart from "../../components/owner/PeakHoursChart";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function Dashboard() {
  const { fetchStatistik, bookingList } = useAppData();
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
    return <p className="text-gray-400">Memuat statistik...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dasbor Pemilik"
        subtitle="Statistik perkembangan bisnis — UC-09"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Reservasi"
          value={stats?.total_reservasi ?? 0}
          accent="gold"
        />
        <MetricCard
          title="Total Pendapatan"
          value={formatRupiah(stats?.total_pendapatan ?? 0)}
          accent="gold"
        />
        <MetricCard
          title="Jam Tersewa"
          value={`${stats?.jam_tersewa ?? 0} jam`}
          accent="white"
        />
        <MetricCard
          title="Lapangan Terpopuler"
          value={stats?.lapangan_terpopuler ?? "-"}
          accent="gold"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={weeklyData} />
        <PeakHoursChart data={peakHoursData} />
      </div>

      <div className="premium-card overflow-hidden">
        <h3 className="border-b border-brand-border px-6 py-4 font-semibold text-white">
          Transaksi Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-dark text-xs uppercase text-brand-gold">
              <tr>
                {["Kode", "Pelanggan", "Tanggal", "DP", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                recentTransactions.map((b) => (
                  <tr key={b.id} className="border-t border-brand-border hover:bg-brand-dark/50">
                    <td className="px-4 py-3 font-semibold text-brand-gold">{b.bookingCode}</td>
                    <td className="px-4 py-3 text-gray-300">{b.customerName}</td>
                    <td className="px-4 py-3 text-gray-400">{b.date}</td>
                    <td className="px-4 py-3 font-semibold text-brand-gold">
                      {formatRupiah(b.downPayment)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.paymentStatus} />
                    </td>
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

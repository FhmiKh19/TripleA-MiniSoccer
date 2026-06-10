import { useMemo } from "react";
import MetricCard from "../../components/ui/MetricCard";
import PageHeader from "../../components/ui/PageHeader";
import RevenueChart from "../../components/owner/RevenueChart";
import PeakHoursChart from "../../components/owner/PeakHoursChart";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { useOwner } from "../../context/OwnerContext";
import { formatRupiah } from "../../data/seeder";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function Dashboard() {
  const { bookingList } = useAppData();
  const { selectedFieldId } = useOwner();

  const fieldBookings = useMemo(
    () => bookingList.filter((b) => b.fieldId === selectedFieldId),
    [bookingList, selectedFieldId]
  );

  const stats = useMemo(() => {
    const paid = fieldBookings.filter(
      (b) =>
        b.paymentStatus === "DP Sudah Dibayar" ||
        b.paymentStatus === "Lunas" ||
        b.paymentStatus === "DP Terbayar"
    );

    const totalRevenue = paid.reduce((s, b) => s + b.totalPrice, 0);
    const dpIncome = paid.reduce((s, b) => s + b.downPayment, 0);
    const unpaidRemaining = fieldBookings
      .filter((b) => b.paymentStatus !== "Lunas")
      .reduce((s, b) => s + b.remainingPayment, 0);

    const currentMonth = new Date().getMonth();
    const monthlyIncome = paid
      .filter((b) => {
        try {
          const d = new Date(b.date);
          return d.getMonth() === currentMonth;
        } catch {
          return false;
        }
      })
      .reduce((s, b) => s + b.downPayment, 0);

    return { totalRevenue, dpIncome, unpaidRemaining, monthlyIncome };
  }, [fieldBookings]);

  const weeklyData = useMemo(() => {
    return WEEKDAYS.map((label, i) => ({
      label,
      bookings: fieldBookings.filter((b) => {
        try {
          const d = new Date(b.date);
          return d.getDay() === (i + 1) % 7;
        } catch {
          return false;
        }
      }).length,
    }));
  }, [fieldBookings]);

  const peakHoursData = useMemo(() => {
    const hours = {};
    fieldBookings.forEach((b) => {
      const h = b.startTime?.slice(0, 2) || "00";
      hours[h] = (hours[h] || 0) + 1;
    });
    return Array.from({ length: 17 }, (_, i) => {
      const hour = `${String(i + 7).padStart(2, "0")}:00`;
      return { hour, count: hours[String(i + 7).padStart(2, "0")] || 0 };
    });
  }, [fieldBookings]);

  const recentTransactions = fieldBookings
    .filter(
      (b) =>
        b.paymentStatus === "DP Sudah Dibayar" || b.paymentStatus === "Lunas"
    )
    .slice(-5)
    .reverse();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dasbor Pemilik"
        subtitle="Visualisasi finansial dan performa lapangan"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Pendapatan"
          value={formatRupiah(stats.totalRevenue)}
          accent="gold"
        />
        <MetricCard
          title="Uang DP Masuk"
          value={formatRupiah(stats.dpIncome)}
          accent="gold"
        />
        <MetricCard
          title="Sisa Pelunasan Belum Dibayar"
          value={formatRupiah(stats.unpaidRemaining)}
          accent="white"
        />
        <MetricCard
          title="Pendapatan Bulan Ini"
          value={formatRupiah(stats.monthlyIncome)}
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

import { useMemo } from "react";
import MetricCard from "../../components/ui/MetricCard";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";

function Dashboard() {
  const { bookingList, slotList } = useAppData();

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      todayBookings: bookingList.filter((b) => b.date === today).length,
      pendingVerify: bookingList.filter(
        (b) => b.paymentStatus === "Menunggu Verifikasi DP"
      ).length,
      activeSlots: slotList.filter((s) => s.status === "Tersedia").length,
      blockedSlots: slotList.filter((s) => s.status === "Dipesan").length,
    };
  }, [bookingList, slotList]);

  const recent = bookingList.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <PageHeader title="Dasbor Operasional" subtitle="Ringkasan aktivitas lapangan hari ini" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Booking Hari Ini" value={stats.todayBookings} accent="gold" />
        <MetricCard title="Menunggu Verifikasi DP" value={stats.pendingVerify} accent="gold" />
        <MetricCard title="Slot Tersedia" value={stats.activeSlots} accent="green" />
        <MetricCard title="Slot Terisi" value={stats.blockedSlots} accent="white" />
      </div>

      <div className="premium-card overflow-hidden">
        <h3 className="border-b border-brand-border px-6 py-4 font-semibold text-white">
          Booking Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-dark text-xs uppercase text-brand-gold">
              <tr>
                {["Kode", "Pelanggan", "Lapangan", "Jadwal", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Belum ada booking.
                  </td>
                </tr>
              ) : (
                recent.map((b) => (
                  <tr key={b.id} className="border-t border-brand-border hover:bg-brand-dark/50">
                    <td className="px-4 py-3 font-semibold text-brand-gold">{b.bookingCode}</td>
                    <td className="px-4 py-3 text-gray-300">{b.customerName}</td>
                    <td className="px-4 py-3 text-gray-300">{b.fieldName}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {b.date} {b.startTime}
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

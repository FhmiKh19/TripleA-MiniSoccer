import { useState, useMemo, useEffect } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { mapBookingFromApi } from "../../utils/apiMappers";
import { formatRupiah } from "../../data/seeder";

function TransactionReports() {
  const { fetchLaporan } = useAppData();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    fetchLaporan(startDate, endDate)
      .then((res) => setReportData(res))
      .catch(() => setReportData(null))
      .finally(() => setLoading(false));
  }, [startDate, endDate, fetchLaporan]);

  const filteredBookings = useMemo(() => {
    if (!reportData?.transaksi) return [];
    return reportData.transaksi.map(mapBookingFromApi);
  }, [reportData]);

  const stats = useMemo(() => ({
    totalRevenue: reportData?.total ?? 0,
    successfulRevenue: filteredBookings
      .filter((b) => b.paymentStatus === "DP Sudah Dibayar" || b.paymentStatus === "Lunas")
      .reduce((sum, b) => sum + b.totalPrice, 0),
    totalTransactions: filteredBookings.length,
  }), [filteredBookings, reportData]);

  const handleExportCSV = () => {
    let csv = "No,ID Transaksi,Pelanggan,Lapangan,Tanggal,Durasi,Total Harga,DP,Sisa Bayar,Status Pembayaran,Status Booking\n";
    filteredBookings.forEach((booking, idx) => {
      csv += `${idx + 1},"${booking.bookingCode}","${booking.customerName}","${booking.fieldName}","${booking.date}","${booking.duration} Jam",${booking.totalPrice},${booking.downPayment},${booking.remainingPayment},"${booking.paymentStatus}","${booking.bookingStatus}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "laporan_transaksi.csv";
    link.click();
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm text-gray-500">Pilih periode laporan — UC-10</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">Tanggal Mulai</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">Tanggal Selesai</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => { setStartDate(""); setEndDate(""); setReportData(null); }}
              className="w-full rounded-lg bg-brand-gold px-6 py-2 font-semibold text-brand-dark hover:opacity-90"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Memuat laporan...</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Pendapatan Periode</p>
          <h3 className="mt-2 text-2xl font-extrabold text-brand-gold">
            {formatRupiah(stats.totalRevenue)}
          </h3>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pendapatan Terverifikasi</p>
          <h3 className="mt-2 text-2xl font-extrabold text-green-600">
            {formatRupiah(stats.successfulRevenue)}
          </h3>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <h3 className="mt-2 text-2xl font-extrabold text-brand-dark">
            {stats.totalTransactions}
          </h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-sm">
            <thead className="bg-brand-dark text-brand-gold print:bg-gray-200 print:text-brand-dark">
              <tr>
                {["No", "ID Transaksi", "Pelanggan", "Lapangan", "Tanggal", "Durasi", "Total", "DP", "Sisa", "Pembayaran", "Booking"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                    {startDate && endDate ? "Tidak ada data untuk periode ini." : "Pilih tanggal mulai dan selesai."}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking, idx) => (
                  <tr key={booking.id} className="border-b border-gray-100">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold">{booking.bookingCode}</td>
                    <td className="px-4 py-3">{booking.customerName}</td>
                    <td className="px-4 py-3">{booking.fieldName}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.duration} Jam</td>
                    <td className="px-4 py-3 font-semibold text-brand-gold">{formatRupiah(booking.totalPrice)}</td>
                    <td className="px-4 py-3">{formatRupiah(booking.downPayment)}</td>
                    <td className="px-4 py-3">{formatRupiah(booking.remainingPayment)}</td>
                    <td className="px-4 py-3"><StatusBadge status={booking.paymentStatus} /></td>
                    <td className="px-4 py-3"><StatusBadge status={booking.bookingStatus} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-2 print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Ekspor ke PDF
        </button>
        <button
          onClick={handleExportCSV}
          disabled={filteredBookings.length === 0}
          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          Ekspor ke Excel
        </button>
      </div>
    </div>
  );
}

export default TransactionReports;

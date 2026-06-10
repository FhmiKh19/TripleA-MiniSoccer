import { useState, useMemo } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";

function TransactionReports() {
  const { bookingList } = useAppData();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter bookings by date range
  const filteredBookings = useMemo(() => {
    return bookingList.filter((booking) => {
      if (!startDate && !endDate) return true;

      try {
        const bookingDate = new Date(
          booking.date.split("-").reverse().join("-")
        );
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && bookingDate < start) return false;
        if (end && bookingDate > end) return false;

        return true;
      } catch (e) {
        return true;
      }
    });
  }, [bookingList, startDate, endDate]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );
    const successfulTotal = filteredBookings
      .filter(
        (b) =>
          b.paymentStatus === "DP Sudah Dibayar" ||
          b.paymentStatus === "Lunas"
      )
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    return {
      totalRevenue: total,
      successfulRevenue: successfulTotal,
      totalTransactions: filteredBookings.length,
    };
  }, [filteredBookings]);

  // Export to CSV
  const handleExportCSV = () => {
    let csv = "No,ID Transaksi,Pelanggan,Lapangan,Tanggal,Durasi,Total Harga,DP,Sisa Bayar,Status Pembayaran,Status Booking\n";

    filteredBookings.forEach((booking, idx) => {
      csv += `${idx + 1},"${booking.bookingCode}","${booking.customerName}","${booking.fieldName}","${booking.date}","${booking.duration} Jam",${booking.totalPrice},${booking.downPayment},${booking.remainingPayment},"${booking.paymentStatus}","${booking.bookingStatus}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "laporan_transaksi.csv");
    link.click();
  };

  // Export to PDF (using print)
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">
              Tanggal Selesai
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="w-full rounded-lg bg-brand-gold px-6 py-2 font-semibold text-brand-dark transition-all hover:opacity-90"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Pendapatan Periode Ini</p>
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
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">ID Transaksi</th>
                <th className="px-4 py-3 text-left">Pelanggan</th>
                <th className="px-4 py-3 text-left">Lapangan</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Durasi</th>
                <th className="px-4 py-3 text-left">Total Harga</th>
                <th className="px-4 py-3 text-left">DP</th>
                <th className="px-4 py-3 text-left">Sisa Bayar</th>
                <th className="px-4 py-3 text-left">Pembayaran</th>
                <th className="px-4 py-3 text-left">Booking</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-4 py-3 text-center text-gray-500">
                    Tidak ada data transaksi untuk periode yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking, idx) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-100 print:border-gray-300"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-brand-dark">
                      {booking.bookingCode}
                    </td>
                    <td className="px-4 py-3">{booking.customerName}</td>
                    <td className="px-4 py-3">{booking.fieldName}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.duration} Jam</td>
                    <td className="px-4 py-3 font-semibold text-brand-gold">
                      {formatRupiah(booking.totalPrice)}
                    </td>
                    <td className="px-4 py-3">
                      {formatRupiah(booking.downPayment)}
                    </td>
                    <td className="px-4 py-3">
                      {formatRupiah(booking.remainingPayment)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.paymentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.bookingStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-2 print:hidden">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-all hover:bg-red-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v14m0 0l-4-4m4 4l4-4M5 5h14"
            />
          </svg>
          Ekspor ke PDF
        </button>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-all hover:bg-green-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v14m0 0l-4-4m4 4l4-4M5 5h14"
            />
          </svg>
          Ekspor ke Excel
        </button>
      </div>
    </div>
  );
}

export default TransactionReports;

import { useMemo, useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { bookingHistory, formatRupiah } from "../../data/seeder";

const tabs = [
  "Semua",
  "Menunggu Verifikasi DP",
  "DP Sudah Dibayar",
  "Lunas",
  "Pending",
  "Dikonfirmasi",
  "Selesai",
  "Dibatalkan",
];

function BookingHistory() {
  const [tab, setTab] = useState("Semua");

  const data = useMemo(() => {
    if (tab === "Semua") return bookingHistory;
    return bookingHistory.filter(
      (item) => item.paymentStatus === tab || item.bookingStatus === tab
    );
  }, [tab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Riwayat Pesanan</h1>
        <p className="mt-1 text-sm text-gray-500">Lihat riwayat booking dan status pembayaran Anda.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${
              tab === t
                ? "bg-brand-gold font-semibold text-brand-dark"
                : "text-gray-500 hover:text-brand-gold"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {data.map((item) => (
        <div key={item.bookingCode} className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-brand-gold">{item.bookingCode}</p>
              <p className="text-sm text-gray-500">{item.customerName}</p>
            </div>
            <StatusBadge status={item.bookingStatus} />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Lapangan</p>
              <p className="mt-2 font-semibold text-brand-dark">{item.fieldName}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Tanggal & Jam</p>
              <p className="mt-2 font-semibold text-brand-dark">{item.date}</p>
              <p className="text-sm text-gray-500">{item.startTime} - {item.endTime}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Total Harga</p>
              <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(item.totalPrice)}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">DP 50%</p>
              <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(item.downPayment)}</p>
              <p className="mt-2 text-sm text-gray-500">Sisa Bayar: {formatRupiah(item.remainingPayment)}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Status Pembayaran</p>
              <p className="mt-2 font-semibold text-brand-dark">{item.paymentStatus}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Status Booking</p>
              <p className="mt-2 font-semibold text-brand-dark">{item.bookingStatus}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;

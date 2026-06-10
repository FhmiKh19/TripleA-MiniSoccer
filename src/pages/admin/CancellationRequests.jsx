import { useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { cancellations, formatRupiah } from "../../data/seeder";

const filters = ["Semua", "Customer", "Admin"];

function CancellationRequests() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const data =
    activeFilter === "Semua"
      ? cancellations
      : cancellations.filter((item) => item.cancelledBy === activeFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter ? "bg-brand-gold text-brand-dark" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.bookingCode} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-brand-gold">{item.bookingCode}</p>
                <p className="text-sm text-gray-500">{item.customerName}</p>
              </div>
              <StatusBadge status={item.refundStatus} />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Lapangan</p>
                <p className="mt-2 font-semibold text-brand-dark">{item.fieldName}</p>
                <p className="mt-2 text-sm text-gray-500">{item.date}</p>
                <p className="text-sm text-gray-500">{item.startTime} - {item.endTime}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Total Harga</p>
                <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(item.totalPrice)}</p>
                <p className="mt-3 text-sm text-gray-500">DP</p>
                <p className="font-semibold text-brand-dark">{formatRupiah(item.downPayment)}</p>
                <p className="mt-3 text-sm text-gray-500">Sisa Bayar</p>
                <p className="font-semibold text-brand-dark">{formatRupiah(item.totalPrice - item.downPayment)}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Alasan Pembatalan</p>
              <p className="mt-2 font-semibold text-brand-dark">{item.reason}</p>
              <p className="mt-3 text-sm text-gray-500">Dibatalkan oleh: {item.cancelledBy}</p>
              <p className="text-sm text-gray-500">Waktu pembatalan: {item.cancelledAt}</p>
            </div>

            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Refund tidak tersedia. DP hangus jika booking dibatalkan.
            </div>

            {item.adminNote && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <p className="font-semibold text-brand-dark">Catatan Admin</p>
                <p className="mt-2">{item.adminNote}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CancellationRequests;

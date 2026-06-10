import { useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";

function CancellationRequests() {
  const { cancellationList, updateCancellation, updateBooking } = useAppData();
  const [showConfirm, setShowConfirm] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // Filter cancellations with "Menunggu Konfirmasi" status
  // Since status isn't in the cancellation object, we'll show all and add status field
  const pendingCancellations = cancellationList.map((c) => ({
    ...c,
    status: "Menunggu Konfirmasi",
  }));

  const handleApproveCancellation = (cancellation) => {
    // Update booking status to "Dibatalkan"
    updateBooking(cancellation.bookingId, { bookingStatus: "Dibatalkan" });
    // Update cancellation status to "Disetujui"
    updateCancellation(cancellation.id, { status: "Disetujui" });
    setShowConfirm(null);
    alert("Pengajuan pembatalan berhasil disetujui!");
  };

  const handleRejectCancellation = (cancellation) => {
    // Keep booking status unchanged
    // Update cancellation status to "Ditolak"
    updateCancellation(cancellation.id, { status: "Ditolak" });
    setShowConfirm(null);
    alert("Pengajuan pembatalan berhasil ditolak!");
  };

  return (
    <div className="space-y-4">
      {pendingCancellations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Tidak ada pengajuan pembatalan yang menunggu konfirmasi.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingCancellations.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-brand-gold">{item.bookingCode}</p>
                  <p className="text-sm text-gray-500">{item.customerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Menunggu Konfirmasi
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Lapangan</p>
                  <p className="mt-2 font-semibold text-brand-dark">
                    {item.fieldName}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">{item.date}</p>
                  <p className="text-sm text-gray-500">
                    {item.startTime} - {item.endTime}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Total Harga</p>
                  <p className="mt-2 font-semibold text-brand-gold">
                    {formatRupiah(item.totalPrice)}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">DP</p>
                  <p className="font-semibold text-brand-dark">
                    {formatRupiah(item.downPayment)}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">Sisa Bayar</p>
                  <p className="font-semibold text-brand-dark">
                    {formatRupiah(item.totalPrice - item.downPayment)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Alasan Pembatalan</p>
                <p className="mt-2 font-semibold text-brand-dark">{item.reason}</p>
                <p className="mt-3 text-sm text-gray-500">
                  Kontak: {item.phone}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                DP hangus sesuai ketentuan pembatalan. Tidak ada refund.
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirm(item.id);
                    setConfirmAction("approve");
                  }}
                  className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white transition-all hover:bg-green-700"
                >
                  ✓ Setujui Pembatalan
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(item.id);
                    setConfirmAction("reject");
                  }}
                  className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white transition-all hover:bg-red-700"
                >
                  ✗ Tolak Pembatalan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-brand-dark">
              {confirmAction === "approve"
                ? "Setujui Pembatalan?"
                : "Tolak Pembatalan?"}
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              {confirmAction === "approve"
                ? "Booking akan diubah status menjadi 'Dibatalkan'."
                : "Booking akan tetap aktif dan pembatalan ditolak."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const cancellation = pendingCancellations.find(
                    (c) => c.id === showConfirm
                  );
                  if (confirmAction === "approve") {
                    handleApproveCancellation(cancellation);
                  } else {
                    handleRejectCancellation(cancellation);
                  }
                }}
                className={`flex-1 rounded-lg py-2 font-semibold text-white transition-all ${
                  confirmAction === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {confirmAction === "approve" ? "Setujui" : "Tolak"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CancellationRequests;

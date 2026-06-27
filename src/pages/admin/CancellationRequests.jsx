import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";

function CancellationRequests() {
  const { cancellationList, confirmCancellation } = useAppData();
  const [showConfirm, setShowConfirm] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const pendingCancellations = cancellationList.filter(
    (c) => c.status === "Menunggu Konfirmasi"
  );

  const handleAction = async (cancellation, action) => {
    setLoading(true);
    try {
      await confirmCancellation(cancellation.id, action);
      setShowConfirm(null);
      alert(action === "setujui" ? "Pembatalan disetujui." : "Pembatalan ditolak.");
    } catch {
      alert("Gagal memproses pembatalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {pendingCancellations.length === 0 ? (
        <div className="rounded-lg bg-white py-12 text-center">
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
                <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  Menunggu Konfirmasi
                </span>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Lapangan</p>
                  <p className="mt-2 font-semibold text-brand-dark">{item.fieldName}</p>
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
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Alasan Pembatalan</p>
                <p className="mt-2 font-semibold text-brand-dark">{item.reason}</p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirm(item.id);
                    setConfirmAction("setujui");
                  }}
                  className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white transition-all hover:bg-green-700"
                >
                  ✓ Setujui Pembatalan
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(item.id);
                    setConfirmAction("tolak");
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

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-brand-dark">
              {confirmAction === "setujui" ? "Setujui Pembatalan?" : "Tolak Pembatalan?"}
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              {confirmAction === "setujui"
                ? "Booking akan diubah status menjadi 'Dibatalkan'."
                : "Booking akan tetap aktif dan pembatalan ditolak."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 font-semibold text-gray-700"
                disabled={loading}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const cancellation = pendingCancellations.find((c) => c.id === showConfirm);
                  if (cancellation) handleAction(cancellation, confirmAction);
                }}
                disabled={loading}
                className={`flex-1 rounded-lg py-2 font-semibold text-white ${
                  confirmAction === "setujui" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {loading ? "Memproses..." : confirmAction === "setujui" ? "Setujui" : "Tolak"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CancellationRequests;

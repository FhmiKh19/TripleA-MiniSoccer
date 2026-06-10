import { useState } from "react";
import Modal from "../../ui/Modal";
import { formatRupiah } from "../../../data/seeder";

function CancellationModal({ open, onClose, booking, onSubmit }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Alasan pembatalan wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      onSubmit(reason.trim());
      setLoading(false);
      setReason("");
      handleClose();
    }, 500);
  };

  if (!booking) return null;

  return (
    <Modal open={open} onClose={handleClose} title="Ajukan Pembatalan" size="md">
      <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
        DP yang sudah dibayarkan tidak dapat dikembalikan. Pengajuan akan ditinjau admin.
      </div>

      <div className="mb-4 space-y-1 rounded-xl border border-brand-border bg-brand-card p-4 text-sm">
        <p className="font-bold text-brand-gold">{booking.bookingCode}</p>
        <p className="text-gray-400">
          {booking.fieldName} • {booking.date} • {booking.startTime} - {booking.endTime}
        </p>
        <p className="text-gray-400">DP: {formatRupiah(booking.downPayment)}</p>
      </div>

      <label className="mb-1 block text-sm font-medium text-gray-300">
        Alasan Pembatalan <span className="text-red-400">*</span>
      </label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={4}
        placeholder="Tuliskan alasan pembatalan Anda..."
        className="premium-input resize-none"
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={handleClose} className="btn-dark flex-1" disabled={loading}>
          Batal
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </div>
    </Modal>
  );
}

export default CancellationModal;

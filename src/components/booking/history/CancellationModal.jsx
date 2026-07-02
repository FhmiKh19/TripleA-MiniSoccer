import { useState } from "react";
import Modal from "../../ui/Modal";
import { formatRupiah } from "../../../data/seeder";

function CancellationModal({ open, onClose, booking, onSubmit }) {
  const [reason,  setReason]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleClose = () => { setReason(""); setError(""); onClose(); };

  const handleSubmit = () => {
    if (!reason.trim() || reason.trim().length < 10) {
      setError("Alasan pembatalan minimal 10 karakter.");
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
    <Modal
      open={open}
      onClose={handleClose}
      title="Ajukan Pembatalan"
      size="md"
      footer={
        <div className="space-y-3">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-fade-in">
              <span>⚠</span> {error}
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={handleClose} disabled={loading} className="btn-ghost flex-1">
              Tutup
            </button>
            <button type="button" onClick={handleSubmit} disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200 disabled:opacity-60"
              style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#F87171" }}>
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" /> Mengirim...</>
              ) : "Kirim Pengajuan"}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Warning */}
        <div className="flex gap-3 rounded-2xl p-4"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-300">
            DP yang sudah dibayarkan <strong>tidak dapat dikembalikan</strong>. Pengajuan akan ditinjau oleh admin.
          </p>
        </div>

        {/* Booking summary */}
        <div className="rounded-2xl p-4 space-y-2"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-mono font-bold text-brand-gold">{booking.bookingCode}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>🏟️ {booking.fieldName}</span>
            <span>📅 {booking.date}</span>
            <span>⏰ {booking.startTime} – {booking.endTime}</span>
            <span>💳 DP: <strong className="text-white">{formatRupiah(booking.downPayment)}</strong></span>
          </div>
        </div>

        {/* Reason textarea */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Alasan Pembatalan <span className="text-red-400">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Tuliskan alasan pembatalan Anda (minimal 10 karakter)..."
            className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#F87171"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(248,113,113,0.1)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <div className="mt-1 flex justify-end">
            <span className={`text-xs ${reason.length < 10 ? "text-slate-600" : "text-emerald-400"}`}>
              {reason.length} karakter
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CancellationModal;

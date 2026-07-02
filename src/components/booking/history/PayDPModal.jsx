import { useState } from "react";
import Modal from "../../ui/Modal";
import PaymentMethodPicker, { getPaymentMethodLabel } from "../PaymentMethodPicker";
import PaymentAccountDetails from "../PaymentAccountDetails";
import { formatRupiah } from "../../../data/seeder";
import { DP_PERCENTAGE } from "../../../utils/bookingHelpers";
import { DP_PAYMENT_NOTE, paymentAccounts } from "../../../constants/paymentAccounts";
import { apiPaymentUpload } from "../../../services/api";

function PayDPModal({ open, onClose, booking, onConfirm }) {
  const [selectedMethod, setSelectedMethod] = useState(paymentAccounts[0].id);
  const [proofFile,      setProofFile]      = useState(null);
  const [proofPreview,   setProofPreview]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  if (!booking) return null;

  const dpAmount = booking.downPayment || booking.totalPrice * DP_PERCENTAGE;

  const handleClose = () => {
    setSuccess(false);
    setProofFile(null);
    setProofPreview(null);
    setError("");
    setSelectedMethod(paymentAccounts[0].id);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProofFile(file);
    setProofPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) { setProofFile(file); setProofPreview(URL.createObjectURL(file)); }
  };

  const handleConfirm = async () => {
    if (!proofFile) { setError("Upload bukti pembayaran terlebih dahulu."); return; }
    setLoading(true);
    setError("");
    try {
      await apiPaymentUpload(booking.id, proofFile);
      await onConfirm({
        paymentMethod: getPaymentMethodLabel(selectedMethod),
        paymentStatus: "Menunggu Verifikasi DP",
      });
      setSuccess(true);
    } catch {
      setError("Gagal mengunggah bukti pembayaran. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── SUCCESS STATE ─── */
  if (success) {
    return (
      <Modal open={open} onClose={handleClose} title="Pembayaran Terkirim" size="md"
        footer={
          <button type="button" onClick={handleClose} className="btn-gold w-full py-3.5 font-bold">
            Oke, Tutup →
          </button>
        }
      >
        <div className="py-2 text-center">
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full text-4xl"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)" }}>
              ✓
            </div>
          </div>
          <h4 className="text-xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Bukti Terkirim! 🎉
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            DP <span className="font-bold text-brand-gold">{formatRupiah(dpAmount)}</span> via{" "}
            <strong className="text-white">{getPaymentMethodLabel(selectedMethod)}</strong>{" "}
            sedang menunggu verifikasi admin.
          </p>
          <div className="mt-4 rounded-2xl p-4"
            style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <p className="text-xs text-slate-400">
              Admin akan memverifikasi dalam <strong className="text-white">1×24 jam</strong>.
              Pantau status di halaman <strong className="text-white">Riwayat Reservasi</strong>.
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  /* ─── FORM STATE ─── */
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Bayar DP 50%"
      size="lg"
      footer={
        <div className="space-y-3">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-fade-in">
              <span>⚠</span> {error}
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={handleClose} disabled={loading} className="btn-ghost flex-1">
              Batal
            </button>
            <button type="button" onClick={handleConfirm} disabled={loading}
              className="btn-gold flex-[2] py-3.5 font-bold disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                  Mengunggah...
                </span>
              ) : "📤 Kirim Bukti Pembayaran"}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">

        {/* Important note */}
        <div className="flex gap-3 rounded-2xl p-4"
          style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.18)" }}>
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-brand-gold">Catatan Penting</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{DP_PAYMENT_NOTE}</p>
          </div>
        </div>

        {/* DP amount card */}
        <div className="relative overflow-hidden rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(240,165,0,0.15)" }}>
          <div className="absolute right-4 top-4 text-5xl opacity-[0.07]">💳</div>
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nomor Reservasi</p>
            <p className="mt-1 font-mono font-bold text-brand-gold">{booking.bookingCode}</p>
            <p className="mt-4 text-4xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
              {formatRupiah(dpAmount)}
            </p>
            <p className="mt-1 text-xs text-slate-500">Nominal DP 50% yang harus ditransfer</p>
          </div>
        </div>

        {/* Payment method label */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Pilih Metode Pembayaran
          </p>
          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            dpAmount={dpAmount}
            dark
          />
        </div>

        {/* Account details */}
        <div className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <PaymentAccountDetails accountId={selectedMethod} dark />
        </div>

        {/* Upload proof */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Upload Bukti Pembayaran
          </p>
          <label
            className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl p-6 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(255,255,255,0.08)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {proofPreview ? (
              <div className="w-full">
                <img src={proofPreview} alt="Preview bukti" className="mx-auto max-h-44 rounded-xl object-contain" />
                <p className="mt-3 text-center text-xs text-slate-400">{proofFile?.name}</p>
                <p className="mt-1 text-center text-xs text-brand-gold">Klik untuk ganti foto</p>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: "rgba(240,165,0,0.08)", border: "1px solid rgba(240,165,0,0.15)" }}>
                  📎
                </div>
                <p className="mt-3 text-sm font-semibold text-white">Drag & drop atau klik untuk upload</p>
                <p className="mt-1 text-xs text-slate-500">Format: JPG, PNG, WEBP · Maks 5MB</p>
              </>
            )}
          </label>
        </div>
      </div>
    </Modal>
  );
}

export default PayDPModal;

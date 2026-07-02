import { useState } from "react";
import Modal from "../ui/Modal";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";
import { DP_PAYMENT_NOTE } from "../../constants/paymentAccounts";

function CheckoutModal({ open, onClose, bookingData }) {
  const { createBooking, fieldList } = useAppData();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!bookingData) return null;

  const { selectedFieldId, selectedDate, selectedSlot, totalPrice, downPayment, remainingPayment } =
    bookingData;

  const fieldName = fieldList.find((f) => f.id === selectedFieldId)?.name || "-";

  const handleConfirm = async () => {
    setIsProcessing(true);
    setError("");
    try {
      await createBooking({
        fieldId: selectedFieldId,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        duration: 1,
        totalPrice,
      });
      setSuccess(true);
    } catch {
      setError("Gagal membuat reservasi. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    onClose();
  };

  /* ─── SUCCESS STATE ─── */
  if (success) {
    return (
      <Modal open={open} onClose={handleClose} title="Reservasi Berhasil" size="md"
        footer={
          <button type="button" onClick={handleClose} className="btn-gold w-full py-3.5 font-bold">
            Oke, Mengerti →
          </button>
        }
      >
        <div className="py-2 text-center">
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full text-4xl"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)" }}>
              🎉
            </div>
          </div>
          <h4 className="text-xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Reservasi Berhasil Dibuat!
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Silakan bayar DP{" "}
            <span className="font-bold text-brand-gold">{formatRupiah(downPayment)}</span>{" "}
            melalui e-wallet atau transfer bank, lalu upload bukti di halaman{" "}
            <strong className="text-white">Riwayat Reservasi</strong>.
          </p>

          <div className="mt-5 rounded-2xl p-4 text-left space-y-2.5"
            style={{ background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.15)" }}>
            {[
              { label: "Lapangan", value: fieldName },
              { label: "Jadwal",   value: `${selectedDate} · ${selectedSlot?.startTime}–${selectedSlot?.endTime}` },
              { label: "DP yang harus dibayar", value: formatRupiah(downPayment), highlight: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.label}</span>
                <span className={`font-semibold ${item.highlight ? "text-brand-gold font-black" : "text-white"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }

  /* ─── CONFIRM STATE ─── */
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Konfirmasi Reservasi"
      size="md"
      footer={
        <div className="space-y-3">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-fade-in">
              <span>⚠</span> {error}
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={handleClose} disabled={isProcessing} className="btn-ghost flex-1">
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isProcessing}
              className="btn-gold flex-[2] py-3.5 font-bold disabled:opacity-60"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                  Memproses...
                </span>
              ) : "⚡ Konfirmasi Reservasi"}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Warning note */}
        <div className="flex gap-3 rounded-2xl p-4"
          style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.2)" }}>
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-brand-gold">Catatan Sebelum Pembayaran DP 50%</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{DP_PAYMENT_NOTE}</p>
          </div>
        </div>

        {/* DP amount card */}
        <div className="relative overflow-hidden rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(240,165,0,0.15)" }}>
          <div className="absolute right-4 top-4 text-5xl opacity-[0.08]">💰</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            DP 50% untuk mengamankan jadwal
          </p>
          <p className="mt-2 text-4xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
            {formatRupiah(downPayment)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatRupiah(totalPrice)} × 50% = {formatRupiah(downPayment)}
          </p>
        </div>

        {/* Booking summary */}
        <div className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { label: "Lapangan",       value: fieldName },
            { label: "Jadwal",         value: `${selectedDate} · ${selectedSlot?.startTime} – ${selectedSlot?.endTime}` },
            { label: "Sisa pelunasan", value: formatRupiah(remainingPayment), highlight: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{item.label}</span>
              <span className={`font-semibold ${item.highlight ? "text-brand-gold" : "text-white"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default CheckoutModal;

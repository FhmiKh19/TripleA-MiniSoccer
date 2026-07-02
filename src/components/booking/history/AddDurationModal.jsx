import { useMemo, useState } from "react";
import Modal from "../../ui/Modal";
import PaymentMethodPicker, { getPaymentMethodLabel } from "../PaymentMethodPicker";
import PaymentAccountDetails from "../PaymentAccountDetails";
import { useAppData } from "../../../context/AppDataContext";
import { formatRupiah } from "../../../data/seeder";
import { DP_PERCENTAGE } from "../../../utils/bookingHelpers";
import { getConsecutiveSlotsAfter } from "../../../utils/slotHelpers";
import { paymentAccounts } from "../../../constants/paymentAccounts";

function AddDurationModal({ open, onClose, booking, onConfirm }) {
  const { slotList } = useAppData();
  const [extraHours,     setExtraHours]     = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(paymentAccounts[0].id);
  const [step,    setStep]    = useState("select");
  const [loading, setLoading] = useState(false);

  const consecutiveSlots = useMemo(
    () => (booking ? getConsecutiveSlotsAfter(slotList, booking, 5) : []),
    [slotList, booking]
  );

  const selectedSlots = consecutiveSlots.slice(0, extraHours);
  const extraTotal    = selectedSlots.reduce((sum, s) => sum + s.price, 0);
  const extraDP       = extraTotal * DP_PERCENTAGE;

  const handleClose = () => {
    setExtraHours(1);
    setStep("select");
    setSelectedMethod(paymentAccounts[0].id);
    onClose();
  };

  const handleConfirm = async () => {
    if (selectedSlots.length === 0) return;
    setLoading(true);
    try {
      await onConfirm({ extraHours, extraTotal, extraDP, paymentMethod: getPaymentMethodLabel(selectedMethod) });
      setStep("success");
    } catch {
      alert("Gagal menambah durasi.");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  /* ── SUCCESS ── */
  if (step === "success") {
    return (
      <Modal open={open} onClose={handleClose} title="Durasi Ditambahkan" size="md"
        footer={<button type="button" onClick={handleClose} className="btn-gold w-full py-3.5 font-bold">Tutup →</button>}>
        <div className="py-2 text-center">
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full text-4xl"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)" }}>✓</div>
          </div>
          <h4 className="text-xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>Durasi Berhasil Ditambahkan!</h4>
          <p className="mt-2 text-sm text-slate-400">
            +{extraHours} jam · DP tambahan{" "}
            <span className="font-bold text-brand-gold">{formatRupiah(extraDP)}</span> menunggu verifikasi.
          </p>
        </div>
      </Modal>
    );
  }

  /* ── NO SLOTS ── */
  if (consecutiveSlots.length === 0) {
    return (
      <Modal open={open} onClose={handleClose} title="Tambah Durasi" size="md"
        footer={<button type="button" onClick={handleClose} className="btn-ghost w-full">Tutup</button>}>
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-4 text-4xl opacity-40">🕐</div>
          <p className="text-sm font-semibold text-white">Slot tidak tersedia</p>
          <p className="mt-1 text-xs text-slate-500">
            Tidak ada slot berurutan yang tersedia setelah jam {booking.endTime}.
          </p>
        </div>
      </Modal>
    );
  }

  /* ── SELECT STEP ── */
  if (step === "select") {
    return (
      <Modal open={open} onClose={handleClose} title="Tambah Durasi" size="md"
        footer={
          <button type="button" onClick={() => setStep("payment")} disabled={selectedSlots.length === 0}
            className="btn-gold w-full py-3.5 font-bold disabled:opacity-50">
            Lanjut ke Pembayaran DP →
          </button>
        }
      >
        <div className="space-y-4">
          {/* Current booking info */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs text-slate-500">Jadwal saat ini</p>
            <p className="mt-1 font-mono font-bold text-brand-gold">{booking.bookingCode}</p>
            <p className="text-sm text-white mt-1">{booking.startTime} – {booking.endTime} ({booking.duration} jam)</p>
          </div>

          {/* Hour selector */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Pilih Tambahan Durasi</p>
            <div className="flex flex-wrap gap-2">
              {consecutiveSlots.map((slot, idx) => {
                const hours    = idx + 1;
                const isActive = extraHours === hours;
                return (
                  <button key={slot.id} type="button" onClick={() => setExtraHours(hours)}
                    className="flex flex-col items-center rounded-xl px-4 py-3 transition-all duration-200"
                    style={{
                      background: isActive ? "linear-gradient(135deg, rgba(240,165,0,0.2), rgba(240,165,0,0.06))" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? "rgba(240,165,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: isActive ? "#F0A500" : "#64748B",
                    }}>
                    <span className="text-sm font-black">+{hours}j</span>
                    <span className="text-[10px] mt-0.5">
                      {slot.startTime}–{consecutiveSlots[hours - 1]?.endTime || slot.endTime}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DP info */}
          <div className="rounded-2xl p-4"
            style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(240,165,0,0.15)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">DP 50% tambahan</p>
                <p className="mt-1 text-2xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  {formatRupiah(extraDP)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Total tambahan</p>
                <p className="mt-1 text-sm font-semibold text-white">{formatRupiah(extraTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  /* ── PAYMENT STEP ── */
  return (
    <Modal open={open} onClose={handleClose} title="Pilih Metode Pembayaran" size="lg"
      footer={
        <div className="flex gap-3">
          <button type="button" onClick={() => setStep("select")} className="btn-ghost flex-1">← Kembali</button>
          <button type="button" onClick={handleConfirm} disabled={loading}
            className="btn-gold flex-[2] py-3.5 font-bold disabled:opacity-60">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                Memproses...
              </span>
            ) : "⚡ Konfirmasi & Bayar DP"}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl p-4 text-center"
          style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(240,165,0,0.15)" }}>
          <p className="text-xs text-slate-500">DP Tambahan yang Harus Dibayar</p>
          <p className="mt-1 text-3xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
            {formatRupiah(extraDP)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">+{extraHours} jam · {formatRupiah(extraTotal)} × 50%</p>
        </div>
        <PaymentMethodPicker selectedMethod={selectedMethod} onSelect={setSelectedMethod} dpAmount={extraDP} dark />
        <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <PaymentAccountDetails accountId={selectedMethod} dark />
        </div>
      </div>
    </Modal>
  );
}

export default AddDurationModal;

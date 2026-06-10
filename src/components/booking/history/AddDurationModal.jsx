import { useMemo, useState } from "react";
import Modal from "../../ui/Modal";
import PaymentMethodPicker, {
  getPaymentMethodLabel,
  mockPaymentMethods,
} from "../PaymentMethodPicker";
import { useAppData } from "../../../context/AppDataContext";
import { formatRupiah } from "../../../data/seeder";
import { DP_PERCENTAGE } from "../../../utils/bookingHelpers";
import { getConsecutiveAvailableSlots } from "../../../utils/reservationStatus";

function AddDurationModal({ open, onClose, booking, onConfirm }) {
  const { slotList } = useAppData();
  const [extraHours, setExtraHours] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(mockPaymentMethods[0].id);
  const [step, setStep] = useState("select");
  const [loading, setLoading] = useState(false);

  const consecutiveSlots = useMemo(
    () => (booking ? getConsecutiveAvailableSlots(slotList, booking) : []),
    [slotList, booking]
  );

  const selectedSlots = consecutiveSlots.slice(0, extraHours);
  const extraTotal = selectedSlots.reduce((sum, s) => sum + s.price, 0);
  const extraDP = extraTotal * DP_PERCENTAGE;

  const handleClose = () => {
    setExtraHours(1);
    setStep("select");
    setSelectedMethod(mockPaymentMethods[0].id);
    onClose();
  };

  const handleConfirm = () => {
    if (selectedSlots.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      onConfirm({
        extraSlots: selectedSlots,
        extraTotal,
        extraDP,
        paymentMethod: getPaymentMethodLabel(selectedMethod),
      });
      setLoading(false);
      setStep("success");
    }, 700);
  };

  if (!booking) return null;

  return (
    <Modal open={open} onClose={handleClose} title="Tambah Durasi" size="lg">
      {step === "success" ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl text-green-400">
            ✓
          </div>
          <h4 className="text-lg font-bold text-brand-gold">Durasi Berhasil Ditambahkan</h4>
          <p className="mt-2 text-sm text-gray-400">
            +{extraHours} jam • DP {formatRupiah(extraDP)} menunggu verifikasi.
          </p>
          <button type="button" onClick={handleClose} className="btn-gold mt-6 w-full">
            Tutup
          </button>
        </div>
      ) : consecutiveSlots.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400">
            Tidak ada slot berurutan yang tersedia setelah {booking.endTime}.
          </p>
          <button type="button" onClick={handleClose} className="btn-gold mt-6 w-full">
            Tutup
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-400">
            Reservasi saat ini: {booking.startTime} - {booking.endTime} ({booking.duration} jam)
          </p>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Tambah Durasi (jam berurutan)
          </label>
          <div className="mb-4 flex flex-wrap gap-2">
            {consecutiveSlots.map((slot, idx) => {
              const hours = idx + 1;
              const isSelected = extraHours === hours;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setExtraHours(hours)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-brand-gold bg-brand-gold text-brand-dark"
                      : "border-brand-border text-gray-400 hover:border-brand-gold"
                  }`}
                >
                  +{hours}j ({slot.startTime}-{consecutiveSlots[hours - 1]?.endTime || slot.endTime})
                </button>
              );
            })}
          </div>

          <div className="mb-4 rounded-xl border border-brand-border bg-brand-card p-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Slot tambahan</span>
              <span className="text-white">
                {selectedSlots.map((s) => s.startTime).join(", ")}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-gray-400">
              <span>Total tambahan</span>
              <span className="text-brand-gold">{formatRupiah(extraTotal)}</span>
            </div>
            <div className="mt-2 flex justify-between font-semibold text-white">
              <span>DP 50% tambahan</span>
              <span className="text-brand-gold">{formatRupiah(extraDP)}</span>
            </div>
          </div>

          {step === "select" ? (
            <button
              type="button"
              onClick={() => setStep("payment")}
              disabled={selectedSlots.length === 0}
              className="btn-gold w-full disabled:opacity-50"
            >
              Lanjut ke Pembayaran DP
            </button>
          ) : (
            <>
              <PaymentMethodPicker
                selectedMethod={selectedMethod}
                onSelect={setSelectedMethod}
                dpAmount={extraDP}
                dark
              />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => setStep("select")} className="btn-dark flex-1">
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="btn-gold flex-1 disabled:opacity-60"
                >
                  {loading ? "Memproses..." : "Konfirmasi & Bayar DP"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
}

export default AddDurationModal;

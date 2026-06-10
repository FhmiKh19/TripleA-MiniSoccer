import { useState } from "react";
import Modal from "../ui/Modal";
import PaymentMethodPicker, { getPaymentMethodLabel, mockPaymentMethods } from "./PaymentMethodPicker";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { fields, formatRupiah } from "../../data/seeder";
import { buildBookingPayload } from "../../utils/bookingHelpers";

function CheckoutModal({ open, onClose, bookingData }) {
  const { addBooking, blockSlot } = useAppData();
  const { currentUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(mockPaymentMethods[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!bookingData) return null;

  const { selectedFieldId, selectedDate, selectedSlot, selectedServices, totalPrice, downPayment, remainingPayment } =
    bookingData;

  const fieldName = fields.find((f) => f.id === selectedFieldId)?.name || "-";

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const payload = buildBookingPayload({
        selectedFieldId,
        selectedDate,
        selectedSlot,
        selectedServices,
        totalPrice,
        downPayment,
        remainingPayment,
        paymentMethod: getPaymentMethodLabel(selectedMethod),
        user: currentUser,
      });
      addBooking(payload);
      if (selectedSlot?.id) blockSlot(selectedSlot.id);
      setSuccess(true);
      setIsProcessing(false);
    }, 800);
  };

  const handleClose = () => {
    setSuccess(false);
    setSelectedMethod(mockPaymentMethods[0].id);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Checkout Pembayaran DP" size="lg">
      {success ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl">
            ✓
          </div>
          <h4 className="text-xl font-bold text-brand-gold">
            Pembayaran Berhasil & Jadwal Berhasil Diamankan
          </h4>
          <p className="mt-2 text-sm text-gray-400">
            DP {formatRupiah(downPayment)} via {getPaymentMethodLabel(selectedMethod)} sedang diverifikasi admin.
          </p>
          <button type="button" onClick={handleClose} className="btn-gold mt-6 w-full">
            Tutup
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5 rounded-xl bg-brand-dark p-5">
            <p className="text-sm text-gray-400">DP 50% untuk mengamankan jadwal</p>
            <p className="mt-1 text-3xl font-black text-brand-gold">{formatRupiah(downPayment)}</p>
            <p className="mt-2 text-xs text-gray-500">
              {formatRupiah(totalPrice)} × 50% = {formatRupiah(downPayment)}
            </p>
          </div>

          <div className="mb-5 space-y-2 rounded-xl border border-brand-border bg-brand-card p-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Lapangan</span>
              <span className="text-white">{fieldName}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Jadwal</span>
              <span className="text-white">
                {selectedDate} • {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Sisa pelunasan</span>
              <span className="text-brand-gold">{formatRupiah(remainingPayment)}</span>
            </div>
          </div>

          <p className="mb-3 text-sm font-semibold text-white">Pilih Metode Pembayaran</p>
          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            dpAmount={downPayment}
            dark
          />

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={handleClose} className="btn-dark flex-1" disabled={isProcessing}>
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isProcessing}
              className="btn-gold flex-1 disabled:opacity-60"
            >
              {isProcessing ? "Memproses..." : "Konfirmasi Pembayaran"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default CheckoutModal;

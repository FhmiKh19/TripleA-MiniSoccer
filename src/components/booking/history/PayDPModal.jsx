import { useMemo, useState } from "react";
import Modal from "../../ui/Modal";
import PaymentMethodPicker, {
  getPaymentMethodLabel,
  mockPaymentMethods,
} from "../PaymentMethodPicker";
import { formatRupiah } from "../../../data/seeder";
import { DP_PERCENTAGE } from "../../../utils/bookingHelpers";
import { apiPaymentUpload } from "../../../services/api";

function PayDPModal({ open, onClose, booking, onConfirm }) {
  const [selectedMethod, setSelectedMethod] = useState(mockPaymentMethods[0].id);
  const [proofFile, setProofFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!booking) return null;

  const dpAmount = booking.downPayment || booking.totalPrice * DP_PERCENTAGE;

  const handleClose = () => {
    setSuccess(false);
    setProofFile(null);
    setError("");
    setSelectedMethod(mockPaymentMethods[0].id);
    onClose();
  };

  const handleConfirm = async () => {
    if (!proofFile) {
      setError("Upload bukti pembayaran terlebih dahulu.");
      return;
    }
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
      setError("Gagal mengunggah bukti pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Bayar DP 50%" size="lg">
      {success ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl text-green-400">
            ✓
          </div>
          <h4 className="text-lg font-bold text-brand-gold">Bukti Pembayaran Berhasil Diunggah</h4>
          <p className="mt-2 text-sm text-gray-400">
            DP {formatRupiah(dpAmount)} via {getPaymentMethodLabel(selectedMethod)} menunggu verifikasi admin.
          </p>
          <button type="button" onClick={handleClose} className="btn-gold mt-6 w-full">
            Tutup
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 rounded-xl bg-brand-dark p-5">
            <p className="text-sm text-gray-400">Nomor Reservasi</p>
            <p className="font-bold text-brand-gold">{booking.bookingCode}</p>
            <p className="mt-3 text-3xl font-black text-brand-gold">{formatRupiah(dpAmount)}</p>
          </div>

          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            dpAmount={dpAmount}
            dark
          />

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Upload Bukti Pembayaran
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border border-brand-border bg-brand-card p-2 text-sm text-gray-300"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleClose} className="btn-dark flex-1" disabled={loading}>
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="btn-gold flex-1 disabled:opacity-60"
            >
              {loading ? "Mengunggah..." : "Konfirmasi Pembayaran"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default PayDPModal;

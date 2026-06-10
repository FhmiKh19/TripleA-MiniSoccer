import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentMethodPicker, {
  getPaymentMethodLabel,
  mockPaymentMethods,
} from "../../components/booking/PaymentMethodPicker";
import PaymentStatusCard from "../../components/booking/PaymentStatusCard";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { fields, formatRupiah } from "../../data/seeder";
import { buildBookingPayload } from "../../utils/bookingHelpers";

function PaymentMock() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useAppData();
  const { currentUser } = useAuth();

  const booking = location.state?.booking || null;

  const [selectedMethod, setSelectedMethod] = useState(mockPaymentMethods[0].id);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Belum dikonfirmasi");

  const totalPrice = booking?.totalPrice || 0;
  const dpAmount = useMemo(() => totalPrice * 0.5, [totalPrice]);
  const methodLabel = getPaymentMethodLabel(selectedMethod);

  const fieldName =
    fields.find((f) => f.id === booking?.selectedFieldId)?.name ||
    booking?.selectedSlot?.fieldName ||
    "-";

  useEffect(() => {
    if (!booking) {
      setPaymentStatus("Data booking tidak ditemukan. Silakan mulai dari awal.");
    }
  }, [booking]);

  const handleConfirm = () => {
    if (!booking || paymentDone) return;

    setIsConfirming(true);
    setTimeout(() => {
      const payload = buildBookingPayload({
        ...booking,
        paymentMethod: methodLabel,
        user: currentUser,
      });
      addBooking(payload);
      setPaymentDone(true);
      setPaymentStatus("Pembayaran Berhasil & Jadwal Berhasil Diamankan");
      setIsConfirming(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Pembayaran DP (Mockup)</h1>
        <p className="mt-1 text-sm text-gray-500">
          Konfirmasi pembayaran DP 50% untuk mengamankan jadwal.
        </p>
      </div>

      {!booking ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-bold text-red-700">Data booking tidak ditemukan</p>
          <p className="mt-2 text-sm text-red-600">{paymentStatus}</p>
          <button
            type="button"
            onClick={() => navigate("/customer/booking-form")}
            className="mt-4 rounded-lg bg-brand-gold px-6 py-2.5 font-bold text-brand-dark transition-all hover:bg-brand-goldLight"
          >
            Mulai Pemesanan
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-5 rounded-xl bg-brand-dark p-5 text-white">
              <p className="text-sm text-gray-300">Nominal DP yang harus dibayar</p>
              <p className="mt-1 text-3xl font-black text-brand-gold">{formatRupiah(dpAmount)}</p>
              <p className="mt-2 text-xs text-gray-400">
                {formatRupiah(totalPrice)} × 50% = {formatRupiah(dpAmount)}
              </p>
            </div>

            <div className="mb-5">
              <h2 className="text-lg font-bold text-brand-dark">Pilih Metode Pembayaran</h2>
              <p className="mt-1 text-sm text-gray-500">
                Simulasi E-Wallet & transfer bank (tanpa proses sungguhan).
              </p>
            </div>

            <PaymentMethodPicker
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
              dpAmount={dpAmount}
            />

            <div className="mt-5 rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-5">
              <p className="text-sm text-gray-600">Metode yang dipilih</p>
              <p className="mt-2 text-lg font-bold text-brand-dark">{methodLabel}</p>
              <p className="mt-1 text-xs text-gray-500">
                Setelah konfirmasi, status akan berubah dan jadwal diamankan.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-brand-dark transition-all hover:border-brand-gold"
                disabled={isConfirming || paymentDone}
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isConfirming || paymentDone}
                className={`rounded-lg px-6 py-2.5 font-bold transition-all ${
                  isConfirming || paymentDone
                    ? "cursor-not-allowed bg-brand-dark text-white opacity-60"
                    : "bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark"
                }`}
              >
                {isConfirming ? "Memproses..." : "Konfirmasi Pembayaran"}
              </button>
            </div>

            {paymentDone && (
              <button
                type="button"
                onClick={() => navigate("/customer/history")}
                className="mt-4 w-full rounded-lg border border-brand-gold bg-brand-gold/10 py-2.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-gold hover:text-brand-dark"
              >
                Lihat Riwayat Booking
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-dark">Ringkasan</h2>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Lapangan</span>
                  <span className="font-semibold text-brand-dark">{fieldName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Harga</span>
                  <span className="font-bold text-brand-gold">{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DP (50%)</span>
                  <span className="font-bold text-brand-gold">{formatRupiah(dpAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jadwal</span>
                  <span className="font-semibold text-brand-dark">
                    {booking.selectedDate} • {booking.selectedSlot?.startTime} -{" "}
                    {booking.selectedSlot?.endTime}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-brand-gold/10 p-4 text-sm">
                <p className="font-bold text-brand-dark">Catatan</p>
                <p className="mt-1 text-gray-600">
                  DP 50% digunakan untuk mengamankan slot. (Simulasi)
                </p>
              </div>
            </div>

            <PaymentStatusCard isSuccess={paymentDone} statusMessage={paymentStatus} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMock;

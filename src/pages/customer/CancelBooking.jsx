import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";

function CancelBooking() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookingList, addCancellation, updateBooking } = useAppData();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Get bookings for current user with "Dikonfirmasi" status
  const userBookings = bookingList.filter(
    (b) => b.userId === currentUser?.id && b.bookingStatus === "Dikonfirmasi"
  );

  const selectedBooking = bookingList.find((b) => b.id === selectedBookingId);

  const handleCancelBooking = () => {
    if (!selectedBookingId) {
      alert("Pilih pesanan yang ingin dibatalkan terlebih dahulu.");
      return;
    }

    if (!reason.trim()) {
      alert("Alasan pembatalan harus diisi.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Add to cancellationList
      const cancellation = {
        id: Date.now(),
        bookingId: selectedBooking.id,
        bookingCode: selectedBooking.bookingCode,
        customerName: selectedBooking.customerName,
        phone: selectedBooking.phone,
        fieldName: selectedBooking.fieldName,
        date: selectedBooking.date,
        startTime: selectedBooking.startTime,
        endTime: selectedBooking.endTime,
        totalPrice: selectedBooking.totalPrice,
        downPayment: selectedBooking.downPayment,
        reason,
        cancelledBy: "Customer",
        cancelledAt: new Date().toLocaleString("id-ID"),
        refundStatus: "Tidak Ada Refund",
      };

      addCancellation(cancellation);

      // Update booking status
      updateBooking(selectedBooking.id, {
        bookingStatus: "Menunggu Konfirmasi Pembatalan",
      });

      setLoading(false);
      alert("Pengajuan pembatalan berhasil dikirim! Silakan tunggu konfirmasi dari admin.");
      navigate("/customer/history");
    }, 500);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">
        Ajukan Pembatalan Pesanan
      </h1>

      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div className="mx-auto w-fit text-3xl">⚠️</div>
        <h2 className="mt-4 text-xl font-bold text-brand-dark">
          Perhatian!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Pembatalan akan masuk ke antrian konfirmasi admin. DP yang sudah
          dibayarkan tidak dapat dikembalikan.
        </p>
      </div>

      {userBookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            Tidak ada pesanan yang dapat dibatalkan. Hanya pesanan dengan status
            "Dikonfirmasi" yang dapat dibatalkan.
          </p>
          <button
            onClick={() => navigate("/customer/history")}
            className="mt-4 rounded-lg bg-brand-gold px-6 py-2 font-semibold text-brand-dark transition-all hover:opacity-90"
          >
            Kembali ke Riwayat
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-semibold text-brand-dark">
              Pilih Pesanan untuk Dibatalkan
            </h3>
            <div className="space-y-3">
              {userBookings.map((booking) => (
                <label
                  key={booking.id}
                  className={`flex items-start gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    selectedBookingId === booking.id
                      ? "border-brand-gold bg-brand-gold/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="booking"
                    checked={selectedBookingId === booking.id}
                    onChange={() => setSelectedBookingId(booking.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-brand-gold">{booking.bookingCode}</p>
                    <p className="text-sm text-gray-600">
                      {booking.fieldName} • {booking.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-sm font-semibold text-brand-dark">
                      Total: {formatRupiah(booking.totalPrice)}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {selectedBooking && (
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-brand-dark">
                Detail Pesanan
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Transaksi</span>
                  <span className="font-semibold">
                    {selectedBooking.bookingCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lapangan</span>
                  <span className="font-semibold">
                    {selectedBooking.fieldName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jadwal</span>
                  <span className="font-semibold">
                    {selectedBooking.date} | {selectedBooking.startTime} -
                    {selectedBooking.endTime}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-600">Total Dibayar (DP)</span>
                  <span className="font-bold text-brand-gold">
                    {formatRupiah(selectedBooking.downPayment)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Alasan Pembatalan <span className="text-red-600">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tuliskan alasan pembatalan Anda di sini..."
              rows="4"
              className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <p className="mt-2 text-xs text-gray-500">
              Alasan pembatalan akan membantu kami meningkatkan layanan.
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/customer/history")}
                className="flex-1 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-brand-dark transition-colors hover:border-brand-gold"
              >
                Kembali
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={loading || !selectedBookingId}
                className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Ajukan Pembatalan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CancelBooking;

import Modal from "../../ui/Modal";
import StatusBadge from "../../ui/StatusBadge";
import { formatRupiah } from "../../../data/seeder";
import { getReservationStatus } from "../../../utils/reservationStatus";

function BookingDetailModal({ open, onClose, booking }) {
  if (!booking) return null;

  const reservationStatus = getReservationStatus(booking);

  return (
    <Modal open={open} onClose={onClose} title="Detail Reservasi" size="lg">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-lg font-bold text-brand-gold">{booking.bookingCode}</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={reservationStatus} />
            <StatusBadge status={booking.paymentStatus} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Lapangan", booking.fieldName],
            ["Tanggal", booking.date],
            ["Jam", `${booking.startTime} - ${booking.endTime}`],
            ["Durasi", `${booking.duration} Jam`],
            ["Metode Bayar", booking.paymentMethod || "-"],
            ["Dibuat", booking.createdAt || "-"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-brand-border bg-brand-card p-4">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-1 font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-brand-border bg-brand-dark p-4">
            <p className="text-xs text-gray-500">Total Harga</p>
            <p className="mt-1 font-bold text-brand-gold">{formatRupiah(booking.totalPrice)}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-dark p-4">
            <p className="text-xs text-gray-500">DP 50%</p>
            <p className="mt-1 font-bold text-brand-gold">{formatRupiah(booking.downPayment)}</p>
          </div>
          <div className="rounded-xl border border-brand-border bg-brand-dark p-4">
            <p className="text-xs text-gray-500">Sisa Pelunasan</p>
            <p className="mt-1 font-bold text-white">{formatRupiah(booking.remainingPayment)}</p>
          </div>
        </div>

        {booking.additionalServices?.length > 0 && (
          <div className="rounded-xl border border-brand-border bg-brand-card p-4">
            <p className="text-xs text-gray-500">Layanan Tambahan</p>
            <ul className="mt-2 space-y-1 text-sm text-white">
              {booking.additionalServices.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="button" onClick={onClose} className="btn-gold w-full">
          Tutup
        </button>
      </div>
    </Modal>
  );
}

export default BookingDetailModal;

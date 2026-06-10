import StatusBadge from "../../ui/StatusBadge";
import { formatRupiah } from "../../../data/seeder";
import {
  getReservationStatus,
  getReservationActions,
  RESERVATION_STATUS,
} from "../../../utils/reservationStatus";

function BookingHistoryCard({ booking, onPayDP, onAddDuration, onCancel, onDetail }) {
  const reservationStatus = getReservationStatus(booking);
  const actions = getReservationActions(booking);

  return (
    <article className="premium-card overflow-hidden transition-all hover:border-brand-gold/30">
      {/* Header — mobile friendly */}
      <div className="border-b border-brand-border p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-gray-500">No. Reservasi</p>
            <p className="text-base font-bold text-brand-gold sm:text-lg">{booking.bookingCode}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={reservationStatus} />
            <StatusBadge status={booking.paymentStatus} />
          </div>
        </div>
      </div>

      {/* Data grid — SKPL-KF-07 */}
      <div className="grid grid-cols-2 gap-px bg-brand-border sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Tanggal", value: booking.date },
          { label: "Jam", value: `${booking.startTime} - ${booking.endTime}` },
          { label: "Lapangan", value: booking.fieldName },
          { label: "Durasi", value: `${booking.duration} Jam` },
          { label: "Pembayaran", value: booking.paymentStatus },
          { label: "Reservasi", value: reservationStatus },
        ].map((item) => (
          <div key={item.label} className="bg-brand-card p-3 sm:p-4">
            <p className="text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
              {item.label}
            </p>
            <p className="mt-1 text-xs font-semibold text-white sm:text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Price summary */}
      <div className="flex flex-wrap gap-4 border-b border-brand-border px-4 py-3 text-xs sm:px-5 sm:text-sm">
        <span className="text-gray-400">
          Total: <strong className="text-brand-gold">{formatRupiah(booking.totalPrice)}</strong>
        </span>
        <span className="text-gray-400">
          DP: <strong className="text-white">{formatRupiah(booking.downPayment)}</strong>
        </span>
        <span className="text-gray-400">
          Sisa: <strong className="text-white">{formatRupiah(booking.remainingPayment)}</strong>
        </span>
      </div>

      {/* Cancellation pending notice */}
      {reservationStatus === RESERVATION_STATUS.CANCELLATION_PENDING && (
        <div className="border-b border-brand-border bg-amber-500/10 px-4 py-3 text-xs text-amber-400 sm:px-5 sm:text-sm">
          Pengajuan pembatalan sedang ditinjau admin. Tombol modifikasi dinonaktifkan.
        </div>
      )}

      {/* Action buttons — SKPL conditional logic */}
      <div className="flex flex-col gap-2 p-4 sm:flex-row sm:flex-wrap sm:p-5">
        {actions.showPayDP && (
          <button type="button" onClick={() => onPayDP(booking)} className="btn-gold flex-1 sm:flex-none">
            Bayar DP 50%
          </button>
        )}
        {actions.showAddDuration && (
          <button
            type="button"
            onClick={() => onAddDuration(booking)}
            className="flex-1 rounded-lg border border-brand-gold bg-brand-gold/10 px-4 py-2.5 text-sm font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark sm:flex-none"
          >
            Tambah Durasi
          </button>
        )}
        {actions.showCancel && (
          <button
            type="button"
            onClick={() => onCancel(booking)}
            className="flex-1 rounded-lg border border-red-500/50 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 sm:flex-none"
          >
            Ajukan Pembatalan
          </button>
        )}
        {actions.showDetail && (
          <button
            type="button"
            onClick={() => onDetail(booking)}
            className="btn-dark flex-1 sm:ml-auto sm:flex-none"
          >
            Lihat Detail
          </button>
        )}
      </div>
    </article>
  );
}

export default BookingHistoryCard;

import Modal from "../../ui/Modal";
import StatusBadge from "../../ui/StatusBadge";
import { formatRupiah } from "../../../data/seeder";
import { getReservationStatus } from "../../../utils/reservationStatus";

function BookingDetailModal({ open, onClose, booking }) {
  if (!booking) return null;

  const reservationStatus = getReservationStatus(booking);

  const infoItems = [
    { label: "Lapangan",     value: booking.fieldName,                              icon: "🏟️" },
    { label: "Tanggal",      value: booking.date,                                   icon: "📅" },
    { label: "Jam",          value: `${booking.startTime} – ${booking.endTime}`,    icon: "⏰" },
    { label: "Durasi",       value: `${booking.duration} Jam`,                      icon: "⏱️" },
    { label: "Metode Bayar", value: booking.paymentMethod || "-",                   icon: "💳" },
    { label: "Dibuat",       value: booking.createdAt || "-",                       icon: "📋" },
  ];

  const priceItems = [
    { label: "Total Harga",    value: formatRupiah(booking.totalPrice),      color: "#F0A500" },
    { label: "DP 50%",         value: formatRupiah(booking.downPayment),     color: "#F0A500" },
    { label: "Sisa Pelunasan", value: formatRupiah(booking.remainingPayment),color: "#E2E8F0" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detail Reservasi"
      size="lg"
      footer={
        <button type="button" onClick={onClose} className="btn-gold w-full py-3.5 font-bold">
          Tutup
        </button>
      }
    >
      <div className="space-y-4">
        {/* Header: code + badges */}
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4"
          style={{ background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.12)" }}>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">No. Reservasi</p>
            <p className="mt-1 font-mono text-xl font-black text-brand-gold">{booking.bookingCode}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={reservationStatus} />
            <StatusBadge status={booking.paymentStatus} />
          </div>
        </div>

        {/* Info grid */}
        <div className="grid gap-2 sm:grid-cols-2">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl p-3.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="text-base opacity-60">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">{item.label}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price cards */}
        <div className="grid gap-2 sm:grid-cols-3">
          {priceItems.map((item) => (
            <div key={item.label} className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="mt-1.5 text-base font-black" style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Additional services */}
        {booking.additionalServices?.length > 0 && (
          <div className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Layanan Tambahan</p>
            <div className="flex flex-wrap gap-2">
              {booking.additionalServices.map((s) => (
                <span key={s} className="badge-gold">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BookingDetailModal;

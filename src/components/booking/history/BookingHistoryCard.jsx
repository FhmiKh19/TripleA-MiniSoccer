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

  const fieldInitial = booking.fieldName?.charAt(0) || "L";

  return (
    <article
      className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg, #141B28 0%, #0F1520 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── HEADER ── */}
      <div
        className="flex items-start justify-between gap-4 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          {/* Field Avatar */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-black text-brand-dark"
            style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}
          >
            {fieldInitial}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">No. Reservasi</p>
            <p className="font-mono text-base font-bold text-brand-gold">{booking.bookingCode}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <StatusBadge status={reservationStatus} />
          <StatusBadge status={booking.paymentStatus} />
        </div>
      </div>

      {/* ── INFO GRID ── */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.03] sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Tanggal",    value: booking.date,                              icon: "📅" },
          { label: "Jam",        value: `${booking.startTime} – ${booking.endTime}`, icon: "⏰" },
          { label: "Lapangan",   value: booking.fieldName,                          icon: "🏟️" },
          { label: "Durasi",     value: `${booking.duration} Jam`,                  icon: "⏱️" },
          { label: "Pembayaran", value: booking.paymentStatus,                       icon: "💳", truncate: true },
          { label: "Reservasi",  value: reservationStatus,                           icon: "📋", truncate: true },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col px-4 py-3.5"
            style={{ background: "rgba(255,255,255,0.015)" }}
          >
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-600">
              {item.label}
            </p>
            <p className={`mt-1 text-xs font-semibold text-slate-200 ${item.truncate ? "truncate" : ""}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── PRICE ROW ── */}
      <div
        className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Total</span>
          <span className="font-black text-brand-gold text-sm">{formatRupiah(booking.totalPrice)}</span>
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-slate-500">DP</span>
          <span className="font-semibold text-white">{formatRupiah(booking.downPayment)}</span>
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Sisa</span>
          <span className="font-semibold text-slate-300">{formatRupiah(booking.remainingPayment)}</span>
        </div>
      </div>

      {/* Cancellation pending notice */}
      {reservationStatus === RESERVATION_STATUS.CANCELLATION_PENDING && (
        <div
          className="flex items-center gap-2 px-5 py-3 text-xs text-amber-400"
          style={{ background: "rgba(245,158,11,0.06)", borderBottom: "1px solid rgba(245,158,11,0.12)" }}
        >
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Pengajuan pembatalan sedang ditinjau admin. Tombol modifikasi dinonaktifkan.
        </div>
      )}

      {/* ── ACTIONS ── */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-4">
        {actions.showPayDP && (
          <button
            type="button"
            onClick={() => onPayDP(booking)}
            className="btn-gold px-5 py-2.5 text-xs font-bold"
          >
            💳 Bayar DP 50%
          </button>
        )}
        {actions.showAddDuration && (
          <button
            type="button"
            onClick={() => onAddDuration(booking)}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all duration-200"
            style={{ background: "rgba(240,165,0,0.08)", border: "1px solid rgba(240,165,0,0.2)", color: "#F0A500" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,165,0,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,165,0,0.08)"; }}
          >
            ⏱️ Tambah Durasi
          </button>
        )}
        {actions.showCancel && (
          <button
            type="button"
            onClick={() => onCancel(booking)}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-red-400 transition-all duration-200"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
          >
            ✕ Ajukan Pembatalan
          </button>
        )}
        {actions.showDetail && (
          <button
            type="button"
            onClick={() => onDetail(booking)}
            className="btn-ghost ml-auto px-5 py-2.5 text-xs"
          >
            Lihat Detail →
          </button>
        )}
      </div>
    </article>
  );
}

export default BookingHistoryCard;

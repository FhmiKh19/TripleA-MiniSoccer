import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import BookingHistoryCard from "../../components/booking/history/BookingHistoryCard";
import BookingDetailModal from "../../components/booking/history/BookingDetailModal";
import CancellationModal from "../../components/booking/history/CancellationModal";
import AddDurationModal from "../../components/booking/history/AddDurationModal";
import PayDPModal from "../../components/booking/history/PayDPModal";
import { FILTER_TABS, filterByReservationStatus } from "../../utils/reservationStatus";

function BookingHistory() {
  const { currentUser } = useAuth();
  const { bookingList, submitCancellation, extendBooking, refreshBookings } = useAppData();

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modal, setModal] = useState(null);

  const userBookings = useMemo(
    () =>
      bookingList
        .filter((b) => b.userId === currentUser?.id)
        .sort((a, b) => b.id - a.id),
    [bookingList, currentUser?.id]
  );

  const data = useMemo(
    () => filterByReservationStatus(userBookings, activeFilter),
    [userBookings, activeFilter]
  );

  const closeModal = () => { setModal(null); setSelectedBooking(null); };
  const openModal  = (type, booking) => { setSelectedBooking(booking); setModal(type); };

  const handleCancelSubmit = async (reason) => {
    if (!selectedBooking) return;
    try {
      await submitCancellation(selectedBooking.id, reason);
      await refreshBookings();
      closeModal();
    } catch {
      alert("Gagal mengajukan pembatalan. Pastikan alasan minimal 10 karakter.");
    }
  };

  const handlePayDP = async () => {
    await refreshBookings();
    closeModal();
  };

  const handleAddDuration = async ({ extraHours, extraTotal }) => {
    if (!selectedBooking || extraHours < 1) return;
    try {
      await extendBooking(selectedBooking.id, { extraHours, extraPrice: extraTotal });
      await refreshBookings();
      closeModal();
    } catch {
      alert("Gagal menambah durasi. Slot mungkin sudah terisi.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Customer</p>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Riwayat Reservasi
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">Kelola dan pantau semua reservasi Anda</p>
        </div>
        <div className="rounded-xl px-4 py-2 text-sm"
             style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.12)" }}>
          <span className="text-slate-400">Total reservasi: </span>
          <span className="font-bold text-brand-gold">{userBookings.length}</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {FILTER_TABS.map((status) => {
          const count = status === "Semua" ? userBookings.length : filterByReservationStatus(userBookings, status).length;
          const isActive = activeFilter === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setActiveFilter(status)}
              className="shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(240,165,0,0.15), rgba(240,165,0,0.05))"
                  : "rgba(255,255,255,0.04)",
                border: isActive ? "1px solid rgba(240,165,0,0.3)" : "1px solid rgba(255,255,255,0.06)",
                color: isActive ? "#F0A500" : "#64748B",
              }}
            >
              {status}
              {count > 0 && (
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black"
                  style={{
                    background: isActive ? "rgba(240,165,0,0.3)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#F0A500" : "#64748B",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {data.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)" }}
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
               style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.1)" }}>
            📋
          </div>
          <p className="text-base font-semibold text-white">Tidak ada reservasi</p>
          <p className="mt-1 text-sm text-slate-500">
            {activeFilter === "Semua"
              ? "Anda belum memiliki reservasi apapun."
              : `Tidak ada reservasi dengan filter "${activeFilter}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((booking) => (
            <BookingHistoryCard
              key={booking.id}
              booking={booking}
              onPayDP={(b) => openModal("pay", b)}
              onAddDuration={(b) => openModal("duration", b)}
              onCancel={(b) => openModal("cancel", b)}
              onDetail={(b) => openModal("detail", b)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <BookingDetailModal open={modal === "detail"} onClose={closeModal} booking={selectedBooking} />
      <CancellationModal  open={modal === "cancel"} onClose={closeModal} booking={selectedBooking} onSubmit={handleCancelSubmit} />
      <AddDurationModal   open={modal === "duration"} onClose={closeModal} booking={selectedBooking} onConfirm={handleAddDuration} />
      <PayDPModal         open={modal === "pay"} onClose={closeModal} booking={selectedBooking} onConfirm={handlePayDP} />
    </div>
  );
}

export default BookingHistory;

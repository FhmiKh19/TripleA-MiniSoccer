import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import PageHeader from "../../components/ui/PageHeader";
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

  const closeModal = () => {
    setModal(null);
    setSelectedBooking(null);
  };

  const openModal = (type, booking) => {
    setSelectedBooking(booking);
    setModal(type);
  };

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
      await extendBooking(selectedBooking.id, {
        extraHours,
        extraPrice: extraTotal,
      });
      await refreshBookings();
      closeModal();
    } catch {
      alert("Gagal menambah durasi. Slot mungkin sudah terisi.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Riwayat Reservasi"
        subtitle="SKPL-KF-07 — Kelola dan pantau semua reservasi Anda"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {FILTER_TABS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setActiveFilter(status)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
              activeFilter === status
                ? "bg-brand-gold text-brand-dark"
                : "bg-brand-card text-gray-400 hover:text-brand-gold"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="premium-card py-16 text-center">
          <p className="text-4xl">📋</p>
          <p className="mt-3 text-gray-400">Tidak ada reservasi dengan filter ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
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

      <BookingDetailModal open={modal === "detail"} onClose={closeModal} booking={selectedBooking} />

      <CancellationModal
        open={modal === "cancel"}
        onClose={closeModal}
        booking={selectedBooking}
        onSubmit={handleCancelSubmit}
      />

      <AddDurationModal
        open={modal === "duration"}
        onClose={closeModal}
        booking={selectedBooking}
        onConfirm={handleAddDuration}
      />

      <PayDPModal
        open={modal === "pay"}
        onClose={closeModal}
        booking={selectedBooking}
        onConfirm={handlePayDP}
      />
    </div>
  );
}

export default BookingHistory;

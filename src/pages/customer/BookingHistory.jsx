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
  const { bookingList, updateBooking, addCancellation, blockSlot } = useAppData();

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modal, setModal] = useState(null); // 'detail' | 'cancel' | 'duration' | 'pay'

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

  const handleCancelSubmit = (reason) => {
    if (!selectedBooking) return;

    addCancellation({
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
    });

    updateBooking(selectedBooking.id, {
      bookingStatus: "Menunggu Konfirmasi Pembatalan",
    });
  };

  const handlePayDP = ({ paymentMethod, paymentStatus }) => {
    if (!selectedBooking) return;
    updateBooking(selectedBooking.id, {
      paymentMethod,
      paymentStatus,
      bookingStatus: "Pending",
    });
  };

  const handleAddDuration = ({ extraSlots, extraTotal, extraDP, paymentMethod }) => {
    if (!selectedBooking || extraSlots.length === 0) return;

    const lastSlot = extraSlots[extraSlots.length - 1];
    const newDuration = selectedBooking.duration + extraSlots.length;
    const newTotal = selectedBooking.totalPrice + extraTotal;
    const newDP = selectedBooking.downPayment + extraDP;
    const newRemaining = newTotal - newDP;

    updateBooking(selectedBooking.id, {
      endTime: lastSlot.endTime,
      duration: newDuration,
      totalPrice: newTotal,
      downPayment: newDP,
      remainingPayment: newRemaining,
      paymentMethod,
      paymentStatus: "Menunggu Verifikasi DP",
    });

    extraSlots.forEach((slot) => blockSlot(slot.id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Riwayat Reservasi"
        subtitle="SKPL-KF-07 — Kelola dan pantau semua reservasi Anda"
      />

      {/* Filter tabs — scrollable on mobile */}
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

      <BookingDetailModal
        open={modal === "detail"}
        onClose={closeModal}
        booking={selectedBooking}
      />

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

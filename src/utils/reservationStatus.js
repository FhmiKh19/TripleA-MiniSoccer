export const RESERVATION_STATUS = {
  PENDING_PAYMENT: "Menunggu Pembayaran",
  ACTIVE: "Reservasi Aktif",
  CANCELLATION_PENDING: "Menunggu Konfirmasi Pembatalan",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const FILTER_TABS = [
  "Semua",
  RESERVATION_STATUS.PENDING_PAYMENT,
  RESERVATION_STATUS.ACTIVE,
  RESERVATION_STATUS.CANCELLATION_PENDING,
  RESERVATION_STATUS.COMPLETED,
  RESERVATION_STATUS.CANCELLED,
];

export function getReservationStatus(booking) {
  if (booking.bookingStatus === "Dibatalkan" || booking.paymentStatus === "Ditolak") {
    return RESERVATION_STATUS.CANCELLED;
  }
  if (booking.bookingStatus === "Menunggu Konfirmasi Pembatalan") {
    return RESERVATION_STATUS.CANCELLATION_PENDING;
  }
  if (booking.bookingStatus === "Selesai" || booking.paymentStatus === "Lunas") {
    return RESERVATION_STATUS.COMPLETED;
  }
  if (
    booking.bookingStatus === "Dikonfirmasi" &&
    ["DP Sudah Dibayar", "DP Terbayar", "Lunas"].includes(booking.paymentStatus)
  ) {
    return RESERVATION_STATUS.ACTIVE;
  }
  return RESERVATION_STATUS.PENDING_PAYMENT;
}

export function needsDPPayment(booking) {
  return ["Menunggu Pembayaran", "Belum Dibayar"].includes(booking.paymentStatus);
}

export function getReservationActions(booking) {
  const status = getReservationStatus(booking);

  switch (status) {
    case RESERVATION_STATUS.ACTIVE:
      return { showPayDP: false, showAddDuration: true, showCancel: true, showDetail: true };
    case RESERVATION_STATUS.PENDING_PAYMENT:
      return {
        showPayDP: needsDPPayment(booking),
        showAddDuration: false,
        showCancel: false,
        showDetail: true,
      };
    case RESERVATION_STATUS.CANCELLATION_PENDING:
      return { showPayDP: false, showAddDuration: false, showCancel: false, showDetail: true };
    case RESERVATION_STATUS.COMPLETED:
    case RESERVATION_STATUS.CANCELLED:
      return { showPayDP: false, showAddDuration: false, showCancel: false, showDetail: true };
    default:
      return { showPayDP: false, showAddDuration: false, showCancel: false, showDetail: true };
  }
}

export function filterByReservationStatus(bookings, filter) {
  if (filter === "Semua") return bookings;
  return bookings.filter((b) => getReservationStatus(b) === filter);
}

export function getConsecutiveAvailableSlots(slotList, booking, maxHours = 4) {
  const available = slotList
    .filter(
      (s) =>
        s.fieldId === booking.fieldId &&
        s.date === booking.date &&
        s.status === "Tersedia"
    )
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const consecutive = [];
  let cursor = booking.endTime;

  for (let i = 0; i < maxHours; i++) {
    const next = available.find((s) => s.startTime === cursor);
    if (!next) break;
    consecutive.push(next);
    cursor = next.endTime;
  }

  return consecutive;
}

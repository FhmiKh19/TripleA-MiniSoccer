export const CUSTOMER_STATUSES = ["Semua", "Menunggu Pembayaran", "Dijadwalkan", "Selesai"];

export function getCustomerDisplayStatus(booking) {
  if (booking.bookingStatus === "Selesai" || booking.paymentStatus === "Lunas") {
    return "Selesai";
  }
  if (
    booking.paymentStatus === "DP Sudah Dibayar" ||
    booking.bookingStatus === "Dikonfirmasi"
  ) {
    return "Dijadwalkan";
  }
  return "Menunggu Pembayaran";
}

export function filterByCustomerStatus(bookings, status) {
  if (status === "Semua") return bookings;
  return bookings.filter((b) => getCustomerDisplayStatus(b) === status);
}

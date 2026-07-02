export function mapBookingFromApi(b) {
  if (!b) return null;
  return {
    id: b.id,
    bookingCode: b.booking_code,
    userId: b.user_id,
    customerName: b.user?.name || "-",
    teamName: b.user?.name || "-",
    phone: b.user?.phone || "-",
    fieldId: b.lapangan_id,
    fieldName: b.lapangan?.name || "-",
    date: b.date,
    startTime: b.start_time?.slice(0, 5) || b.start_time,
    endTime: b.end_time?.slice(0, 5) || b.end_time,
    duration: b.duration,
    totalPrice: b.total_price,
    downPayment: b.down_payment,
    remainingPayment: b.remaining_payment,
    paymentStatus: b.payment_status,
    bookingStatus: b.booking_status,
    paymentProof: b.payment_proof,
    createdAt: b.created_at,
  };
}

export function mapCancellationFromApi(p) {
  if (!p) return null;
  const booking = p.booking;
  return {
    id: p.id,
    bookingId: p.booking_id,
    bookingCode: booking?.booking_code || "-",
    customerName: p.user?.name || booking?.user?.name || "-",
    phone: p.user?.phone || "-",
    fieldName: booking?.lapangan?.name || "-",
    date: booking?.date || "-",
    startTime: booking?.start_time?.slice(0, 5) || "-",
    endTime: booking?.end_time?.slice(0, 5) || "-",
    totalPrice: booking?.total_price || 0,
    downPayment: booking?.down_payment || 0,
    reason: p.reason,
    status: p.status,
    cancelledAt: p.created_at,
  };
}

export function mapFieldFromApi(f) {
  if (!f) return null;
  return {
    id: f.id,
    name: f.name,
    type: f.type,
    status: f.status === 'Tidak Tersedia' ? 'Nonaktif' : f.status,
    image: f.image,
    description: f.description,
    facilities: f.facilities || [],
  };
}

export function toApiBookingPayload({ lapanganId, date, startTime, endTime, duration, totalPrice }) {
  return {
    lapangan_id: lapanganId,
    date,
    start_time: startTime,
    end_time: endTime,
    duration,
    total_price: totalPrice,
  };
}

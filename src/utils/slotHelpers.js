const DAY_CATEGORIES = {
  0: "Weekend & Holiday",
  5: "Jumat",
  6: "Weekend & Holiday",
};

function getDayCategory(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  if (day === 0 || day === 6) return "Weekend & Holiday";
  if (day === 5) return "Jumat";
  return "Senin - Kamis";
}

function getPrices(dayCategory, hour) {
  if (dayCategory === "Weekend & Holiday") {
    return hour < 16 ? 600000 : 800000;
  }
  if (dayCategory === "Jumat") {
    return hour < 16 ? 500000 : 700000;
  }
  return hour < 16 ? 400000 : 600000;
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

export function generateSlotsForFields(fields, daysAhead = 14) {
  const slots = [];
  let id = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < daysAhead; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = formatDate(date);
    const dayCategory = getDayCategory(dateStr);

    for (const field of fields) {
      for (let hour = 7; hour < 23; hour++) {
        const startTime = `${String(hour).padStart(2, "0")}:00`;
        const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
        slots.push({
          id: id++,
          fieldId: field.id,
          fieldName: field.name,
          date: dateStr,
          dayCategory,
          startTime,
          endTime,
          status: "Tersedia",
          price: getPrices(dayCategory, hour),
        });
      }
    }
  }

  return slots;
}

// Status booking yang dianggap TIDAK mengunci slot (slot kembali tersedia)
const CANCELLED_STATUSES = new Set([
  "Dibatalkan",
  "Cancelled",
  "cancelled",
  "dibatalkan",
]);

export function markBookedSlots(slots, bookings) {
  if (!bookings?.length) return slots;

  // Hanya booking yang AKTIF (bukan dibatalkan) yang mengunci slot
  const activeBookings = bookings.filter((b) => {
    const bookingStatus = b.booking_status || b.bookingStatus || "";
    const status        = b.status || "";
    return !CANCELLED_STATUSES.has(bookingStatus) && !CANCELLED_STATUSES.has(status);
  });

  if (!activeBookings.length) return slots;

  return slots.map((slot) => {
    const booked = activeBookings.some((b) => {
      if (b.lapangan_id !== slot.fieldId && b.fieldId !== slot.fieldId) return false;
      if (b.date !== slot.date) return false;
      const bStart = (b.start_time || b.startTime || "").slice(0, 5);
      const bEnd   = (b.end_time   || b.endTime   || "").slice(0, 5);
      return slot.startTime >= bStart && slot.startTime < bEnd;
    });
    return booked ? { ...slot, status: "Dipesan" } : slot;
  });
}

export function getConsecutiveSlotsAfter(slots, booking, count) {
  if (!booking) return [];
  const sameFieldDate = slots.filter(
    (s) =>
      s.fieldId === booking.fieldId &&
      s.date === booking.date &&
      s.status === "Tersedia"
  );
  const after = sameFieldDate.filter((s) => s.startTime >= booking.endTime);
  after.sort((a, b) => a.startTime.localeCompare(b.startTime));

  const result = [];
  let expectedStart = booking.endTime;
  for (const slot of after) {
    if (slot.startTime !== expectedStart) break;
    result.push(slot);
    expectedStart = slot.endTime;
    if (result.length >= count) break;
  }
  return result;
}

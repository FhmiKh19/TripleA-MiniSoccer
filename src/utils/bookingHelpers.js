import { additionalServices, fields } from "../data/seeder";

export const DP_PERCENTAGE = 0.5;

export function calculatePricing(slotPrice = 0, selectedServiceIds = []) {
  const serviceTotal = additionalServices
    .filter((service) => selectedServiceIds.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  const totalPrice = slotPrice + serviceTotal;
  const downPayment = totalPrice * DP_PERCENTAGE;
  const remainingPayment = totalPrice - downPayment;

  return { serviceTotal, totalPrice, downPayment, remainingPayment };
}

export function buildBookingPayload({
  selectedFieldId,
  selectedDate,
  selectedSlot,
  selectedServices = [],
  totalPrice,
  downPayment,
  remainingPayment,
  paymentMethod,
  user,
}) {
  const field = fields.find((f) => f.id === selectedFieldId);
  const serviceNames = additionalServices
    .filter((s) => selectedServices.includes(s.id))
    .map((s) => s.name);

  return {
    id: Date.now(),
    bookingCode: `TRPA-${String(Date.now()).slice(-6)}`,
    userId: user?.id,
    customerName: user?.name || "Customer",
    teamName: user?.name || "Customer",
    phone: user?.phone || "-",
    fieldId: selectedFieldId,
    fieldName: field?.name || selectedSlot?.fieldName || "-",
    date: selectedDate,
    dayCategory: selectedSlot?.dayCategory || "-",
    startTime: selectedSlot?.startTime,
    endTime: selectedSlot?.endTime,
    duration: 1,
    pricePerHour: selectedSlot?.price || 0,
    additionalServices: serviceNames,
    additionalServiceTotal: totalPrice - (selectedSlot?.price || 0),
    totalPrice,
    dpPercentage: DP_PERCENTAGE * 100,
    downPayment,
    remainingPayment,
    paymentMethod,
    paymentStatus: "Menunggu Verifikasi DP",
    bookingStatus: "Pending",
    createdAt: new Date().toLocaleString("id-ID"),
  };
}

import { useEffect, useMemo, useState } from "react";
import { additionalServices, fields, formatRupiah } from "../../data/seeder";
import { useAppData } from "../../context/AppDataContext";
import { calculatePricing } from "../../utils/bookingHelpers";
import CheckoutModal from "./CheckoutModal";

function BookingWidget({ id = "booking-widget" }) {
  const { slotList } = useAppData();
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const availableDates = useMemo(() => {
    if (!selectedFieldId) return [];
    return [
      ...new Set(
        slotList.filter((s) => s.fieldId === selectedFieldId).map((s) => s.date)
      ),
    ];
  }, [selectedFieldId, slotList]);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate((c) => (availableDates.includes(c) ? c : availableDates[0]));
    }
  }, [availableDates]);

  const slotsForDate = useMemo(
    () =>
      slotList
        .filter((s) => s.fieldId === selectedFieldId && s.date === selectedDate)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [selectedFieldId, selectedDate, slotList]
  );

  useEffect(() => {
    setSelectedSlotId((c) =>
      c && slotsForDate.some((s) => s.id === c) ? c : null
    );
  }, [slotsForDate]);

  const selectedSlot = slotsForDate.find((s) => s.id === selectedSlotId);
  const { totalPrice, downPayment, remainingPayment } = calculatePricing(
    selectedSlot?.price || 0,
    selectedServices
  );

  const bookingData = selectedSlot
    ? {
        selectedFieldId,
        selectedDate,
        selectedSlot,
        selectedServices,
        totalPrice,
        downPayment,
        remainingPayment,
      }
    : null;

  return (
    <section id={id} className="premium-card p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Jadwal Real-Time</h2>
          <p className="text-sm text-gray-400">Pilih slot tersedia dan amankan dengan DP 50%</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          Live
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Lapangan</label>
          <select
            value={selectedFieldId}
            onChange={(e) => {
              setSelectedFieldId(Number(e.target.value));
              setSelectedSlotId(null);
            }}
            className="premium-select"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Tanggal</label>
          <select
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlotId(null);
            }}
            className="premium-select"
          >
            {availableDates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm text-gray-400">Slot Waktu</label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {slotsForDate.map((slot) => {
            const isSelected = slot.id === selectedSlotId;
            const disabled = slot.status !== "Tersedia";
            return (
              <button
                key={slot.id}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setSelectedSlotId(slot.id)}
                className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  disabled
                    ? "cursor-not-allowed border-brand-border bg-brand-dark text-gray-600 line-through"
                    : isSelected
                    ? "border-brand-gold bg-brand-gold text-brand-dark"
                    : "border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-brand-dark"
                }`}
              >
                {slot.startTime}
              </button>
            );
          })}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-5 rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-4">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-gray-400">
              Total: <strong className="text-white">{formatRupiah(totalPrice)}</strong>
            </span>
            <span className="text-brand-gold">
              DP 50%: <strong>{formatRupiah(downPayment)}</strong>
            </span>
            <span className="text-gray-400">
              Sisa: {formatRupiah(remainingPayment)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="btn-gold mt-4 w-full"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingData={bookingData}
      />
    </section>
  );
}

export default BookingWidget;

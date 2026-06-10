import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import CheckoutModal from "../../components/booking/CheckoutModal";
import PageHeader from "../../components/ui/PageHeader";
import { additionalServices, fields, formatRupiah } from "../../data/seeder";
import { useAppData } from "../../context/AppDataContext";
import { calculatePricing } from "../../utils/bookingHelpers";

function BookingForm() {
  const location = useLocation();
  const { slotList } = useAppData();
  const initialFieldId = location.state?.fieldId || fields[0]?.id || null;
  const preferredTime = location.state?.preferredTime || null;

  const [selectedFieldId, setSelectedFieldId] = useState(initialFieldId);
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
    if (!preferredTime || slotsForDate.length === 0) return;
    const preferredSlot = slotsForDate.find(
      (s) => s.startTime === preferredTime && s.status === "Tersedia"
    );
    if (preferredSlot) setSelectedSlotId(preferredSlot.id);
  }, [preferredTime, slotsForDate]);

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
    ? { selectedFieldId, selectedDate, selectedSlot, selectedServices, totalPrice, downPayment, remainingPayment }
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Form Pemesanan"
        subtitle="Beranda / Booking / Form Pemesanan"
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="premium-card p-6 md:p-8">
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">Pilih Lapangan</label>
              <select
                value={selectedFieldId}
                onChange={(e) => {
                  setSelectedFieldId(Number(e.target.value));
                  setSelectedSlotId(null);
                }}
                className="premium-select"
              >
                {fields.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-400">Pilih Tanggal</label>
              <select
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlotId(null);
                }}
                className="premium-select"
              >
                {availableDates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-400">Pilih Slot Waktu</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {slotsForDate.length > 0 ? (
                  slotsForDate.map((slot) => {
                    const isSelected = slot.id === selectedSlotId;
                    const disabled = slot.status !== "Tersedia";
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && setSelectedSlotId(slot.id)}
                        className={`rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
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
                  })
                ) : (
                  <div className="col-span-full rounded-lg border border-dashed border-brand-border p-6 text-center text-sm text-gray-500">
                    Tidak ada slot tersedia.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-dark p-5">
              <h2 className="mb-3 text-base font-semibold text-white">Layanan Tambahan</h2>
              <div className="space-y-3">
                {additionalServices.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-card p-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() =>
                        setSelectedServices((c) =>
                          c.includes(service.id)
                            ? c.filter((id) => id !== service.id)
                            : [...c, service.id]
                        )
                      }
                      className="h-4 w-4 rounded border-brand-border text-brand-gold focus:ring-brand-gold"
                    />
                    <div>
                      <p className="font-semibold text-white">{service.name}</p>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                    <span className="ml-auto text-sm font-bold text-brand-gold">
                      {formatRupiah(service.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {selectedSlot && (
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="btn-gold mt-6 w-full"
            >
              Lanjut ke Pembayaran
            </button>
          )}
        </div>

        <BookingSummaryCard
          dark
          selectedFieldId={selectedFieldId}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          downPayment={downPayment}
          remainingPayment={remainingPayment}
        />
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingData={bookingData}
      />
    </div>
  );
}

export default BookingForm;

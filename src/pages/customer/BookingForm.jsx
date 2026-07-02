import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import CheckoutModal from "../../components/booking/CheckoutModal";
import { additionalServices, formatRupiah } from "../../data/seeder";
import { useAppData } from "../../context/AppDataContext";
import { calculatePricing } from "../../utils/bookingHelpers";

function BookingForm() {
  const location = useLocation();
  const { slotList, fieldList } = useAppData();
  const initialFieldId = location.state?.fieldId || fieldList[0]?.id || null;
  const preferredTime  = location.state?.preferredTime || null;

  const [selectedFieldId, setSelectedFieldId] = useState(initialFieldId);
  const [selectedDate,    setSelectedDate]    = useState("");
  const [selectedSlotId,  setSelectedSlotId]  = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const availableDates = useMemo(() => {
    if (!selectedFieldId) return [];
    return [...new Set(slotList.filter((s) => s.fieldId === selectedFieldId).map((s) => s.date))];
  }, [selectedFieldId, slotList]);

  useEffect(() => {
    if (availableDates.length > 0)
      setSelectedDate((c) => (availableDates.includes(c) ? c : availableDates[0]));
  }, [availableDates]);

  const slotsForDate = useMemo(
    () => slotList
      .filter((s) => s.fieldId === selectedFieldId && s.date === selectedDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [selectedFieldId, selectedDate, slotList]
  );

  useEffect(() => {
    if (!preferredTime || slotsForDate.length === 0) return;
    const ps = slotsForDate.find((s) => s.startTime === preferredTime && s.status === "Tersedia");
    if (ps) setSelectedSlotId(ps.id);
  }, [preferredTime, slotsForDate]);

  useEffect(() => {
    setSelectedSlotId((c) => (c && slotsForDate.some((s) => s.id === c) ? c : null));
  }, [slotsForDate]);

  const selectedSlot = slotsForDate.find((s) => s.id === selectedSlotId);
  const { totalPrice, downPayment, remainingPayment } = calculatePricing(
    selectedSlot?.price || 0,
    selectedServices
  );

  const bookingData = selectedSlot
    ? { selectedFieldId, selectedDate, selectedSlot, selectedServices, totalPrice, downPayment, remainingPayment }
    : null;

  const toggleService = (id) =>
    setSelectedServices((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const slotStats = {
    available: slotsForDate.filter((s) => s.status === "Tersedia").length,
    booked:    slotsForDate.filter((s) => s.status !== "Tersedia").length,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Customer</p>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
          Form Pemesanan
        </h1>
        <p className="mt-0.5 text-sm text-slate-400">Pilih lapangan, tanggal, dan slot waktu yang tersedia</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

        {/* ── LEFT PANEL ── */}
        <div className="space-y-5">

          {/* Field & Date selects */}
          <div className="rounded-2xl p-6" style={{ background: "#141B28", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black text-brand-dark"
                    style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}>1</span>
              Pilih Lapangan & Tanggal
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Field */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Lapangan
                </label>
                <div className="relative">
                  <select
                    value={selectedFieldId}
                    onChange={(e) => { setSelectedFieldId(Number(e.target.value)); setSelectedSlotId(null); }}
                    className="w-full appearance-none rounded-xl border bg-transparent py-3 pl-4 pr-10 text-sm text-white outline-none transition-all duration-200 [color-scheme:dark]"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F0A500"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.12)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {fieldList.map((f) => (
                      <option key={f.id} value={f.id} style={{ background: "#141B28" }}>{f.name}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tanggal Main
                </label>
                <div className="relative">
                  <select
                    value={selectedDate}
                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlotId(null); }}
                    className="w-full appearance-none rounded-xl border bg-transparent py-3 pl-4 pr-10 text-sm text-white outline-none transition-all duration-200 [color-scheme:dark]"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F0A500"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.12)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {availableDates.map((d) => (
                      <option key={d} value={d} style={{ background: "#141B28" }}>{d}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div className="rounded-2xl p-6" style={{ background: "#141B28", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black text-brand-dark"
                      style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}>2</span>
                Pilih Slot Waktu
              </h2>
              {slotsForDate.length > 0 && (
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-brand-gold" /> {slotStats.available} tersedia
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-700" /> {slotStats.booked} terisi
                  </span>
                </div>
              )}
            </div>

            {slotsForDate.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {slotsForDate.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  const disabled   = slot.status !== "Tersedia";
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && setSelectedSlotId(slot.id)}
                      className="relative rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
                      style={{
                        background: disabled
                          ? "rgba(255,255,255,0.02)"
                          : isSelected
                          ? "linear-gradient(135deg, rgba(240,165,0,0.2), rgba(240,165,0,0.08))"
                          : "rgba(255,255,255,0.04)",
                        border: disabled
                          ? "1px solid rgba(255,255,255,0.04)"
                          : isSelected
                          ? "1px solid rgba(240,165,0,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: disabled ? "#3F4A5A" : isSelected ? "#F0A500" : "#94A3B8",
                        cursor: disabled ? "not-allowed" : "pointer",
                        textDecoration: disabled ? "line-through" : "none",
                        boxShadow: isSelected ? "0 0 12px rgba(240,165,0,0.15)" : "none",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {isSelected && (
                        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black text-brand-dark"
                             style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}>
                          ✓
                        </div>
                      )}
                      {slot.startTime}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl py-10 text-center"
                   style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.06)" }}>
                <span className="text-2xl opacity-40">🕐</span>
                <p className="mt-2 text-sm text-slate-500">Tidak ada slot tersedia untuk tanggal ini.</p>
              </div>
            )}
          </div>

          {/* Additional services */}
          <div className="rounded-2xl p-6" style={{ background: "#141B28", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black text-brand-dark"
                    style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}>3</span>
              Layanan Tambahan
              <span className="ml-auto text-xs font-normal text-slate-500">(Opsional)</span>
            </h2>

            <div className="space-y-2.5">
              {additionalServices.map((service) => {
                const checked = selectedServices.includes(service.id);
                return (
                  <label
                    key={service.id}
                    className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200"
                    style={{
                      background: checked ? "rgba(240,165,0,0.06)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${checked ? "rgba(240,165,0,0.2)" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    {/* Custom checkbox */}
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-200"
                      style={{
                        background: checked ? "linear-gradient(135deg, #F0A500, #FFD166)" : "rgba(255,255,255,0.05)",
                        border: checked ? "none" : "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      {checked && <span className="text-[10px] font-black text-brand-dark">✓</span>}
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.id)}
                      className="hidden"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{service.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{service.description}</p>
                    </div>

                    <span
                      className="shrink-0 text-sm font-bold"
                      style={{ color: checked ? "#F0A500" : "#64748B" }}
                    >
                      +{formatRupiah(service.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* CTA button */}
          {selectedSlot ? (
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="btn-gold w-full py-4 text-sm font-bold"
            >
              ⚡ Lanjut ke Pembayaran — {formatRupiah(downPayment)} DP
            </button>
          ) : (
            <div className="flex items-center justify-center rounded-2xl py-4 text-sm text-slate-500"
                 style={{ border: "1px dashed rgba(255,255,255,0.06)" }}>
              Pilih slot waktu untuk melanjutkan
            </div>
          )}
        </div>

        {/* ── RIGHT: Summary card ── */}
        <div className="lg:sticky lg:top-24 h-fit">
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

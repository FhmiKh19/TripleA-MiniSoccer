import { useEffect, useMemo, useState } from "react";
import { additionalServices, fields, formatRupiah, paymentMethods, timeSlots } from "../../data/seeder";

function BookingForm() {
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]?.id || null);

  const availableDates = useMemo(() => {
    if (!selectedFieldId) return [];
    return [
      ...new Set(
        timeSlots
          .filter((slot) => slot.fieldId === selectedFieldId)
          .map((slot) => slot.date)
      ),
    ];
  }, [selectedFieldId]);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate((current) =>
        availableDates.includes(current) ? current : availableDates[0]
      );
    }
  }, [availableDates]);

  const slotsForDate = useMemo(
    () =>
      timeSlots
        .filter((slot) => slot.fieldId === selectedFieldId && slot.date === selectedDate)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [selectedFieldId, selectedDate]
  );

  useEffect(() => {
    if (slotsForDate.length > 0) {
      setSelectedSlotId((current) =>
        slotsForDate.some((slot) => slot.id === current)
          ? current
          : slotsForDate[0].id
      );
    } else {
      setSelectedSlotId(null);
    }
  }, [slotsForDate]);

  const selectedSlot = slotsForDate.find((slot) => slot.id === selectedSlotId);
  const serviceTotal = additionalServices
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);
  const totalPrice = (selectedSlot?.price || 0) + serviceTotal;
  const downPayment = totalPrice * 0.5;
  const remainingPayment = totalPrice - downPayment;

  const handleServiceChange = (serviceId) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Form Pemesanan</h1>
        <p className="mb-6 mt-1 text-xs text-gray-500">Beranda / Booking / Form Pemesanan</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Pilih Lapangan</label>
              <select
                value={selectedFieldId}
                onChange={(event) => setSelectedFieldId(Number(event.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Pilih Tanggal</label>
                <select
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Metode Pembayaran</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(event) => setSelectedPaymentMethod(Number(event.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Pilih Slot</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {slotsForDate.length > 0 ? (
                  slotsForDate.map((slot) => {
                    const isSelected = slot.id === selectedSlotId;
                    const disabled = slot.status !== "Tersedia";
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => !disabled && setSelectedSlotId(slot.id)}
                        disabled={disabled}
                        className={`rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                          disabled
                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through"
                            : isSelected
                            ? "border-brand-gold bg-brand-gold text-brand-dark"
                            : "border-brand-gold bg-white text-brand-dark hover:bg-brand-gold hover:text-brand-dark"
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-full rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                    Tidak ada slot tersedia untuk tanggal ini.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="mb-3 text-base font-semibold text-brand-dark">Layanan Tambahan</h2>
              <div className="space-y-3">
                {additionalServices.map((service) => (
                  <label key={service.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <div>
                      <p className="font-semibold text-brand-dark">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <span className="ml-auto text-sm font-bold text-brand-gold">{formatRupiah(service.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-brand-dark">Ringkasan Booking</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between"><span>Lapangan</span><span>{fields.find((field) => field.id === selectedFieldId)?.name || "-"}</span></div>
              <div className="flex justify-between"><span>Tanggal</span><span>{selectedDate || "-"}</span></div>
              <div className="flex justify-between"><span>Jam</span><span>{selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : "-"}</span></div>
              <div className="flex justify-between"><span>Harga Lapangan</span><span>{selectedSlot ? formatRupiah(selectedSlot.price) : "-"}</span></div>
              <div className="flex justify-between"><span>Layanan Tambahan</span><span>{formatRupiah(serviceTotal)}</span></div>
            </div>
            <div className="my-4 h-px bg-gray-200" />
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between font-semibold text-brand-dark"><span>Total Harga</span><span>{formatRupiah(totalPrice)}</span></div>
              <div className="flex justify-between"><span>DP 50%</span><span>{formatRupiah(downPayment)}</span></div>
              <div className="flex justify-between"><span>Sisa Bayar</span><span>{formatRupiah(remainingPayment)}</span></div>
            </div>
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Catatan: DP tidak dapat dikembalikan jika booking dibatalkan.
            </p>
          </div>

          <button className="w-full rounded-lg bg-brand-dark py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-gold hover:text-brand-dark">
            Lanjutkan ke Pembayaran DP
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;

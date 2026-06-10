import { additionalServices, fields, formatRupiah } from "../../data/seeder";

function BookingSummaryCard({
  selectedFieldId,
  selectedDate,
  selectedSlot,
  selectedServices = [],
  totalPrice,
  downPayment,
  remainingPayment,
  showNote = true,
  dark = false,
}) {
  const serviceTotal = additionalServices
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const cardClass = dark ? "premium-card" : "rounded-xl bg-white p-6 shadow-sm";
  const labelClass = dark ? "text-gray-400" : "text-gray-600";
  const valueClass = dark ? "text-white" : "text-brand-dark";

  return (
    <div className={`${cardClass} p-6`}>
      <h2 className={`mb-4 text-lg font-bold ${valueClass}`}>Ringkasan Booking</h2>
      <div className={`space-y-3 text-sm ${labelClass}`}>
        <div className="flex justify-between">
          <span>Lapangan</span>
          <span className={valueClass}>
            {fields.find((f) => f.id === selectedFieldId)?.name || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tanggal</span>
          <span className={valueClass}>{selectedDate || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>Jam</span>
          <span className={valueClass}>
            {selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Harga Lapangan</span>
          <span className={valueClass}>
            {selectedSlot ? formatRupiah(selectedSlot.price) : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Layanan Tambahan</span>
          <span className={valueClass}>{formatRupiah(serviceTotal)}</span>
        </div>
      </div>
      <div className={`my-4 h-px ${dark ? "bg-brand-border" : "bg-gray-200"}`} />
      <div className={`space-y-3 text-sm ${labelClass}`}>
        <div className={`flex justify-between font-semibold ${valueClass}`}>
          <span>Total Harga</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>DP 50%</span>
          <span className="font-bold text-brand-gold">{formatRupiah(downPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sisa Bayar</span>
          <span className={valueClass}>{formatRupiah(remainingPayment)}</span>
        </div>
      </div>
      {showNote && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Catatan: DP tidak dapat dikembalikan jika booking dibatalkan.
        </p>
      )}
    </div>
  );
}

export default BookingSummaryCard;

import { useMemo, useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatRupiah, timeSlots } from "../../data/seeder";

const filters = ["Semua", "Tersedia", "Dipesan", "Maintenance"];

function BookingSchedule() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredSchedules = useMemo(
    () =>
      activeFilter === "Semua"
        ? timeSlots
        : timeSlots.filter((slot) => slot.status === activeFilter),
    [activeFilter]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter ? "bg-brand-gold text-brand-dark" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">Lapangan</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Jam</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-left">Kategori Hari</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((slot) => (
                <tr key={slot.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-[#f0c04014]">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{slot.fieldName}</td>
                  <td className="px-4 py-3">{slot.date}</td>
                  <td className="px-4 py-3">{slot.startTime} - {slot.endTime}</td>
                  <td className="px-4 py-3"><StatusBadge status={slot.status} /></td>
                  <td className="px-4 py-3">{formatRupiah(slot.price)}</td>
                  <td className="px-4 py-3">{slot.dayCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingSchedule;

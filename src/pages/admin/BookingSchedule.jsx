import { useMemo, useState } from "react";
import ScheduleCalendarGrid from "../../components/admin/ScheduleCalendarGrid";
import PageHeader from "../../components/ui/PageHeader";
import { useAppData } from "../../context/AppDataContext";

function BookingSchedule() {
  const { slotList, blockSlot, releaseSlot } = useAppData();

  const dates = useMemo(
    () => [...new Set(slotList.map((s) => s.date))].sort(),
    [slotList]
  );

  const [selectedDate, setSelectedDate] = useState(dates[0] || "");

  const handleToggleSlot = (slot) => {
    if (slot.status === "Tersedia") {
      if (window.confirm(`Blok slot ${slot.fieldName} ${slot.startTime} untuk booking offline?`)) {
        blockSlot(slot.id);
      }
    } else if (slot.status === "Dipesan") {
      if (window.confirm(`Buka kembali slot ${slot.fieldName} ${slot.startTime}?`)) {
        releaseSlot(slot.id);
      }
    }
  };

  const stats = useMemo(() => {
    const daySlots = slotList.filter((s) => s.date === selectedDate);
    return {
      tersedia: daySlots.filter((s) => s.status === "Tersedia").length,
      dipesan: daySlots.filter((s) => s.status === "Dipesan").length,
    };
  }, [slotList, selectedDate]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Jadwal"
        subtitle="Kalender interaktif — klik slot untuk blok/buka jadwal manual"
      />

      <div className="flex flex-wrap items-center gap-4">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="premium-select w-auto min-w-[180px]"
        >
          {dates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="flex gap-3 text-sm">
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
            Tersedia: {stats.tersedia}
          </span>
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400">
            Terisi: {stats.dipesan}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded bg-green-500/40" /> Tersedia (klik untuk blok)
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded bg-red-500/40" /> Terisi (klik untuk buka)
        </span>
      </div>

      <ScheduleCalendarGrid
        slots={slotList}
        selectedDate={selectedDate}
        onToggleSlot={handleToggleSlot}
      />
    </div>
  );
}

export default BookingSchedule;

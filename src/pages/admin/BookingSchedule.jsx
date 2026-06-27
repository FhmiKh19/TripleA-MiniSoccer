import { useEffect, useMemo, useState } from "react";
import ScheduleCalendarGrid from "../../components/admin/ScheduleCalendarGrid";
import PageHeader from "../../components/ui/PageHeader";
import { useAppData } from "../../context/AppDataContext";
import { generateSlotsForFields } from "../../utils/slotHelpers";

function BookingSchedule() {
  const { fieldList, loadJadwalForDate, bookingList } = useAppData();
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [daySlots, setDaySlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const dates = useMemo(() => {
    const base = generateSlotsForFields(fieldList, 14);
    return [...new Set(base.map((s) => s.date))].sort();
  }, [fieldList]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadJadwalForDate(selectedDate, fieldList);
      setLoading(false);
    };
    if (selectedDate && fieldList.length) load();
  }, [selectedDate, fieldList, loadJadwalForDate]);

  useEffect(() => {
    const base = generateSlotsForFields(fieldList, 14);
    const dayBookings = bookingList.filter((b) => b.date === selectedDate);
    const booked = dayBookings.map((b) => ({
      lapangan_id: b.fieldId,
      date: b.date,
      start_time: b.startTime,
      end_time: b.endTime,
    }));
    const slots = base
      .filter((s) => s.date === selectedDate)
      .map((s) => {
        const isBooked = booked.some(
          (b) =>
            b.lapangan_id === s.fieldId &&
            s.startTime >= b.start_time &&
            s.startTime < b.end_time
        );
        return isBooked ? { ...s, status: "Dipesan" } : s;
      });
    setDaySlots(slots);
  }, [selectedDate, fieldList, bookingList]);

  const stats = useMemo(() => ({
    tersedia: daySlots.filter((s) => s.status === "Tersedia").length,
    dipesan: daySlots.filter((s) => s.status === "Dipesan").length,
  }), [daySlots]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Jadwal"
        subtitle="Lihat jadwal reservasi per tanggal — UC-07"
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
        {loading && <span className="text-sm text-gray-400">Memuat jadwal...</span>}
      </div>

      <ScheduleCalendarGrid
        slots={daySlots}
        selectedDate={selectedDate}
        onToggleSlot={() => {}}
      />
    </div>
  );
}

export default BookingSchedule;

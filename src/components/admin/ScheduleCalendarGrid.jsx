import { useMemo } from "react";
import { formatRupiah } from "../../data/seeder";

const HOURS = Array.from({ length: 17 }, (_, i) => `${String(i + 7).padStart(2, "0")}:00`);

const statusStyles = {
  Tersedia: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 cursor-pointer",
  Dipesan: "bg-red-500/20 text-red-400 border-red-500/30",
  Maintenance: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function ScheduleCalendarGrid({ slots, selectedDate, onToggleSlot }) {
  const fieldNames = useMemo(
    () => [...new Set(slots.map((s) => s.fieldName))],
    [slots]
  );

  const grid = useMemo(() => {
    const map = {};
    slots
      .filter((s) => s.date === selectedDate)
      .forEach((slot) => {
        const key = `${slot.fieldName}-${slot.startTime}`;
        map[key] = slot;
      });
    return map;
  }, [slots, selectedDate]);

  return (
    <div className="overflow-x-auto rounded-xl border border-brand-border">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="bg-brand-dark">
            <th className="sticky left-0 z-10 bg-brand-dark px-4 py-3 text-left text-brand-gold">
              Lapangan
            </th>
            {HOURS.map((h) => (
              <th key={h} className="px-2 py-3 text-center text-xs font-semibold text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fieldNames.map((fieldName) => (
            <tr key={fieldName} className="border-t border-brand-border">
              <td className="sticky left-0 z-10 bg-brand-card px-4 py-3 font-semibold text-white">
                {fieldName}
              </td>
              {HOURS.map((hour) => {
                const slot = grid[`${fieldName}-${hour}`];
                if (!slot) {
                  return (
                    <td key={hour} className="px-1 py-2">
                      <div className="h-10 rounded-lg bg-brand-dark/50" />
                    </td>
                  );
                }
                const style = statusStyles[slot.status] || statusStyles.Tersedia;
                const canToggle = slot.status === "Tersedia" || slot.status === "Dipesan";
                return (
                  <td key={hour} className="px-1 py-2">
                    <button
                      type="button"
                      disabled={!canToggle}
                      title={`${slot.status} - ${formatRupiah(slot.price)}`}
                      onClick={() => canToggle && onToggleSlot(slot)}
                      className={`flex h-10 w-full items-center justify-center rounded-lg border text-[10px] font-bold transition-all ${style} ${
                        !canToggle ? "cursor-default" : ""
                      }`}
                    >
                      {slot.status === "Tersedia" ? "✓" : slot.status === "Dipesan" ? "✕" : "—"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleCalendarGrid;

const bookedSlots = ["10:00", "14:00", "19:00", "20:00"];
const slots = Array.from({ length: 15 }).map((_, i) => `${String(i + 8).padStart(2, "0")}:00`);

function TimeSlotGrid({ selectedSlot, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {slots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        const isSelected = selectedSlot === slot;
        return (
          <button
            key={slot}
            disabled={isBooked}
            onClick={() => onSelect(slot)}
            className={`btn btn-sm ${isBooked ? "btn-disabled btn-outline" : isSelected ? "btn-primary" : "btn-outline"}`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlotGrid;

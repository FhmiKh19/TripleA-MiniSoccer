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
            className={`rounded-lg py-2 px-3 text-sm transition-colors ${
              isBooked
                ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 line-through"
                : isSelected
                  ? "border border-brand-gold bg-brand-gold font-semibold text-brand-dark"
                  : "border-2 border-brand-gold bg-white text-brand-dark hover:bg-brand-gold"
            }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlotGrid;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/ui/StatusBadge";
import SlotBadge from "../../components/ui/SlotBadge";
import TimeSlotGrid from "../../components/ui/TimeSlotGrid";
import { fields } from "../../data/seeder";

const datePills = ["Hari Ini", "Besok", "Sel 15/5", "Rab 16/5", "Kam 17/5", "Jum 18/5", "Sab 19/5"];

function FieldDetail() {
  const navigate = useNavigate();
  const [activeDate, setActiveDate] = useState("Hari Ini");
  const [selectedSlot, setSelectedSlot] = useState("18:00");
  const field = fields[0] || { name: "Lapangan A", status: "Tersedia", description: "", facilities: [] };

  return (
    <div>
      <p className="mb-4 text-xs text-gray-500">Beranda / Lapangan / {field.name}</p>
      <div className="grid gap-6 rounded-xl bg-white p-6 shadow-sm md:grid-cols-[320px_1fr]">
        <div className="flex h-56 items-center justify-center rounded-xl bg-gray-100 text-7xl">⚽</div>
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{field.name}</h2>
          <div className="mt-2"><StatusBadge status={field.status} /></div>
          <p className="mt-3 text-xl font-bold text-brand-gold">Harga berdasarkan hari dan jam</p>
          <p className="mt-2 text-sm text-gray-500">{field.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
            {field.facilities.map((facility) => (
              <span key={facility} className="rounded-full bg-gray-100 px-3 py-1">{facility}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-brand-dark">Cek Ketersediaan Jadwal</h3>
        <div className="mb-4 mt-4 flex flex-wrap gap-2">
          {datePills.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDate(d)}
              className={`rounded-full border px-4 py-2 text-sm ${
                activeDate === d
                  ? "border-brand-gold bg-brand-gold font-semibold text-brand-dark"
                  : "border-gray-200 text-gray-600 hover:border-brand-gold"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="mb-3 flex flex-wrap gap-4">
          <SlotBadge colorClass="bg-brand-gold" label="Tersedia" />
          <SlotBadge colorClass="bg-brand-dark" label="Dipilih" />
          <SlotBadge colorClass="bg-gray-300" label="Sudah Dipesan" />
        </div>
        <TimeSlotGrid selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
        {selectedSlot && (
          <button
            type="button"
            onClick={() =>
              navigate("/customer/booking-form", {
                state: { fieldId: field.id, preferredTime: selectedSlot },
              })
            }
            className="mt-6 w-full rounded-lg bg-brand-gold py-3 font-bold text-brand-dark transition-all duration-200 hover:scale-[1.02] hover:bg-brand-goldLight"
          >
            Lanjut ke Pemesanan
          </button>
        )}
      </div>
    </div>
  );
}

export default FieldDetail;

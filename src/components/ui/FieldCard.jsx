import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Button from "./Button";

function FieldCard({ field }) {
  const navigate = useNavigate();

  return (
    <div className="premium-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40">
      <div className="flex h-44 items-center justify-center bg-brand-dark text-6xl">⚽</div>
      <div className="px-5 py-4">
        <h3 className="text-lg font-bold text-white">{field.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{field.description}</p>
        <p className="mt-2 text-base font-bold text-brand-gold">{field.price}</p>
        <div className="mt-2"><StatusBadge status={field.status} /></div>
      </div>
      <div className="px-5 pb-5">
        <Button
          label="Lihat Jadwal & Pesan"
          fullWidth
          onClick={() =>
            navigate("/customer/booking-form", { state: { fieldId: field.id } })
          }
        />
      </div>
    </div>
  );
}

export default FieldCard;

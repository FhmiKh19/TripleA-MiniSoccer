import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Button from "./Button";

function FieldCard({ field }) {
  const navigate = useNavigate();

  return (
    <div className="card card-compact bg-base-100 shadow-xl transition-transform duration-200 hover:-translate-y-1">
      <div className="card-body">
        <div className="flex h-44 items-center justify-center rounded-xl bg-base-200 text-6xl">⚽</div>
        <h3 className="card-title mt-4">{field.name}</h3>
        <p className="text-sm text-base-content/70">{field.description}</p>
        <p className="mt-2 text-base font-bold text-primary">{field.price}</p>
        <div className="mt-2"><StatusBadge status={field.status} /></div>
        <div className="card-actions mt-4">
          <Button
            label="Lihat Jadwal & Pesan"
            fullWidth
            onClick={() => navigate("/customer/booking-form", { state: { fieldId: field.id } })}
          />
        </div>
      </div>
    </div>
  );
}

export default FieldCard;

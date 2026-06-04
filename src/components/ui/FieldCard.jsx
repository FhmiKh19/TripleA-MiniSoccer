import StatusBadge from "./StatusBadge";
import Button from "./Button";

function FieldCard({ field }) {
  return (
    <div className="rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-44 items-center justify-center rounded-t-xl bg-gray-100 text-6xl">⚽</div>
      <div className="px-5 py-4">
        <h3 className="text-lg font-bold text-brand-dark">{field.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{field.description}</p>
        <p className="mt-2 text-base font-bold text-brand-gold">{field.price}</p>
        <div className="mt-2"><StatusBadge status={field.status} /></div>
      </div>
      <div className="px-5 pb-5">
        <Button label="Lihat Jadwal & Pesan" fullWidth />
      </div>
    </div>
  );
}

export default FieldCard;

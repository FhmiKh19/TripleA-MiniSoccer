import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { fields } from "../../data/seeder";

function FieldManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-brand-dark">Kelola Lapangan</h2>
        <Button label="Tambah Lapangan Baru" variant="primary" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <div key={field.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path strokeWidth="2" d="M8 10l2-2 4 0 2 2-1 3-3 2-3-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-dark">{field.name}</h3>
            <p className="mb-2 text-sm font-semibold text-brand-gold">Harga berdasarkan hari dan jam</p>
            <StatusBadge status={field.status} />
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100">Edit</button>
              <button className="rounded-md bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 transition-all duration-200 hover:bg-amber-200">Ubah Status</button>
              <button className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldManagement;

import { useOwner } from "../../context/OwnerContext";
import { useAppData } from "../../context/AppDataContext";

function FieldSwitcher() {
  const { selectedFieldId, setSelectedFieldId } = useOwner();
  const { fieldList } = useAppData();

  if (fieldList.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs text-gray-400 sm:inline">Cabang:</span>
      <select
        value={selectedFieldId}
        onChange={(e) => setSelectedFieldId(Number(e.target.value))}
        className="rounded-lg border border-brand-border bg-brand-card px-3 py-2 text-sm font-semibold text-brand-gold focus:border-brand-gold focus:outline-none"
      >
        {fieldList.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FieldSwitcher;

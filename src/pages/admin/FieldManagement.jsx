import { useState } from "react";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";

function FieldManagement() {
  const { fieldList, addField, updateField, deleteField } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Outdoor",
    status: "Tersedia",
    description: "",
    facilities: [],
  });
  const [facilitiesInput, setFacilitiesInput] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const facilityOptions = [
    "Rumput sintetis",
    "Lampu malam",
    "Parkir",
    "Toilet",
    "Bola",
    "Ruang istirahat",
    "Kantin",
  ];

  const handleOpenModal = (field = null) => {
    if (field) {
      setEditingId(field.id);
      setFormData(field);
      setFacilitiesInput(field.facilities.join(", "));
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        type: "Outdoor",
        status: "Tersedia",
        description: "",
        facilities: [],
      });
      setFacilitiesInput("");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert("Nama lapangan harus diisi.");
      return;
    }

    if (!formData.description) {
      alert("Deskripsi lapangan harus diisi.");
      return;
    }

    const facilitiesList = facilitiesInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    const dataToSave = {
      ...formData,
      facilities: facilitiesList,
    };

    if (editingId) {
      updateField(editingId, dataToSave);
      alert("Lapangan berhasil diperbarui!");
    } else {
      addField(dataToSave);
      alert("Lapangan berhasil ditambahkan!");
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    deleteField(id);
    setShowDeleteConfirm(null);
    alert("Lapangan berhasil dihapus!");
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Tersedia" ? "Nonaktif" : "Tersedia";
    updateField(id, { status: newStatus });
    alert(`Status lapangan berhasil diubah menjadi ${newStatus}!`);
  };

  const handleToggleFacility = (facility) => {
    const facilities = facilitiesInput.split(",").map((f) => f.trim());
    const index = facilities.indexOf(facility);

    if (index > -1) {
      facilities.splice(index, 1);
    } else {
      facilities.push(facility);
    }

    setFacilitiesInput(facilities.join(", "));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-brand-dark">Kelola Lapangan</h2>
        <Button
          label="Tambah Lapangan Baru"
          variant="primary"
          onClick={() => handleOpenModal()}
        />
      </div>

      {fieldList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Belum ada lapangan terdaftar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fieldList.map((field) => (
            <div key={field.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeWidth="2" d="M8 10l2-2 4 0 2 2-1 3-3 2-3-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-dark">{field.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{field.type}</p>
              <p className="mb-3 text-xs text-gray-500 line-clamp-2">
                {field.description}
              </p>
              <StatusBadge status={field.status} />
              <div className="mt-3 flex flex-wrap gap-1">
                {field.facilities.slice(0, 2).map((facility, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-1 rounded"
                  >
                    {facility}
                  </span>
                ))}
                {field.facilities.length > 2 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{field.facilities.length - 2} lainnya
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenModal(field)}
                  className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(field.id, field.status)}
                  className="rounded-md bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 transition-all duration-200 hover:bg-amber-200"
                >
                  {field.status === "Tersedia" ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(field.id)}
                  className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-brand-dark">
              {editingId ? "Edit Lapangan" : "Tambah Lapangan Baru"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Nama Lapangan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Lapangan A"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Tipe
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-gold"
                  >
                    <option>Outdoor</option>
                    <option>Indoor</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-gold"
                  >
                    <option>Tersedia</option>
                    <option>Nonaktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi lapangan..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Fasilitas
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {facilityOptions.map((facility) => {
                    const isSelected =
                      facilitiesInput
                        .split(",")
                        .map((f) => f.trim())
                        .includes(facility);
                    return (
                      <button
                        key={facility}
                        onClick={() => handleToggleFacility(facility)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-brand-gold text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {facility}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-lg border border-gray-300 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-brand-gold py-2 font-semibold text-white transition-all hover:opacity-90"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-brand-dark">
              Hapus Lapangan?
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Tindakan ini tidak dapat dibatalkan. Semua lapangan akan dihapus
              secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white transition-all hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FieldManagement;

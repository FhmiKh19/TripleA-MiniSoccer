import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { getStorageUrl } from "../../utils/storageUrl";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);

  const facilityOptions = [
    "Rumput sintetis",
    "Lampu malam",
    "Parkir",
    "Toilet",
    "Bola",
    "Ruang istirahat",
    "Kantin",
  ];

  const resetImageState = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleOpenModal = (field = null) => {
    if (field) {
      setEditingId(field.id);
      setFormData(field);
      setFacilitiesInput(field.facilities.join(", "));
      setImagePreview(field.image ? getStorageUrl(field.image) : null);
      setImageFile(null);
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
      resetImageState();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    resetImageState();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else if (editingId) {
      const current = fieldList.find((f) => f.id === editingId);
      setImagePreview(current?.image ? getStorageUrl(current.image) : null);
    } else {
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Nama lapangan harus diisi.");
      return;
    }

    if (!formData.description) {
      alert("Deskripsi lapangan harus diisi.");
      return;
    }

    if (!editingId && !imageFile) {
      alert("Foto lapangan harus diunggah.");
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

    setSaving(true);
    try {
      if (editingId) {
        await updateField(editingId, dataToSave, imageFile);
        alert("Lapangan berhasil diperbarui!");
      } else {
        await addField(dataToSave, imageFile);
        alert("Lapangan berhasil ditambahkan!");
      }
      handleCloseModal();
    } catch {
      alert("Gagal menyimpan lapangan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteField(id);
      setShowDeleteConfirm(null);
      alert("Lapangan berhasil dihapus!");
    } catch {
      alert("Gagal menghapus lapangan.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Tersedia" ? "Nonaktif" : "Tersedia";
    try {
      await updateField(id, { status: newStatus });
      alert(`Status lapangan berhasil diubah menjadi ${newStatus}!`);
    } catch {
      alert("Gagal mengubah status lapangan.");
    }
  };

  const handleToggleFacility = (facility) => {
    const facilities = facilitiesInput.split(",").map((f) => f.trim()).filter(Boolean);
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
      <PageHeader
        title="Kelola Lapangan"
        subtitle="Tambah, edit, dan kelola data lapangan"
        action={
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="btn-gold shrink-0 px-5 py-2.5 text-sm"
          >
            Tambah Lapangan Baru
          </button>
        }
      />

      {fieldList.length === 0 ? (
        <div className="premium-card py-12 text-center text-gray-400">
          Belum ada lapangan terdaftar.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fieldList.map((field) => {
            const imageUrl = getStorageUrl(field.image);

            return (
              <div key={field.id} className="premium-card overflow-hidden">
                <div className="mb-4 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-brand-dark text-gray-500">
                  {imageUrl ? (
                    <img src={imageUrl} alt={field.name} className="h-full w-full object-cover" />
                  ) : (
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth="2" />
                      <path strokeWidth="2" d="M8 10l2-2 4 0 2 2-1 3-3-2-3-2z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{field.name}</h3>
                <p className="mb-2 text-sm text-gray-400">{field.type}</p>
                <p className="mb-3 line-clamp-2 text-xs text-gray-500">{field.description}</p>
                <StatusBadge status={field.status} />
                <div className="mt-3 flex flex-wrap gap-1">
                  {field.facilities.slice(0, 2).map((facility, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-brand-gold/20 px-2 py-1 text-xs text-brand-gold"
                    >
                      {facility}
                    </span>
                  ))}
                  {field.facilities.length > 2 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{field.facilities.length - 2} lainnya
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(field)}
                    className="rounded-md bg-blue-500/15 px-3 py-1.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/25"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(field.id, field.status)}
                    className="rounded-md bg-amber-500/15 px-3 py-1.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/25"
                  >
                    {field.status === "Tersedia" ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(field.id)}
                    className="rounded-md bg-red-500/15 px-3 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/25"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="premium-card max-h-[90vh] w-full max-w-md overflow-y-auto p-6">
            <h3 className="mb-4 text-lg font-bold text-white">
              {editingId ? "Edit Lapangan" : "Tambah Lapangan Baru"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Nama Lapangan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Lapangan A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="premium-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-300">Tipe</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="premium-select"
                  >
                    <option>Outdoor</option>
                    <option>Indoor</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-300">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="premium-select"
                  >
                    <option>Tersedia</option>
                    <option>Nonaktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">Deskripsi</label>
                <textarea
                  placeholder="Deskripsi lapangan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="premium-input resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Foto Lapangan {!editingId && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-brand-border bg-brand-surface p-2 text-sm text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-brand-gold file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-brand-dark"
                />
                {imagePreview && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-brand-border">
                    <img
                      src={imagePreview}
                      alt="Preview lapangan"
                      className="max-h-44 w-full object-cover"
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Format JPG/PNG, maksimal 2 MB</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">Fasilitas</label>
                <div className="flex flex-wrap gap-2">
                  {facilityOptions.map((facility) => {
                    const isSelected = facilitiesInput
                      .split(",")
                      .map((f) => f.trim())
                      .includes(facility);
                    return (
                      <button
                        key={facility}
                        type="button"
                        onClick={() => handleToggleFacility(facility)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-brand-gold text-brand-dark"
                            : "bg-brand-surface text-gray-300 hover:bg-brand-border"
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
                type="button"
                onClick={handleCloseModal}
                className="btn-dark flex-1"
                disabled={saving}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="btn-gold flex-1 disabled:opacity-60"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="premium-card w-full max-w-sm p-6">
            <h3 className="mb-2 text-lg font-bold text-white">Hapus Lapangan?</h3>
            <p className="mb-6 text-sm text-gray-400">
              Tindakan ini tidak dapat dibatalkan. Lapangan akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(null)}
                className="btn-dark flex-1"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
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

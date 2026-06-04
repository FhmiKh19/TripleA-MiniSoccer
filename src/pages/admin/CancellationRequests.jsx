import { useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";

const filters = ["Semua", "Menunggu Konfirmasi", "Selesai"];
const cancellations = [
  { id: "TRX-501", customer: "Guntur", field: "Lapangan A", schedule: "14 Mei 18:00", reason: "Tim tidak lengkap", status: "Menunggu Konfirmasi Pembatalan" },
  { id: "TRX-502", customer: "Nadia", field: "Lapangan C", schedule: "14 Mei 20:00", reason: "Cuaca tidak mendukung", status: "Menunggu Konfirmasi Pembatalan" },
  { id: "TRX-503", customer: "Bagas", field: "Lapangan B", schedule: "15 Mei 17:00", reason: "Salah pilih jadwal", status: "Disetujui" },
  { id: "TRX-504", customer: "Sinta", field: "Lapangan D", schedule: "15 Mei 19:00", reason: "Keperluan pribadi", status: "Menunggu Konfirmasi Pembatalan" },
  { id: "TRX-505", customer: "Adnan", field: "Lapangan E", schedule: "16 Mei 16:00", reason: "Cedera", status: "Ditolak" },
];

function CancellationRequests() {
  const [activeFilter, setActiveFilter] = useState("All");
  const data =
    activeFilter === "Semua"
      ? cancellations
      : activeFilter === "Menunggu Konfirmasi"
        ? cancellations.filter((item) => item.status === "Menunggu Konfirmasi Pembatalan")
        : cancellations.filter((item) => item.status !== "Menunggu Konfirmasi Pembatalan");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter ? "bg-brand-gold text-brand-dark" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">ID Transaksi</th>
                <th className="px-4 py-3 text-left">Pelanggan</th>
                <th className="px-4 py-3 text-left">Lapangan</th>
                <th className="px-4 py-3 text-left">Jadwal</th>
                <th className="px-4 py-3 text-left">Alasan</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-brand-dark">{item.id}</td>
                  <td className="px-4 py-3">{item.customer}</td>
                  <td className="px-4 py-3">{item.field}</td>
                  <td className="px-4 py-3">{item.schedule}</td>
                  <td className="px-4 py-3">{item.reason}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-green-700">Setujui Pembatalan</button>
                      <button className="rounded bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-red-700">Tolak Pembatalan</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CancellationRequests;

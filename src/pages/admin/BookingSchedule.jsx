import { useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";

const filters = ["Hari Ini", "Besok", "Minggu Ini"];
const schedules = [
  { no: 1, id: "TRX-1201", customer: "Aldo", field: "Lapangan A", date: "13 Mei", slot: "16:00-18:00", duration: "2 Jam", status: "Menunggu Pembayaran" },
  { no: 2, id: "TRX-1202", customer: "Bima", field: "Lapangan B", date: "13 Mei", slot: "18:00-19:00", duration: "1 Jam", status: "Menunggu Verifikasi" },
  { no: 3, id: "TRX-1203", customer: "Citra", field: "Lapangan C", date: "13 Mei", slot: "19:00-21:00", duration: "2 Jam", status: "Disetujui" },
  { no: 4, id: "TRX-1204", customer: "Dina", field: "Lapangan A", date: "14 Mei", slot: "17:00-18:00", duration: "1 Jam", status: "Ditolak" },
  { no: 5, id: "TRX-1205", customer: "Eko", field: "Lapangan D", date: "14 Mei", slot: "20:00-22:00", duration: "2 Jam", status: "Dibatalkan" },
  { no: 6, id: "TRX-1206", customer: "Fajar", field: "Lapangan E", date: "14 Mei", slot: "13:00-14:00", duration: "1 Jam", status: "Disetujui" },
  { no: 7, id: "TRX-1207", customer: "Gilang", field: "Lapangan B", date: "15 Mei", slot: "09:00-11:00", duration: "2 Jam", status: "Menunggu Verifikasi" },
  { no: 8, id: "TRX-1208", customer: "Hani", field: "Lapangan C", date: "15 Mei", slot: "21:00-22:00", duration: "1 Jam", status: "Menunggu Pembayaran" },
];

function BookingSchedule() {
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
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
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">ID Transaksi</th>
                <th className="px-4 py-3 text-left">Pelanggan</th>
                <th className="px-4 py-3 text-left">Lapangan</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Slot Waktu</th>
                <th className="px-4 py-3 text-left">Durasi</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-[#f0c04014]">
                  <td className="px-4 py-3">{row.no}</td>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3">{row.field}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.slot}</td>
                  <td className="px-4 py-3">{row.duration}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3">
                    <button className="font-semibold text-brand-gold transition-all duration-200 hover:text-brand-dark">Lihat</button>
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

export default BookingSchedule;

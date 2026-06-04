import { useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";

const tabs = ["Semua", "Menunggu Pembayaran", "Menunggu Verifikasi", "Disetujui", "Ditolak", "Dibatalkan"];
const rows = [
  { id: "TRX-20260001", status: "Menunggu Pembayaran" },
  { id: "TRX-20260002", status: "Menunggu Verifikasi" },
  { id: "TRX-20260003", status: "Disetujui" },
  { id: "TRX-20260004", status: "Ditolak" },
  { id: "TRX-20260005", status: "Disetujui" },
  { id: "TRX-20260006", status: "Dibatalkan" },
];

function BookingHistory() {
  const [tab, setTab] = useState("Semua");
  const data = tab === "Semua" ? rows : rows.filter((r) => r.status === tab);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-brand-dark">Riwayat Pesanan</h1>
      <div className="mb-6 flex flex-wrap gap-2">{tabs.map((t)=><button key={t} onClick={()=>setTab(t)} className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${tab===t?"bg-brand-gold font-semibold text-brand-dark":"text-gray-500 hover:text-brand-gold"}`}>{t}</button>)}</div>
      {data.map((item) => (
        <div key={item.id} className="mb-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between"><p className="text-sm font-bold text-brand-gold">{item.id}</p><StatusBadge status={item.status} /></div>
          <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm"><p className="font-medium text-brand-dark">🏟️ Lapangan A</p><p className="text-gray-600">📅 Jumat, 13 Mei 2026</p><p className="text-gray-600">⏰ 19:00 - 21:00 (2 Jam)</p><p className="font-semibold text-brand-gold">💰 Rp 160.000</p></div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            {item.status === "Menunggu Pembayaran" && <><button className="rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-semibold text-brand-dark">Upload Bukti Bayar</button><button className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600">Batalkan Pesanan</button></>}
            {item.status === "Menunggu Verifikasi" && <button className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600">Ajukan Pembatalan</button>}
            {item.status === "Disetujui" && <button className="rounded-lg border border-brand-dark px-3 py-1.5 text-xs font-semibold text-brand-dark">Lihat Detail</button>}
            {(item.status === "Ditolak" || item.status === "Dibatalkan") && <button className="rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-semibold text-brand-dark">Pesan Ulang</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;

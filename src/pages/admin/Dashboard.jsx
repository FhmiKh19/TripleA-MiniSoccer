import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

const cards = [
  { title: "Booking Hari Ini", value: "28", colorClass: "text-brand-gold" },
  { title: "Menunggu Verifikasi", value: "7", colorClass: "text-amber-500" },
  { title: "Lapangan Aktif", value: "6", colorClass: "text-green-600" },
  { title: "Pengajuan Pembatalan", value: "3", colorClass: "text-red-600" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => <StatCard key={item.title} title={item.title} value={item.value} colorClass={item.colorClass} icon={<span className="text-xl">●</span>} />)}
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-brand-dark text-xs uppercase text-brand-gold"><tr>{["No","ID Transaksi","Pelanggan","Lapangan","Jadwal","Status","Aksi"].map((h)=><th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead>
          <tbody>{Array.from({length:5}).map((_,i)=><tr key={i} className="border-b"><td className="px-4 py-3">{i+1}</td><td className="px-4 py-3 font-semibold text-brand-dark">TRX-10{i+1}</td><td className="px-4 py-3">Pelanggan {i+1}</td><td className="px-4 py-3">Lapangan A</td><td className="px-4 py-3">13 Mei 2026, 19:00</td><td className="px-4 py-3"><StatusBadge status="Menunggu Verifikasi" /></td><td className="px-4 py-3"><button className="rounded border border-brand-gold px-3 py-1 text-xs font-semibold text-brand-gold">Lihat</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

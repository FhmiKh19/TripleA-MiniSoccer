import StatusBadge from "../../components/ui/StatusBadge";

const chartData = [
  { month: "Jan", width: "40%", amount: "Rp 5.800.000" },
  { month: "Feb", width: "55%", amount: "Rp 7.975.000" },
  { month: "Mar", width: "70%", amount: "Rp 10.150.000" },
  { month: "Apr", width: "60%", amount: "Rp 8.700.000" },
  { month: "Mei", width: "85%", amount: "Rp 12.325.000" },
  { month: "Jun", width: "65%", amount: "Rp 9.425.000" },
];

function Dashboard() {
  return <div className="space-y-6">{/* content */}<div className="grid gap-4 md:grid-cols-3">
    {["Total Pendapatan Bulan Ini","Total Transaksi Berhasil","Total Jam Lapangan Tersewa"].map((title, i) => 
    <div key={title} className="rounded-xl border-l-4 border-brand-gold bg-brand-dark p-5 text-white shadow-md">
      <p className="text-sm">{title}</p><p className={`mt-2 text-3xl font-bold ${i===0?"text-brand-gold":"text-white"}`}>
        {i===0?"Rp 14.500.000":i===1?"87":"213 Jam"}</p></div>)}</div>
  <div className="rounded-xl bg-white p-6 shadow-sm"><h3 className="mb-6 font-semibold 
  text-brand-dark">Pendapatan 6 Bulan Terakhir</h3>{chartData.map((item)=><div key={item.month} 
  className="mb-3 flex items-center gap-3"><span className="w-12 text-xs text-gray-500">{item.month}</span>
  <div className="relative h-4 flex-1 rounded-full bg-gray-200"><div className="absolute left-0 top-0 h-4 rounded-full 
  bg-brand-gold transition-all hover:bg-brand-goldLight" style={{width:item.width}}/></div>
  <span className="w-28 text-right text-xs text-gray-600">{item.amount}</span></div>)}</div>
  <div className="overflow-hidden rounded-xl bg-white shadow-sm"><h3 className="px-6 py-4 font-semibold 
  text-brand-dark">Transaksi Terakhir yang Berhasil</h3><table className="w-full text-sm">
    <thead className="bg-brand-dark text-xs uppercase text-brand-gold">
      <tr>{["No","ID Transaksi","Nama Pelanggan","Lapangan","Tanggal","Durasi","Jumlah","Status"].map((h)=>
        <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr></thead><tbody>{Array.from({length:5}).map((_,i)=><tr key={i} className="border-b"><td className="px-4 py-3">{i+1}</td><td className="px-4 py-3 font-semibold text-brand-dark">TRX-300{i+1}</td><td className="px-4 py-3">Pelanggan {i+1}</td><td className="px-4 py-3">Lapangan A</td><td className="px-4 py-3">13 Mei 2026</td><td className="px-4 py-3">2 Jam</td><td className="px-4 py-3 text-brand-gold">Rp 160.000</td><td className="px-4 py-3"><StatusBadge status="Disetujui" /></td></tr>)}</tbody></table></div></div>;
}

export default Dashboard;

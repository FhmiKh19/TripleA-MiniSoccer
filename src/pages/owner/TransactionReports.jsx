import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";

const reportRows = Array.from({ length: 10 }).map((_, index) => ({
  no: index + 1,
  id: `TRX-7${100 + index}`,
  customer: ["Arman", "Bella", "Cahyo", "Dinda", "Erik", "Fina", "Guntur", "Hilda", "Indra", "Jihan"][index],
  field: `Field ${String.fromCharCode(65 + (index % 6))}`,
  date: `${10 + index} May 2026`,
  duration: `${(index % 3) + 1}h`,
  amount: `Rp ${(150 + index * 20).toLocaleString("id-ID")}.000`,
  status: index % 4 === 0 ? "Waiting Verification" : "Approved",
}));

function TransactionReports() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">Tanggal Mulai</label>
            <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-gold" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-600">Tanggal Selesai</label>
            <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-gold" />
          </div>
          <div className="flex items-end">
            <Button label="Terapkan Filter" variant="primary" className="px-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Pendapatan Periode Ini</p>
          <h3 className="mt-2 text-2xl font-extrabold text-brand-gold">Rp 125.400.000</h3>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <h3 className="mt-2 text-2xl font-extrabold text-brand-dark">126</h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-brand-dark text-brand-gold">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">ID Transaksi</th>
                <th className="px-4 py-3 text-left">Pelanggan</th>
                <th className="px-4 py-3 text-left">Lapangan</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Durasi</th>
                <th className="px-4 py-3 text-left">Jumlah</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{row.no}</td>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3">{row.field}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.duration}</td>
                  <td className="px-4 py-3 font-semibold text-brand-gold">{row.amount}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-2">
          <Button
            label="Ekspor ke PDF"
            variant="danger"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-4-4m4 4l4-4M5 5h14" />
              </svg>
            }
          />
          <Button
            label="Ekspor ke Excel"
            variant="success"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16M7 4v16M12 4v16M17 4v16" />
              </svg>
            }
          />
      </div>
    </div>
  );
}

export default TransactionReports;

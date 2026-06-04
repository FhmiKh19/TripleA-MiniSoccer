import { useState } from "react";
import Button from "../../components/ui/Button";

const tabs = ["Semua", "Menunggu Verifikasi", "Disetujui", "Ditolak"];
const payments = [
  { id: "TRX-3001", customer: "Budi", field: "Lapangan A", slot: "13 Mei, 18:00-20:00", amount: "Rp 360.000", status: "Menunggu Verifikasi" },
  { id: "TRX-3002", customer: "Raka", field: "Lapangan B", slot: "13 Mei, 19:00-20:00", amount: "Rp 200.000", status: "Disetujui" },
  { id: "TRX-3003", customer: "Nina", field: "Lapangan C", slot: "14 Mei, 17:00-19:00", amount: "Rp 340.000", status: "Ditolak" },
  { id: "TRX-3004", customer: "Rafi", field: "Lapangan D", slot: "14 Mei, 20:00-21:00", amount: "Rp 190.000", status: "Menunggu Verifikasi" },
  { id: "TRX-3005", customer: "Sari", field: "Lapangan A", slot: "15 Mei, 16:00-18:00", amount: "Rp 360.000", status: "Disetujui" },
  { id: "TRX-3006", customer: "Iqbal", field: "Lapangan F", slot: "15 Mei, 21:00-22:00", amount: "Rp 160.000", status: "Ditolak" },
];

function VerifyPayment() {
  const [activeTab, setActiveTab] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const filteredPayments =
    activeTab === "Semua" ? payments : payments.filter((payment) => payment.status === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-5 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 pb-2 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab ? "border-brand-gold text-brand-gold" : "border-transparent text-gray-500 hover:text-brand-dark"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="relative rounded-xl bg-white p-4 shadow-sm">
            {(payment.status === "Disetujui" || payment.status === "Ditolak") && (
              <span
                className={`absolute right-3 top-3 rounded px-2 py-1 text-xs font-bold ${
                  payment.status === "Disetujui" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>
            )}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => setOpenModal(true)}
                className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-200 hover:bg-gray-200 sm:w-40"
              >
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4-4 4 4 8-8" />
                </svg>
              </button>
              <div className="flex-1 space-y-1">
                <p className="font-bold text-brand-dark">{payment.id}</p>
                <p className="text-sm text-gray-600">Pelanggan: {payment.customer}</p>
                <p className="text-sm text-gray-600">Lapangan: {payment.field}</p>
                <p className="text-sm text-gray-600">Slot Waktu: {payment.slot}</p>
                <p className="font-bold text-brand-gold">{payment.amount}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button label="Setujui" variant="success" className="w-full justify-center" />
              <Button label="Tolak" variant="danger" className="w-full justify-center" />
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-dark">Bukti Pembayaran</h3>
              <button onClick={() => setOpenModal(false)} className="rounded bg-red-50 px-3 py-1 text-red-600">
                Tutup
              </button>
            </div>
            <div className="flex h-80 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
              <span className="text-lg font-semibold">Placeholder Bukti Pembayaran</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPayment;

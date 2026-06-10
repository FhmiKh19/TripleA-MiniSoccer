import { useState } from "react";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatRupiah, payments } from "../../data/seeder";

const tabs = ["Semua", "Menunggu Verifikasi DP", "DP Sudah Dibayar", "Lunas", "Ditolak"];

function VerifyPayment() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments =
    activeTab === "Semua"
      ? payments
      : payments.filter((payment) => payment.paymentStatus === activeTab);

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
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-brand-gold">{payment.bookingCode}</p>
                <p className="text-sm text-gray-600">Verifikasi DP</p>
              </div>
              <StatusBadge status={payment.paymentStatus} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Nama Customer</p>
                <p className="mt-2 font-semibold text-brand-dark">{payment.customerName}</p>
                <p className="text-sm text-gray-500">Lapangan: {payment.fieldName}</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
                <p className="text-sm text-gray-500">{payment.startTime} - {payment.endTime}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Metode Pembayaran</p>
                <p className="mt-2 font-semibold text-brand-dark">{payment.paymentMethod}</p>
                <p className="mt-4 text-sm text-gray-500">Bank: {payment.bankName}</p>
                <p className="text-sm text-gray-500">Akun: {payment.accountName}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Total Harga</p>
                <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(payment.totalPrice)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">DP 50%</p>
                <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(payment.downPayment)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Sisa Bayar</p>
                <p className="mt-2 font-semibold text-brand-gold">{formatRupiah(payment.remainingPayment)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPayment(payment);
                  setOpenModal(true);
                }}
                className="rounded-lg border border-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark transition-all duration-200 hover:bg-brand-gold hover:text-brand-dark"
              >
                Lihat Bukti DP
              </button>
              <button className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark transition-all duration-200 hover:bg-brand-goldLight">
                Verifikasi DP
              </button>
            </div>

            {payment.adminNote && (
              <p className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Catatan Admin: {payment.adminNote}
              </p>
            )}
          </div>
        ))}
      </div>

      {openModal && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-dark">Bukti DP - {selectedPayment.bookingCode}</h3>
              <button onClick={() => setOpenModal(false)} className="rounded bg-red-50 px-3 py-1 text-red-600">
                Tutup
              </button>
            </div>
            <img
              src={selectedPayment.proofImage}
              alt="Bukti Pembayaran"
              className="h-80 w-full rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPayment;

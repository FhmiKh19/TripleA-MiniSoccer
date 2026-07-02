import { useMemo, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";
import { getStorageUrl } from "../../utils/storageUrl";

const tabs = ["Semua", "Menunggu Verifikasi DP", "DP Sudah Dibayar", "Lunas"];

function VerifyPayment() {
  const { bookingList, verifyPayment } = useAppData();
  const [activeTab, setActiveTab] = useState("Menunggu Verifikasi DP");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [previewProof, setPreviewProof] = useState(null);

  const pendingBookings = useMemo(() => {
    let list = bookingList.filter(
      (b) =>
        b.paymentStatus === "Menunggu Verifikasi DP" ||
        b.paymentStatus === "DP Sudah Dibayar" ||
        b.paymentStatus === "Lunas"
    );

    if (activeTab !== "Semua") {
      list = list.filter((b) => b.paymentStatus === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.bookingCode?.toLowerCase().includes(q) ||
          b.customerName?.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => b.id - a.id);
  }, [bookingList, activeTab, search]);

  const handleVerifyDP = async (booking) => {
    setLoadingId(booking.id);
    try {
      await verifyPayment(booking.id, "approve");
    } catch {
      alert("Gagal verifikasi DP.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleSettle = async (booking) => {
    setLoadingId(booking.id);
    try {
      await verifyPayment(booking.id, "settle");
    } catch {
      alert("Gagal mencatat pelunasan.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleComplete = async (booking) => {
    setLoadingId(booking.id);
    try {
      await verifyPayment(booking.id, "complete");
    } catch {
      alert("Gagal menandai selesai.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verifikasi Pembayaran"
        subtitle="Kelola DP 50% dan pelunasan saat tim datang ke lapangan"
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Cari nama tim atau kode booking (TRPA-...)"
      />

      <div className="flex flex-wrap gap-2 border-b border-brand-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-brand-gold text-brand-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {pendingBookings.length === 0 ? (
          <div className="premium-card col-span-full py-12 text-center text-gray-400">
            Tidak ada pesanan ditemukan.
          </div>
        ) : (
          pendingBookings.map((booking) => {
            const proofUrl = getStorageUrl(booking.paymentProof);

            return (
              <div key={booking.id} className="premium-card p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-brand-gold">{booking.bookingCode}</p>
                    <p className="text-sm text-gray-400">{booking.customerName}</p>
                  </div>
                  <StatusBadge status={booking.paymentStatus} />
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-xl border border-brand-border bg-brand-dark p-4">
                    <p className="text-gray-500">Lapangan & Jadwal</p>
                    <p className="mt-1 font-semibold text-white">{booking.fieldName}</p>
                    <p className="text-gray-400">{booking.date}</p>
                    <p className="text-gray-400">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-border bg-brand-dark p-4">
                    <p className="text-gray-500">Pembayaran</p>
                    <p className="mt-1 text-brand-gold">DP: {formatRupiah(booking.downPayment)}</p>
                    <p className="text-gray-400">Sisa: {formatRupiah(booking.remainingPayment)}</p>
                  </div>
                </div>

                {proofUrl ? (
                  <div className="mt-4 rounded-xl border border-brand-border bg-brand-dark p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-400">Bukti Pembayaran</p>
                    <button
                      type="button"
                      onClick={() => setPreviewProof(proofUrl)}
                      className="group block w-full overflow-hidden rounded-lg border border-brand-border"
                    >
                      <img
                        src={proofUrl}
                        alt={`Bukti ${booking.bookingCode}`}
                        className="max-h-40 w-full object-contain bg-black/30 transition group-hover:opacity-90"
                      />
                    </button>
                    <p className="mt-2 text-xs text-gray-500">Klik gambar untuk memperbesar</p>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-brand-border bg-brand-dark/50 p-4 text-center text-sm text-gray-500">
                    Belum ada bukti pembayaran diunggah
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.paymentStatus === "Menunggu Verifikasi DP" && (
                    <button
                      type="button"
                      onClick={() => handleVerifyDP(booking)}
                      disabled={loadingId === booking.id}
                      className="btn-gold flex-1 text-sm disabled:opacity-60"
                    >
                      {loadingId === booking.id ? "Memproses..." : "Verifikasi DP"}
                    </button>
                  )}
                  {booking.paymentStatus === "DP Sudah Dibayar" && (
                    <button
                      type="button"
                      onClick={() => handleSettle(booking)}
                      disabled={loadingId === booking.id}
                      className="btn-gold flex-1 text-sm disabled:opacity-60"
                    >
                      {loadingId === booking.id ? "Memproses..." : "Catat Pelunasan"}
                    </button>
                  )}
                  {booking.paymentStatus === "Lunas" && booking.bookingStatus === "Dikonfirmasi" && (
                    <button
                      type="button"
                      onClick={() => handleComplete(booking)}
                      disabled={loadingId === booking.id}
                      className="btn-gold flex-1 text-sm disabled:opacity-60"
                    >
                      {loadingId === booking.id ? "Memproses..." : "Tandai Selesai"}
                    </button>
                  )}
                  {booking.bookingStatus === "Selesai" && (
                    <span className="flex-1 rounded-lg bg-green-500/10 py-2 text-center text-sm font-semibold text-green-400">
                      Lunas & Selesai
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {previewProof && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewProof(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewProof(null)}
              className="absolute -right-2 -top-10 rounded-lg bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
            >
              Tutup
            </button>
            <img
              src={previewProof}
              alt="Bukti pembayaran"
              className="max-h-[85vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPayment;

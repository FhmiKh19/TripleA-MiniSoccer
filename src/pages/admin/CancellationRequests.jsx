import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { formatRupiah } from "../../data/seeder";
import Modal from "../../components/ui/Modal";

function CancellationRequests() {
  const { cancellationList, confirmCancellation } = useAppData();
  const [showConfirm, setShowConfirm]   = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading]           = useState(false);

  const pendingCancellations = cancellationList.filter(
    (c) => c.status === "Menunggu Konfirmasi"
  );

  const handleAction = async (cancellation, action) => {
    setLoading(true);
    try {
      await confirmCancellation(cancellation.id, action);
      setShowConfirm(null);
    } catch {
      alert("Gagal memproses pembatalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Admin Panel</p>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
          Pengajuan Pembatalan
        </h1>
        <p className="mt-0.5 text-sm text-slate-400">
          {pendingCancellations.length} pengajuan menunggu konfirmasi
        </p>
      </div>

      {pendingCancellations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
             style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)" }}>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
               style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.1)" }}>
            ✓
          </div>
          <p className="text-base font-semibold text-white">Semua Bersih!</p>
          <p className="mt-1 text-sm text-slate-500">Tidak ada pengajuan pembatalan yang menunggu.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingCancellations.map((item) => (
            <div key={item.id}
              className="overflow-hidden rounded-2xl transition-all duration-200"
              style={{ background: "linear-gradient(180deg, #141B28 0%, #0F1520 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>

              {/* Card header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                   style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-brand-dark"
                       style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)" }}>
                    {item.customerName?.charAt(0) || "?"}
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-brand-gold">{item.bookingCode}</p>
                    <p className="text-xs text-slate-400">{item.customerName}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
                      style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B" }}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                  Menunggu Konfirmasi
                </span>
              </div>

              {/* Card body */}
              <div className="grid gap-3 p-6 md:grid-cols-3">
                {/* Field info */}
                <div className="rounded-xl p-4 md:col-span-2"
                     style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Detail Booking</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Lapangan</p>
                      <p className="mt-0.5 font-bold text-white">{item.fieldName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tanggal</p>
                      <p className="mt-0.5 font-bold text-white">{item.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Jam</p>
                      <p className="mt-0.5 font-semibold text-white">{item.startTime} – {item.endTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Durasi</p>
                      <p className="mt-0.5 font-semibold text-white">{item.duration || 1} Jam</p>
                    </div>
                  </div>
                </div>

                {/* Price info */}
                <div className="rounded-xl p-4"
                     style={{ background: "linear-gradient(135deg, #0A0F1A, #141B28)", border: "1px solid rgba(240,165,0,0.12)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Pembayaran</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Total</span>
                      <span className="font-black text-brand-gold">{formatRupiah(item.totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">DP</span>
                      <span className="font-semibold text-white">{formatRupiah(item.downPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="mx-6 mb-4 rounded-xl p-4"
                   style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-red-500/60">Alasan Pembatalan</p>
                <p className="text-sm text-slate-300">{item.reason}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 pb-5">
                <button
                  onClick={() => { setShowConfirm(item.id); setConfirmAction("setujui"); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200"
                  style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", color: "#34D399" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(52,211,153,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(52,211,153,0.12)"; }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Setujui Pembatalan
                </button>
                <button
                  onClick={() => { setShowConfirm(item.id); setConfirmAction("tolak"); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#F87171" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Tolak Pembatalan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONFIRM MODAL ── */}
      <Modal
        open={!!showConfirm}
        onClose={() => setShowConfirm(null)}
        title={confirmAction === "setujui" ? "Setujui Pembatalan?" : "Tolak Pembatalan?"}
        size="sm"
        footer={
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(null)} disabled={loading}
              className="btn-ghost flex-1">Batal</button>
            <button
              onClick={() => {
                const c = pendingCancellations.find((x) => x.id === showConfirm);
                if (c) handleAction(c, confirmAction);
              }}
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold disabled:opacity-60"
              style={{
                background: confirmAction === "setujui" ? "rgba(52,211,153,0.15)" : "rgba(239,68,68,0.15)",
                border: `1px solid ${confirmAction === "setujui" ? "rgba(52,211,153,0.3)" : "rgba(239,68,68,0.3)"}`,
                color: confirmAction === "setujui" ? "#34D399" : "#F87171",
              }}
            >
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" /> Memproses...</>
              ) : confirmAction === "setujui" ? "✓ Ya, Setujui" : "✕ Ya, Tolak"}
            </button>
          </div>
        }
      >
        <div className="py-2">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
               style={{
                 background: confirmAction === "setujui" ? "rgba(52,211,153,0.12)" : "rgba(239,68,68,0.12)",
                 border: `1px solid ${confirmAction === "setujui" ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)"}`,
               }}>
            {confirmAction === "setujui" ? "✓" : "✕"}
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            {confirmAction === "setujui"
              ? "Status booking akan diubah menjadi 'Dibatalkan' dan tidak dapat dikembalikan."
              : "Booking akan tetap aktif dan pengajuan pembatalan ini akan ditolak."}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default CancellationRequests;

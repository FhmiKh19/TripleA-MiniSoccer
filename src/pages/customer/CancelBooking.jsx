function CancelBooking() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">Ajukan Pembatalan</h1>
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div className="mx-auto w-fit text-red-500">⚠️</div>
        <h2 className="mt-4 text-xl font-bold text-brand-dark">Ajukan Pembatalan Pesanan?</h2>
        <p className="mt-2 text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan. Pesanan Anda akan masuk ke antrian konfirmasi pembatalan oleh Admin.</p>
      </div>
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-semibold text-brand-dark">Detail Pesanan</h3>
        <div className="space-y-2 text-sm"><p className="flex justify-between"><span>ID Transaksi</span><span>TRX-20260002</span></p><p className="flex justify-between"><span>Lapangan</span><span>Lapangan A</span></p><p className="flex justify-between"><span>Jadwal</span><span>Jumat, 13 Mei 2026 | 19:00 - 21:00</span></p><p className="flex justify-between"><span>Total Dibayar</span><span className="font-bold text-brand-gold">Rp 160.000</span></p></div>
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">Alasan Pembatalan (opsional)</label>
        <textarea className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold" placeholder="Tuliskan alasan pembatalan Anda di sini..." />
        <button className="mt-4 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700">Batalkan Pesanan</button>
        <button className="mt-3 w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-brand-dark transition-colors hover:border-brand-gold">Kembali</button>
      </div>
    </div>
  );
}

export default CancelBooking;

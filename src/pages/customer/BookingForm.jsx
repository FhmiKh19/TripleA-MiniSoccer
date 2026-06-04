function BookingForm() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-brand-dark">Form Pemesanan</h1>
      <p className="mb-6 mt-1 text-xs text-gray-500">Beranda / Lapangan / Lapangan A / Pemesanan</p>
      <div className="mb-6 flex flex-wrap gap-2 text-sm font-semibold">{["📍 Lapangan A","📅 Jumat, 13 Mei 2026","⏰ 19:00"].map((c)=><span key={c} className="rounded-full bg-brand-gold px-4 py-1 text-brand-dark">{c}</span>)}</div>
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="grid gap-4">
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Nama Lengkap</label><input readOnly value="Yudha Aryawan" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Nomor Telepon</label><input placeholder="08xx-xxxx-xxxx" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold" /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Pilih Lapangan</label><select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"><option>Lapangan A</option><option>Lapangan B</option><option>Lapangan C</option></select></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Bermain</label><input type="date" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Jam Mulai</label><input type="time" defaultValue="19:00" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Durasi</label><select defaultValue="2 Jam" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"><option>1 Jam</option><option>2 Jam</option><option>3 Jam</option></select></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Jam Selesai</label><input readOnly value="21:00" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm" /></div>
        </div>
        <div className="mt-6 rounded-lg border-l-4 border-brand-gold bg-amber-50 p-5">
          <p className="flex justify-between text-sm"><span>Harga Lapangan</span><span>Rp 80.000 / jam</span></p>
          <p className="mt-2 flex justify-between text-sm"><span>Durasi</span><span>2 Jam</span></p>
          <div className="my-3 border-t border-gray-200" />
          <p className="flex justify-between"><span>Total Pembayaran</span><span className="text-xl font-bold text-brand-gold">Rp 160.000</span></p>
        </div>
        <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-700">⚠️ Selesaikan pembayaran dalam 30 menit setelah pesanan dibuat, atau pesanan akan otomatis dibatalkan.</div>
        <button className="mt-6 w-full rounded-lg bg-brand-dark py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-gold hover:text-brand-dark">Buat Pesanan →</button>
      </div>
    </div>
  );
}

export default BookingForm;

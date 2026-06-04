function CustomerFooter() {
  return (
    <footer className="bg-brand-dark px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-3xl font-black text-brand-gold">3A</p>
          <p className="font-semibold">Triple A Minisoccer</p>
          <p className="mt-2 text-sm text-gray-400">Pesan lapangan kapan saja, di mana saja.</p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-brand-gold">Navigasi</p>
          <a className="mb-1 block text-sm text-gray-400 transition-colors hover:text-brand-gold">Beranda</a>
          <a className="mb-1 block text-sm text-gray-400 transition-colors hover:text-brand-gold">Pesan Lapangan</a>
          <a className="mb-1 block text-sm text-gray-400 transition-colors hover:text-brand-gold">Riwayat Pesanan</a>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-brand-gold">Kontak</p>
          <p className="text-sm text-gray-400">📍 Pekanbaru, Riau</p>
          <p className="text-sm text-gray-400">📞 0812-3456-7890</p>
          <p className="text-sm text-gray-400">✉️ admin@3aminisoccer.id</p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © 2026 Triple A Minisoccer. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}

export default CustomerFooter;

import AppLogo from "../ui/AppLogo";

function CustomerFooter() {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0A0F1A 0%, #080C14 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Glow top */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(240,165,0,0.3), transparent)' }} />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                   style={{ background: 'linear-gradient(135deg, #F0A500, #FFD166)' }}>
                <img src="/images/logo.png" alt="logo" className="h-8 w-8 rounded-lg object-cover" />
              </div>
              <div>
                <p className="text-lg font-black text-brand-gold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Triple A</p>
                <p className="text-xs uppercase tracking-widest text-slate-600">Minisoccer</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Platform booking lapangan mini soccer terpercaya. Pesan lapangan favoritmu kapan saja, di mana saja.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { label: "IG", icon: "📸" },
                { label: "WA", icon: "💬" },
                { label: "TK", icon: "🎵" },
              ].map((s) => (
                <button key={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-sm transition-all hover:scale-110"
                  style={{ background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.15)' }}>
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-gold">Navigasi</p>
            <div className="space-y-2.5">
              {["Beranda", "Pesan Lapangan", "Riwayat Pesanan", "Daftar Harga"].map((item) => (
                <a key={item} href="#"
                  className="block text-sm text-slate-400 transition-colors hover:text-brand-gold">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-gold">Kontak</p>
            <div className="space-y-3">
              {[
                { icon: "📍", text: "Pekanbaru, Riau" },
                { icon: "📞", text: "0812-3456-7890" },
                { icon: "✉️", text: "admin@3aminisoccer.id" },
                { icon: "🕐", text: "07.00 – 23.00 WIB" },
              ].map((c) => (
                <div key={c.text} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <span className="mt-0.5 shrink-0">{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
             style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
          <p className="text-xs text-slate-600">© 2026 Triple A Minisoccer. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            {["Privasi", "Syarat & Ketentuan", "FAQ"].map((link) => (
              <a key={link} href="#" className="text-xs text-slate-600 hover:text-slate-300 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomerFooter;

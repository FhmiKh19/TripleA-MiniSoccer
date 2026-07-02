function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark p-4">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />
        <div className="absolute -right-20 top-1/3 h-[300px] w-[300px] rounded-full bg-brand-gold/4 blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,165,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl animate-fade-in overflow-hidden rounded-3xl shadow-card-lg lg:grid-cols-[1.1fr_1fr]"
           style={{ border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* ── LEFT PANEL ── */}
        <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-brand-surface p-12 lg:flex">
          {/* Decorative orbs */}
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-500/8 blur-2xl" />
          </div>

          {/* Soccer field illustration */}
          <div className="animate-float relative mb-8 flex h-40 w-40 items-center justify-center rounded-3xl"
               style={{ background: 'linear-gradient(135deg, rgba(240,165,0,0.15), rgba(240,165,0,0.05))', border: '1px solid rgba(240,165,0,0.2)' }}>
            <span className="text-7xl drop-shadow-lg">⚽</span>
          </div>

          {/* Logo text */}
          <div className="relative z-10 text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <img src="/images/logo.png" alt="logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-gold/40" />
              <p className="text-2xl font-black tracking-tight text-brand-gold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Triple A
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase">Minisoccer</p>
          </div>

          {/* Tagline */}
          <div className="relative z-10 mt-8 text-center">
            <h2 className="text-xl font-bold text-white leading-snug">
              Booking Lapangan<br />
              <span className="gradient-text">Lebih Mudah & Cepat</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xs">
              Pesan jadwal, bayar DP, dan mainkan pertandingan favoritmu. Kapan saja, di mana saja.
            </p>
          </div>

          {/* Feature pills */}
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2">
            {['Jadwal Real-Time', 'Bayar DP 50%', 'Booking Instan'].map((f) => (
              <span key={f} className="badge-gold text-xs">{f}</span>
            ))}
          </div>

          {/* Bottom divider glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex items-center justify-center bg-brand-card p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

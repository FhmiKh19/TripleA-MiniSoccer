import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Beranda",
    to: "/customer",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4.5 10.5V21h5v-6h5v6h5V10.5" />
      </svg>
    ),
  },
  {
    label: "Pesan Lapangan",
    to: "/customer/booking-form",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Riwayat",
    to: "/customer/history",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function CustomerNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-card" : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(8, 12, 20, 0.95)"
          : "rgba(8, 12, 20, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg"
               style={{ background: 'linear-gradient(135deg, #F0A500, #FFD166)' }}>
            <img src="/images/logo.png" alt="logo" className="h-6 w-6 rounded-md object-cover" />
          </div>
          <div>
            <p className="text-sm font-black leading-tight text-brand-gold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Triple A</p>
            <p className="text-[9px] uppercase tracking-widest text-slate-600">Minisoccer</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/customer"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          {/* Avatar + dropdown */}
          <button
            onClick={() => setOpenDropdown((v) => !v)}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all hover:bg-white/6"
          >
            <div className="avatar-gold h-8 w-8 rounded-xl text-sm font-bold">
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-white leading-tight">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-500">Customer</p>
            </div>
            <svg className="hidden h-3.5 w-3.5 text-slate-500 sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpenMenu((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/8 hover:text-white md:hidden transition-colors"
          >
            {openMenu
              ? <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>

          {/* Desktop dropdown */}
          {openDropdown && (
            <>
              <button className="fixed inset-0 z-10" onClick={() => setOpenDropdown(false)} />
              <div className="animate-slide-down absolute right-0 top-12 z-20 min-w-52 rounded-2xl p-1 shadow-card-lg"
                style={{ background: '#141B28', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
                  <p className="text-xs text-slate-400">Customer</p>
                </div>
                <div className="p-1">
                  <NavLink to="/customer/history" onClick={() => setOpenDropdown(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-300 transition-all hover:bg-white/6 hover:text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Riwayat Pesanan
                  </NavLink>
                  <button onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-400 transition-all hover:bg-red-500/10">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Keluar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {openMenu && (
        <div className="animate-slide-down px-4 pb-4 md:hidden"
             style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mt-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/customer"}
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-gold/10 text-brand-gold"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            <div className="my-2 divider-gold" />
            <button onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default CustomerNavbar;

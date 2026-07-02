import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Topbar({ pageTitle, onMenuClick, extra }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 md:px-6"
      style={{
        background: 'rgba(8, 12, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/8 hover:text-white lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-bold text-white md:text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: extra + avatar */}
      <div className="relative flex items-center gap-3">
        {extra}

        {/* Notification bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/8 hover:text-white">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 animate-pulse-gold rounded-full bg-brand-gold" />
        </button>

        {/* Avatar button */}
        <button
          type="button"
          onClick={() => setOpenDropdown((v) => !v)}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all hover:bg-white/6"
        >
          <div className="avatar-gold h-8 w-8 rounded-lg text-xs font-bold">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold text-white leading-tight">{currentUser?.name || "User"}</p>
            <p className="text-[10px] capitalize text-slate-500">{currentUser?.role || "User"}</p>
          </div>
          <svg className="h-3.5 w-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {openDropdown && (
          <>
            <button className="fixed inset-0 z-10" onClick={() => setOpenDropdown(false)} />
            <div className="animate-slide-down absolute right-0 top-12 z-20 min-w-52 rounded-2xl p-1 shadow-card-lg"
              style={{ background: '#141B28', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
                <p className="text-xs capitalize text-slate-400">{currentUser?.role}</p>
              </div>
              <div className="p-1">
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
    </header>
  );
}

export default Topbar;

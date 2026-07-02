import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ownerNav = [
  {
    label: "Dasbor",
    to: "/owner",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 12l9-9 9 9M4.5 10.5V21h5v-6h5v6h5V10.5" />
      </svg>
    ),
  },
  {
    label: "Laporan Transaksi",
    to: "/owner/reports",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 17v-4m3 4V7m3 10v-6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function OwnerSidebar({ onClose }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <aside className="flex h-full w-[260px] flex-col" style={{
      background: 'linear-gradient(180deg, #0F1520 0%, #080C14 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl"
             style={{ background: 'linear-gradient(135deg, #F0A500, #FFD166)' }}>
          <img src="/images/logo.png" alt="logo" className="h-7 w-7 rounded-lg object-cover" />
        </div>
        <div>
          <p className="text-sm font-black text-brand-gold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Triple A</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Owner Panel</p>
        </div>
        <button onClick={onClose} className="ml-auto rounded-lg p-1 text-slate-600 hover:text-slate-300 lg:hidden transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Menu Utama</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {ownerNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/owner"}
            onClick={onClose}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <div className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3"
             style={{ background: 'rgba(240,165,0,0.06)', border: '1px solid rgba(240,165,0,0.1)' }}>
          <div className="avatar-gold h-9 w-9 shrink-0 rounded-xl text-sm">
            {currentUser?.name?.charAt(0).toUpperCase() || "O"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{currentUser?.name || "Owner"}</p>
            <span className="badge-gold text-[10px]">Owner</span>
          </div>
        </div>
        <button type="button" onClick={handleLogout} className="btn-danger w-full justify-center py-2.5 text-xs">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default OwnerSidebar;

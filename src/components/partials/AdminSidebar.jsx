import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminNav = [
  {
    label: "Dasbor",
    to: "/admin",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 12l9-9 9 9M4.5 10.5V21h5v-6h5v6h5V10.5" />
      </svg>
    ),
  },
  {
    label: "Kelola Lapangan",
    to: "/admin/fields",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    label: "Jadwal Booking",
    to: "/admin/schedule",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M8 2v3m8-3v3M4 9h16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    label: "Verifikasi Pembayaran",
    to: "/admin/verify-payment",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Pengajuan Pembatalan",
    to: "/admin/cancellations",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M10 14l4-4m0 4l-4-4m11 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function AdminSidebar({ onClose }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <aside className="flex h-full w-[260px] flex-col" style={{
      background: 'linear-gradient(180deg, #0F1520 0%, #080C14 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo area */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl"
             style={{ background: 'linear-gradient(135deg, #F0A500, #FFD166)' }}>
          <img src="/images/logo.png" alt="logo" className="h-7 w-7 rounded-lg object-cover" />
        </div>
        <div>
          <p className="text-sm font-black text-brand-gold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Triple A</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Admin Panel</p>
        </div>
        <button onClick={onClose} className="ml-auto rounded-lg p-1 text-slate-600 hover:text-slate-300 lg:hidden transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav section label */}
      <div className="px-6 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Menu Utama</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-3">
        {adminNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User profile + logout */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <div className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3"
             style={{ background: 'rgba(240,165,0,0.06)', border: '1px solid rgba(240,165,0,0.1)' }}>
          <div className="avatar-gold h-9 w-9 shrink-0 rounded-xl text-sm">
            {currentUser?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{currentUser?.name || "Admin"}</p>
            <span className="badge-gold text-[10px]">Admin</span>
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

export default AdminSidebar;

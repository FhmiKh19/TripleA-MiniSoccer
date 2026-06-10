import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminNav = [
  {
    label: "Dasbor",
    to: "/admin",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
      </svg>
    ),
  },
  {
    label: "Kelola Lapangan",
    to: "/admin/fields",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
      </svg>
    ),
  },
  {
    label: "Jadwal Booking",
    to: "/admin/schedule",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v3m8-3v3M4 9h16M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    label: "Verifikasi Pembayaran",
    to: "/admin/verify-payment",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Pengajuan Pembatalan",
    to: "/admin/cancellations",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l4-4m0 4l-4-4m11 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function AdminSidebar({ onClose }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-brand-border bg-brand-surface text-white">
      <div className="border-b border-brand-border px-6 py-6">
        <h2 className="text-2xl font-extrabold text-brand-gold">3A</h2>
        <p className="text-sm text-gray-400">Triple A Minisoccer</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {adminNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-l-4 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                  : "border-transparent text-gray-400 hover:bg-brand-card hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-brand-border px-4 py-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-brand-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold font-bold text-brand-dark">
            {currentUser?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm font-semibold">{currentUser?.name || "Admin"}</p>
            <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-xs font-semibold text-brand-gold">
              Admin
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/20"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;

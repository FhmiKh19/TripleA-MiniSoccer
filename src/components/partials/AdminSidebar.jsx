import { NavLink } from "react-router-dom";

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
  return (
    <aside className="flex h-full w-[260px] flex-col bg-brand-dark text-white">
      <div className="border-b border-[#2d2416] px-6 py-6">
        <h2 className="text-2xl font-extrabold text-brand-gold">3A</h2>
        <p className="text-sm text-gray-300">Triple A Minisoccer</p>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-5">
        {adminNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 border-l-4 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-brand-gold bg-[#c89b001a] text-brand-gold"
                  : "border-transparent text-gray-200 hover:bg-[#2a2112]"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#2d2416] px-4 py-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-[#2a2112] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold font-bold text-brand-dark">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Utama</p>
            <span className="rounded-full bg-brand-gold px-2 py-0.5 text-xs font-semibold text-brand-dark">Admin</span>
          </div>
        </div>
        <button className="w-full rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-300 transition-all duration-200 hover:bg-red-600 hover:text-white">
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;

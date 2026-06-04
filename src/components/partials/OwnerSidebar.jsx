import { NavLink } from "react-router-dom";

const ownerNav = [
  {
    label: "Dasbor",
    to: "/owner",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
      </svg>
    ),
  },
  {
    label: "Laporan Transaksi",
    to: "/owner/reports",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-4m3 4V7m3 10v-6m4 10H5a2 2 0 01-2-2V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

function OwnerSidebar({ onClose }) {
  return (
    <aside className="flex h-full w-[260px] flex-col bg-brand-dark text-white">
      <div className="border-b border-[#2d2416] px-6 py-6">
        <h2 className="text-2xl font-extrabold text-brand-gold">3A</h2>
        <p className="text-sm text-gray-300">Triple A Minisoccer</p>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-5">
        {ownerNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/owner"}
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
            OW
          </div>
          <div>
            <p className="text-sm font-semibold">Pemilik Lapangan</p>
            <span className="rounded-full bg-brand-gold px-2 py-0.5 text-xs font-semibold text-brand-dark">Owner</span>
          </div>
        </div>
        <button className="w-full rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-300 transition-all duration-200 hover:bg-red-600 hover:text-white">
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default OwnerSidebar;

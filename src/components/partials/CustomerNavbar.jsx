import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Beranda", to: "/customer" },
  { label: "Pesan Lapangan", to: "/customer/booking-form" },
  { label: "Riwayat Pesanan", to: "/customer/history" },
];

function CustomerNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div>
          <span className="text-xl font-black text-brand-gold">3A</span>
          <span className="ml-2 text-sm font-semibold text-white">Triple A Minisoccer</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/customer"}
              className={({ isActive }) =>
                `pb-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-brand-gold text-brand-gold"
                    : "text-gray-400 hover:text-brand-gold"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setOpenDropdown((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-dark"
          >
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </button>
          <button onClick={() => setOpenMenu((v) => !v)} className="rounded p-2 md:hidden">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {openDropdown && (
            <div className="absolute right-0 top-12 min-w-48 rounded-xl border border-brand-border bg-brand-card py-2 shadow-xl">
              <div className="border-b border-brand-border px-4 py-2 text-sm text-gray-300">
                {currentUser?.name}
              </div>
              <NavLink
                to="/customer/history"
                className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-brand-surface"
              >
                Riwayat Pesanan
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-brand-surface"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
      {openMenu && (
        <div className="border-t border-brand-border px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpenMenu(false)}
              className="block py-2 text-sm text-gray-300"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default CustomerNavbar;

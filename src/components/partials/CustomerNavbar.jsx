import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Beranda", to: "/customer" },
  { label: "Pesan Lapangan", to: "/customer/field-detail" },
  { label: "Riwayat Pesanan", to: "/customer/history" },
];

function CustomerNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <span className="text-xl font-black text-brand-gold">3A</span>
          <span className="ml-2 text-sm font-semibold text-brand-dark">Triple A Minisoccer</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/customer"} className={({ isActive }) => `pb-1 text-sm transition-colors ${isActive ? "border-b-2 border-brand-gold text-brand-gold" : "text-gray-600 hover:text-brand-gold"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="relative flex items-center gap-3">
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5" /></svg>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button onClick={() => setOpenDropdown((v) => !v)} className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-brand-gold">YA</button>
          <button onClick={() => setOpenMenu((v) => !v)} className="rounded p-2 md:hidden">
            <svg className="h-6 w-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {openDropdown && (
            <div className="absolute right-0 top-12 min-w-48 rounded-xl bg-white py-2 shadow-lg">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Profil Saya</button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Riwayat Pesanan</button>
              <div className="my-1 border-t border-gray-100" />
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Keluar</button>
            </div>
          )}
        </div>
      </div>
      {openMenu && (
        <div className="border-t px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="block py-2 text-sm text-gray-700">
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default CustomerNavbar;

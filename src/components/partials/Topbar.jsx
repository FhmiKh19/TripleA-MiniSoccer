import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Topbar({ pageTitle, onMenuClick, variant = "light", extra }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const isDark = variant === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 md:px-6 ${
        isDark
          ? "border-brand-border bg-brand-surface"
          : "border-gray-100 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className={`rounded-md p-2 transition-all duration-200 lg:hidden ${
            isDark ? "text-white hover:bg-brand-card" : "text-brand-dark hover:bg-gray-100"
          }`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className={`text-lg font-bold md:text-xl ${isDark ? "text-white" : "text-brand-dark"}`}>
          {pageTitle}
        </h1>
      </div>

      <div className="relative flex items-center gap-3">
        {extra}
        <button
          type="button"
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-brand-dark transition-all duration-200 hover:opacity-90"
        >
          {currentUser?.name?.charAt(0).toUpperCase() || "U"}
        </button>

        {openDropdown && (
          <div className="absolute right-4 top-14 w-44 rounded-xl border border-brand-border bg-brand-card py-2 shadow-xl md:right-6">
            <div className="border-b border-brand-border px-4 py-2 text-sm text-gray-300">
              {currentUser?.name}
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-400 transition-all duration-200 hover:bg-brand-surface"
            >
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;

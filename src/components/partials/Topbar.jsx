import { useState } from "react";

function Topbar({ pageTitle, onMenuClick }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 text-brand-dark transition-all duration-200 hover:bg-gray-100 lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-brand-dark md:text-xl">{pageTitle}</h1>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          className="rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-brand-dark"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-brand-gold transition-all duration-200 hover:opacity-90"
        >
          TA
        </button>

        {openDropdown && (
          <div className="absolute right-0 top-12 w-44 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50">
              Profil
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-red-600 transition-all duration-200 hover:bg-red-50">
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;

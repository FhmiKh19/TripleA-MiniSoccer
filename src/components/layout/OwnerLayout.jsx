import { useState } from "react";
import OwnerSidebar from "../partials/OwnerSidebar";
import Topbar from "../partials/Topbar";

function OwnerLayout({ children, pageTitle }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-200 lg:translate-x-0 ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <OwnerSidebar onClose={() => setOpenSidebar(false)} />
      </div>

      {openSidebar && (
        <button
          aria-label="Close sidebar overlay"
          type="button"
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <main className="min-h-screen lg:ml-[260px]">
        <Topbar pageTitle={pageTitle} onMenuClick={() => setOpenSidebar(true)} />
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}

export default OwnerLayout;

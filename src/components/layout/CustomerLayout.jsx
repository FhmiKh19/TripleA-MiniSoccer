import CustomerNavbar from "../partials/CustomerNavbar";
import CustomerFooter from "../partials/CustomerFooter";

function CustomerLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <CustomerNavbar />
      <main className="mx-auto w-full max-w-7xl flex-1 p-6">{children}</main>
      <CustomerFooter />
    </div>
  );
}

export default CustomerLayout;

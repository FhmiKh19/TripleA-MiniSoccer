import { Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import FieldManagement from "../pages/admin/FieldManagement";
import BookingSchedule from "../pages/admin/BookingSchedule";
import VerifyPayment from "../pages/admin/VerifyPayment";
import CancellationRequests from "../pages/admin/CancellationRequests";

function AdminRoutes() {
  return (
    <>
      <Route path="/admin" element={<AdminLayout pageTitle="Admin Dashboard"><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/fields" element={<AdminLayout pageTitle="Field Management"><FieldManagement /></AdminLayout>} />
      <Route path="/admin/schedule" element={<AdminLayout pageTitle="Booking Schedule"><BookingSchedule /></AdminLayout>} />
      <Route path="/admin/verify-payment" element={<AdminLayout pageTitle="Verify Payment"><VerifyPayment /></AdminLayout>} />
      <Route path="/admin/cancellations" element={<AdminLayout pageTitle="Cancellation Requests"><CancellationRequests /></AdminLayout>} />
    </>
  );
}

export default AdminRoutes;

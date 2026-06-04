import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import OwnerLayout from "./components/layout/OwnerLayout";
import CustomerLayout from "./components/layout/CustomerLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import FieldManagement from "./pages/admin/FieldManagement";
import BookingSchedule from "./pages/admin/BookingSchedule";
import VerifyPayment from "./pages/admin/VerifyPayment";
import CancellationRequests from "./pages/admin/CancellationRequests";
import OwnerDashboard from "./pages/owner/Dashboard";
import TransactionReports from "./pages/owner/TransactionReports";
import Home from "./pages/customer/Home";
import FieldDetail from "./pages/customer/FieldDetail";
import BookingForm from "./pages/customer/BookingForm";
import UploadPayment from "./pages/customer/UploadPayment";
import BookingHistory from "./pages/customer/BookingHistory";
import CancelBooking from "./pages/customer/CancelBooking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminLayout pageTitle="Dasbor Admin"><Dashboard /></AdminLayout>} />
      <Route path="/admin/fields" element={<AdminLayout pageTitle="Kelola Lapangan"><FieldManagement /></AdminLayout>} />
      <Route path="/admin/schedule" element={<AdminLayout pageTitle="Jadwal Booking"><BookingSchedule /></AdminLayout>} />
      <Route path="/admin/verify-payment" element={<AdminLayout pageTitle="Verifikasi Pembayaran"><VerifyPayment /></AdminLayout>} />
      <Route path="/admin/cancellations" element={<AdminLayout pageTitle="Pengajuan Pembatalan"><CancellationRequests /></AdminLayout>} />

      <Route path="/owner" element={<OwnerLayout pageTitle="Dasbor Pemilik"><OwnerDashboard /></OwnerLayout>} />
      <Route path="/owner/reports" element={<OwnerLayout pageTitle="Laporan Transaksi"><TransactionReports /></OwnerLayout>} />

      <Route path="/customer" element={<CustomerLayout><Home /></CustomerLayout>} />
      <Route path="/customer/field-detail" element={<CustomerLayout><FieldDetail /></CustomerLayout>} />
      <Route path="/customer/booking-form" element={<CustomerLayout><BookingForm /></CustomerLayout>} />
      <Route path="/customer/upload-payment" element={<CustomerLayout><UploadPayment /></CustomerLayout>} />
      <Route path="/customer/history" element={<CustomerLayout><BookingHistory /></CustomerLayout>} />
      <Route path="/customer/cancel-booking" element={<CustomerLayout><CancelBooking /></CustomerLayout>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

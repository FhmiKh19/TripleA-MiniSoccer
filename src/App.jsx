import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
import PaymentMock from "./pages/customer/PaymentMock";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout pageTitle="Dasbor Admin">
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/fields"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout pageTitle="Kelola Lapangan">
              <FieldManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/schedule"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout pageTitle="Jadwal Booking">
              <BookingSchedule />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/verify-payment"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout pageTitle="Verifikasi Pembayaran">
              <VerifyPayment />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/cancellations"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout pageTitle="Pengajuan Pembatalan">
              <CancellationRequests />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Owner routes */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerLayout pageTitle="Dasbor Pemilik">
              <OwnerDashboard />
            </OwnerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/reports"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerLayout pageTitle="Laporan Transaksi">
              <TransactionReports />
            </OwnerLayout>
          </ProtectedRoute>
        }
      />

      {/* Customer routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <Home />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/field-detail"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <FieldDetail />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/booking-form"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <BookingForm />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/upload-payment"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <UploadPayment />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/history"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <BookingHistory />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/cancel-booking"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <CancelBooking />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/payment-mock"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout>
              <PaymentMock />
            </CustomerLayout>
          </ProtectedRoute>
        }
      />


      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getHomePathForRole } from "../utils/authHelpers";

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-gray-500">Memuat sesi...</p>
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={getHomePathForRole(currentUser.role)} replace />;
  }

  return children;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect ke halaman yang sesuai role-nya
    if (currentUser.role === "admin") return <Navigate to="/admin" />;
    if (currentUser.role === "owner") return <Navigate to="/owner" />;
    return <Navigate to="/customer" />;
  }

  return children;
}

export default ProtectedRoute;

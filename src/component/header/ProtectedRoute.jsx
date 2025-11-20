import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "buyer", "seller", "admin"

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role → redirect to unauthorized
  if (roleRequired && roleRequired !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✔ Access allowed
  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  const location = useLocation();
  console.log(location);
  if (isAuthenticated == "false" || isAuthenticated == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
export default ProtectedRoute;

import React from "react";
import { Navigate, Route, useLocation, useParams } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const params = useParams();

  if (isAuthenticated == "false" || isAuthenticated == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    if (role == "User") {
      if (
        location.pathname == "/user_profile" ||
        location.pathname == "/search" ||
        location.pathname == "/setting" ||
        location.pathname == "/notification" ||
        location.pathname == "/profiledetails/" + params.id
      ) {
        return children;
      } else {
        return <Navigate to="/*" state={{ from: location }} replace />;
      }
    } else {
      return children;
    }
  }
}
export default ProtectedRoute;

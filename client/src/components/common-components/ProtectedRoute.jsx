// EXTERNAL IMPORTS
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  // IF USER IS NOT LOGGED IN REDIRECT TO LOGIN PAGE
  // IF USER IS LOGGED IN BUT NOT AUTHORIZED TO ACCESS THE PAGE REDIRECT TO THEIR DASHBOARD
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }
  if (role) {
    // If route requires admin, allow admin + superAdmin
    if (
      role === "admin" &&
      !(user.role === "admin" || user.role === "superAdmin")
    ) {
      return <Navigate to="/" replace />;
    }

    // If route requires customer, allow only customer
    if (role === "customer" && user.role !== "customer") {
      const redirect =
        user.role === "admin" || user.role === "superAdmin" ? "/admin" : "/";
      return <Navigate to={redirect} replace />;
    }
  }

  return children;
};
export default ProtectedRoute;

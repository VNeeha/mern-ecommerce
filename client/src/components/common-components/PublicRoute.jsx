// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (user) {
    const navigateLink =
      user.role == "superAdmin" || user.role === "admin" ? "/admin" : "/";
    return <Navigate to={navigateLink} replace />;
  }

  return children;
};
export default PublicRoute;

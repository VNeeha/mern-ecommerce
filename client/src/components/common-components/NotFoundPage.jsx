import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFoundPage = ({ message = "Page not found" }) => {
  const { user } = useSelector((store) => store.user);
  const homeLink =
    user && (user.role == "admin" || user.role == "superAdmin")
      ? "/admin"
      : "/";
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-[#3454b4] mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      <Link
        to={homeLink}
        className="px-6 py-2 bg-[#3454b4] text-white rounded-lg hover:bg-[#4169e1] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

// EXTERNAL IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaTshirt,
  FaGem,
  FaBook,
  FaMobileAlt,
  FaAppleAlt,
} from "react-icons/fa";

// LOCAL IMPORTS
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";
import { orderActions } from "../../store/orderSlice";

const Header = ({ menuOpen, setMenuOpen, minimal = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const logoLink =
    user && (user.role == "admin" || user.role == "superAdmin")
      ? "/admin"
      : "/";
  const profileLink =
    user &&
    (user.role == "admin" || user.role == "superAdmin"
      ? "/admin/profile"
      : "/profile");

  const { items } = useSelector((store) => store.cart);
  let cartItemsCount = 0;
  items.length > 0 &&
    items.forEach((item) => (cartItemsCount += item.quantity));

  const signOutHandler = () => {
    dispatch(cartActions.resetCart());
    dispatch(userActions.signOutUser());
    localStorage.removeItem("user");
    dispatch(orderActions.resetOrders());
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50 border-gray-200">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Shophub Logo */}
          <div className="flex items-center mr-6">
            <Link
              to={logoLink}
              className="text-2xl font-bold text-[#3454b4] hover:text-[#4169e1] flex items-center"
            >
              <FaHome className="w-6 h-6 mr-2" />
              ShopHub
            </Link>
          </div>

          {/* Only show menu + links if NOT minimal */}
          {!minimal && (
            <>
              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button
                  className="text-gray-700 hover:text-[#3454b4] p-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <FaBars className="h-6 w-6" />
                </button>
              </div>

              {/* Desktop nav links */}
              <div className="hidden lg:flex flex-1 items-center justify-between">
                {/* Left: categories / admin */}
                {(!user || user.role === "customer") && (
                  <div className="flex space-x-6">
                    <Link
                      to="/category/clothing"
                      className="flex items-center text-gray-700 hover:text-[#3454b4]"
                    >
                      <FaTshirt className="w-4 h-4 mr-1" /> Clothing
                    </Link>
                    <Link
                      to="/category/accessories"
                      className="flex items-center text-gray-700 hover:text-[#3454b4]"
                    >
                      <FaGem className="w-4 h-4 mr-1" /> Accessories
                    </Link>
                    <Link
                      to="/category/books"
                      className="flex items-center text-gray-700 hover:text-[#3454b4]"
                    >
                      <FaBook className="w-4 h-4 mr-1" /> Books
                    </Link>
                    <Link
                      to="/category/electronics"
                      className="flex items-center text-gray-700 hover:text-[#3454b4]"
                    >
                      <FaMobileAlt className="w-4 h-4 mr-1" /> Electronics
                    </Link>
                    <Link
                      to="/category/grocery"
                      className="flex items-center text-gray-700 hover:text-[#3454b4]"
                    >
                      <FaAppleAlt className="w-4 h-4 mr-1" /> Grocery
                    </Link>
                  </div>
                )}
                {user &&
                  (user.role == "superAdmin" || user.role === "admin") && (
                    <div className="flex space-x-6">
                      <Link
                        to="/admin/products"
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaBoxOpen className="w-4 h-4 mr-1" /> Products
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaClipboardList className="w-4 h-4 mr-1" /> Orders
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaUsers className="w-4 h-4 mr-1" /> Users
                      </Link>
                    </div>
                  )}

                {/* Right: auth/user */}
                <div className="flex items-center space-x-4">
                  {user ? (
                    <>
                      <Link
                        to={profileLink}
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaUser className="w-4 h-4 mr-1" /> Profile
                      </Link>
                      {user.role === "customer" && (
                        <>
                          <Link
                            to="/cart"
                            className="relative flex items-center text-gray-700 hover:text-[#3454b4]"
                          >
                            <FaShoppingCart className="w-4 h-4 mr-1" /> Cart
                            {cartItemsCount > 0 && (
                              <span className="absolute -top-3 -right-3.5 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {cartItemsCount}
                              </span>
                            )}
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center text-gray-700 hover:text-[#3454b4]"
                          >
                            <FaClipboardList className="w-4 h-4 mr-1" /> Orders
                          </Link>
                        </>
                      )}
                      <button
                        className="flex items-center text-gray-700 hover:text-[#3454b4] focus:outline-none"
                        onClick={signOutHandler}
                      >
                        <FaSignInAlt className="w-4 h-4 mr-1 rotate-180" /> Sign
                        Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaSignInAlt className="w-4 h-4 mr-1" /> Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center bg-[#3454b4] text-white px-3 py-1 rounded-md hover:bg-[#4169e1]"
                      >
                        <FaUserPlus className="w-4 h-4 mr-1" /> Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Mobile Dropdown */}
        {!minimal && menuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
            <div className="flex flex-col p-4 space-y-3">
              {(!user || user.role === "customer") && (
                <>
                  <Link
                    to="/category/clothing"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaTshirt className="w-4 h-4 mr-2" /> Clothing
                  </Link>
                  <Link
                    to="/category/accessories"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaGem className="w-4 h-4 mr-2" /> Accessories
                  </Link>
                  <Link
                    to="/category/books"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaBook className="w-4 h-4 mr-2" /> Books
                  </Link>
                  <Link
                    to="/category/electronics"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaMobileAlt className="w-4 h-4 mr-2" /> Electronics
                  </Link>
                  <Link
                    to="/category/grocery"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaAppleAlt className="w-4 h-4 mr-2" /> Grocery
                  </Link>
                </>
              )}

              {user && (user.role == "superAdmin" || user.role === "admin") && (
                <>
                  <Link
                    to="/admin/products"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaBoxOpen className="w-4 h-4 mr-2" /> Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaClipboardList className="w-4 h-4 mr-2" /> Orders
                  </Link>
                  <Link
                    to="/admin/users"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaUsers className="w-4 h-4 mr-2" /> Users
                  </Link>
                </>
              )}

              {user ? (
                <>
                  <Link
                    to={profileLink}
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaUser className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  {user.role === "customer" && (
                    <>
                      <Link
                        to="/cart"
                        className="relative flex items-center text-gray-700 hover:text-[#3454b4] w-max"
                      >
                        <FaShoppingCart className="w-4 h-4 mr-2" /> Cart
                        {cartItemsCount > 0 && (
                          <span className="absolute -top-2 -right-4.5 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {cartItemsCount}
                          </span>
                        )}
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center text-gray-700 hover:text-[#3454b4]"
                      >
                        <FaClipboardList className="w-4 h-4 mr-2" /> Orders
                      </Link>
                    </>
                  )}
                  <button
                    className="flex items-center text-gray-700 hover:text-[#3454b4] focus:outline-none"
                    onClick={signOutHandler}
                  >
                    <FaSignInAlt className="w-4 h-4 mr-2 rotate-180" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center text-gray-700 hover:text-[#3454b4]"
                  >
                    <FaSignInAlt className="w-4 h-4 mr-2" /> Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center bg-[#3454b4] text-white px-3 py-1 rounded-md hover:bg-[#4169e1]"
                  >
                    <FaUserPlus className="w-4 h-4 mr-2" /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

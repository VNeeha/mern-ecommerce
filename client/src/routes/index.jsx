// EXTERNAL IMPORTS
import { createBrowserRouter } from "react-router-dom";

// LOCAL IMPORTS
// COMMON COMPONENTS
import Products from "../components/common-components/products-components/Products";
import ProductDetails from "../components/common-components/products-components/ProductDetails";
import UserProfile, {
  userProfileDataAction,
} from "../components/common-components/UserProfile";
import Header from "../components/common-components/Header";
import NotFoundPage from "../components/common-components/NotFoundPage";
import ProtectedRoute from "../components/common-components/ProtectedRoute";
import PublicRoute from "../components/common-components/PublicRoute";

// CUSTOMER COMPONENTS
import Homepage from "../components/customer-components/Homepage";
import Cart from "../components/customer-components/Cart";
import Orders from "../components/customer-components/Orders";
import CustomerLayout from "./CustomerLayout";
import CheckoutPage, {
  checkoutAction,
} from "../components/customer-components/CheckoutPage";

// AUTH COMPONENTS
import LoginForm, {
  loginAction,
} from "../components/auth-components/LoginForm";
import SignUpForm, {
  signUpAction,
} from "../components/auth-components/SignUpForm";
import TermsAndConditions from "../components/auth-components/TermsAndConditions";
import ResetPassWordFlow, {
  resetPasswordAction,
} from "../components/auth-components/ResetPasswordFlow";

// ADMIN COMPONENTS
import AdminLayout from "./AdminLayout";
import AdminDashBoard from "../components/admin-components/AdminDashboard";
import ManageProducts from "../components/admin-components/ManageProducts";
import ManageOrders from "../components/admin-components/ManageOrders";
import ManageUsers from "../components/admin-components/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "category/:category", element: <Products /> },
      {
        path: "category/:category/product/:productId",
        element: (
          <ProtectedRoute role="customer">
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role="customer">
            {" "}
            <UserProfile />{" "}
          </ProtectedRoute>
        ),
        action: userProfileDataAction,
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute role="customer">
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute role="customer">
            {" "}
            <CheckoutPage />{" "}
          </ProtectedRoute>
        ),
        action: checkoutAction,
      },

      {
        path: "orders",
        element: (
          <ProtectedRoute role="customer">
            {" "}
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashBoard /> },
      { path: "products", element: <ManageProducts /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "users", element: <ManageUsers /> },
      {
        path: "category/:category/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "profile",
        element: <UserProfile />,
        action: userProfileDataAction,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Header minimal={true} />
        <LoginForm />
      </PublicRoute>
    ),
    action: loginAction,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Header minimal={true} />
        <SignUpForm />
      </PublicRoute>
    ),
    action: signUpAction,
  },
  {
    path: "/terms-and-conditions",
    element: (
      <PublicRoute>
        <Header minimal={true} />
        <TermsAndConditions />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
        <Header minimal={true} />
        <ResetPassWordFlow />
      </>
    ),
    action: resetPasswordAction,
  },
  // Global 404
  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;

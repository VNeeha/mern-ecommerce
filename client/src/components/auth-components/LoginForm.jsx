// EXTERNAL IMPORTS
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

// INTERNAL IMPORTS
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const actionData = useActionData();
  const [errorState, setErrorState] = useState({});
  useEffect(() => {
    if (actionData) {
      if (actionData.user) {
        dispatch(userActions.signInUser(actionData));
        localStorage.setItem("user", JSON.stringify(actionData.user));
        // call services method to fetch cart data based on id
        dispatch(
          cartActions.setCart({
            items: [
              { productId: "12", quantity: 5 },
              { productId: "8", quantity: 1 },
            ],
          })
        );
        // dispatch (orderActions.setOrders({orders:[]})); // fetch orders from server based on user id
        const navigateLink =
          location?.state?.from ||
          (actionData.user.role === "admin" ||
          actionData.user.role === "superAdmin"
            ? "/admin"
            : "/");
        navigate(navigateLink, { replace: true });
      } else if (actionData.error) {
        setErrorState(actionData);
      }
    }
  }, [actionData, dispatch]);

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg py-18 px-10 mx-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Sign In to Your Account
          </h2>
          <Form
            method="POST"
            className="space-y-7"
            key={errorState?.error ? "error" : "clean"}
          >
            <div>
              <input
                type="text"
                name="name"
                defaultValue={errorState?.name ?? ""}
                placeholder="Enter user name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-gray-700"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-gray-700"
              />
            </div>
            {errorState?.error && (
              <p className="text-red-500 text-sm">{errorState.error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#3454b4] text-white py-2 px-4 rounded-lg font-semibold 
             hover:bg-[#4169e1] transition duration-200 
             flex items-center justify-center gap-2"
            >
              <FaSignInAlt className="w-4 h-4" />
              Sign In
            </button>
          </Form>
          <p className="mt-5 text-md text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#3454b4]  font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="mt-3 text-center">
            <Link
              to="/reset-password"
              className="text-[#3454b4] font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
export const loginAction = async (data) => {
  const formData = await data.request.formData();
  const loginFormData = Object.fromEntries(formData);
  loginFormData.role = "customer"; //testing purpose only
  // call services from here when connecting backend
  const resObj = { user: loginFormData, token: Math.random() };
  // const userObj = {
  //   error: "Invalid user name or password",
  //   name: loginFormData.name,
  // };
  return resObj;
};

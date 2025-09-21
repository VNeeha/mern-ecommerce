// EXTERNAL IMPORTS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useActionData, useNavigate, Form } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";

// INTERNAL IMPORTS
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";
import { orderActions } from "../../store/orderSlice";

const UserProfile = ({ mode = "selfMode", userProfile }) => {
  const storeUser = useSelector((store) => store.user).user;
  const user = userProfile || storeUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  const [errorsState, setErrorState] = useState({});
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setIsEditing(false);
        setFormData(actionData.newProfileData);
      } else {
        setErrorState(actionData);
      }
    }
  }, [actionData]);

  // HANDLERS
  const editAccountHandler = () => {
    setIsEditing(true);
    setErrorState({});
  };

  const cancelChangesHandler = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    setIsEditing(false);
    setErrorState({});
  };

  const signOutHandler = () => {
    dispatch(cartActions.resetCart());
    dispatch(userActions.signOutUser());
    localStorage.removeItem("user");
    dispatch(orderActions.resetOrders());
  };

  const deleteAccountHandlerFromCustomer = () => {
    console.log("delete account request");
    dispatch(userActions.signOutUser());
    navigate("/signup", { replace: true });
  };

  const resetPasswordHandler = () => {
    navigate("/reset-password");
  };

  const deleteAccountHandlerFromAdmin = () => {
    console.log("admin deletes user");
  };

  const customerPromotionHandler = () => {
    console.log("promote user to admin");
  };

  const adminDemotionHandler = () => {
    console.log("demote admin to customer");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 flex justify-center items-center py-10 px-4">
      {/* Profile Card */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 relative">
        {/* ✅ Pencil Icon (top-right corner) */}
        {!isEditing && mode === "selfMode" && (
          <button
            onClick={editAccountHandler}
            className="absolute top-4 right-4 text-gray-600 hover:text-[#3454b4]"
          >
            <FaEdit className="w-6 h-6" />
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
          <p className="text-gray-600">{formData.email}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Profile Info */}
        <Form method="POST" className="space-y-6">
          {["name", "email", "phoneNumber"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {field === "phoneNumber" ? "Phone Number" : field}
              </label>
              {isEditing && mode === "selfMode" ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3454b4] "
                />
              ) : (
                <p className="mt-1 text-gray-900 font-medium">
                  {formData[field] || "Not Provided"}
                </p>
              )}
              {errorsState?.errors?.[field] && (
                <p className="text-red-500 text-sm">
                  {errorsState.errors[field]}
                </p>
              )}
            </div>
          ))}

          {/* Buttons */}
          {mode === "selfMode" && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="bg-[#3454b4] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#4169e1] transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelChangesHandler}
                    className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* ✅ Removed the "Edit Profile" button completely */}
                  <button
                    type="button"
                    onClick={resetPasswordHandler}
                    className="bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={signOutHandler}
                    className="bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                  >
                    Sign Out
                  </button>
                  <button
                    type="button"
                    onClick={deleteAccountHandlerFromCustomer}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
                  >
                    Delete Account
                  </button>
                </>
              )}
            </div>
          )}

          {/* Admin / SuperAdmin Buttons stay as is */}
          {mode === "superAdmin" && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={deleteAccountHandlerFromAdmin}
                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
              >
                Delete User
              </button>
              {user.role === "customer" && (
                <button
                  type="button"
                  onClick={customerPromotionHandler}
                  className="bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Promote to Admin
                </button>
              )}
              {user.role === "admin" && (
                <button
                  type="button"
                  onClick={adminDemotionHandler}
                  className="bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Demote to Customer
                </button>
              )}
            </div>
          )}

          {mode === "admin" && user.role === "customer" && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={deleteAccountHandlerFromAdmin}
                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
              >
                Delete User
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;

export const userProfileDataAction = async (data) => {
  const formData = await data.request.formData();
  const userProfileFormData = Object.fromEntries(formData);
  //  send data to services method which makes put request to backend and updates the particular user document and sends success or error and based on that the local state is updated
  const successObj = { success: "user profile is updated" };
  const errorObj = {
    errors: {
      name: "text",
      email: "invalidemail",
      phoneNumber: "can only have numbers",
    },
  };
  const resObj = successObj;

  if (resObj.success) {
    resObj.newProfileData = userProfileFormData;
  }
  return resObj;
};

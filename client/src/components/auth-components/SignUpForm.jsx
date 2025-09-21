// EXTERNAL IMPORTS
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [errorState, setErrorState] = useState({});
  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      if (actionData.errors) {
        setErrorState(actionData);
      } else if (actionData.success) {
        navigate("/login", { replace: true });
      }
    }
  }, [actionData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg py-14 px-10">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join us today! Fill in the details to get started.
        </p>

        <Form
          method="POST"
          className="space-y-6"
          key={errorState?.errors ? "error" : "clean"}
        >
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              defaultValue={errorState?.name ?? ""}
              className="w-full px-4 py-2 border rounded-lg  
                         focus:outline-none focus:ring-2 focus:ring-[#3454b4] 
                         focus:border-[#3454b4] text-gray-700"
              required
            />
            {errorState?.errors?.nameError && (
              <p className="text-red-500 text-sm mt-1">
                {errorState.errors.nameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={errorState?.email ?? ""}
              className="w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#3454b4] 
                         focus:border-[#3454b4] text-gray-700"
              required
            />
            {errorState?.errors?.emailError && (
              <p className="text-red-500 text-sm mt-1">
                {errorState.errors.emailError}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              defaultValue={errorState?.phoneNumber ?? ""}
              className="w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#3454b4] 
                         focus:border-[#3454b4] text-gray-700"
            />
            {errorState?.errors?.phoneNumberError && (
              <p className="text-red-500 text-sm mt-1">
                {errorState.errors.phoneNumberError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#3454b4] 
                         focus:border-[#3454b4] text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errorState?.errors?.passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {errorState.errors.passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#3454b4] 
                         focus:border-[#3454b4] text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errorState?.errors?.confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {errorState.errors.confirmPasswordError}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input type="checkbox" id="terms" required className="mr-2" />
            <label htmlFor="terms" className="text-md text-gray-600">
              I agree to the{" "}
              <Link
                to="/terms-and-conditions"
                className="text-[#3454b4] font-semibold"
              >
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3454b4] text-white py-2 px-4 rounded-lg font-semibold 
                       hover:bg-[#4169e1] transition duration-200 
                       flex items-center justify-center gap-2"
          >
            <FaUserPlus className="w-4 h-4" />
            Sign Up
          </button>
        </Form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Sign Up */}
        <div className="space-y-3">
          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border rounded-lg text-gray-700 font-medium
               hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.94 0 6.6 1.7 8.12 3.13l6-6C34.67 3.02 
  29.87 1 24 1 14.93 1 7.11 6.88 3.7 14.95l7.32 5.7C12.83 
  13.64 17.9 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.14 24.56c0-1.52-.13-2.63-.42-3.77H24v7.12h12.6c-.25 
  1.9-1.6 4.75-4.58 6.67l7.05 5.46C43.9 36.06 46.14 30.74 46.14 24.56z"
              />
              <path
                fill="#FBBC05"
                d="M11.02 28.74c-1.05-3.15-1.05-6.58 
  0-9.73L3.7 13.31C1.3 18.12 0 22.93 0 24c0 1.07 1.3 5.88 
  3.7 10.69l7.32-5.95z"
              />
              <path
                fill="#EA4335"
                d="M24 47c6.49 0 11.91-2.14 15.88-5.8l-7.05-5.46c-1.91 
  1.32-4.46 2.25-8.83 2.25-6.1 0-11.18-4.14-12.98-9.76l-7.32 
  5.95C7.11 41.12 14.93 47 24 47z"
              />
            </svg>
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border rounded-lg text-gray-700 font-medium
               hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-5 h-5 text-gray-800"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 
        3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
        0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
        2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
        0 0 .67-.21 2.2.82a7.65 7.65 0 012.01-.27c.68 0 
        1.36.09 2.01.27 1.53-1.04 2.2-.82 
        2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 
        1.27.82 2.15 0 3.07-1.87 3.75-3.65 
        3.95.29.25.54.73.54 1.48 0 1.07-.01 
        1.93-.01 2.2 0 .21.15.46.55.38A8.01 
        8.01 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            Continue with GitHub
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border rounded-lg text-gray-700 font-medium
               hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-5 h-5"
              fill="#1877F2"
            >
              <path
                d="M279.14 288l14.22-92.66h-88.91V127.55c0-25.35 
        12.42-50.06 52.24-50.06h40.42V6.26S293.31 
        0 268.24 0c-73.22 0-121.08 44.38-121.08 
        124.72v70.62H86.41V288h60.75v224h92.66V288z"
              />
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Link to Login */}
        <p className="mt-6 text-md text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3454b4] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

export const signUpAction = async (data) => {
  const formData = await data.request.formData();
  const signUpFormData = Object.fromEntries(formData);
  signUpFormData.role = "customer";
  //call services from here when connecting backend and if there is any error that will be returned
  // to returned error object add details that need to be shown in form if no error success object will be returned and need to add anything to it
  const errorObj = {
    errors: { emailError: "User already exists" },
  };
  const successObj = { success: true };
  const resObj = errorObj; //change this to successObj to test success scenario
  if (resObj.errors) {
    resObj.name = signUpFormData.name;
    resObj.email = signUpFormData.email;
    resObj.phoneNumber = signUpFormData.phoneNumber;
  }
  return resObj;
};

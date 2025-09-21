// EXTERNAL IMPORTS
import { useState, useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// LOCAL IMPORTS

import { userActions } from "../../store/userSlice";
const ResetPasswordFlow = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  const initialStep = user ? 3 : 1;
  const [step, setStep] = useState(initialStep);
  const [userEmail, setUserEmail] = useState("");
  const [sentOTP, setSentOTP] = useState(null);
  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  // STATES FOR PASSWORD VISIBILITY
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // STATE FOR ERRORS
  const [errorState, setErrorState] = useState({});

  // handle responses
  useEffect(() => {
    if (!actionData) return;

    if (
      (actionData.success && actionData.actionType === "send") ||
      actionData.actionType === "resend"
    ) {
      toast.success(actionData.success);
      setUserEmail(actionData.email);
      setSentOTP(actionData.sentOTP);
      setStep(2);
    } else if (actionData.errors) {
      setErrorState(actionData);
      setOtp(["", "", "", ""]);
    } else if (actionData.success && step === 2 && actionData.verifiedOTP) {
      toast.success(actionData.success);
      setStep(3);
    } else if (actionData.success && step === 3) {
      toast.success(actionData.success);
      setTimeout(() => {
        dispatch(userActions.signOutUser());
        navigate("/login", { replace: true });
      }, 2000);
    }
  }, [actionData, navigate, dispatch]);

  // helper for OTP
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input if value entered
    if (value && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <Form
            method="post"
            key={errorState?.errors ? "error" : "clean"}
            className="space-y-4"
          >
            <input type="hidden" name="step" value="1" />
            <input type="hidden" name="actionType" value="send" />

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full h-11 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-base"
            />
            {errorState?.errors?.email && (
              <p className="text-red-500">{errorState.errors.email}</p>
            )}
            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className={`w-full py-2 rounded-lg text-white ${
                navigation.state === "submitting"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3454b4] hover:bg-[#4169e1]"
              }`}
            >
              {navigation.state === "submitting"
                ? "Please wait..."
                : "Send OTP"}
            </button>
          </Form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <Form
              method="post"
              key={errorState?.errors ? "error" : "clean"}
              className="space-y-4"
            >
              <input type="hidden" name="step" value="2" />
              <input type="hidden" name="sentOTP" value={sentOTP} />
              <input type="hidden" name="enteredOTP" value={otp.join("")} />

              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={digit}
                    placeholder={(i + 1).toString()}
                    ref={(el) => (otpRefs.current[i] = el)}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4]"
                  />
                ))}
              </div>
              {errorState?.errors?.otp && (
                <p className="text-red-500">{errorState.errors.otp}</p>
              )}

              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className={`w-full py-2 rounded-lg text-white ${
                  navigation.state === "submitting"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3454b4] hover:bg-[#4169e1]"
                }`}
              >
                {navigation.state === "submitting"
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </Form>

            {/* resend is a separate form */}
            <Form method="post" className="text-center mt-3">
              <input type="hidden" name="step" value="1" />
              <input type="hidden" name="actionType" value="resend" />
              <input type="hidden" name="email" value={userEmail} />
              <button
                type="submit"
                className="text-[#3454b4] font-medium hover:underline"
              >
                Resend OTP
              </button>
            </Form>
          </>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === 3 && (
          <Form
            method="post"
            key={errorState?.errors ? "error" : "clean"}
            className="space-y-4"
          >
            <input type="hidden" name="step" value="3" />
            {user && (
              <>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Enter your current password"
                    className="w-full h-11 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errorState?.errors?.currentPassword && (
                  <p className="text-red-500">
                    {errorState.errors.currentPassword}
                  </p>
                )}
              </>
            )}

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter a strong new password"
                required
                className="w-full h-11 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-base"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errorState?.errors?.newPassword && (
              <p className="text-red-500">{errorState.errors.newPassword}</p>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter new password"
                required
                className="w-full h-11 px-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errorState?.errors?.confirmPassword && (
              <p className="text-red-500">
                {errorState.errors.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className={`w-full py-2 rounded-lg text-white ${
                navigation.state === "submitting"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3454b4] hover:bg-[#4169e1]"
              }`}
            >
              {navigation.state === "submitting"
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordFlow;

// resetPasswordAction.js
export const resetPasswordAction = async (data) => {
  const formData = await data.request.formData();
  const resetFormData = Object.fromEntries(formData);
  const { step } = resetFormData;
  if (step === "1") {
    const { email, actionType } = resetFormData;
    // call backend service method and send this email to check if it is valid email
    const successObj = {
      success: "OTP sent to email",
      sentOTP: "1234",
      actionType,
    };
    const errorObj = { errors: { email: "Invalid email.Enter valid email" } };
    const resObj = successObj;
    resObj.email = email;
    return resObj;
  }

  if (step === "2") {
    const { sentOTP, enteredOTP } = resetFormData;
    if (sentOTP === enteredOTP) {
      return { success: "OTP verified", verifiedOTP: true };
    }
    return { errors: { otp: "Invalid OTP" } };
  }

  if (step === "3") {
    const { currentPassword, newPassword, confirmPassword } = resetFormData;
    // call backend service method and send this passwords to validate
    const successObj = { success: "Password reset done" };
    const errorObj = {
      errors: {
        currentPassword: "Invalid password",
        newPassword: "Password should have special symbol",
        confirmPassword: "new password and entered password are not same",
      },
    };
    const resObj = errorObj;
    return resObj;
  }

  return { error: "Invalid step" };
};

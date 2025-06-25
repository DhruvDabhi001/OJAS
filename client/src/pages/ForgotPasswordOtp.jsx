import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      await axios.post("${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password", {
        email,
        newPassword,
      });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-otp`, {
        email,
        otp,
      });
      toast.success("Password reset successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-black text-white px-2">
    <ToastContainer position="top-center" /> {/* ✅ Add this line */}

    <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold text-center">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 rounded bg-gray-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        className="w-full p-2 rounded bg-gray-700"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {!otpSent ? (
        <button
          className="bg-blue-500 w-full py-2 rounded"
          onClick={sendOtp}
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 rounded bg-gray-700"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-500 w-full py-2 rounded"
            onClick={verifyOtp}
          >
            Verify OTP & Reset
          </button>
        </>
      )}
    </div>
  </div>
);
}
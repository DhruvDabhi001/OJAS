import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable Input component
const Input = ({ label, type, name, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-300 mb-2 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', { position: "top-center" });
      return;
    }

    try {
      const res = await axios.post(`https://ojas-backend.onrender.com/api/auth/signup`, formData);
      toast.success(res.data.message, { position: "top-center" });

      // ✅ Delay redirect to let the user read the success toast
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 seconds delay
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed', { position: "top-center" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-black flex items-center justify-center px-2 py-10">
        <div className="bg-gray-900 w-full max-w-lg p-8 sm:p-10 rounded-xl shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold leading-normal text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-8">
            OJAS - Sign Up
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-semibold">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;

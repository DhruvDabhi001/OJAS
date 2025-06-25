import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData);

      // localStorage.setItem('username', res.data.fullName);
      // localStorage.setItem("email", res.data.email); 
      // After successful login
      
      localStorage.setItem("token", res.data.token);


      if (res.data.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
        toast.success("Admin logged in!", { position: "top-center" });

        setTimeout(() => {
          navigate('/users');
        }, 1000);
      } else {
        localStorage.removeItem('isAdmin');
        toast.success(res.data.message, { position: "top-center" });

        setTimeout(() => {
          navigate('/Home2');
        }, 1500);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { position: "top-center" });
    }
  };

  return (
    <>
      <ToastContainer /> {/* Required for toasts to show */}
      <div className="min-h-screen bg-black flex items-center justify-center px-2 py-10">
        <div className="bg-gray-900 w-full max-w-md p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">OJAS - Login</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-white">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="text-white">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                required
              />
            </div>

            <div className="flex justify-between space-x-4">
              {/* Normal Login Button */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Login
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center space-x-2"
                onClick={() => {
                  // Placeholder for Google Login
                  toast.info("Google Login clicked!", { position: "top-center" });
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>

          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline font-semibold">
              Sign up here
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}
export default Login;
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct named import

function Hom() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && token.split('.').length === 3) { // ✅ Check format
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.fullName || decoded.email || "User");
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.clear();
        navigate("/login");
      }
    } else {
      localStorage.clear(); // ✅ Clear invalid token
      navigate("/login");
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-purple-100 via-white to-blue-100 text-gray-800">
      <nav className="sticky top-0 z-50 bg-blue-200 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-purple-700">OJAS Job Portal</h1>
        <div className="flex items-center space-x-6">
          <span className="text-base font-normal text-gray-600">👋 {username}</span>
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Hom;
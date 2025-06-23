import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Define route-to-label mapping
  const navLinks = [
    { label: "Users", path: "/users" },
    { label: "Jobs", path: "/jobs" },
    { label: "Add Job", path: "/addjob" },
    { label: "Requests", path: "/requests" },
    { label: "Hired User", path: "/Hireduser" },
  ];

  return (
    <div className=" bg-gray-100 text-gray-800">
      {/* Sticky Header: Navbar 1 + Navbar 2 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        {/* Navbar 1 */}
        <nav className="px-6 py-4 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">OJAS Admin Portal</h1>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="text-base text-gray-600">
              👋 {localStorage.getItem("username") || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Navbar 2 */}
        <div className="px-6 py-2 flex flex-wrap gap-x-6 gap-y-2 bg-purple-300">
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`text-sm font-semibold px-3 py-1 rounded transition ${
                  isActive
                    ? "bg-purple-100 text-purple-800 font-semibold"
                    : "text-black hover:bg-purple-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area pushed down by sticky header */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Admin;
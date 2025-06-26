import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminHeader from "./admin";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://ojas-backend.onrender.com/api/user/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axios.delete(`https://ojas-backend.onrender.com/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 px-6 pb-3 pt-[130px] max-[434px]:pt-[200px] max-[504px]:pt-[160px]">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">
          Users Management
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-purple-100 shadow rounded text-sm sm:text-base border-collapse border border-b">
              <thead className="bg-purple-200 text-black">
                <tr>
                  <th className="py-3 px-4 border sm:px-6 text-center">Name</th>
                  <th className="py-3 px-4 border sm:px-6 text-center">Email</th>
                  <th className="py-3 px-4 border sm:px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-purple-50">
                    <td className="py-3 border px-4 sm:px-6 text-center">{user.fullName}</td>
                    <td className="py-3 border px-4 sm:px-6 text-center">{user.email}</td>
                    <td className="py-3 border px-4 sm:px-6 text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
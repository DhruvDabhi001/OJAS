import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AdminHeader from "./admin";

function HiredUsers() {
  const [hiredUsers, setHiredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await axios.get(`https://ojas-backend.onrender.com/api/accepted`);
        setHiredUsers(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load hired users");
      } finally {
        setLoading(false);
      }
    };

    fetchAccepted();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 px-6 pb-3 pt-[130px] max-[434px]:pt-[200px] max-[504px]:pt-[160px]">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 ">
          Hired Users
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : hiredUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hired users found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiredUsers.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition hover:shadow-xl"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-blue-700">{app.username}</h3>
                  <p className="text-sm text-gray-500">{app.email}</p>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Job:</span> {app.jobName}</p>
                  <p><span className="font-medium">Company:</span> {app.companyName}</p>
                  <p><span className="font-medium">Applied On:</span> {new Date(app.applyDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
                    ✅ Hired
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default HiredUsers;
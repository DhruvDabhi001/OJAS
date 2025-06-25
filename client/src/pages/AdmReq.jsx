// src/pages/Admin/AdmReq.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminHeader from "./admin";

function AdmReq() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/applications`);
      setApplications(res.data);
    } catch (err) {
      toast.error("Failed to fetch applications");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/application/${id}/status`, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 px-6 pb-3 pt-[130px] max-[434px]:pt-[200px] max-[504px]:pt-[160px]">
        <Toaster />
        <h1 className="text-2xl font-bold text-purple-700 mb-6">Application Requests</h1>
        <div className="overflow-x-auto">
          {applications.length > 0 ? (
            <table className="w-full table-auto bg-purple-100 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-200">
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Job</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td className="border px-4 py-2 text-center">{app.username}</td>
                    <td className="border px-4 py-2 text-center">{app.email}</td>
                    <td className="border px-4 py-2 text-center">{app.jobName}</td>
                    <td className="border px-4 py-2 text-center">{app.companyName}</td>
                    <td className="border px-4 py-2 text-center capitalize">{app.status}</td>
                    <td className="border px-4 py-2 text-center space-x-2 space-y-1">
                      <button
                        onClick={() => handleStatusChange(app._id, "accepted")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                       
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 py-8 text-lg">No applications found</div>
          )}
        </div>

      </div>
    </>
  );
}
export default AdmReq;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hom from "./Home";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`http://localhost:5000/api/my-applications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        if (error.response?.status === 404) {
          setApplications([]); // No applications found
        } else if (error.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to load applications. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplications();
    } else {
      setLoading(false);
      setError("User token not found. Please log in again.");
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading your applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="sticky top-0 z-50">
        <Hom />
      </div>
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">My Applications</h1>

        {applications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600">You haven't applied for any jobs yet.</p>
            <p className="text-gray-500 text-sm mt-2">Your job applications will appear here once you start applying.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Total Applications: {applications.length}
            </div>

            <div className="grid gap-4">
              {applications.map((app, index) => (
                <div key={app._id || index} className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900">{app.jobName}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {formatStatus(app.status)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Company:</span> {app.companyName}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Applicant:</span> {app.username}
                    </p>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <p className="text-gray-500 text-sm">
                        Applied on: {new Date(app.applyDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>

                      {app.createdAt && app.createdAt !== app.applyDate && (
                        <p className="text-gray-400 text-xs">
                          Submitted: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Applications;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Hom from "./Home";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userApplications, setUserApplications] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch applications using token (no email in URL)
  const fetchUserApplications = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/my-applications`, {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch user applications:", err);
    }
  };

  // ✅ Apply handler
  const handleApply = async (job) => {
    if (!token) {
      toast.error("Please login to apply for jobs");
      return;
    }

    try {
      const applicationData = {
        jobId: job._id,
        jobName: job.title,
        companyName: job.company,
        applyDate: new Date().toISOString(),
      };

      const response = await axios.post(
        '${process.env.REACT_APP_BACKEND_URL}/api/apply',
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Application submitted successfully!");
        fetchUserApplications(); // ensures real-time status update
      } else {
        toast.error(response.data.message || "Application failed");
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  // ✅ Fetch jobs and applications
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("${process.env.REACT_APP_BACKEND_URL}/api/jobs");
        setJobs(res.data);
      } catch (err) {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    fetchUserApplications();
  }, []);

  const getApplicationStatus = (jobId) => {
    const app = userApplications.find((a) => a.jobId === jobId);
    return app ? app.status : null;
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <Hom />
      </div>
      <div className="min-h-screen bg-gray-100 pb-4">
        <Toaster />
        <h1 className="text-3xl font-bold pt-4 mb-6 pl-3">Available Jobs</h1>

        {loading ? (
          <div className="text-center text-lg">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-500">No jobs found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-3 pr-3">
            {jobs.map((job) => {
              const status = getApplicationStatus(job._id);
              let buttonLabel = "Apply";
              let buttonColor = "bg-green-500 hover:bg-green-600";
              let disabled = false;

              if (status === "pending") {
                buttonLabel = "Already Applied";
                buttonColor = "bg-blue-400";
                disabled = true;
              } else if (status === "accepted") {
                buttonLabel = "You are selected";
                buttonColor = "bg-purple-500";
                disabled = true;
              } else if (status === "rejected") {
                buttonLabel = "Application Rejected";
                buttonColor = "bg-red-400";
                disabled = true;
              } else if (job.vacancies <= 0) {
                buttonLabel = "No Vacancies";
                buttonColor = "bg-gray-400";
                disabled = true;
              }

              return (
                <div key={job._id} className="bg-white shadow-md rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">{job.description}</p>
                  <div className="mt-3 text-sm">
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Vacancies:</strong> {job.vacancies}</p>
                  </div>
                  <button
                    className={`mt-4 px-4 py-2 text-white rounded transition ${buttonColor} ${disabled ? "cursor-not-allowed" : ""}`}
                    disabled={disabled}
                    onClick={() => !disabled && handleApply(job)}
                  >
                    {buttonLabel}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default Jobs;
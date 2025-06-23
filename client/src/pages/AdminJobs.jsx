// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminHeader from "./admin";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJobId, setEditJobId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    company: "",
    location: "",
    vacancies: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load jobs");
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      toast.success("Job deleted");
      fetchJobs(); // Refresh list
    } catch (error) {
      toast.error("Delete failed");
    }
  };


  const startEdit = (job) => {
    setEditJobId(job._id);
    setEditFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      vacancies: job.vacancies || "",
      salary: job.salary,
      description: job.description,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${editJobId}`, editFormData);
      toast.success("Job updated");
      setEditJobId(null);
      fetchJobs();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 px-6 pt-[130px] max-[434px]:pt-[200px] max-[504px]:pt-[160px]">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Available Jobs</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all border border-purple-100"
              >
                {editJobId === job._id ? (
                  <form onSubmit={handleUpdate} className="space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Title"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      value={editFormData.company}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Company"
                      required
                    />
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Location"
                      required
                    />
                    <input
                      type="number"
                      name="vacancies"
                      value={editFormData.vacancies}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Vacancies"
                      required
                    />
                    <input
                      type="text"
                      name="salary"
                      value={editFormData.salary}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Salary"
                    />
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      rows={3}
                      placeholder="Description"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditJobId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Vacancies:</strong> {job.vacancies}
                    </p>
                    {job.salary && (
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Salary:</strong> ₹{job.salary}
                      </p>
                    )}
                    <div className="text-gray-700 mb-2 h-5 overflow-hidden text-ellipsis">
                      {job.description}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(job)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs;
// src/pages/AddJob.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminHeader from "./admin"; // adjust path if needed

function AddJob() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    vacancies: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobData.title || !jobData.company || !jobData.location ||! jobData.vacancies || !jobData.description) {
      return toast.error("Please fill in all required fields");
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/add`, jobData);
      toast.success("Job added successfully");
      setJobData({ title: "", company: "", location: "",vacancies: "", salary: "", description: "" });
    } catch (error) {
      toast.error("Failed to add job");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 px-6 pb-3 pt-[130px] max-[434px]:pt-[200px] max-[504px]:pt-[160px]">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Add New Job</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-2xl mx-auto space-y-4"
        >
          <div>
            <label className="block font-medium text-gray-700">Job Title *</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Company *</label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Location *</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">vacancies *</label>
            <input
            type="number"
            name="vacancies"
            value={jobData.vacancies}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Salary</label>
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description *</label>
            <input
              type="text"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
              maxLength={30}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Add Job
          </button>
        </form>
      </div>
    </>
  );
}

export default AddJob;
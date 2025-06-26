import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Hom from './Home';

function ProfileUpdate() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // ✅ UseEffect to fetch user info using token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://ojas-backend.onrender.com/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Send token in header
          }
        });

        setFormData((prev) => ({
          ...prev,
          fullName: res.data.fullName,
          email: res.data.email
        }));
      } catch (error) {
        toast.error('Failed to load user data');
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`https://ojas-backend.onrender.com/api/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Auth header here too
        }
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50"><Hom /></div>
      <div className="flex justify-center sm:pt-15 pt-28 h-screen bg-gray-100 min-h-[calc(100vh-73px)] px-2">
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white p-6 h-100 mt-13 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Update Profile</h2>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-200 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}
export default ProfileUpdate;
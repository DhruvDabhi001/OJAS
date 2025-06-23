import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hom from './Home';

function HomeContent() {
  const navigate = useNavigate();
  
  return (
    <>
    <Hom/>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
      <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-purple-700">Jobs Available Now</h3>
        <p className="text-sm text-gray-500 mt-2">Browse and apply for jobs that match your profile.</p>
        <button
          onClick={() => navigate('/userJobs')}
          className="mt-4 text-sm text-purple-600 font-medium hover:underline"
        >
          View Jobs
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-purple-700">Track Applications</h3>
        <p className="text-sm text-gray-500 mt-2">See the status of your submitted applications.</p>
        <button
          onClick={() => navigate('/Applications')}
          className="mt-4 text-sm text-purple-600 font-medium hover:underline"
        >
          View Applications
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-purple-700">Update Your Profile</h3>
        <p className="text-sm text-gray-500 mt-2">Ensure your resume and experience are up to date.</p>
        <button
          onClick={() => navigate('/Profile')}
          className="mt-4 text-sm text-purple-600 font-medium hover:underline"
        >
          Go to Profile
        </button>
      </div>
    </div>
    </>
  );
}
export default HomeContent;
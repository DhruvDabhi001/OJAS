// import React from 'react'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Home2 from './pages/home2';
import Jobs from './pages/Jobs';
import Applications from './pages/Application';
import Profile from './pages/Profile';
import Admin from './pages/admin'
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import AddJob from "./pages/AddJob";
import Requests from "./pages/AdmReq";
import HiredUsers from './pages/HiredUsers';
import ForgotPasswordOtp from './pages/ForgotPasswordOtp';
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect default route to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/userJobs" element={<Jobs />} />
        <Route path="/Applications" element={<Applications />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/jobs" element={<AdminJobs />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/Hireduser" element={<HiredUsers />} />
        <Route path="/forgot-password" element={<ForgotPasswordOtp />} />
      </Routes>
    </Router>
  );
}
export default App;
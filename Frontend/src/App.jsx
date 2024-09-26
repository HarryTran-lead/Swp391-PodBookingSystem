// ./App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from './UserPages/UserLayout'; // Import UserLayout
import HomePage from './UserPages/HomePage/HomePage';
import About from './UserPages/About/About';
import LoginPage from './UserPages/LoginPage/LoginPage';
import SignUpPage from './UserPages/SignUpPage/SignUpPage';
import Contact from './UserPages/Contact/Contact';
import AdminLayout from './AdminPages/AdminLayout/AdminLayout'; // Import AdminLayout
import Account from './AdminPages/Account/Account'; // Import Account component
import UpdateAccount from './AdminPages/Account/UpdateAccount'; // Import UpdateAccount component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root URL to home page */}
        <Route path="/" element={<Navigate to="/SWP391-PodSystemBooking/" />} />

        {/* User section routes */}
        <Route path="/SWP391-PodSystemBooking/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/about" element={<UserLayout><About /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/login" element={<UserLayout><LoginPage /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/signup" element={<UserLayout><SignUpPage /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/contact" element={<UserLayout><Contact /></UserLayout>} />

        {/* Admin section routes */}
        <Route path="/SWP391-PodSystemBooking/admin" element={<AdminLayout><Account /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-account" element={<AdminLayout><UpdateAccount /></AdminLayout>} />
        {/* Add more admin routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;

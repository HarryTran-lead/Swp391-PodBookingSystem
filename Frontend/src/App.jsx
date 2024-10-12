import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from './UserPages/UserLayout'; 
import HomePage from './UserPages/HomePage/HomePage';
import About from './UserPages/About/About';
import LoginPage from './UserPages/LoginPage/LoginPage';
import SignUpPage from './UserPages/SignUpPage/SignUpPage';
import Contact from './UserPages/Contact/Contact';
import AdminLayout from './AdminPages/AdminLayout/AdminLayout'; 
import Account from './AdminPages/Account/Account'; 
import UpdateAccount from './AdminPages/Account/UpdateAccount'; 
import CreateAccount from './AdminPages/Account/CreateAccount'; 
import DetailPodBooking from './UserPages/DetailPodBooking/DetailPodBooking';
import Pod from './AdminPages/Pod/Pod';
import CreatePod from './AdminPages/Pod/CreatePod';
import UpdatePod from './AdminPages/Pod/UpdatePod';
import Podlist from './UserPages/Pod/Pod';
import BlogPage from './UserPages/BlogPage/BlogPage';
import ProfilePage from './UserPages/ProfilePage/ProfilePage';
import DetailBlog from './UserPages/DetailBlog/DetailBlog';
import SuccessfulPayment from './UserPages/SuccessfulPayment/SuccessfullPayment';
import BookingOrder from './AdminPages/BookingOrder/BookingOrder';
import YourBooking from './UserPages/YourBooking/YourBooking';
import UpdateBooking from './AdminPages/BookingOrder/UpdateBooking';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId('');
    setIsLoggedIn(false);
  };

  const renderUserLayout = (element) => (
    <UserLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
      {element}
    </UserLayout>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/SWP391-PodSystemBooking/" />} />
        <Route path="/SWP391-PodSystemBooking/" element={renderUserLayout(<HomePage />)} />
        <Route path="/SWP391-PodSystemBooking/about" element={renderUserLayout(<About />)} />
        <Route path="/SWP391-PodSystemBooking/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/SWP391-PodSystemBooking/signup" element={renderUserLayout(<SignUpPage />)} />
        <Route path="/SWP391-PodSystemBooking/contact" element={renderUserLayout(<Contact />)} />
        <Route path="/SWP391-PodSystemBooking/pod/:id" element={renderUserLayout(<DetailPodBooking />)} />
        <Route path="/SWP391-PodSystemBooking/pod" element={renderUserLayout(<Podlist />)} />
        <Route path="/SWP391-PodSystemBooking/blog" element={renderUserLayout(<BlogPage />)} />
        <Route path="/SWP391-MomAndBaby/detailBlog/:id" element={renderUserLayout(<DetailBlog />)} />
        <Route path="/SWP391-PodSystemBooking/profile" element={renderUserLayout(<ProfilePage />)} />
        <Route path="/SWP391-PodSystemBooking/successfullpayment" element={renderUserLayout(< SuccessfulPayment/>)} />
        <Route path="/SWP391-PodSystemBooking/yourbooking" element={renderUserLayout(< YourBooking/>)} />

        <Route path="/SWP391-PodSystemBooking/admin/account" element={<AdminLayout><Account /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-account" element={<AdminLayout><UpdateAccount /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/create-account" element={<AdminLayout><CreateAccount /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/pod" element={<AdminLayout><Pod /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/create-pod" element={<AdminLayout><CreatePod /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-pod" element={<AdminLayout><UpdatePod /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/bookingorder" element={<AdminLayout><BookingOrder /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-booking" element={<AdminLayout><UpdateBooking /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

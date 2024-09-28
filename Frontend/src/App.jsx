import React, { useState } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('username'); // Xóa tên người dùng từ localStorage
    setUsername(''); // Đặt tên người dùng thành rỗng
    setIsLoggedIn(false); // Đặt trạng thái đăng nhập thành false
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/SWP391-PodSystemBooking/" />} />
        
        {/* User section routes */}
        <Route 
  path="/SWP391-PodSystemBooking/" 
  element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><HomePage /></UserLayout>} 
/>
        <Route path="/SWP391-PodSystemBooking/about" element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><About /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/SWP391-PodSystemBooking/signup" element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><SignUpPage /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/contact" element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><Contact /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/pod/:id" element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><DetailPodBooking /></UserLayout>} />
        <Route path="/SWP391-PodSystemBooking/pod" element={<UserLayout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}><Podlist /></UserLayout>} />
        
        {/* Admin section routes */}
        <Route path="/SWP391-PodSystemBooking/admin/account" element={<AdminLayout><Account /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-account" element={<AdminLayout><UpdateAccount /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/create-account" element={<AdminLayout><CreateAccount /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/pod" element={<AdminLayout><Pod /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/create-pod" element={<AdminLayout><CreatePod /></AdminLayout>} />
        <Route path="/SWP391-PodSystemBooking/admin/update-pod" element={<AdminLayout><UpdatePod /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

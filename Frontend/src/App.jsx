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
import ServicePageSuccessPayment from './UserPages/ServicePage/ServicePageSuccessPayment';
import YourPackage from './UserPages/YourPackage/YourPackage';
import PackageService from './AdminPages/UserPackageService/PackageService';
import OrderedFood from './UserPages/FoodOrder/OrderedFood';
import Food from './AdminPages/Food/Food';
import CreateFood from './AdminPages/Food/CreateFood';
import UpdateFood from './AdminPages/Food/UpdateFood';
import Package from './AdminPages/PackageService/Package';
import CreatePackage from './AdminPages/PackageService/CreatePackage';
import UpdatePackage from './AdminPages/PackageService/UpdatePackage';
import StaffLayout from './Staff/StaffLayout/StaffLayout';
import FeedBack from './Staff/FeedBack/FeedBack';
import BookingOrderStaff from './Staff/BookingOrder/BookingOrder';
import PrivateRoute from './PrivateRoute';
import ProfileAdmin from './AdminPages/ProfileAdmin/ProfilePage';
import ProfileStaff from './Staff/ProfileStaff/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserId && storedUserRole) {
      setUserId(storedUserId);
      setUserRole(storedUserRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (id, role) => {
    setUserId(id);
    setUserRole(role);
    localStorage.setItem('userId', id);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUserId('');
    setUserRole('');
    setIsLoggedIn(false);
  };

  const renderUserLayout = (element) => (
    <UserLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
      {element}
    </UserLayout>
  );

  const renderAdminLayout = (element) => <AdminLayout>{element}</AdminLayout>;
  const renderStaffLayout = (element) => <StaffLayout>{element}</StaffLayout>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/SWP391-PodSystemBooking/" />} />
        <Route path="/SWP391-PodSystemBooking/" element={renderUserLayout(<HomePage />)} />
        <Route path="/SWP391-PodSystemBooking/about" element={renderUserLayout(<About />)} />
        
        <Route path="/SWP391-PodSystemBooking/contact" element={renderUserLayout(<Contact />)} />
        <Route path="/SWP391-PodSystemBooking/pod/:id" element={renderUserLayout(<DetailPodBooking />)} />
        <Route path="/SWP391-PodSystemBooking/pod" element={renderUserLayout(<Podlist />)} />
        <Route path="/SWP391-PodSystemBooking/blog" element={renderUserLayout(<BlogPage />)} />
        <Route path="/SWP391-PodSystemBooking/detailBlog/:id" element={renderUserLayout(<DetailBlog />)} />
        <Route path="/SWP391-PodSystemBooking/profile" element={renderUserLayout(<ProfilePage />)} />
        <Route path="/SWP391-PodSystemBooking/successfullpayment" element={renderUserLayout(<SuccessfulPayment />)} />
        <Route path="/SWP391-PodSystemBooking/yourbooking" element={renderUserLayout(<YourBooking />)} />
        <Route path="/SWP391-PodSystemBooking/successfullpaymentservice" element={renderUserLayout(<ServicePageSuccessPayment />)} />
        <Route path="/SWP391-PodSystemBooking/yourpackage" element={renderUserLayout(<YourPackage />)} />
        <Route path="/SWP391-PodSystemBooking/ordered-food/:bookingId" element={renderUserLayout(<OrderedFood />)} />

        <Route 
  path="/SWP391-PodSystemBooking/login" 
  element={<LoginPage onLogin={handleLogin} />} 
/>
<Route path="/SWP391-PodSystemBooking/signup" element={<SignUpPage />} />

        {/* Protected Admin Routes */}
        <Route path="/SWP391-PodSystemBooking/admin/account" element={<PrivateRoute element={renderAdminLayout(<Account />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']} />} />
        <Route path="/SWP391-PodSystemBooking/admin/update-account" element={<PrivateRoute element={renderAdminLayout(<UpdateAccount />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']} />} />
        <Route path="/SWP391-PodSystemBooking/admin/create-account" element={<PrivateRoute element={renderAdminLayout(<CreateAccount />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/pod" element={<PrivateRoute element={renderAdminLayout(<Pod />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/create-pod" element={<PrivateRoute element={renderAdminLayout(<CreatePod />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/update-pod" element={<PrivateRoute element={renderAdminLayout(<UpdatePod />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/bookingorder" element={<PrivateRoute element={renderAdminLayout(<BookingOrder />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/update-booking" element={<PrivateRoute element={renderAdminLayout(<UpdateBooking />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/servicepackage" element={<PrivateRoute element={renderAdminLayout(<PackageService />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/food" element={<PrivateRoute element={renderAdminLayout(<Food />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/create-food" element={<PrivateRoute element={renderAdminLayout(<CreateFood />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/update-food" element={<PrivateRoute element={renderAdminLayout(<UpdateFood />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/package" element={<PrivateRoute element={renderAdminLayout(<Package />)} isLoggedIn={isLoggedIn} />} userRole={userRole} allowedRoles={['admin']}  />
        <Route path="/SWP391-PodSystemBooking/admin/create-package" element={<PrivateRoute element={renderAdminLayout(<CreatePackage />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/update-package" element={<PrivateRoute element={renderAdminLayout(<UpdatePackage />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        <Route path="/SWP391-PodSystemBooking/admin/profile-admin" element={<PrivateRoute element={renderAdminLayout(<ProfileAdmin />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}  />} />
        {/* Repeat similarly for other admin routes with allowedRoles={['admin']} */}

        {/* Protected Staff Routes */}
        <Route path="/SWP391-PodSystemBooking/staff/feedback" element={<PrivateRoute element={renderStaffLayout(<FeedBack />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['staff']} />} />
        <Route path="/SWP391-PodSystemBooking/staff/bookingorder" element={<PrivateRoute element={renderStaffLayout(<BookingOrderStaff />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['staff']} />} />
        <Route path="/SWP391-PodSystemBooking/staff/profile-staff" element={<PrivateRoute element={renderStaffLayout(<ProfileStaff />)} isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['staff']} />} />
      </Routes>
    </Router>
  );
};

export default App;

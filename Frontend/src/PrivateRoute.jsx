import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn, role, requiredRole }) => {
  // Check if user is logged in and, if required, has the correct role
  if (!isLoggedIn) {
    return <Navigate to="/SWP391-PodSystemBooking/login" />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/SWP391-PodSystemBooking/" />;
  }
  return element;
};

export default PrivateRoute;

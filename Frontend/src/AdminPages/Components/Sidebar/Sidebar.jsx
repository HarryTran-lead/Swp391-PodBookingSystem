// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure your styles do not conflict with Bootstrap

export default function Sidebar() {
  return (
    <div className="col-md-2 sidebar"> {/* Apply Bootstrap's col-md-4 class */}
      <ul className="sidebar-menu list-group"> {/* Use list-group for consistent Bootstrap styling */}
        <li className="list-group-item">
          <Link to="/SWP391-PodSystemBooking/admin/account">Account</Link>
        </li>
        <li className="list-group-item">
          <Link to="/SWP391-PodSystemBooking/admin/pod">Pod</Link>
        </li>
        <li className="list-group-item">
          <Link to="/SWP391-PodSystemBooking/admin/bookingorder">Booking Order</Link>
        </li>
        <li className="list-group-item">
          <Link to="/SWP391-PodSystemBooking/admin/servicepackage">ServicePackage</Link>
        </li>
      </ul>
    </div>
  );
}

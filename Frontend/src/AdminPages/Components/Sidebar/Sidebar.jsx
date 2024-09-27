// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure your styles do not conflict with Bootstrap

export default function Sidebar() {
  return (
    <div className="col-md-2 sidebar"> {/* Apply Bootstrap's col-md-4 class */}
      <ul className="sidebar-menu list-group"> {/* Use list-group for consistent Bootstrap styling */}
        <li className="list-group-item">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/users">User Management</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/bookings">Manage Bookings</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/reports">Reports</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

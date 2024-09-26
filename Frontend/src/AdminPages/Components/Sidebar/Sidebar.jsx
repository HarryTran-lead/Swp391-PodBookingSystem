import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create a CSS file for styles

export default function Sidebar() {
  return (
    <div className="sidebar">
     
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">User Management</Link>
        </li>
        <li>
          <Link to="/admin/bookings">Manage Bookings</Link>
        </li>
        <li>
          <Link to="/admin/reports">Reports</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li>
          <Link to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

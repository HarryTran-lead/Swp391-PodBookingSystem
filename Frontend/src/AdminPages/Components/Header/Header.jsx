import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create a CSS file for styles

export default function Header() {

  const handleLogout = () => {
    localStorage.removeItem('accountId'); // Remove accountId from local storage
    window.location.href = '/SWP391-PodSystemBooking/login'; // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>Admin Panel</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/SWP391-PodSystemBooking/admin/profile-admin">Personal</Link>
          </li>
          <li>
            <Link onClick={handleLogout} className="logout-btn">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

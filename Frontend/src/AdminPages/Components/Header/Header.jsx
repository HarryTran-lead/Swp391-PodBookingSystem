import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create a CSS file for styles

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Admin Panel</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/personal">Personal</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUser, FaBell } from 'react-icons/fa';
import axios from 'axios';
import './Header.css';

export default function Header({ isLoggedIn, handleLogout }) {
  const [accountId, setAccountId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAccountId = localStorage.getItem('accountId'); // Get accountId from local storage
    if (storedAccountId) {
      setAccountId(storedAccountId);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!accountId) return; // Prevent fetch if accountId is not set

      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7257/api/Notifications/accountId/${accountId}`);
        setNotifications(response.data);
      } catch (error) {
        setError(error.response?.data || 'Error fetching notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [accountId]);

  const handleNotificationClick = async (notificationId) => {
    // ... existing code to handle notification click
  };

  return (
    <Navbar bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/SWP391-PodSystemBooking/">R A D I A N T</Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link href="/SWP391-PodSystemBooking/">Home</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/pod">Pod</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/blog">Blog</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/about">About</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/contact">Contact</Nav.Link>
        </Nav>
      </Container>

      <Nav className="login-btn">
        {isLoggedIn && (
          <>
            <Nav.Link as={Link} to="/SWP391-PodSystemBooking/yourbooking" className="your-booking-btn">
              Your Booking
            </Nav.Link>
            <Nav.Link as={Link} to="/SWP391-PodSystemBooking/yourpakage" className="your-package-btn">
              Your Package
            </Nav.Link>
          </>
        )}

        {isLoggedIn && (
          <>
            {/* Notification Dropdown */}
            <Dropdown className="notification-icon-container">
              <Dropdown.Toggle variant="link" id="notification-dropdown" aria-haspopup="true" aria-expanded="false">
                <FaBell className="notification-icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                <div className="notification-header">Notifications</div>
                {loading ? (
                  <Dropdown.Item disabled>Loading...</Dropdown.Item>
                ) : error ? (
                  <Dropdown.Item disabled>{error}</Dropdown.Item>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item
                      key={notification.notificationId}
                      as={Link}
                      to={`/SWP391-PodSystemBooking/notification/${notification.notificationId}`}
                      onClick={() => handleNotificationClick(notification.notificationId)}
                    >
                      <div>
                        <strong>{notification.notificationName}</strong>
                        <p>{notification.message}</p>
                        <small>{new Date(notification.sentTime).toLocaleString()}</small>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No notifications found.</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* User Profile Dropdown */}
            <Dropdown className="login-icon-container">
              <Dropdown.Toggle variant="link" id="dropdown-basic" aria-haspopup="true" aria-expanded="false">
                <FaUser className="user-icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item as={Link} to="/SWP391-PodSystemBooking/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
        {!isLoggedIn && (
          <Dropdown className="login-icon-container">
            <Dropdown.Toggle variant="link" id="dropdown-basic" aria-haspopup="true" aria-expanded="false">
              <FaUser className="user-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item as={Link} to="/SWP391-PodSystemBooking/login">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/SWP391-PodSystemBooking/signup">
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Nav>
    </Navbar>
  );
}

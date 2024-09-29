import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUser } from 'react-icons/fa';
import './Header.css';

export default function Header({ isLoggedIn, username, handleLogout }) {
  return (
    <Navbar bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/SWP391-PodSystemBooking/">R A D I A N T</Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link href="/SWP391-PodSystemBooking/">Home</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/pod">Pod</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/about">About</Nav.Link>
          <Nav.Link href="/SWP391-PodSystemBooking/contact">Contact</Nav.Link>
        </Nav>
      </Container>

      <Nav className="login-btn">
        {isLoggedIn ? (
          <Dropdown className="login-icon-container">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <span>{username}</span>
              <FaUser className="user-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown className="login-icon-container">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
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

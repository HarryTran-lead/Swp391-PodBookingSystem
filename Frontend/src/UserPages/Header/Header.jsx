import React from 'react';
import { Link } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button
import { FaUser } from 'react-icons/fa'; // Import FontAwesome User Icon
import './Header.css';

export default function Header() {
  return (
    <Navbar bg="black" data-bs-theme="dark">
      
    <Container>
    <Navbar.Brand href="#home">R A D I A N T</Navbar.Brand>
      <Nav className="mx-auto">
      
        <Nav.Link href="/SWP391-PodSystemBooking">Home</Nav.Link>
        <Nav.Link href="#features">Offices</Nav.Link>
        <Nav.Link href="/SWP391-PodSystemBooking/about">About</Nav.Link>
        <Nav.Link href="/SWP391-PodSystemBooking/contact">Contact</Nav.Link>
      </Nav>
      
    </Container>

    <Nav className="login-btn"> 
        <Button variant="outline-light" as={Link} to="/SWP391-PodSystemBooking/login">
          <FaUser /> Login
        </Button>
      </Nav>
  </Navbar>
  )
}

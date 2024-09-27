import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './SignUpPage.css'; // Assuming the same CSS is used for login and sign up
import SignUp from '../../assets/SignUp.png'; // Ensure the path to the image is correct
import { Link } from 'react-router-dom'; // For navigation

export default function SignUpPage() {
  return (
    <Container fluid className="login-page"> {/* Reusing same login-page class for styling */}
      <Row className="align-items-center justify-content-center">
        
        {/* Left Column for Image */}
        <Col md={5} className="login-image-container">
          <img src={SignUp} alt="Sign Up Illustration" className="login-image" />
        </Col>

        {/* Right Column for Sign Up Form */}
        <Col md={5} className="login-form-container">
          <Form className="login-form">
            <h2>Sign Up</h2>
            
            {/* Full Name Input */}
            <Form.Group controlId="formBasicFullName">
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>

            {/* Phone Number Input */}
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Control type="text" placeholder="Phone Number" />
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            {/* Confirm Password Input */}
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            {/* Sign Up Button */}
            <Button variant="secondary" type="submit" className="mt-3">
              Sign Up
            </Button>

            {/* Sign In Link */}
            <div className="login-links mt-3">
              <p>
                Already have an account? <Link to="/SWP391-PodSystemBooking/login" className="signup-link">Sign In</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

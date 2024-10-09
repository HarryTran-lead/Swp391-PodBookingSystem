import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './SignUpPage.css'; // Assuming the same CSS is used for login and sign up
import SignUp from '../../assets/SignUp.png'; // Ensure the path to the image is correct
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    email: '',
    gender: '',
  });
  //
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for handling error and success messages, 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    console.log(formData);
    try {
      // Make a POST request to the API
      const response = await fetch('https://localhost:7257/api/Authen/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // truyền value vào em
      // Handle the response from the API
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign up failed.');
      }

      const data = await response.json();
      setSuccess('Sign up successful! Please log in.');
      setError(''); // Clear error if successful
    } catch (err) {
      console.error('Error:', err); // Log detailed error to console
      setError(err.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <Container fluid className="login-page"> {/* Reusing same login-page class for styling */}
      <Row className="align-items-center justify-content-center">

        {/* Left Column for Image */}
        <Col md={5} className="login-image-container">
          <img src={SignUp} alt="Sign Up Illustration" className="login-image" />
        </Col>

        {/* Right Column for Sign Up Form */}
        <Col md={5} className="login-form-container">
          <Form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {/* Display Success/Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {/* Full Name Input */}
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Phone Number Input */}
            <Form.Group controlId="phone">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Confirm Password Input */}
            <Form.Group controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
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

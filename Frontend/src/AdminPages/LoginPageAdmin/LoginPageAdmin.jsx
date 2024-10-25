import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import SignIn from '../../assets/SignIn.png'; // Path to your login illustration
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../apiService'; // Import your login function

export default function LoginPageAdmin({ onLogin }) {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginAccount(username, password); // Call your login function

      console.log(result); // Log the result for debugging

      if (!result.error) {
        localStorage.setItem('username', result.item.username); // Store the username
        localStorage.setItem('accountId', result.item.id); // Store the account ID
        console.log('Logged in with ID:', result.item.id); // Log the ID for confirmation
        onLogin(result.item.username); // Call the onLogin callback
        navigate('/SWP391-PodSystemBooking/admin/account'); // Redirect to admin account page
      } else {
        setErrorMessage('Login failed. Please try again.'); // Set error message
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.'); // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="align-items-center justify-content-center">
        <Col md={5} className="login-image-container">
          <img src={SignIn} alt="Login Illustration" className="login-image" />
        </Col>
        <Col md={5} className="login-form-container">
          <Form className="login-form" onSubmit={handleLogin}>
            <h2>Admin Sign In</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="secondary" type="submit" className="mt-3" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="login-links mt-3">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
              <p className="mt-2">
                Don't have an account?{' '}
                <Link to="/SWP391-PodSystemBooking/signup" className="signup-link">
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

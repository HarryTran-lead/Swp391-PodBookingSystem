import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginPage.css';
import SignIn from '../../assets/SignIn.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../apiService';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const result = await loginAccount(username, password);
      console.log('Login result:', result); // Check the structure of the result
  
      if (result.error === null) {
        const { id, role } = result.item; // Assuming `id` and `role` are in `item`
        localStorage.setItem('username', username);
        localStorage.setItem('accountId', id);
        localStorage.setItem('userRole', role);
  
        onLogin(id, role);
  
        // Redirect based on role
        if (role === "Admin") {
          navigate('/SWP391-PodSystemBooking/admin/account');
        } else if (role === "Staff") { // Add staff role check
          navigate('/SWP391-PodSystemBooking/staff/bookingorder');
        } else {
          navigate('/SWP391-PodSystemBooking/');
        }
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log error details
      setErrorMessage('An error occurred while logging in.');
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
            <h2>Sign In</h2>
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

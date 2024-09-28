import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginPage.css';
import SignIn from '../../assets/SignIn.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../apiService';

export default function LoginPage({ onLogin }) { // Thêm prop onLogin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginAccount(username, password);
      if (result.success) {
        localStorage.setItem('username', result.username);
        onLogin(result.username); // Gọi hàm onLogin từ props
        navigate('/SWP391-PodSystemBooking/');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
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
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="secondary" type="submit" className="mt-3">
              Login
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

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginPage.css';
import SignIn from '../../assets/SignIn.png'; // Đường dẫn hình ảnh đăng nhập
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../apiService'; // Import hàm login từ apiService

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState(''); // Trạng thái cho username
  const [password, setPassword] = useState(''); // Trạng thái cho password
  const [errorMessage, setErrorMessage] = useState(''); // Trạng thái cho thông báo lỗi
  const [isLoading, setIsLoading] = useState(false); // Trạng thái cho loading
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const result = await loginAccount(username, password); // Assuming this returns the account ID
  
      console.log(result); // Check what you receive here
  
      if (result.error === null) {
        if (result.error === null) {
          localStorage.setItem('username', result.item.username);
          console.log(result.username);
          localStorage.setItem('accountId', result.item.id); // Ensure this is set
          console.log('Logged in with ID:', result.item.id); // Log the ID for confirmation
          onLogin(result.username);
          navigate('/SWP391-PodSystemBooking/');
        }
        
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
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

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginPage.css'; // Import your CSS file
import SignIn from '../../assets/SignIn.png'; // Ensure the path to the image is correct
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function LoginPage() {
  return (
    <Container fluid className="login-page">
      <Row className="align-items-center justify-content-center">
        {/* Left Column for Image */}
        <Col md={5} className="login-image-container">
          <img src={SignIn} alt="Login Illustration" className="login-image" />
        </Col>
        {/* Right Column for Login Form */}
        <Col md={5} className="login-form-container">
          <Form className="login-form">
            <h2>SIGN IN</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="secondary" type="submit" className="mt-3">
              Login
            </Button>

            {/* Add Forgot Password and Sign Up links */}
            <div className="login-links">
              <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
              <p className="mt-2">
                Not having an account? <Link to="/SWP391-PodSystemBooking/signup" className="signup-link">Sign Up</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

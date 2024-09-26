import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Contact.css'; // Assuming you're using a CSS file for styling

export default function Contact() {
  return (
    <div className="contact-page">
      {/* Get in touch form */}
      <Container className="get-in-touch">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="form-container">
            <div className="contact-form-card">
              <h2>Get in touch</h2>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Control type="text" placeholder="Phone" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formMessage">
                  <Form.Control as="textarea" rows={3} placeholder="Message" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Contact details */}
      <Container className="contact-details mt-5">
        <Row>
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <Card.Title>Chat to sales</Card.Title>
                <Card.Text>Speak to our friendly team</Card.Text>
                <Card.Text>info@yourwebsite.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <Card.Title>Visit us</Card.Title>
                <Card.Text>Come meet us at our HQ</Card.Text>
                <Card.Text>1234 Name Street, City, State</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <Card.Title>Call us</Card.Title>
                <Card.Text>Mon - Fri 9am - 6pm</Card.Text>
                <Card.Text>+1800-123-4567</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

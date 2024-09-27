import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css'; // Import your custom CSS for footer

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h2>RENTAL</h2>
          <p style={{ color: 'orange' }}><strong>Phone:</strong> 1-800-123-4567</p>
<p style={{ color: 'orange' }}><strong>Email:</strong> info@luxuryrentals.com</p>

          <p>1234 Name Street,<br />City, State</p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Listings</a></li>
            <li><a href="#">Terms and conditions</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Discover</h3>
          <ul>
            <li><a href="#">New York City</a></li>
            <li><a href="#">Chicago</a></li>
            <li><a href="#">Los Angeles</a></li>
            <li><a href="#">San Diego</a></li>
            <li><a href="#">Boston</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Subscribe to our Newsletter</h3>
          <input type="email" placeholder="Email Address" />
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-pinterest"></i></a>
            <a href="#"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

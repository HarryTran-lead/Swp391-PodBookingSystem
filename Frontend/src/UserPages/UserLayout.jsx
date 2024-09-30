import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

export default function UserLayout({ children, isLoggedIn, username, handleLogout }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
      <div className="col-md-14 mt-5">
        <main>{children}</main>
      </div>
      <Footer />
      <div
     style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#2a2829",
      color: "#fff",
      padding: "20px 40px",
      borderRadius: "30px",
      zIndex: "1000",
      cursor: "pointer",
      border: "2px solid white",  // Thêm thuộc tính border
    }}
    
      >
        <a
          href="https://m.me/343721882163379"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faFacebookMessenger}
            style={{ marginRight: "10px" }}
          />
          Chat
        </a>
      </div>
    </div>
    
  );
}

import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function UserLayout({ children, isLoggedIn, username, handleLogout }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
      <div className="col-md-14 mt-5">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

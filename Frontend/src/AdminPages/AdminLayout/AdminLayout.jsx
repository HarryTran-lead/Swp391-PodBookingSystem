// ./AdminPages/AdminLayout.jsx
import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import './AdminLayout.css'; // Ensure that this CSS file does not conflict with Bootstrap styles

function AdminLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - occupies 2 columns */}
          <div className="col-md-2 p-0 mt-5">
            <Sidebar />
          </div>
          {/* Main content - occupies 10 columns */}
          <div className="col-md-10 mt-5">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

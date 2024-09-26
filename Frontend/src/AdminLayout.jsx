// ./AdminPages/AdminLayout.jsx
import React from 'react';

function AdminLayout({ children }) {
  return (
    <div>
      <nav>
        {/* Add Admin-specific navigation here */}
        <h2>Admin Dashboard</h2>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default AdminLayout;

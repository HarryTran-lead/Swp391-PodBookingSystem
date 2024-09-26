// ./AdminPages/AdminLayout.jsx
import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import './AdminLayout.css'
function AdminLayout({ children }) {
  return (
    <div>
      <Header/>
      <Sidebar/>
       <main >{children}</main>
      
    </div>
    
      
   
       
   
  );
}

export default AdminLayout;

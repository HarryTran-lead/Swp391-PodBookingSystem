// ./AdminPages/UpdateAccount.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css';
import './Account.css';

function UpdateAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const account = location.state?.account || {}; // Retrieve the account data from the passed state

  // State to handle account fields
  const [name, setName] = useState(account.name || '');
  const [username, setUsername] = useState(account.username || '');
  const [phone, setPhone] = useState(account.phone || '');
  const [role, setRole] = useState(account.role || '');

  const API_URL = `https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Account/${account.id}`;

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, { name, username, phone, role });
      toast.success('Account updated successfully!'); // Show success notification
      setTimeout(() => {
        navigate('/SWP391-PodSystemBooking/admin/account'); // Redirect to the accounts page after success
      }, 1000);
    } catch (error) {
      toast.error('Error updating account!');
      console.error('Error updating account:', error);
    }
  };

  return (
    <div className="update-account-page">
      <h1>Update Account</h1>
      <form onSubmit={handleUpdateSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
      <ToastContainer /> {/* Container for displaying toast notifications */}
    </div>
  );
}

export default UpdateAccount;

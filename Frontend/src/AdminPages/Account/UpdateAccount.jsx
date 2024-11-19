// ./AdminPages/UpdateAccount.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = location.state; // Get account data from navigation state

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    role: '',
    status: ''
  });

  const API_URL = `https://localhost:7257/api/Accounts/${account.id}`;

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || '',
        username: account.username || '',
        phone: account.phone || '',
        role: account.role || '',
        status: account.status || 'active'
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, formData);
      toast.success('Account updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/account'); // Redirect back to account page
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Failed to update account.');
    }
  };

  return (
    <div className="update-account-page">
      <h1>Update Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <button type="submit">Update Account</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

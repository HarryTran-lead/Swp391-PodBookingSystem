import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Account.css';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    role: '',
  });
  const navigate = useNavigate();

  const API_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Account';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      toast.success('Account created successfully!'); // Show success notification
      setTimeout(() => {
        navigate('/SWP391-PodSystemBooking/admin/account'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      toast.error('Error creating account!');
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="create-account-page">
      <h1>Create New Account</h1>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

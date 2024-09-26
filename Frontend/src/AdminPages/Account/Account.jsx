// ./AdminPages/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './Account.css'; // Import your CSS for styling

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const API_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Account';

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleUpdate = (account) => {
    // Navigate to UpdateAccount with account data
    navigate('/SWP391-PodSystemBooking/admin/update-account', { state: { account } });
  };

  return (
    <div className="account-page">
      <h1>Account Management</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td>{account.username}</td>
              <td>{account.phone}</td>
              <td>{account.role}</td>
              <td>
                <button onClick={() => handleUpdate(account)}>Update</button>
                <button onClick={() => handleDelete(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ./AdminPages/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import './Account.css';

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

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
      toast.success('Account deleted successfully!'); // Show success notification
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error deleting account.'); // Show error notification
    }
  };

  const handleUpdate = (account) => {
    navigate('/SWP391-PodSystemBooking/admin/update-account', { state: { account } });
  };

  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-account');
  };

  return (
    <div className="account-page">
      <h1>Account Management</h1>
      
      <button className="create-button" onClick={handleCreate}>
        Create New Account
      </button>

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

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

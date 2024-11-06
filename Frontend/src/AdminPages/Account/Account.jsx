// ./AdminPages/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Account.css';

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/Accounts';

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
      toast.success('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error deleting account.');
    }
  };

  const handleUpdate = (account) => {
    navigate('/SWP391-PodSystemBooking/admin/update-account', { state: { account } });
  };

  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-account');
  };

  // Filtered accounts based on search term
  const filteredAccounts = accounts.filter((account) =>
    Object.values(account).some((value) =>
      value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  return (
    <div className="account-page">
      <h1>Account Management</h1>
      
      <button className="create-button" onClick={handleCreate}>
        Create New Account
      </button>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

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
          {filteredAccounts.map((account) => (
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

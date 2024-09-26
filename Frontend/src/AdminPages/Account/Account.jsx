// ./AdminPages/Account.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css'; // Import your CSS for styling

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState(null);

  const API_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Account';

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const accountData = { name, username, phone, role };

    try {
      if (editMode) {
        // Update account
        await axios.put(`${API_URL}/${currentAccountId}`, accountData);
      } else {
        // Create account
        await axios.post(API_URL, accountData);
      }
      resetForm();
      fetchAccounts();
    } catch (error) {
      console.error("Error creating/updating account:", error);
    }
  };

  const handleEdit = (account) => {
    setName(account.name);
    setUsername(account.username);
    setPhone(account.phone);
    setRole(account.role);
    setEditMode(true);
    setCurrentAccountId(account.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const resetForm = () => {
    setName('');
    setUsername('');
    setPhone('');
    setRole('');
    setEditMode(false);
    setCurrentAccountId(null);
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
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td>{account.username}</td>
              <td>{account.phone}</td>
              <td>{account.role}</td>
              <td>
                <button onClick={() => handleEdit(account)}>Edit</button>
                <button onClick={() => handleDelete(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleCreateOrUpdate}>
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
        <button type="submit">{editMode ? 'Update' : 'Create'}</button>
        {editMode && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
}

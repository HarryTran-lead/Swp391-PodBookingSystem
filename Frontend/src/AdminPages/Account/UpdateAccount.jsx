// ./AdminPages/UpdateAccount.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the state passed during navigation
import './Account.css';
function UpdateAccount() {
  const location = useLocation();
  const account = location.state?.account || {}; // Retrieve the account data from the passed state

  // State to handle account fields
  const [name, setName] = useState(account.name || '');
  const [username, setUsername] = useState(account.username || '');
  const [phone, setPhone] = useState(account.phone || '');
  const [role, setRole] = useState(account.role || '');

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Implement the update logic (e.g., API call to update the account)
    console.log('Updating account with data:', { name, username, phone, role });
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
    </div>
  );
}

export default UpdateAccount;

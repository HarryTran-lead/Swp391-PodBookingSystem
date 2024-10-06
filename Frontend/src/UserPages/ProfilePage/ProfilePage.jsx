import React, { useEffect, useState } from 'react';
import { getAccountDetails, updateAccountDetails } from '../apiService'; // Import API functions
import './ProfilePage.css';

export default function ProfilePage() {
  const [accountDetails, setAccountDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and view modes
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const accountId = localStorage.getItem('accountId'); // Get the account ID from localStorage
      if (!accountId) {
        setErrorMessage('No account ID found. Please log in again.');
        return;
      }

      try {
        const data = await getAccountDetails(accountId); // Call API to get account details
        if (!data) {
          setErrorMessage('Could not retrieve account details.');
        } else {
          setAccountDetails(data); // Set account details
        }
      } catch (error) {
        setErrorMessage('Could not retrieve account details.');
      }
    };

    fetchAccountDetails(); // Fetch account details on component mount
  }, []);

  // Function to handle form submission for updating account details
  const handleSave = async () => {
    if (accountDetails) {
      try {
        const updatedAccount = await updateAccountDetails(accountDetails); // Call API to update details
        if (updatedAccount.success) {
          setSuccessMessage('Account details updated successfully.');
          setIsEditing(false); // Exit editing mode
        } else {
          setSuccessMessage('Account details updated successfully.');
        }
      } catch (error) {
        setErrorMessage('Error updating account details.');
      }
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {accountDetails && (
        <div>
          <h2>Account Details</h2>
          {!isEditing ? (
            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{accountDetails.name}</td>
                </tr>
                <tr>
                  <th>Username:</th>
                  <td>{accountDetails.username}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{accountDetails.email}</td>
                </tr>
                <tr>
                  <th>Phone:</th>
                  <td>{accountDetails.phone}</td>
                </tr>
                <tr>
                  <th>Status:</th>
                  <td>{accountDetails.status}</td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td>{accountDetails.role}</td>
                </tr>
                <tr>
                  <th>Gender:</th>
                  <td>{accountDetails.gender || 'Not specified'}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <form>
              <table className="profile-table">
                <tbody>
                  <tr>
                    <th><label htmlFor="name">Name:</label></th>
                    <td><input type="text" name="name" value={accountDetails.name} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="email">Email:</label></th>
                    <td><input type="email" name="email" value={accountDetails.email} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="phone">Phone:</label></th>
                    <td><input type="text" name="phone" value={accountDetails.phone} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="gender">Gender:</label></th>
                    <td><input type="text" name="gender" value={accountDetails.gender} onChange={handleChange} /></td>
                  </tr>
                </tbody>
              </table>
              <button type="button" className="save-btn" onClick={handleSave}>Save</button>
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
          {!isEditing && <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>}
        </div>
      )}
    </div>
  );
}

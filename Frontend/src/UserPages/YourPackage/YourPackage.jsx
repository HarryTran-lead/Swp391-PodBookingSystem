import React, { useEffect, useState } from 'react';
import { getUserPackages } from '../apiService'; // Import the API function
import axios from 'axios'; // Import axios for API calls
import './YourPackage.css';

export default function YourPackage() {
  const [userPackages, setUserPackages] = useState([]); // State to hold user packages
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserPackages = async () => {
      const accountId = localStorage.getItem('accountId'); // Get the account ID from localStorage
      if (!accountId) {
        setErrorMessage('No account ID found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const packages = await getUserPackages(accountId); // Fetch user packages using the API function
        
        // Fetch details for each package from the ServicePackages API
        const packageDetailsPromises = packages.map(async (pkg) => {
          const response = await axios.get(`https://localhost:7257/api/ServicePackages/${pkg.packageId}`);
          return {
            ...pkg,
            packageName: response.data.packageName,
            features: response.data.features,
            discountPercentage: response.data.discountPercentage,
          };
        });

        const detailedPackages = await Promise.all(packageDetailsPromises); // Wait for all requests to complete
        setUserPackages(detailedPackages); // Set the combined user package details
      } catch (error) {
        setErrorMessage('Error fetching user packages. Please try again later.');
        console.error('Error fetching user packages:', error);
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchUserPackages(); // Fetch user packages on component mount
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="your-packages-container">
      <h2>Your Packages</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {userPackages.length > 0 ? (
        <table className="package-table">
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Package Name</th>
              <th>Purchase Date</th>
              <th>Expiry Date</th>
              <th>Features</th>
              <th>Discount Percentage</th>
              <th>Status Active</th> {/* New column for Status Active */}
            </tr>
          </thead>
          <tbody>
            {userPackages.map((pkg) => (
              <tr key={pkg.userPackageId}>
                <td>{pkg.packageId}</td>
                <td>{pkg.packageName}</td>
                <td>{new Date(pkg.purchaseDate).toLocaleString()}</td> {/* Display both date and time */}
                <td>{new Date(pkg.expiryDate).toLocaleString()}</td> {/* Display both date and time */}
                <td>{pkg.features}</td>
                <td>{pkg.discountPercentage}%</td>
                <td>{pkg.status === 1 ? "InActive" : "Active"}</td> {/* Display "Active" if status is 1 */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No packages found for your account.</p>
      )}
    </div>
  );
}

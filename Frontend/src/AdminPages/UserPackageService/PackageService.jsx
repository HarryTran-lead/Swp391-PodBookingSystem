import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PackageService() {
  const [userPurchasedPackages, setUserPurchasedPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/UserPurchasedPackages';

  useEffect(() => {
    fetchUserPurchasedPackages();
  }, []);

  const fetchUserPurchasedPackages = async () => {
    try {
      const response = await axios.get(API_URL);
      const sortedPackages = response.data.sort((a, b) => b.userPackageId - a.userPackageId);
      setUserPurchasedPackages(sortedPackages);
    } catch (error) {
      console.error('Error fetching user purchased packages:', error);
      toast.error('Failed to fetch user purchased packages.');
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting user purchased package with ID:", id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUserPurchasedPackages();
      toast.success('User purchased package deleted successfully!');
    } catch (error) {
      console.error('Error deleting user purchased package:', error);
      toast.error('Error deleting user purchased package.');
    }
  };

  const handleUpdate = (packageData) => {
    navigate('/SWP391-PodSystemBooking/admin/update-package', { state: { packageData } });
  };

  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-package');
  };

  // Filtered user-purchased packages based on search term
  const filteredPackages = userPurchasedPackages.filter((pkg) =>
    Object.values(pkg).some((value) =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="pod-page">
      <h1>User Purchased Package Management</h1>

   

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>User Package ID</th>
            <th>Account ID</th>
            <th>Package ID</th>
            <th>Purchase Date</th>
            <th>Expiry Date</th>
           
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredPackages.map((pkg, index) => (
            <tr key={pkg.userPackageId}>
              <td>{index + 1}</td>
              <td>{pkg.userPackageId}</td>
              <td>{pkg.accountId}</td>
              <td>{pkg.packageId}</td>
              <td>{new Date(pkg.purchaseDate).toLocaleDateString()}</td>
              <td>{new Date(pkg.expiryDate).toLocaleDateString()}</td>
            
              <td>{pkg.status ? 'Active' : 'Inactive'}</td>
            
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

// ./AdminPages/Pod.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PackageService() {
  const [servicePackages, setServicePackages] = useState([]);
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/ServicePackages';

  useEffect(() => {
    fetchServicePackages();
  }, []);

  // Fetch all service packages
  const fetchServicePackages = async () => {
    try {
      const response = await axios.get(API_URL);
      setServicePackages(response.data);
    } catch (error) {
      console.error('Error fetching service packages:', error);
      toast.error('Failed to fetch service packages.');
    }
  };

  // Delete a service package
  const handleDelete = async (id) => {
    console.log("Deleting service package with ID:", id); // Log ID
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchServicePackages();
      toast.success('Service package deleted successfully!');
    } catch (error) {
      console.error('Error deleting service package:', error);
      toast.error('Error deleting service package.'); // Thêm log để có thêm thông tin
    }
  };
  

  // Navigate to update service package page
  const handleUpdate = (servicePackage) => {
    navigate('/SWP391-PodSystemBooking/admin/update-package', { state: { servicePackage } });
  };

  // Navigate to create new service package page
  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-package');
  };

  return (
    <div className="pod-page">
      <h1>Service Package Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Service Package
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Package Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Features</th>
            <th>Duration Type</th>
            <th>Discount Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicePackages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.id}</td>
              <td>{pkg.packageName}</td>
              <td>{pkg.duration}</td>
              <td>${pkg.price}</td>
              <td>{pkg.features}</td>
              <td>{pkg.durationType}</td>
              <td>{pkg.discountPercentage}</td>
              <td>
                <button onClick={() => handleUpdate(pkg)}>Update</button>
                <button onClick={() => handleDelete(pkg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

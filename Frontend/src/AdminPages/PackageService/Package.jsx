import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Package.css'; // Ensure you create this CSS file for styling

export default function Package() {
  const [servicePackages, setServicePackages] = useState([]); // State for service packages
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/ServicePackages'; // Updated API URL

  useEffect(() => {
    fetchServicePackages(); // Fetch service packages on component mount
  }, []);

  // Fetch all service packages
  const fetchServicePackages = async () => {
    try {
      const response = await axios.get(API_URL);
      setServicePackages(response.data); // Set service packages from the response
    } catch (error) {
      console.error('Error fetching service packages:', error);
      toast.error('Failed to fetch service packages.');
    }
  };

  // Delete a service package
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchServicePackages();
      toast.success('Service package deleted successfully!');
    } catch (error) {
      console.error('Error deleting service package:', error);
      toast.error('Error deleting service package.');
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
    <div className="service-package-page">
      <h1>Service Package Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Service Package
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Features</th>
            <th>Discount Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicePackages.map((servicePackage) => (
            <tr key={servicePackage.id}> {/* Ensure id is unique */}
              <td>{servicePackage.id}</td>
              <td>{servicePackage.packageName}</td>
              <td>{servicePackage.duration} {servicePackage.durationType}</td>
              <td>${servicePackage.price.toFixed(2)}</td>
              <td>{servicePackage.features}</td>
              <td>{servicePackage.discountPercentage}%</td>
              <td>
                <button onClick={() => handleUpdate(servicePackage)}>Update</button>
                <button onClick={() => handleDelete(servicePackage.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

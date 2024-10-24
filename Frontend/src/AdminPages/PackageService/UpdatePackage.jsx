import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 // Ensure you create this CSS file for styling

export default function UpdatePackage() {
  const navigate = useNavigate();
  const location = useLocation();
  const servicePackage = location.state.servicePackage; // Get the passed package data from navigation

  const [packageData, setPackageData] = useState({
    packageName: '',
    duration: '',
    durationType: '',
    price: '',
    features: '',
    discountPercentage: ''
  });

  useEffect(() => {
    if (servicePackage) {
      setPackageData(servicePackage); // Set initial form values
    }
  }, [servicePackage]);

  const API_URL = 'https://localhost:7257/api/ServicePackages'; // API URL for updates

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${servicePackage.id}`, packageData); // Update package
      toast.success('Service package updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/package'); // Navigate back to the package list
    } catch (error) {
      console.error('Error updating service package:', error);
      toast.error('Failed to update service package.');
    }
  };

  return (
    <div className="update-package-page">
      <h1>Update Service Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="packageName"
            value={packageData.packageName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={packageData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration Type:</label>
          <select
            name="durationType"
            value={packageData.durationType}
            onChange={handleChange}
            required
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="months">Months</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Features:</label>
          <textarea
            name="features"
            value={packageData.features}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="discountPercentage"
            value={packageData.discountPercentage}
            onChange={handleChange}
            required
            min="0"
            max="100"
          />
        </div>
        <button type="submit">Update Package</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

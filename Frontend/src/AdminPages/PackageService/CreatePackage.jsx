import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreatePackage() {
  const [packageName, setPackageName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/ServicePackages'; // API endpoint

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPackage = {
        packageName,
        duration: parseInt(duration),
        price: parseFloat(price),
        features,
        discountPercentage: parseInt(discountPercentage),
        durationType: 'Day', // Change this if you want to allow different types
      };

      await axios.post(API_URL, newPackage);
      toast.success('Service package created successfully!');
      navigate('/SWP391-PodSystemBooking/admin/package'); // Redirect to packages list after creation
    } catch (error) {
      console.error('Error creating service package:', error);
      toast.error('Failed to create service package.');
    }
  };

  return (
    <div className="create-package-page">
      <h1>Create New Service Package</h1>
      <form onSubmit={handleSubmit} className="create-package-form">
        <div className="form-group">
          <label>Package Name:</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Features:</label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Discount Percentage:</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Package</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

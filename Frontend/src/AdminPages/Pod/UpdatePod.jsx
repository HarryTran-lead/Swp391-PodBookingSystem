// ./AdminPages/UpdatePod.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pod.css'; // Create this CSS file for styling

export default function UpdatePod() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: state?.pod.Name || '',
    LocationID: state?.pod.LocationID || '',
    PricePerHour: state?.pod.PricePerHour || '',
  });

  const API_URL = `https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Pod/${state?.pod.id}`;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to update the pod
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, formData);
      toast.success('Pod updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/pods'); // Redirect back to the Pod management page
    } catch (error) {
      console.error('Error updating pod:', error);
      toast.error('Failed to update pod.');
    }
  };

  return (
    <div className="update-pod-page">
      <h1>Update Pod</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location ID:</label>
          <input
            type="text"
            name="LocationID"
            value={formData.LocationID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price Per Hour:</label>
          <input
            type="number"
            name="PricePerHour"
            value={formData.PricePerHour}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update Pod
        </button>
      </form>

      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

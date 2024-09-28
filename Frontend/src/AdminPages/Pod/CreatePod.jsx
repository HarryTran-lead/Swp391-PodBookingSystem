import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import './Pod.css'; // Ensure you have a CSS file for styling

export default function CreatePod() {
  const [pod, setPod] = useState({
    name: '',
    description: '',
    pricePerHour: '',
    imgPod: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPod({ ...pod, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!pod.name || !pod.description || !pod.pricePerHour || !pod.imgPod) {
      setError('All fields are required.');
      toast.error('All fields are required.'); // Show error notification
      return;
    }

    try {
      // API URL for creating a new pod
      const API_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Pod';
      const response = await axios.post(API_URL, pod);
      console.log('Pod created successfully:', response); // Debug: Check if this logs correctly
      toast.success('Pod created successfully!'); // Show success notification
      navigate('/SWP391-PodSystemBooking/admin/pod'); // Navigate back to pod list page
    } catch (err) {
      console.error('Error creating pod:', err);
      setError('Failed to create pod. Please try again later.');
      toast.error('Failed to create pod. Please try again later.'); // Show error notification
    }
  };

  return (
    <div className="create-pod-page">
      <h1>Create New Pod</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="create-pod-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Pod Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pod.name}
            onChange={handleChange}
            placeholder="Enter pod name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={pod.description}
            onChange={handleChange}
            placeholder="Enter pod description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="pricePerHour">Price per Hour:</label>
          <input
            type="number"
            id="pricePerHour"
            name="pricePerHour"
            value={pod.pricePerHour}
            onChange={handleChange}
            placeholder="Enter price per hour"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgPod">Image URL:</label>
          <input
            type="text"
            id="imgPod"
            name="imgPod"
            value={pod.imgPod}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Create Pod
        </button>
      </form>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

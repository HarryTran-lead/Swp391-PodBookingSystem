// ./AdminPages/UpdatePod.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdatePod() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pod } = location.state; // Get pod data from navigation state

  const [formData, setFormData] = useState({
    name: '',
    pricePerHour: '',
    description: '',
    imgPod: null,
  });

  const API_URL = `https://localhost:7257/api/Pods/${pod.podId}`;

  useEffect(() => {
    if (pod) {
      setFormData({
        name: pod.name || '',
        pricePerHour: pod.pricePerHour || '',
        description: pod.description || '',
        imgPod: pod.imgPod || null,
      });
    }
  }, [pod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imgPod: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('pricePerHour', formData.pricePerHour);
    formDataToSend.append('description', formData.description);
    if (formData.imgPod) {
      formDataToSend.append('imgPod', formData.imgPod);
    }

    try {
      await axios.put(API_URL, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Pod updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/pod'); // Redirect to pod list
    } catch (error) {
      console.error('Error updating pod:', error);
      toast.error('Failed to update pod.');
    }
  };

  return (
    <div className="update-pod-page">
      <h1>Update Pod</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price Per Hour:
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Pod Image:
          <input
            type="file"
            name="imgPod"
            accept="image/*"
            onChange={handleFileChange}
          />
          {pod.imgPod && <img src={pod.imgPod} alt={pod.name} className="pod-preview" />}
        </label>

        <button type="submit">Update Pod</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

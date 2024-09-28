// ./AdminPages/Pod.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pod.css'; // Ensure to create a Pod.css file for styling

export default function Pod() {
  const [pods, setPods] = useState([]);
  const navigate = useNavigate();

  const API_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Pod';

  useEffect(() => {
    fetchPods();
  }, []);

  // Fetch all pods
  const fetchPods = async () => {
    try {
      const response = await axios.get(API_URL);
      setPods(response.data);
    } catch (error) {
      console.error('Error fetching pods:', error);
      toast.error('Failed to fetch pods.');
    }
  };

  // Delete a pod
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPods();
      toast.success('Pod deleted successfully!');
    } catch (error) {
      console.error('Error deleting pod:', error);
      toast.error('Error deleting pod.');
    }
  };

  // Navigate to update pod page
  const handleUpdate = (pod) => {
    navigate('/SWP391-PodSystemBooking/admin/update-pod', { state: { pod } });
  };

  // Navigate to create new pod page
  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-pod');
  };

  return (
    <div className="pod-page">
      <h1>Pod Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Pod
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>LocationID</th>
            <th>Price Per Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pods.map((pod) => (
            <tr key={pod.id}>
              <td>{pod.id}</td>
              <td>
                <img src={pod.ImgPod} alt={pod.Name} className="pod-image" />
              </td>
              <td>{pod.Name}</td>
              <td>{pod.LocationID}</td>
              <td>${pod.PricePerHour}</td>
              <td>
                <button onClick={() => handleUpdate(pod)}>Update</button>
                <button onClick={() => handleDelete(pod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

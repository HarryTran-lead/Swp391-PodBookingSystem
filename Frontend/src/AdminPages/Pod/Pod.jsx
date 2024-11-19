import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pod.css';

export default function Pod() {
  const [pods, setPods] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/Pods';

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

  // Filter pods based on search term
  const filteredPods = pods.filter((pod) =>
    Object.values(pod).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="pod-page">
      <h1>Pod Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Pod
      </button>

      <input
        type="text"
        placeholder="Search by any field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
        
            <th>Price Per Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPods.map((pod) => (
            <tr key={pod.podId}>
              <td>{pod.podId}</td>
              <td>
                <img src={`https://localhost:7257/api/Pods/${pod.podId}/image`} alt={pod.name} className="pod-image" />
              </td>
              <td>{pod.name}</td>
           
              <td>${pod.pricePerHour}</td>
              <td>
                <button onClick={() => handleUpdate(pod)}>Update</button>
                <button onClick={() => handleDelete(pod.podId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

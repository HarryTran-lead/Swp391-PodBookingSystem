import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Package.css';

export default function Package() {
  const [servicePackages, setServicePackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/ServicePackages';

  useEffect(() => {
    fetchServicePackages();
  }, []);

  const fetchServicePackages = async () => {
    try {
      const response = await axios.get(API_URL);
      setServicePackages(response.data);
    } catch (error) {
      console.error('Error fetching service packages:', error);
      toast.error('Failed to fetch service packages.');
    }
  };

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

  const handleUpdate = (servicePackage) => {
    navigate('/SWP391-PodSystemBooking/admin/update-package', { state: { servicePackage } });
  };

  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-package');
  };

  // Filter service packages based on search term
  const filteredServicePackages = servicePackages.filter((item) =>
    Object.values(item).some((value) =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="service-package-page">
      <h1 style={{ marginTop: 30 }}>Service Package Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Service Package
      </button>

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
          {filteredServicePackages.map((servicePackage) => (
            <tr key={servicePackage.id}>
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

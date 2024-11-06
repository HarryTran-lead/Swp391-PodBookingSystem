import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PackageService() {
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
      const sortedPackages = response.data.sort((a, b) => b.id - a.id);
      setServicePackages(sortedPackages);
    } catch (error) {
      console.error('Error fetching service packages:', error);
      toast.error('Failed to fetch service packages.');
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting service package with ID:", id);
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

  // Filtered service packages based on search term
  const filteredPackages = servicePackages.filter((pkg) =>
    Object.values(pkg).some((value) =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="pod-page">
      <h1>Service Package Management</h1>

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
            <th>STT</th>
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
          {filteredPackages.map((pkg, index) => (
            <tr key={pkg.id}>
              <td>{index + 1}</td>
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

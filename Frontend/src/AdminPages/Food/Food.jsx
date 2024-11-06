import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Food.css';

export default function Food() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/FoodItems';

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to fetch food items.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFoodItems();
      toast.success('Food item deleted successfully!');
    } catch (error) {
      console.error('Error deleting food item:', error);
      toast.error('Error deleting food item.');
    }
  };

  const handleUpdate = (foodItem) => {
    navigate('/SWP391-PodSystemBooking/admin/update-food', { state: { foodItem } });
  };

  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-food');
  };

  // Filter food items based on search term
  const filteredFoodItems = foodItems.filter((item) =>
    Object.values(item).some((value) =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="food-item-page">
      <h1>Food Item Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Food Item
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
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoodItems.map((foodItem) => (
            <tr key={foodItem.foodId}>
              <td>{foodItem.foodId}</td>
              <td>
                <img
                  src={`https://localhost:7257${foodItem.imageUrl}`}
                  alt={foodItem.foodName}
                  className="food-item-image"
                />
              </td>
              <td>{foodItem.foodName}</td>
              <td>{foodItem.description}</td>
              <td>${foodItem.price.toFixed(2)}</td>
              <td>{foodItem.isAvailable ? 'Available' : 'Not Available'}</td>
              <td>
                <button onClick={() => handleUpdate(foodItem)}>Update</button>
                <button onClick={() => handleDelete(foodItem.foodId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

// ./AdminPages/FoodItems.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Food.css'; // Ensure you create this CSS file for styling

export default function Food() {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/FoodItems';

  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Fetch all food items
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to fetch food items.');
    }
  };

  // Delete a food item
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

  // Navigate to update food item page
  const handleUpdate = (foodItem) => {
    navigate('/SWP391-PodSystemBooking/admin/update-food', { state: { foodItem } });
  };

  // Navigate to create new food item page
  const handleCreate = () => {
    navigate('/SWP391-PodSystemBooking/admin/create-food');
  };

  return (
    <div className="food-item-page">
      <h1>Food Item Management</h1>

      <button className="create-button" onClick={handleCreate}>
        Create New Food Item
      </button>

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
          {foodItems.map((foodItem) => (
            <tr key={foodItem.foodId}>  {/* Ensure foodId is unique */}
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

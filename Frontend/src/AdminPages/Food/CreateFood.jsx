// ./AdminPages/CreateFoodItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Food.css'; // Ensure you create this CSS file for styling

export default function CreateFood() {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Changed to hold the image file
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'https://localhost:7257/api/FoodItems';

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object

    // Append form values to the FormData object
    formData.append('foodName', foodName);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('image', image); // Append the image file
    formData.append('isAvailable', isAvailable);

    try {
      await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      toast.success('Food item created successfully!');
      navigate('/SWP391-PodSystemBooking/admin/food'); // Redirect to food items page
    } catch (error) {
      console.error('Error creating food item:', error);
      toast.error('Failed to create food item.');
    }
  };

  return (
    <div className="create-food-item-page">
      <h1>Create New Food Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Food Name:</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*" // Accept only image files
            onChange={(e) => setImage(e.target.files[0])} // Set the image file
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
            />
            Available
          </label>
        </div>
        <button type="submit" className="submit-button">Create Food Item</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

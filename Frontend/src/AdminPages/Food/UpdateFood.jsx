import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Food.css'; // Ensure you have the appropriate CSS styles

export default function UpdateFood() {
  const location = useLocation();
  const navigate = useNavigate();
  const foodItem = location.state?.foodItem; // Get the food item from navigation state

  const API_URL = `https://localhost:7257/api/FoodItems/${foodItem.foodId}`;
  
  const [foodName, setFoodName] = useState(foodItem.foodName);
  const [description, setDescription] = useState(foodItem.description);
  const [price, setPrice] = useState(foodItem.price);
  const [isAvailable, setIsAvailable] = useState(foodItem.isAvailable);
  const [image, setImage] = useState(null); // State for the image file

  useEffect(() => {
    if (!foodItem) {
      toast.error('Food item not found.');
      navigate('/SWP391-PodSystemBooking/admin/food-items');
    }
  }, [foodItem, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('FoodName', foodName);
    formData.append('Description', description);
    formData.append('Price', price);
    formData.append('IsAvailable', isAvailable);

    // Append the new image if provided, otherwise leave it out
    if (image) {
      formData.append('ImgPod', image);
    }

    try {
      await axios.put(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Food item updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/food-items'); // Redirect after update
    } catch (error) {
      console.error('Error updating food item:', error);
      toast.error('Failed to update food item.');
    }
  };

  return (
    <div className="update-food-item-page">
      <h1>Update Food Item</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Food Name:</label>
          <input 
            type="text" 
            value={foodName} 
            onChange={(e) => setFoodName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(parseFloat(e.target.value))} 
            required 
          />
        </div>
        <div>
          <label>Is Available:</label>
          <select 
            value={isAvailable} 
            onChange={(e) => setIsAvailable(e.target.value === 'true')} 
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>
        <button type="submit">Update Food Item</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

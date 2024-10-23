import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderedFood.css'; // Import CSS for styling

const OrderedFood = ({ isOpen, onClose, bookingId }) => {
  const [orderedFood, setOrderedFood] = useState([]);
  const [foodDetails, setFoodDetails] = useState({}); // State to store food details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FOOD_ORDER_API_URL = 'https://localhost:7257/api/FoodOrderDetails';
  const FOOD_ITEM_API_URL = 'https://localhost:7257/api/FoodItems'; // Base URL for food items

  // Fetch ordered food based on bookingId
  const fetchOrderedFood = async () => {
    if (!bookingId) {
      console.warn('Booking ID is undefined');
      return; // Exit early if bookingId is undefined
    }
    try {
      const response = await axios.get(`${FOOD_ORDER_API_URL}/booking/${bookingId}`);
      setOrderedFood(response.data);
      fetchFoodDetails(response.data); // Fetch food details based on ordered food
    } catch (error) {
      console.error('Error fetching ordered food:', error);
      setError('Failed to load ordered food.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch food details based on foodIds
  const fetchFoodDetails = async (orderedFood) => {
    const foodDetailPromises = orderedFood.map(order =>
      axios.get(`${FOOD_ITEM_API_URL}/${order.foodId}`)
        .then(response => ({
          foodId: order.foodId,
          ...response.data // Spread the entire response data
        }))
        .catch(error => {
          console.error(`Error fetching food item ${order.foodId}:`, error);
          return { foodId: order.foodId, foodName: 'Unknown Food', description: 'N/A', price: 0, imageUrl: '' }; // Fallback in case of error
        })
    );

    // Wait for all food detail promises to resolve
    const foodDetailResults = await Promise.all(foodDetailPromises);
    
    // Store the food details in state
    const foodDetailsObject = foodDetailResults.reduce((acc, { foodId, foodName, description, price, imageUrl }) => {
      acc[foodId] = { foodName, description, price, imageUrl }; // Create a mapping of foodId to food details
      return acc;
    }, {});

    setFoodDetails(foodDetailsObject); // Update state with the food details
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrderedFood();
    }
  }, [bookingId, isOpen]);

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h3>Your Ordered Food:</h3>
        {loading ? (
          <p>Loading ordered food...</p>
        ) : error ? (
          <p>{error}</p>
        ) : orderedFood.length > 0 ? (
          <ul className="food-list">
            {orderedFood.map((order, index) => {
              const food = foodDetails[order.foodId] || {}; // Get food details
              return (
                <li key={index} className="food-item">
                  <img src={food.imageUrl} alt={food.foodName} className="food-image" /> {/* Display food image */}
                  <p><strong>Food Name:</strong> {food.foodName || 'Loading...'}</p>
                  <p><strong>Description:</strong> {food.description || 'Loading...'}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Price:</strong> {food.price} vnđ</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No food orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderedFood;

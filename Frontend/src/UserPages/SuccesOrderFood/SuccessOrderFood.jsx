import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SuccessOrderFood.css';

export default function SuccessOrderFood() {
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState([]);

  // Fetch ordered food items using bookingId
  useEffect(() => {
    const bookingId = localStorage.getItem('bookingId'); // Assume bookingId is stored in localStorage
    const FOOD_ORDER_API_URL = `https://localhost:7257/api/FoodOrderDetails/booking/${bookingId}`;
    
    const fetchOrderedItems = async () => {
      try {
        const response = await axios.get(FOOD_ORDER_API_URL);
        setOrderedItems(response.data);
      } catch (error) {
        console.error('Error fetching ordered items:', error);
      }
    };

    fetchOrderedItems();
  }, []);

  const handleGoToHomePage = () => {
    navigate('/SWP391-PodSystemBooking/');
  };

  const handleViewBooking = () => {
    navigate('/SWP391-PodSystemBooking/yourbooking'); // Adjust path as needed
  };

  const calculateTotalAmount = () => {
    return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="success-order-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your order. Your food items will be prepared shortly.</p>

      {/* Ordered Items Bill */}
      <div className="order-bill">
        <h3>Your Order Summary</h3>
        <ul className="order-list">
          {orderedItems.map((item, index) => (
            <li key={index} className="order-item">
              <span>{item.foodName}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: {(item.price * item.quantity).toLocaleString()} vnđ</span>
            </li>
          ))}
        </ul>
        <h4>Total Amount: {calculateTotalAmount().toLocaleString()} vnđ</h4>
      </div>

      {/* Navigation Buttons */}
      <div className="success-buttons">
        <button onClick={handleGoToHomePage} className="home-button">
          Go to Home Page
        </button>
        <button onClick={handleViewBooking} className="view-booking-button">
          View Your Bookings
        </button>
      </div>
    </div>
  );
}

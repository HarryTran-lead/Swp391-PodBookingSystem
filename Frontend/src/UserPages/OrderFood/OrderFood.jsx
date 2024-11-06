import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderFood.css';
import { useNavigate } from 'react-router-dom';

export default function OrderFood({ closeOrder }) {
  const { bookingId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [bookedItems, setBookedItems] = useState({});
  const [orderedFood, setOrderedFood] = useState([]);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // New state
  const navigate = useNavigate();

  const FOOD_ITEMS_API_URL = 'https://localhost:7257/api/FoodItems';
  const FOOD_ORDER_API_URL = 'https://localhost:7257/api/FoodOrderDetails';
  const PAYMENT_API_URL = 'https://localhost:7257/VNPay/api/payment/vnpay';

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(FOOD_ITEMS_API_URL);
        setFoodItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError('Failed to load food items.');
        setLoading(false);
      }
    };

    const fetchOrderedFood = async () => {
      if (!bookingId) {
        console.error('Booking ID is undefined');
        return;
      }
      try {
        const response = await axios.get(`${FOOD_ORDER_API_URL}/booking/${bookingId}`);
        setOrderedFood(response.data);
      } catch (error) {
        console.error('Error fetching ordered food:', error);
      }
    };

    fetchFoodItems();
    fetchOrderedFood();
  }, [bookingId]);

  const handleQuantityChange = (id, quantity) => {
    setSelectedFoodItems((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const handleBookItem = (foodItemId) => {
    setBookedItems((prev) => ({
      ...prev,
      [foodItemId]: true,
    }));
  };

  const calculateTotalPrice = () => {
    return foodItems.reduce((total, item) => {
      const quantity = selectedFoodItems[item.foodId] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  const handleOrderSubmit = async () => {
    const orderDetails = foodItems
      .filter(item => selectedFoodItems[item.foodId] > 0)
      .map(item => ({
        bookingId: bookingId,
        foodIds: [item.foodId],
        quantity: selectedFoodItems[item.foodId],
        price: item.price
      }));

    if (orderDetails.length === 0) {
      alert('No food items selected.');
      return;
    }

    try {
      const response = await axios.post(FOOD_ORDER_API_URL, orderDetails);
      if (response.status === 200 || response.status === 201) {
        alert('Order submitted successfully!');
        setIsOrderSubmitted(true); // Update state to show payment button
        localStorage.setItem('totalPrice', calculateTotalPrice());
        closeOrder();
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit the order. Please try again.');
    }
  };

  const handlePayment = async () => {
    const total = calculateTotalPrice();
    try {
      const paymentResponse = await axios.post(PAYMENT_API_URL, {
        BookingID: bookingId,
        Total: total,
        vnp_ReturnUrl: 'http://localhost:5173/SWP391-PodSystemBooking/oderfood/succesorderfood',
      });
      
      if (paymentResponse.data && paymentResponse.data.paymentUrl) {
        window.location.href = paymentResponse.data.paymentUrl;
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (loading) return <p>Loading food items...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="order-food-container">
      <h2>Food Menu</h2>
      <button className="close-button" onClick={closeOrder}>Close</button>

      <div className="food-items-list">
        <h3>Available Food:</h3>
        {foodItems.map((item) => (
          <div key={item.foodId} className="food-item-card">
            <h3>{item.foodName}</h3>
            <img src={`${FOOD_ITEMS_API_URL}/${item.foodId}/image`} alt={item.foodName} className="food-item-image" />
            <p>Price: {item.price} vnđ</p>
            <button onClick={() => handleBookItem(item.foodId)}>Book</button>
            {bookedItems[item.foodId] && (
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={selectedFoodItems[item.foodId] || 0}
                  onChange={(e) => handleQuantityChange(item.foodId, parseInt(e.target.value, 10) || 0)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="total-price">
        <h3>Total Price: {calculateTotalPrice()} vnđ</h3>
      </div>

      <button onClick={handleOrderSubmit} className="submit-order-button">
        Submit Order
      </button>

      {/* Conditionally render payment button based on order submission */}
      {isOrderSubmitted && (
        <button onClick={handlePayment} className="payment-button">
          Proceed to Payment
        </button>
      )}

      <div className="ordered-food">
        <h3>Your Ordered Food:</h3>
        {orderedFood.length > 0 ? (
          <ul>
            {orderedFood.map((order, index) => (
              <li key={index}>
                <p>Food Name: {order.foodName}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Price: {order.price.toLocaleString()} vnđ</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food orders found.</p>
        )}
      </div>
    </div>
  );
}

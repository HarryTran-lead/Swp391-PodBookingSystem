import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodOrder.css'; // Optional: For styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng

const FoodOrder = ({ closeOrder, bookingId }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodItems, setSelectedFoodItems] = useState({}); // Track quantities
  const [bookedItems, setBookedItems] = useState({}); // Track booked items
  const [orderedFood, setOrderedFood] = useState([]); // Trạng thái lưu món ăn đã đặt
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  
  const FOOD_ITEMS_API_URL = 'https://localhost:7257/api/FoodItems';
  const FOOD_ORDER_API_URL = 'https://localhost:7257/api/FoodOrderDetails';

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
      try {
        const response = await axios.get(`${FOOD_ORDER_API_URL}/booking/${bookingId}`); // Giả định API trả về danh sách món ăn đã đặt theo bookingId
        setOrderedFood(response.data);
      } catch (error) {
        console.error('Error fetching ordered food:', error);
      }
    };

    fetchFoodItems();
    fetchOrderedFood(); // Gọi hàm để lấy món ăn đã đặt
  }, [bookingId]);

  const handleFoodItemChange = (foodItemId, quantity) => {
    setSelectedFoodItems((prev) => ({
      ...prev,
      [foodItemId]: quantity,
    }));
  };

  const handleBookItem = (foodItemId) => {
    setBookedItems((prev) => ({
      ...prev,
      [foodItemId]: true, // Mark item as booked
    }));
  };

  const calculateTotalPrice = () => {
    return foodItems.reduce((total, item) => {
      const quantity = selectedFoodItems[item.foodId] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  const handleOrderSubmit = async () => {
    const orderDetails = [];
    foodItems.forEach((item) => {
      const quantity = selectedFoodItems[item.foodId] || 0;
      if (quantity > 0) {
        const existingDetail = orderDetails.find(detail => detail.foodIds.includes(item.foodId));
        if (existingDetail) {
          existingDetail.quantity += quantity; // Update quantity if already exists
        } else {
          orderDetails.push({
            bookingId: bookingId,
            foodIds: [item.foodId],
            quantity: quantity,
            price: item.price // Optional, you may not need to send this depending on the API design
          });
        }
      }
    });

    if (orderDetails.length === 0) {
      alert('No food items selected.');
      return;
    }

    try {
      const response = await axios.post(FOOD_ORDER_API_URL, orderDetails);
      if (response.status === 201 || response.status === 200) {
        alert('Order submitted successfully!');
      }
      closeOrder(); // Close the food order menu
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit the order.');
    }
  };

  if (loading) return <p>Loading food items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="food-order">
      <h2>Food Menu</h2>
      <button className="close-button" onClick={closeOrder}>Close</button>
      
      <div className="food-list-container">
        <h3>Available Food:</h3>
        <ul className="food-list">
          {foodItems.map((item) => (
            <li key={item.foodId} className="food-item">
              <img
                src={`${FOOD_ITEMS_API_URL}/${item.foodId}/image`} // Construct the image URL dynamically
                alt={item.foodName}
                className="food-item-img"
              />
              <div className="food-item-details">
                <h3>{item.foodName}</h3>
                <p>{item.description}</p>
                <p>Price: {item.price} vnđ</p>
                <button onClick={() => handleBookItem(item.foodId)}>Book</button>
                {bookedItems[item.foodId] && (
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => handleFoodItemChange(item.foodId, parseInt(e.target.value, 10) || 0)}
                    />
                  </label>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="total-price">
        <h3>Total Price: {calculateTotalPrice()} vnđ</h3>
      </div>

      <button onClick={handleOrderSubmit}>Submit Order</button>

      {/* Hiển thị món ăn đã đặt */}
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
};

export default FoodOrder;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodOrder.css'; // Optional: For styling

const FoodOrder = ({ closeOrder, bookingId }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [bookedItems, setBookedItems] = useState({}); // Track booked items

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

    fetchFoodItems();
  }, []);

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
    // Create an array to hold individual order details
    const orderDetails = foodItems
      .filter((item) => selectedFoodItems[item.foodId] > 0)
      .map((item) => ({
        bookingId: bookingId,
        foodId: item.foodId,
        quantity: selectedFoodItems[item.foodId],
        price: item.price,
      }));
  
    if (orderDetails.length === 0) {
      alert('No food items selected.');
      return;
    }
  
    try {
      // Send the order details to the API
      for (const detail of orderDetails) {
        await axios.post(FOOD_ORDER_API_URL, detail);
      }
      
      alert('Order submitted successfully!');
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
    </div>
  );
};

export default FoodOrder;

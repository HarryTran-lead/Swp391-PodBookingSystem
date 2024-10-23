import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FoodOrderSummary() {
  const { bookingId } = useParams(); // Lấy bookingId từ URL
  const [foodOrders, setFoodOrders] = useState([]);

  useEffect(() => {
    if (!bookingId) return; // Nếu không có bookingId, không gọi API

    // Hàm để lấy danh sách món ăn đã đặt theo bookingId
    const fetchFoodOrders = async () => {
      try {
        const response = await axios.get(`https://localhost:7257/api/FoodOrderDetails/booking/${bookingId}`);
        setFoodOrders(response.data); // Cập nhật state với danh sách món ăn đã đặt
      } catch (error) {
        console.error('Error fetching food orders:', error);
      }
    };

    fetchFoodOrders();
  }, [bookingId]); // Gọi lại khi bookingId thay đổi

  return (
    <div>
      <h2>Food Order Summary for Booking {bookingId}</h2>
      {foodOrders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foodOrders.map((foodOrder, index) => (
              <tr key={index}>
                <td>{foodOrder.foodName}</td>
                <td>{foodOrder.quantity}</td>
                <td>{foodOrder.price.toLocaleString()} vnđ</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No food orders found.</p>
      )}
    </div>
  );
}

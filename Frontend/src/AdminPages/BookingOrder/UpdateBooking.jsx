// ./AdminPages/UpdateBooking.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingOrder'; // Import the correct CSS file for styling

export default function UpdateBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(location.state?.booking || {});
  const [statuses, setStatuses] = useState([]);
  const API_URL = 'https://localhost:7257/api/Bookings';
  const STATUS_API_URL = 'https://localhost:7257/api/StatusLookups';

  useEffect(() => {
    fetchStatusDescriptions();
  }, []);

  // Fetch status descriptions
  const fetchStatusDescriptions = async () => {
    try {
      const response = await axios.get(STATUS_API_URL);
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching status descriptions:', error);
      toast.error('Failed to fetch status descriptions.');
    }
  };

  // Update booking
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${booking.bookingId}`, booking);
      toast.success('Booking updated successfully!');
      navigate('/SWP391-PodSystemBooking/admin/bookingorder'); // Navigate back to the booking orders page
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking.');
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  return (
    <div className="update-booking-page">
      <h2>Update Booking</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Account ID:
          <input
            type="text"
            name="accountId"
            value={booking.accountId || ''}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Pod ID:
          <input
            type="text"
            name="podId"
            value={booking.podId || ''}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Package ID:
          <input
            type="text"
            name="packageID"
            value={booking.packageID || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select
            name="statusId"
            value={booking.statusId || ''}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status.statusId} value={status.statusId}>
                {status.statusDescription}
              </option>
            ))}
          </select>
        </label>
        <label>
          Total:
          <input
            type="number"
            name="total"
            value={booking.total || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Booking</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

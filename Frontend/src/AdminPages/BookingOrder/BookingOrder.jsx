import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingOrder.css'; // Make sure to create BookingOrder.css for styling

export default function BookingOrder() {
  const [bookings, setBookings] = useState([]);
  const [statuses, setStatuses] = useState([]); // State to store status descriptions
  const navigate = useNavigate();
  const API_URL = 'https://localhost:7257/api/Bookings';
  const STATUS_API_URL = 'https://localhost:7257/api/StatusLookups'; // Endpoint for status descriptions

  useEffect(() => {
    fetchBookings();
    fetchStatusDescriptions(); // Fetch status descriptions on component mount
  }, []);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_URL);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings.');
    }
  };

  // Fetch all status descriptions
  const fetchStatusDescriptions = async () => {
    try {
      const response = await axios.get(STATUS_API_URL);
      setStatuses(response.data); // Store status descriptions in state
    } catch (error) {
      console.error('Error fetching status descriptions:', error);
      toast.error('Failed to fetch status descriptions.');
    }
  };

  // Get status description by status ID
  const getStatusDescription = (statusId) => {
    const status = statuses.find((s) => s.statusId === statusId);
    return status ? status.statusDescription : 'Unknown'; // Return 'Unknown' if status not found
  };

  // Navigate to update booking page
  const handleUpdate = (booking) => {
    navigate('/SWP391-PodSystemBooking/admin/update-booking', { state: { booking } });
  };

  // Delete a booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBookings();
      toast.success('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Error deleting booking.');
    }
  };

  return (
    <div className="booking-order-page">
      <h1>Booking Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Account ID</th>
            <th>Pod ID</th>
            <th>Package ID</th>
            <th>Payment ID</th>
            <th>Notification ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{booking.accountId}</td>
              <td>{booking.podId}</td>
              <td>{booking.packageID || 'N/A'}</td>
              <td>{booking.paymentID || 'N/A'}</td>
              <td>{booking.notificationID || 'N/A'}</td>
              <td>{new Date(booking.startTime).toLocaleString()}</td>
              <td>{new Date(booking.endTime).toLocaleString()}</td>
              <td>{getStatusDescription(booking.statusId)}</td> {/* Display status description */}
              <td>${booking.total}</td>
              <td>
                <button onClick={() => handleUpdate(booking)}>Update</button>
                <button onClick={() => handleDelete(booking.bookingId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

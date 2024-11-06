import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingOrder.css';

export default function BookingOrder() {
  const [bookings, setBookings] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();
  const API_URL = 'https://localhost:7257/api/Bookings';
  const STATUS_API_URL = 'https://localhost:7257/api/StatusLookups';

  useEffect(() => {
    fetchBookings();
    fetchStatusDescriptions();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_URL);
      const sortedBookings = response.data.sort((a, b) => b.bookingId - a.bookingId);
      setBookings(sortedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings.');
    }
  };

  const fetchStatusDescriptions = async () => {
    try {
      const response = await axios.get(STATUS_API_URL);
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching status descriptions:', error);
      toast.error('Failed to fetch status descriptions.');
    }
  };

  const getStatusDescription = (statusId) => {
    const status = statuses.find((s) => s.statusId === statusId);
    return status ? status.statusDescription : 'Unknown';
  };

  const handleUpdate = (booking) => {
    navigate('/SWP391-PodSystemBooking/admin/update-booking', { state: { booking } });
  };

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

  // Filter bookings based on the search term
// Inside BookingOrder component
const filteredBookings = bookings.filter((booking) =>
  Object.values(booking).some((value) =>
    value !== null && value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  return (
    <div className="booking-order-page">
      <h1 style={{marginTop:30}}>Booking Orders</h1>

      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>STT</th>
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
          {filteredBookings.map((booking, index) => (
            <tr key={booking.bookingId}>
              <td>{index + 1}</td>
              <td>{booking.bookingId}</td>
              <td>{booking.accountId}</td>
              <td>{booking.podId}</td>
              <td>{booking.packageID || 'N/A'}</td>
              <td>{booking.paymentID || 'N/A'}</td>
              <td>{booking.notificationID || 'N/A'}</td>
              <td>{new Date(booking.startTime).toLocaleString()}</td>
              <td>{new Date(booking.endTime).toLocaleString()}</td>
              <td>{getStatusDescription(booking.statusId)}</td>
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

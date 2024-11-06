import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingOrder.css';

const STATUS_API_URL = 'https://localhost:7257/api/StatusLookups';
const BOOKINGS_API_URL = 'https://localhost:7257/api/Bookings';

export default function BookingOrder() {
  const [bookings, setBookings] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    fetchBookings();
    fetchStatusDescriptions();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(BOOKINGS_API_URL);
      const sortedBookings = response.data.sort((a, b) => b.bookingId - a.bookingId);
      setBookings(sortedBookings);
    } catch (error) {
      setErrorMessage('Error fetching booking data. Please try again later.');
      console.error('Error fetching booking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusDescriptions = async () => {
    try {
      const response = await axios.get(STATUS_API_URL);
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching status descriptions:', error);
      setErrorMessage('Failed to fetch status descriptions.');
    }
  };

  const getStatusDescription = (statusId) => {
    const status = statuses.find((s) => s.statusId === statusId);
    return status ? status.statusDescription : 'Unknown';
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-order-container">
      <h2>Booking Orders</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredBookings.length > 0 ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Booking ID</th>
              <th>Account ID</th>
              <th>Pod ID</th>
              <th>Package ID</th>
              <th>Payment ID</th>
              <th>Notification ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Total (VND)</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>{booking.accountId}</td>
                <td>{booking.podId}</td>
                <td>{booking.packageId || 'N/A'}</td>
                <td>{booking.paymentId || 'N/A'}</td>
                <td>{booking.notificationId || 'N/A'}</td>
                <td>{new Date(booking.startTime).toLocaleString()}</td>
                <td>{new Date(booking.endTime).toLocaleString()}</td>
                <td>{getStatusDescription(booking.statusId)}</td>
                <td>{booking.total.toLocaleString('vi-VN')} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booking orders found.</p>
      )}
    </div>
  );
}

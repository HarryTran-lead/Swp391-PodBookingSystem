import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingOrder.css';

const STATUS_API_URL = 'https://localhost:7257/api/StatusLookups'; // Endpoint for status descriptions

export default function BookingOrder() {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [statuses, setStatuses] = useState([]); // State to hold status descriptions
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchBookings(); // Fetch bookings on component mount
    fetchStatusDescriptions(); // Fetch status descriptions on component mount
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://localhost:7257/api/Bookings'); // Fetch booking data
      const sortedBookings = response.data.sort((a, b) => b.bookingId - a.bookingId); // Sort by bookingId descending
      setBookings(sortedBookings); // Set sorted booking data
    } catch (error) {
      setErrorMessage('Error fetching booking data. Please try again later.');
      console.error('Error fetching booking data:', error);
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  const fetchStatusDescriptions = async () => {
    try {
      const response = await axios.get(STATUS_API_URL); // Fetch status descriptions
      setStatuses(response.data); // Store status descriptions in state
    } catch (error) {
      console.error('Error fetching status descriptions:', error);
      setErrorMessage('Failed to fetch status descriptions.');
    }
  };

  // Get status description by status ID
  const getStatusDescription = (statusId) => {
    const status = statuses.find((s) => s.statusId === statusId);
    return status ? status.statusDescription : 'Unknown'; // Return 'Unknown' if status not found
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-order-container">
      <h2>Booking Orders</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {bookings.length > 0 ? (
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
              <th>Status</th> {/* Display status description */}
              <th>Total (VND)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td> {/* Display auto-incrementing index */}
                <td>{booking.bookingId}</td>
                <td>{booking.accountId}</td>
                <td>{booking.podId}</td>
                <td>{booking.packageId || 'N/A'}</td>
                <td>{booking.paymentId || 'N/A'}</td>
                <td>{booking.notificationId || 'N/A'}</td>
                <td>{new Date(booking.startTime).toLocaleString()}</td> {/* Display formatted start time */}
                <td>{new Date(booking.endTime).toLocaleString()}</td>   {/* Display formatted end time */}
                <td>{getStatusDescription(booking.statusId)}</td> {/* Display status description */}
                <td>{booking.total.toLocaleString('vi-VN')} VND</td>   {/* Format number with commas */}
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

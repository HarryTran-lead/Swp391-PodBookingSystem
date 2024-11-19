import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SucessfullPayment.css';

export default function SuccessfulPayment() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  const updateBookingStatus = async () => {
    const bookingId = localStorage.getItem('bookingId');
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

    if (!bookingId) {
      setError('Booking ID not found in local storage.');
      return;
    }

    if (!bookingDetails) {
      setError('Booking details not found in local storage.');
      return;
    }

    const bookingData = {
      bookingId: bookingId,
      StatusID: 4,
      AccountID: bookingDetails.accountId,
      PodID: bookingDetails.podId,
      StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`),
      EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`),
      Total: bookingDetails.totalPrice,
      CreatedAt: new Date(),
    };

    setBookingData(bookingData);

    try {
      const response = await fetch(`https://localhost:7257/api/Bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Failed to update booking status:', errorResponse);
        setError('Failed to update booking status.');
        return;
      }

      console.log('Booking status updated to Completed.');
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('An error occurred while updating booking status.');
    }
  };

  const handleOrderFood = (bookingId) => {
    navigate(`/SWP391-PodSystemBooking/oderfood/${bookingId}`);
  };

  useEffect(() => {
    updateBookingStatus();
  }, []);

  return (
    <div className="payment-success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your booking. Your payment has been processed successfully.</p>
      {error && <p className="error-message">{error}</p>}
      {bookingData && (
        <div className="booking-details">
          <h2>Booking Invoice</h2>
          <table className="invoice-table">
            <tbody>
              <tr>
                <th>Booking ID</th>
                <td>{bookingData.bookingId}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{bookingData.StatusID}</td>
              </tr>
              <tr>
                <th>Account ID</th>
                <td>{bookingData.AccountID}</td>
              </tr>
              <tr>
                <th>Pod ID</th>
                <td>{bookingData.PodID}</td>
              </tr>
              <tr>
  <th>Start Time</th>
  <td>{new Date(bookingData.StartTime).toLocaleString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
</tr>
<tr>
  <th>End Time</th>
  <td>{new Date(bookingData.EndTime).toLocaleString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
</tr>

              <tr>
                <th>Total</th>
                <td>{bookingData.Total.toLocaleString()} vnđ</td>
              </tr>
            </tbody>
          </table>
          <div className="invoice-footer">
            <p>Total Amount: {bookingData.Total.toLocaleString()} vnđ</p>
          </div>
        </div>
      )}
      <p>Click the button below to return to the homepage.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        Go to Homepage
      </button>
      <button className="btn btn-primary" onClick={() => handleOrderFood(bookingData?.bookingId)} style={{ marginLeft: '10px' }}>
        Order Food
      </button>
    </div>
  );
}

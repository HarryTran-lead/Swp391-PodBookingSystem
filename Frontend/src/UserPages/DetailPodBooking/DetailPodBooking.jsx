import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPodBooking.css';

export default function DetailPodBooking() {
  const { id } = useParams(); // Extract PodID from the URL
  const [pod, setPod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [bookingId, setBookingId] = useState(null); // Track booking ID for payment

  // Booking details state
  const [bookingDetails, setBookingDetails] = useState({
    accountId: localStorage.getItem('accountId'), // Get accountId from localStorage
    username: '', // Use username instead of accountId
    podId: id, // Pre-populate with the pod ID
    bookingDate: '', // Add booking date
    startTime: '', // Add start time
    endTime: '',
    totalPrice: 0 // Add total price field
  });

  const API_URL = `https://localhost:7257/api/Pods/${id}`;
  const BOOKING_API_URL = `https://localhost:7257/api/Bookings`;
  const USER_API_URL = `https://localhost:7257/api/Accounts/`; // For fetching user details

  // Fetch pod details based on podId
  useEffect(() => {
    const fetchPodDetails = async () => {
      try {
        const response = await axios.get(API_URL);
        setPod(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pod details:', error);
        setError('Failed to load pod details.');
        setLoading(false);
      }
    };

    fetchPodDetails();
  }, [id]);

  // Fetch username based on AccountID from localStorage
  useEffect(() => {
    const fetchAccountDetails = async () => {
      const accountId = localStorage.getItem('accountId'); // Get the account ID from localStorage
      if (!accountId) {
        setErrorMessage('No account ID found. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`${USER_API_URL}${accountId}`); // Fetch user details
        setUsername(response.data.username); // Set the username
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          username: response.data.username, // Set the username in the booking details
        }));
      } catch (error) {
        console.error('Error fetching account details:', error);
        setErrorMessage('Failed to load account details.');
      }
    };

    fetchAccountDetails();
  }, []);

  // Handle form inputs for booking details
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Restrict minutes to :15 or :30 for time inputs
    let adjustedValue = value;
    if (name === 'startTime' || name === 'endTime') {
      const [hour, minute] = value.split(':');
      let adjustedMinute = minute;

      if (minute < '15') {
        adjustedMinute = '15';
      } else if (minute >= '15' && minute < '30') {
        adjustedMinute = '30';
      } else if (minute >= '30' && minute < '45') {
        adjustedMinute = '30';
      } else {
        adjustedMinute = '15';
        const adjustedHour = ('0' + ((parseInt(hour, 10) + 1) % 24)).slice(-2);
        adjustedValue = `${adjustedHour}:${adjustedMinute}`;
      }

      adjustedValue = `${hour}:${adjustedMinute}`;
    }

    setBookingDetails((prevDetails) => {
      const newDetails = {
        ...prevDetails,
        [name]: adjustedValue,
      };

      // Calculate total price after updating the state
      calculateTotalPrice(newDetails);

      return newDetails;
    });
  };

  // Calculate total price based on hours booked
  const calculateTotalPrice = (details) => {
    const { bookingDate, startTime, endTime } = details;

    if (bookingDate && startTime && endTime) {
      const startDateTime = new Date(`${bookingDate}T${startTime}`);
      const endDateTime = new Date(`${bookingDate}T${endTime}`);

      // Calculate hours booked
      const hoursBooked = (endDateTime - startDateTime) / (1000 * 60 * 60); // Convert milliseconds to hours

      if (hoursBooked > 0) {
        let totalPrice = hoursBooked * pod.pricePerHour; // Calculate total price

        // Round price using if-else logic
        if (totalPrice % 1 < 0.5) {
          totalPrice = Math.floor(totalPrice); // Round down
        } else {
          totalPrice = Math.ceil(totalPrice); // Round up
        }

        // Set the total price to the booking details
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          totalPrice: totalPrice,
        }));
      } else {
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          totalPrice: 0,
        }));
      }
    }
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDetails.username) {
      alert('Please log in to book a pod.');
      return;
    }

    try {
      const response = await axios.post(BOOKING_API_URL, {
        AccountID: bookingDetails.accountId, // Use the actual account ID
        PodID: bookingDetails.podId, // Pod ID
        PackageID: null, // Assuming you don't have a PackageID yet
        PaymentID: null, // Handle payment later if needed
        NotificationID: null, // Assuming no notification ID
        StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`),
        EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`),
        Total: bookingDetails.totalPrice, // Total price
      });

      alert('Booking successful! Proceeding to payment...');
      console.log('Booking response:', response.data);

      // Store the booking ID and show the payment button
      setBookingId(response.data.bookingId);

      // Save booking details in localStorage for SuccessfulPayment component to access
      localStorage.setItem('bookingId', response.data.bookingId);
      localStorage.setItem('bookingDetails', JSON.stringify({
        accountId: bookingDetails.accountId,
        podId: bookingDetails.podId,
        bookingDate: bookingDetails.bookingDate,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
        totalPrice: bookingDetails.totalPrice,
      }));
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking failed.');
    }
};


  // Handle payment
  const handlePayment = async (bookingId, total) => {
    try {
      // Update booking status before payment
      const bookingData = {
        bookingId: bookingId,
        StatusID: 2, // Update StatusID to 2
        AccountID: bookingDetails.accountId,
        PodID: bookingDetails.podId,
        StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`),
        EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`),
        Total: bookingDetails.totalPrice,
      };

      // Update booking status
      const updateResponse = await axios.put(`${BOOKING_API_URL}/${bookingId}`, bookingData);
      if (!updateResponse) {
        alert('Failed to update booking status.');
        return;
      }

      // Send payment request to VNPay
      const paymentResponse = await axios.post('https://localhost:7257/VNPay/api/payment/vnpay', {
        BookingID: bookingId,
        Total: total,
        vnp_ReturnUrl: 'http://localhost:5173/SWP391-PodSystemBooking/successfullpayment',
      });

      if (paymentResponse.data.paymentUrl) {
        window.location.href = paymentResponse.data.paymentUrl; // Redirect to VNPay payment page
      } else {
        alert('Payment initiation failed.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment initiation failed.');
    }
  };

  if (loading) {
    return <p>Loading pod details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pod) {
    return <p>No pod details available.</p>;
  }

  return (
    <div className="pod-detail-container">
      <h1>{pod.name}</h1>
      <img
  src={`https://localhost:7257/api/Pods/${pod.podId}/image`}
  alt={pod.name}
  className="pod-image"
  style={{ width: '650px', height: '300px' }} // Adjust these values as needed
/>

      <p>{pod.description}</p>
      <p>Price per Hour: {pod.pricePerHour}vnđ</p>
      <p>Location: {pod.location}</p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Booking Form */}
      <form onSubmit={handleBookingSubmit}>
        <label>
          Booking Date:
          <input type="date" name="bookingDate" value={bookingDetails.bookingDate} onChange={handleInputChange} required />
        </label>

        <label>
          Start Time:
          <input type="time" name="startTime" value={bookingDetails.startTime} onChange={handleInputChange} required />
        </label>

        <label>
          End Time:
          <input type="time" name="endTime" value={bookingDetails.endTime} onChange={handleInputChange} required />
        </label>

        <label>
          Total Price: {bookingDetails.totalPrice}vnđ
        </label>

        <button type="submit" disabled={!bookingDetails.bookingDate || !bookingDetails.startTime || !bookingDetails.endTime}>
          Book Pod
        </button>
      </form>

      {/* Show payment button after booking */}
      {bookingId && (
        <button onClick={() => handlePayment(bookingId, bookingDetails.totalPrice)}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
}

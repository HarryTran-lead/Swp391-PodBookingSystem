import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import react-modal
import "./YourBooking.css";
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root'); // Set the root element for accessibility

export default function YourBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState({ rating: '', comments: '' });
  const navigate = useNavigate(); // Initialize navigate hook
  const accountId = localStorage.getItem('accountId'); // Get the AccountId from localStorage
  const BOOKINGS_API_URL = `https://localhost:7257/api/Bookings/Account/${accountId}`; // Adjusted API URL
  const FEEDBACKS_API_URL = `https://localhost:7257/api/Feedbacks`;
  const FOOD_ITEMS_API_URL = `https://localhost:7257/api/FoodItems`; 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BOOKINGS_API_URL);
        const bookingsData = response.data; // Assuming the response contains an array of bookings

        // Fetch pod details and status in one go for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            if (!booking.podId) {
              console.log('Booking without podId:', booking); // Log if podId is missing
              return { ...booking, podName: 'N/A', imgPod: '', descriptionStatus: 'Invalid Pod', totalPrice: 0 };
            }
        
            const podResponse = await axios.get(`https://localhost:7257/api/Pods/${booking.podId}`);
            const statusResponse = await axios.get(`https://localhost:7257/api/StatusLookups/${booking.statusId}`);
        
            const processedBooking = {
              ...booking,
              podName: podResponse.data.name,
              imgPod: podResponse.data.imgPod,
              descriptionStatus: statusResponse.data.statusDescription,
              totalPrice: booking.total
            };
        
            console.log('Processed booking:', processedBooking); // Log each processed booking
        
            return processedBooking;
          })
        );
        

        // Sort bookings by bookingId in descending order
        const sortedBookings = bookingsWithDetails.sort((a, b) => b.bookingId - a.bookingId);

        setBookings(sortedBookings);
        
        // Check if bookings are empty and set error message accordingly
        if (sortedBookings.length === 0) {
          setError('No bookings found for your account.');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings.');
        setLoading(false);
      }
    };

    if (accountId) {
      fetchBookings();
    } else {
      setError('No Account ID found. Please log in.');
      setLoading(false); // Make sure to set loading to false if no accountId
    }
  }, [accountId]);

  const openModal = (booking) => {
    // Check if the status description is "Finish"
    if (booking.descriptionStatus === 'Finish') {
      setSelectedBooking(booking);
      setIsModalOpen(true);
    } else {
      alert('Bạn chưa sử dụng hết thời gian.'); // Show alert if feedback cannot be given
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setFeedback({ rating: '', comments: '' });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const submitFeedback = async () => {
    if (!selectedBooking) return;

    try {
      await axios.post(FEEDBACKS_API_URL, {
        podId: selectedBooking.podId,
        accountId,
        rating: feedback.rating,
        comments: feedback.comments,
      });
      alert('Feedback submitted successfully!');
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const handleOrderFood = (bookingId) => {
    navigate(`/SWP391-PodSystemBooking/oderfood/${bookingId}`); // Navigate to the food order page with the bookingId
  };
  return (
    <div className="your-booking-container"> {/* Added this div */}
      <div className="your-bookings">
        <h2>Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found for your account.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Booking ID</th>
                <th>Pod ID</th>
                <th>Pod Name</th>
                <th>Pod Image</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Created Time</th>
                <th>Total Price</th>
                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td> {/* Order number starting from 1 */}
                  <td>{booking.bookingId}</td>
                  <td>{booking.podId}</td>
                  <td>{booking.podName}</td>
                  <td>
                    <img src={`https://localhost:7257/api/Pods/${booking.podId}/image`} alt={booking.podName} style={{ width: '100px', height: '100px' }} />
                  </td>
                  <td>{booking.startTime ? new Date(booking.startTime).toLocaleString() : 'N/A'}</td>
                  <td>{booking.endTime ? new Date(booking.endTime).toLocaleString() : 'N/A'}</td>
                  <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}</td>
              
                  <td>{booking.totalPrice} vnđ</td>
                  <td>{booking.descriptionStatus}</td>
                  <td>
                    <button onClick={() => openModal(booking)}>Feedback</button>
                    <button onClick={() => handleOrderFood(booking.bookingId)} style={{ marginLeft: '10px' }}>Order Food</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for Feedback */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Submit Feedback"
          className="feedback-modal"
          overlayClassName="feedback-modal-overlay"
        >
          <h2>Submit Feedback</h2>
          <div className="feedback-form">
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={feedback.rating}
                onChange={handleFeedbackChange}
                min="1"
                max="5"
                required
              />
            </label>
            <label>
              Comments:
              <textarea
                name="comments"
                value={feedback.comments}
                onChange={handleFeedbackChange}
                required
              />
            </label>
            <button onClick={submitFeedback}>Submit</button>
            <button onClick={closeModal} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

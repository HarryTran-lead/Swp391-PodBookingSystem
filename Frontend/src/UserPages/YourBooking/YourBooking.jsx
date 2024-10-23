import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import react-modal
import "./YourBooking.css";

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function YourBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState({ rating: '', comments: '' });

  const accountId = localStorage.getItem('accountId'); // Get the AccountId from localStorage
  const BOOKINGS_API_URL = `https://localhost:7257/api/Bookings?accountId=${accountId}`; // Adjust API URL based on your backend implementation
  const FEEDBACKS_API_URL = `https://localhost:7257/api/Feedbacks`;
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BOOKINGS_API_URL);
        const bookingsData = response.data; // Assuming the response contains an array of bookings
        console.log(bookingsData); // Check API response

        // Fetch pod details and status in one go for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            if (!booking.podId) {
              return { ...booking, podName: 'N/A', imgPod: '', descriptionStatus: 'Invalid Pod', totalPrice: 0 };
            }

            const podResponse = await axios.get(`https://localhost:7257/api/Pods/${booking.podId}`);
            const statusResponse = await axios.get(`https://localhost:7257/api/StatusLookups/${booking.statusId}`);

            return {
              ...booking,
              podName: podResponse.data.name,
              imgPod: podResponse.data.imgPod,
              descriptionStatus: statusResponse.data.statusDescription,
              totalPrice: booking.total
            };
          })
        );

        setBookings(bookingsWithDetails);
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
    }
  }, [accountId]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
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
      await axios.post('https://localhost:7257/api/Feedbacks', {
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

  return (
    <div className="your-bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Pod ID</th>
              <th>Pod Name</th>
              <th>Pod Image</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.podId}</td>
                <td>{booking.podName}</td>
                <td>
                  <img src={`https://localhost:7257/api/Pods/${booking.podId}/image`} alt={booking.podName} style={{ width: '100px', height: '100px' }} />
                </td>
                <td>{booking.startTime ? new Date(booking.startTime).toLocaleString() : 'N/A'}</td>
                <td>{booking.endTime ? new Date(booking.endTime).toLocaleString() : 'N/A'}</td>
                <td>{booking.totalPrice} vnđ</td>
                <td>{booking.descriptionStatus}</td>
                <td>
                  <button onClick={() => openModal(booking)}>Feedback</button>
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
  );
}

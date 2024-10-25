import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import './FeedBack.css'; // Optional: Add custom styles

export default function FeedBack() {
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedback data
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://localhost:7257/api/Feedbacks'); // Fetch feedback data
        const sortedFeedbacks = response.data.sort((a, b) => b.id - a.id); // Sort feedbacks by ID in descending order
        setFeedbacks(sortedFeedbacks); // Set sorted feedback data
      } catch (error) {
        setErrorMessage('Error fetching feedback data. Please try again later.');
        console.error('Error fetching feedback data:', error);
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchFeedbacks(); // Fetch feedback data on component mount
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feedback-container">
      <h2>User Feedback</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {feedbacks.length > 0 ? (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Account ID</th>
              <th>Pod ID</th>
              <th>Booking ID</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Feedback Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{index + 1}</td> {/* Display auto-incrementing index */}
                <td>{feedback.id}</td>
                <td>{feedback.accountId}</td>
                <td>{feedback.podId}</td>
                <td>{feedback.bookingId}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comments}</td>
                <td>{new Date(feedback.feedbackDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
}

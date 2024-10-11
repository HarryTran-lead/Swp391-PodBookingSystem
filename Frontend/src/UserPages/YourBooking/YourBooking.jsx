/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./YourBooking.css"

export default function YourBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accountId = localStorage.getItem('accountId'); // Get the AccountId from localStorage
  const BOOKINGS_API_URL = `https://localhost:7257/api/Bookings?accountId=${accountId}`; // Adjust API URL based on your backend implementation

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BOOKINGS_API_URL);
        const bookingsData = response.data; // Assuming the response contains an array of bookings

        // Fetch pod details and images
        const bookingsWithPodDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            const podResponse = await axios.get(`https://localhost:7257/api/Pods/${booking.podId}`);
            const imageResponse = await axios.get(`https://localhost:7257/api/Pods/${booking.podId}/image`);
            const descriptionStatusResponse = await axios.get(`https://localhost:7257/api/StatusLookups/${booking.statusId}`);

            // Merge booking, pod details, and image data
            return {
              ...booking,
              podName: podResponse.data.name, // Assuming podResponse has a name field
              imgPod: imageResponse.data, // Assuming the image response directly gives the URL
              descriptionStatus: descriptionStatusResponse.data.statusDescription, // Assuming statusLookupResponse has a description field
            };
          })
        );

        setBookings(bookingsWithPodDetails); // Set bookings with pod details and images
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

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
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
                <td>{new Date(booking.startTime).toLocaleString()}</td>
                <td>{new Date(booking.endTime).toLocaleString()}</td>
                <td>{booking.total.} vnđ</td>
                <td>{booking.descriptionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  ); 
}*/ import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./YourBooking.css";

export default function YourBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accountId = localStorage.getItem('accountId'); // Get the AccountId from localStorage
  const BOOKINGS_API_URL = `https://localhost:7257/api/Bookings?accountId=${accountId}`; // Adjust API URL based on your backend implementation

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BOOKINGS_API_URL);
        const bookingsData = response.data; // Assuming the response contains an array of bookings
        console.log(bookingsData); // Check API response

        // Fetch pod details and status in one go for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            // Check if podId is valid
            if (!booking.podId) {
              return { ...booking, podName: 'N/A', imgPod: '', descriptionStatus: 'Invalid Pod', totalPrice: 0 }; // Handle invalid podId
            }

            const podResponse = await axios.get(`https://localhost:7257/api/Pods/${booking.podId}`);
            const statusResponse = await axios.get(`https://localhost:7257/api/StatusLookups/${booking.statusId}`);

            return {
              ...booking,
              podName: podResponse.data.name, // Assuming podResponse has a name field
              imgPod: podResponse.data.imgPod, // Assuming podResponse has an imgPod field
              descriptionStatus: statusResponse.data.statusDescription, // Assuming statusLookupResponse has a description field
              totalPrice: booking.total // Ensure that you're getting the correct field for total price
            };
          })
        );

        setBookings(bookingsWithDetails); // Set bookings with pod details and status
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
                <td>{booking.totalPrice} vnđ  </td>
                <td>{booking.descriptionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

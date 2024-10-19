 import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPodBooking.css';
import FoodOrder from '../FoodOrder/FoodOrder';

export default function DetailPodBooking() {
  const { id } = useParams(); // Extract PodID from the URL
  const [pod, setPod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [bookingId, setBookingId] = useState(null); // Track booking ID for payment
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [userPurchasedPackages, setUserPurchasedPackages] = useState([]); // State for purchased packages
  const [packagesWithDiscount, setPackagesWithDiscount] = useState([]); // State for packages with discount
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [isFoodOrderOpen, setFoodOrderOpen] = useState(false);
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
  const USER_PURCHASED_PACKAGES_URL = `https://localhost:7257/api/UserPurchasedPackages`; // API endpoint for purchased packages
 

  useEffect(() => {
    const fetchUserPurchasedPackages = async () => {
      const accountId = localStorage.getItem('accountId');
      if (!accountId) return;
  
      try {
        const apiUrl = `${USER_PURCHASED_PACKAGES_URL}/byAccountAndStatus?accountId=${accountId}&status=true`;
        const response = await axios.get(apiUrl);
        setUserPurchasedPackages(response.data);
  
        // Fetch discount for each package
        const packagesWithDiscountPromises = response.data.map(async (pkg) => {
          const servicePackageResponse = await axios.get(`https://localhost:7257/api/ServicePackages/${pkg.packageId}`);
          return { ...pkg, discountPercentage: servicePackageResponse.data.discountPercentage }; // Add discount percentage
        });
  
        const packagesWithDiscountData = await Promise.all(packagesWithDiscountPromises);
        setPackagesWithDiscount(packagesWithDiscountData);
      } catch (error) {
        console.error('Error fetching purchased packages:', error);
        setErrorMessage('Failed to load purchased packages.');
      }
    };
  
    fetchUserPurchasedPackages();
  }, []);
  

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
  let adjustedMinute;

  // Chọn các mốc thời gian cho phút
  if (minute < '15') {
    adjustedMinute = '00';
  } else if (minute < '30') {
    adjustedMinute = '15';
  } else if (minute < '45') {
    adjustedMinute = '30';
  } else {
    adjustedMinute = '45';
    // Tăng giờ nếu phút đã đạt mốc 45
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
      if (name === 'bookingDate') {
        fetchSelectedTimeSlots(value); // Fetch booked times for selected date
      }
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
  
        // Apply discount if a package is selected
        if (selectedPackageId) {
          const selectedPackage = packagesWithDiscount.find(pkg => pkg.packageId === selectedPackageId);
          if (selectedPackage) {
            const discount = selectedPackage.discountPercentage || 0;
            totalPrice = totalPrice * (1 - discount / 100);
          }
        }
  
        // Round price using if-else logic
        totalPrice = Math.round(totalPrice); // Rounding
  
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
  
// Fetch selected time slots based on bookingDate
const fetchSelectedTimeSlots = async (date) => {
  if (!date) return; // Don't call API if there's no date

  try {
    const response = await axios.get(`https://localhost:7257/api/Bookings/AvailableTimeSlots/${id}?bookingDate=${date}`);
    setSelectedTimeSlots(response.data); // Assuming response.data is an array of booked times
  } catch (error) {
    console.error('Error fetching selected time slots:', error);
  }
};
  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
  
    if (!bookingDetails.username) {
      alert('Please log in to book a pod.');
      return;
    }
  
    // Validate startTime and endTime
    const { startTime, endTime, bookingDate } = bookingDetails;
    if (new Date(`${bookingDate}T${startTime}`) >= new Date(`${bookingDate}T${endTime}`)) {
      alert('Start time must be before end time.');
      return;
    }
  
    try {
      const response = await axios.post(BOOKING_API_URL, {
        AccountID: bookingDetails.accountId,
        PodID: bookingDetails.podId,
        PackageID: null,
        PaymentID: null,
        NotificationID: null,
        StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`),
        EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`),
        Total: bookingDetails.totalPrice,
      });
  
      alert('Booking successful! Proceeding to payment...');
      setBookingId(response.data.bookingId);
      
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
      if (error.response && error.response.status === 400) {
        alert(error.response.data || 'Booking failed due to an overlap.');
      } else {
        console.error('Error creating booking:', error);
        alert('Booking failed. Please try again.');
      }
    }
  };
  
  // In the render method
  {selectedTimeSlots.length === 0 && bookingDetails.bookingDate && (
    <p>No available time slots for {bookingDetails.bookingDate}. Please choose another date.</p>
  )}

  
  


  const handlePayment = async (bookingId, total) => {
    try {
      const bookingData = {
        BookingID: bookingId,
        StatusID: 2,
        AccountID: bookingDetails.accountId,
        PodID: bookingDetails.podId,
        StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`),
        EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`),
        Total: bookingDetails.totalPrice,
      };
  
      const updateResponse = await axios.put(`${BOOKING_API_URL}/${bookingId}`, bookingData);
      
      if (!updateResponse || updateResponse.status !== 204) {
        alert('Failed to update booking status.');
        return;
      }
  
      const paymentResponse = await axios.post('https://localhost:7257/VNPay/api/payment/vnpay', {
        BookingID: bookingId,
        Total: total,
        vnp_ReturnUrl: 'http://localhost:5173/SWP391-PodSystemBooking/successfullpayment',
      });
  
      if (paymentResponse && paymentResponse.data && paymentResponse.data.paymentUrl) {
        window.location.href = paymentResponse.data.paymentUrl;
      } else {
        console.log('Payment URL not provided by the server.');
      }
  
    } catch (error) {
      console.error('Error during payment process:', error.response?.data || error.message);
      alert('Failed to update booking status or send payment request.');
    }
  };

  const toggleFoodOrder = () => {
    setFoodOrderOpen((prev) => !prev);
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

     <div>
      {errorMessage && <p>{errorMessage}</p>}

     

      <h2>User Purchased Packages</h2>
<ul>
  {userPurchasedPackages.map((pkg) => {
    // Find the corresponding package with discount information
    const matchingPackage = packagesWithDiscount.find(
      (discountPkg) => discountPkg.packageId === pkg.packageId
    );

    return (
      <li key={pkg.userPackageId}>
        <label>
          <input
            type="checkbox"
            value={pkg.packageId}
            checked={selectedPackageId === pkg.packageId}
            onChange={(e) => {
              setSelectedPackageId(e.target.checked ? pkg.packageId : null);
              calculateTotalPrice({ ...bookingDetails, startTime: bookingDetails.startTime, endTime: bookingDetails.endTime, bookingDate: bookingDetails.bookingDate }); // Recalculate total price
            }}
          />
          Status: {pkg.status ? 'Active' : 'Inactive'}
          <br />
          Package ID: {pkg.packageId}
          <br />
          Purchase Date: {new Date(pkg.purchaseDate).toLocaleString()}
          <br />
          Expiry Date: {new Date(pkg.expiryDate).toLocaleString()}
          <br />
          {matchingPackage && (
            <div>
              Package Name: {matchingPackage.packageName}
              <br />
              Discount: {matchingPackage.discountPercentage}%
            </div>
          )}
        </label>
      </li>
    );
  })}
</ul>


    </div>
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
        {selectedTimeSlots.length > 0 && (
          <div className="unavailable-times">
            <h3>Unavailable Time Slots for {bookingDetails.bookingDate}:</h3>
            <ul>
              {selectedTimeSlots.map((slot, index) => (
                <li key={index}>
                  {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <label>
          Total Price: {bookingDetails.totalPrice}vnđ
        </label>

        <button type="submit" disabled={!bookingDetails.bookingDate || !bookingDetails.startTime || !bookingDetails.endTime}>
          Book Pod
        </button>
      </form>
      
      <button onClick={toggleFoodOrder}>Order Food</button>
      
      {isFoodOrderOpen && (
        <FoodOrder bookingId={bookingId} toggleFoodOrder={toggleFoodOrder} />
      )}
      {bookingId && (
        <button onClick={() => handlePayment(bookingId, bookingDetails.totalPrice)}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
} 

 
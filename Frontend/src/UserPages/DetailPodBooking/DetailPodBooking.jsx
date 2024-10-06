import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPodBooking.css'; // Add styles to match the design

export default function DetailPodBooking() {
  const { id } = useParams();
  const [pod, setPod] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const fetchPodDetails = async () => {
      try {
        // Fetch pod details from the new API
        const response = await axios.get(`https://localhost:7257/api/Pods/${id}`);
        setPod(response.data);
      } catch (error) {
        setError('Failed to load pod details. Please try again later.');
      }
    };

    fetchPodDetails();
  }, [id]);

  const handleAddOnChange = (addOn, price) => {
    if (selectedAddOns.includes(addOn)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOn));
      setTotalPrice(totalPrice - price);
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
      setTotalPrice(totalPrice + price);
    }
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    if (startTime && time <= startTime) {
      alert("End time must be later than start time.");
    } else {
      setEndTime(time);
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      const diffMs = end - start;
      const diffHours = diffMs / (1000 * 60 * 60); // Convert from milliseconds to hours
      return diffHours;
    }
    return 0;
  };

  const handleBooking = () => {
    const duration = calculateDuration();
    if (duration <= 0) {
      alert("Please select a valid time range.");
      return;
    }

    const hourlyRate = 27;
    const bookingCost = hourlyRate * duration;

    alert(`Booking duration: ${duration} hours. Total cost: $${bookingCost + totalPrice}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!pod) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="booking-details-container">
      {/* Pod Details Section */}
      <div className="left-section">
        <h1 className="pod-title">Booking Details</h1>
        <p className="pod-address">{pod.LocationID}, {pod.LocationID}</p>
        <div className="pod-info">
          <p>📏 {pod.Size || 'N/A'} sqft · 👥 {pod.Capacity || 'N/A'} people</p>
        </div>
        <p className="pod-description">
          {pod.Description}
        </p>
        <div className="pod-images">
          <img src={`https://localhost:7257/api/Pods/${pod.id}/image`} alt={pod.Name} className="main-image" />
          <div className="additional-images">
            {/* Replace with actual additional images if available */}
            <img src="additional-image1.jpg" alt="Additional 1" />
            <img src="additional-image2.jpg" alt="Additional 2" />
            <img src="additional-image3.jpg" alt="Additional 3" />
          </div>
        </div>
        <div className="map-section">
          <img src="map-image.jpg" alt="Map Location" />
          <p className="map-address">📍 {pod.Address}</p>
        </div>

        {/* Amenities */}
        <div className="amenities-section">
          <h3>Space Amenities</h3>
          <div className="space-amenities">
            <span>📞 Phone</span>
            <span>🖨️ Printer</span>
            <span>☕ Coffee</span>
            <span>🖥️ Flat Screen Monitors</span>
            <span>🌆 City Views</span>
            <span>❄️ Air Conditioning</span>
            <span>🪑 Modern Furniture</span>
          </div>
          <h3>Building Amenities</h3>
          <div className="building-amenities">
            <span>🍴 Restaurant</span>
            <span>🚗 Taxi Service</span>
            <span>📚 Library</span>
            <span>🏦 ATMs</span>
            <span>🛍️ Shops Nearby</span>
            <span>🚌 Bus Line</span>
          </div>
        </div>
      </div>

      {/* Booking Options Section */}
      <div className="right-section">
        <h3>One Time Purchase</h3>
        <div className="booking-options">
          <label htmlFor="date">Please select</label>
          <input type="date" id="date" className="form-control" />

          {/* Start Time Input */}
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            id="start-time"
            className="form-control"
            min="06:00"
            max="22:00"
            value={startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
          />

          {/* End Time Input */}
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            id="end-time"
            className="form-control"
            min="06:00"
            max="22:00"
            value={endTime}
            onChange={(e) => handleEndTimeChange(e.target.value)}
          />

          <label htmlFor="guests">Guests</label>
          <input type="number" id="guests" className="form-control" min="1" max="10" defaultValue="4" />

          <div className="addons-section">
            <h4>Add-ons (optional)</h4>
            <div className="addon-item">
              <input
                type="checkbox"
                id="coffee"
                onChange={() => handleAddOnChange('Coffee Service', 10)}
              />
              <label htmlFor="coffee">Coffee Service ($10)</label>
            </div>
            <div className="addon-item">
              <input
                type="checkbox"
                id="wifi"
                onChange={() => handleAddOnChange('Wireless Internet', 20)}
              />
              <label htmlFor="wifi">Wireless Internet ($20)</label>
            </div>
            <div className="addon-item">
              <input
                type="checkbox"
                id="video-equipment"
                onChange={() => handleAddOnChange('Video Equipment', 150)}
              />
              <label htmlFor="video-equipment">Video Equipment ($150)</label>
            </div>
          </div>
        </div>
        
        <div>
          <h2>Payment Method: VnPay QR</h2>
        </div>
        <button className="btn btn-primary book-btn" onClick={handleBooking}>
          Book It
        </button>

        <div className="pricing-details">
          <h4>Pricing Details</h4>
          <p>{`$27 x ${calculateDuration()} hours`}</p>
          {selectedAddOns.map((addOn, index) => (
            <p key={index}>{addOn}</p>
          ))}
          <h3>Total: ${totalPrice + 27 * calculateDuration()}</h3>
        </div>
      </div>
    </div>
  );
}

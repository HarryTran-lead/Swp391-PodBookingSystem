// DetailPodBooking.jsx
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

  useEffect(() => {
    const fetchPodDetails = async () => {
      try {
        const response = await axios.get(`https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Pod/${id}`);
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
        <p className="pod-address">{pod.Location}, {pod.City}</p>
        <div className="pod-info">
          <p>📏 {pod.Size} sqft · 👥 2-6 people</p>
        </div>
        <p className="pod-description">
          {pod.Description}
        </p>
        <div className="pod-images">
          <img src={pod.ImgPod} alt={pod.Name} className="main-image" />
          <div className="additional-images">
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
          <label htmlFor="time">Time</label>
          <select id="time" className="form-control">
            <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
            <option value="12:00-03:00">12:00 PM - 3:00 PM</option>
          </select>
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

        <button className="btn btn-primary book-btn" onClick={() => alert('Proceeding to booking...')}>
          Book It
        </button>

        <div className="pricing-details">
          <h4>Pricing Details</h4>
          <p>{`$27 x 4 hours = $108`}</p>
          {selectedAddOns.map((addOn, index) => (
            <p key={index}>{addOn}</p>
          ))}
          <h3>Total: ${totalPrice + 108}</h3>
        </div>
      </div>
    </div>
  );
}

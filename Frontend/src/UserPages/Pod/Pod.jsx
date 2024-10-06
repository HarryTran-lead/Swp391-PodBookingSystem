// ./AdminPages/Pod.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Pod.css'; // Ensure you have this CSS file for styling

export default function Pod() {
  const [pods, setPods] = useState([]);
  const API_URL = 'https://localhost:7257/api/Pods'; // Your .NET API endpoint
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchPods();
  }, []);

  const fetchPods = async () => {
    try {
      const response = await axios.get(API_URL);
      setPods(response.data); // Assuming response.data is an array of pods
    } catch (error) {
      console.error('Error fetching pods:', error);
    }
  };

  // Handle the pod card click to navigate to the detail page
  const handleCardClick = (id) => {
    navigate(`/SWP391-PodSystemBooking/pod/${id}`); // Navigate to the DetailPodBooking with pod ID
  };

  return (
    <div className="pod-container">
      <header className="pod-header">
        <h2>8 offices in <span>California</span></h2>
        <div className="filters">
          <select className="filter-select">City</select>
          <select className="filter-select">Amenities</select>
          <select className="filter-select">People</select>
          <button className="search-button">Search Nearby</button>
        </div>
      </header>

      <div className="pod-content">
        <div className="pod-list">
          {pods.map((pod) => (
            <div 
              key={pod.podId} // Change to pod.podId for consistency with your data structure
              className="pod-card" 
              onClick={() => handleCardClick(pod.podId)} // Add onClick handler
            >
              {/* Dynamically set the image source using the imgPod field */}
              <img 
                src={`https://localhost:7257${pod.imgPod}`} // Concatenate base URL with image path
                alt={pod.name} 
                className="pod-image" 
              />
              <div className="pod-details">
                <div className="price-tag">${pod.pricePerHour} / hour</div>
                <h3 className="pod-name">{pod.name}, {pod.locationId}</h3>
                <p className="pod-address">{pod.description}</p> {/* Changed to display description */}
                <div className="pod-info">
                  <span>👥 2-8 people</span> • <span>📏 5,215 sf</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pod-map">
          <img
            src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2023/08/IMAGE-1.png"
            alt="Map Placeholder"
            className="map-image"
          />
        </div>
      </div>
    </div>
  );
}

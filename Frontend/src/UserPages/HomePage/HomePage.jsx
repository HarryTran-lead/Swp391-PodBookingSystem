import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import bannerImage from '../../assets/BannerHomePage.jpg';
import PrimeLocationImage from '../../assets/PrimeLocation.jpg';
import OfficeSpace from '../../assets/OfficeSpace.png';

// Trusted companies logos
import GoogleLogo from '../../assets/BrandLogo/GoogleLogo.png';
import AmazonLogo from '../../assets/BrandLogo/AmazonLogo.png';
import LogitechLogo from '../../assets/BrandLogo/LogitechLogo.png';
import SpotifyLogo from '../../assets/BrandLogo/SpotifyLogo.png';
import SamsungLogo from '../../assets/BrandLogo/SamsungLogo.png';
import NetflixLogo from '../../assets/BrandLogo/NetflixLogo.png';

export default function HomePage() {
  const [pods, setPods] = useState([]);
  const API_URL = 'https://localhost:7257/api/Pods'; // Đường dẫn đến API của bạn

  // Fetch Pods data from API
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await axios.get(API_URL);
        setPods(response.data);
      } catch (error) {
        console.error('Error fetching Pods:', error);
      }
    };

    fetchPods();
  }, []);

  return (
    <>
      {/* Main Banner */}
      <div className="container-fluid p-0">
        <div className="main-banner">
          <img src={bannerImage} alt="Office Banner" className="banner-image" />
          <div className="overlay">
            <h1>Rent Offices Tailored to Your Success</h1>
            <div className="search-bar">
              <input type="text" placeholder="Search here" className="form-control" />
              <input type="text" placeholder="Search Nearby" className="form-control" />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        {/* Trusted Companies Section */}
        <div className="trusted-companies text-center">
          <p>Trusted by 100+ Companies across the globe!</p>
          <div className="companies-logos">
            <img src={GoogleLogo} alt="Google" />
            <img src={AmazonLogo} alt="Amazon" />
            <img src={LogitechLogo} alt="Logitech" />
            <img src={SpotifyLogo} alt="Spotify" />
            <img src={SamsungLogo} alt="Samsung" />
            <img src={NetflixLogo} alt="Netflix" />
          </div>
        </div>

        {/* List of Pods Section */}
        <div className="pods-section">
          <h2 className="text-center">Available Pods</h2>
          <div className="pods-grid">
            {pods.map((pod) => (
              <div key={pod.podId} className="pod-card"> {/* Đảm bảo sử dụng podId là duy nhất */}
                <img src={`https://localhost:7257/api/Pods/${pod.podId}/image`} alt={pod.name} className="pod-image-homepage" />
                <h3>{pod.name}</h3>
                <p>{pod.description}</p>
                <p>Price per Hour: ${pod.pricePerHour}</p>
                <a href={`/SWP391-PodSystemBooking/pod/${pod.podId}`} className="btn btn-primary">
                  Book Now
                </a>
              </div>
            ))}
          </div>

          {/* View All Pods Button */}
          <div className="view-all-pods text-center">
            <a href="/SWP391-PodSystemBooking/pod" className="btn btn-outline-primary mt-4">
              View All Pods
            </a>
          </div>
        </div>

        {/* Prime Locations and Office Space Section */}
        <div className="prime-locations-section">
          <img src={PrimeLocationImage} alt="Prime Locations" />
          <div className="location">
            <h3>CHECKOUT OUR</h3>
            <h2>Prime Locations</h2>
            <p>
              Our office spaces are conveniently located in the heart of the city, putting
              you in touch with industry players, with faster growth opportunities at hand.
            </p>
            <a href="/locations">See More</a>
          </div>
        </div>

        <div className="office-space-section">
          <div className="location">
            <h3>EXPERIENCE</h3>
            <h2>The Future of Office Space</h2>
            <p>
              Discover a new way to work – rent our premium flexibility, where you can book
              spaces for any duration, in premium locations with modern amenities.
            </p>
            <a href="/spaces">See More</a>
          </div>
          <img src={OfficeSpace} alt="Office Space" />
        </div>

        {/* Peace of Mind Section */}
        <div className="peace-of-mind-section">
          <h2 className="text-center">Giving you peace of mind</h2>
          <div className="services-grid">
            <div className="service-card">
              <h4>Easy Booking Process</h4>
              <p>We ensure our booking process is streamlined for your convenience.</p>
            </div>
            <div className="service-card">
              <h4>Community and Networking</h4>
              <p>Join a vibrant community of professionals and create valuable networks.</p>
            </div>
            <div className="service-card">
              <h4>Modern Amenities</h4>
              <p>Enjoy top-notch amenities designed for your comfort and productivity.</p>
            </div>
            <div className="service-card">
              <h4>Best Price</h4>
              <p>We guarantee the best price for our workspaces without compromising on quality.</p>
            </div>
            <div className="service-card">
              <h4>Strategic Location</h4>
              <p>Our locations are hand-picked to ensure you are where you need to be.</p>
            </div>
            <div className="service-card">
              <h4>Transparency</h4>
              <p>Our pricing and service offerings are completely transparent, with no hidden costs.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import bannerImage from '../../assets/BannerHomePage.jpg';

// Trusted companies logos
import GoogleLogo from '../../assets/BrandLogo/GoogleLogo.png';
import AmazonLogo from '../../assets/BrandLogo/AmazonLogo.png';
import LogitechLogo from '../../assets/BrandLogo/LogitechLogo.png';
import SpotifyLogo from '../../assets/BrandLogo/SpotifyLogo.png';
import SamsungLogo from '../../assets/BrandLogo/SamsungLogo.png';
import NetflixLogo from '../../assets/BrandLogo/NetflixLogo.png';

export default function HomePage() {
  const [pods, setPods] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);
  const API_URL = 'https://localhost:7257/api/Pods'; // API URL for Pods
  const SERVICE_PACKAGE_API_URL = 'https://localhost:7257/api/ServicePackages'; // API URL for Service Packages
  const USER_PURCHASED_PACKAGES_API_URL = 'https://localhost:7257/api/UserPurchasedPackages'; // API URL for User Purchased Packages

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

    // Fetch Service Packages data from API
    const fetchServicePackages = async () => {
      try {
        const response = await axios.get(SERVICE_PACKAGE_API_URL);
        setServicePackages(response.data);
      } catch (error) {
        console.error('Error fetching Service Packages:', error);
      }
    };

    fetchPods();
    fetchServicePackages();
  }, []);

  // Handle Buy Now button click to redirect to VNPay payment
  const handleBuyNow = async (packageItem) => {
    const accountId = localStorage.getItem('accountId'); // Get the account ID from localStorage
  
    if (!accountId) {
      alert('Please log in to continue.');
      return;
    }
  
    try {
      const paymentRequest = {
        PackageID: packageItem.id,
        Total: packageItem.price,
        vnp_ReturnUrl: `http://localhost:5173/SWP391-PodSystemBooking/successfullpaymentservice?packageId=${packageItem.id}`, // URL to redirect after payment
      };
  
      // Step 1: Initiate the payment request
      const response = await axios.post('https://localhost:7257/ServicePackageVNPay/api/payment/servicepackage', paymentRequest);
  
      if (response.data.paymentUrl) {
        // Step 2: Redirect to the payment URL
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };
  
  
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

        {/* Service Packages Section */}
        <div className="service-packages-section">
          <h2 className="text-center">Service Packages</h2>
          <div className="service-packages-grid">
            {servicePackages.map((packageItem) => (
              <div key={packageItem.id} className="service-package-card">
                <h3>{packageItem.packageName}</h3>
                <p>Duration: {packageItem.duration} {packageItem.durationType}</p>
                <p>Price: {packageItem.price.toFixed(2)} vnđ</p>
                <p>{packageItem.features}</p>
                <button className="btn btn-primary" onClick={() => handleBuyNow(packageItem)}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* List of Pods Section */}
        <div className="pods-section">
          <h2 className="text-center">Available Pods</h2>
          <div className="pods-grid">
            {pods.map((pod) => (
              <div key={pod.podId} className="pod-card">
                <img src={`https://localhost:7257/api/Pods/${pod.podId}/image`} alt={pod.name} className="pod-image-homepage" />
                <h3>{pod.name}</h3>
                <p>{pod.description}</p>
                <p>Price per Hour: {pod.pricePerHour} vnđ</p>
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
      </div>
    </>
  );
}

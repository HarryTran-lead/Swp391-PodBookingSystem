import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
  const [currentPosts, setCurrentPosts] = useState([]); // State for blog posts
  const API_URL = 'https://localhost:7257/api/Pods'; // API URL for Pods
  const SERVICE_PACKAGE_API_URL = 'https://localhost:7257/api/ServicePackages'; // API URL for Service Packages
  const BLOG_API_URL = 'https://localhost:7257/api/Blogs'; // API URL for Blogs
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch Pods, Service Packages, and Blog data from API
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await axios.get(API_URL);
        setPods(response.data);
      } catch (error) {
        console.error('Error fetching Pods:', error);
      }
    };

    const fetchServicePackages = async () => {
      try {
        const response = await axios.get(SERVICE_PACKAGE_API_URL);
        setServicePackages(response.data);
      } catch (error) {
        console.error('Error fetching Service Packages:', error);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(BLOG_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Create image paths for each post
        const postsWithImages = data.map((post) => ({
          ...post,
          imageUrl: `https://localhost:7257/api/Blogs/${post.id}/image`
        }));
        setCurrentPosts(postsWithImages);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        alert('Failed to load blog posts. Please try again later.'); // Notify user of the error
      }
    };

    fetchPods();
    fetchServicePackages();
    fetchBlogPosts();
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

  // Handle card click to navigate to pod detail page
  const handleCardClick = (id) => {
    navigate(`/SWP391-PodSystemBooking/pod/${id}`); // Navigate to the DetailPodBooking with pod ID
  };

  return (
    <>
      {/* Main Banner */}
      <div className="container-fluid p-0">
        <div className="main-banner">
          <img src={bannerImage} alt="Office Banner" className="banner-image" />
          <div className="overlay">
            <div className="hero-wrap">
              <div className="container">
                <h1>Rent Offices Tailored to Your Success</h1>
              </div>
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
                <h2>{packageItem.discountPercentage}%</h2>
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

        {/* Available Pods Section */}
        <div className="pods-section">
          <h2 className="text-center">Available Pods</h2>
          <div className="pod-content">
            <div className="pod-list">
              {pods.map((pod) => (
                <div
                  key={pod.podId}
                  className="pod-card"
                  onClick={() => handleCardClick(pod.podId)}
                >
                  <img
                    src={`https://localhost:7257${pod.imgPod}`}
                    alt={pod.name}
                    className="pod-image"
                  />
                  <div className="pod-details">
                    <div className="price-tag">{pod.pricePerHour} vnđ/h</div>
                    <h3 className="pod-name">{pod.name}, {pod.locationId}</h3>
                    <p className="pod-address">{pod.description}</p>
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

        {/* Blog Section */}
        <div className="blog-section">
          <h2 className="text-center">Latest Blogs</h2>
          <div className="row">
            {currentPosts.map((post) => (
              <div className="col-md-12 mb-4" key={post.id}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    {/* Display the image from the API */}
                    <img src={post.imageUrl} alt={post.title} className="img-fluid mb-3" />
                  </div>
                  <div className="col-md-8">
                    <div className="blog-post">
                      <h2>{post.title}</h2>
                      <p>{post.shortDes}</p>
                      <p>
                        <Link to={`/SWP391-MomAndBaby/detailBlog/${post.id}`} className="btn btn-primary">
                          Read more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

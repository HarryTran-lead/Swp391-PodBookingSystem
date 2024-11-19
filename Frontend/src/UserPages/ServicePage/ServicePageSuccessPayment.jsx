import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServicePageSuccessPayment.css';
import { useNavigate } from 'react-router-dom';

export default function ServicePageSuccessPayment() {
  const [packageInfo, setPackageInfo] = useState(null);
  const [isPackageSaved, setIsPackageSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const USER_PURCHASED_PACKAGES_API_URL = 'https://localhost:7257/api/UserPurchasedPackages';
  const NOTIFICATIONS_API_URL = 'https://localhost:7257/api/Notifications';
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state after unmounting

    const fetchPackageInfo = async () => {
      const packageId = new URLSearchParams(window.location.search).get('packageId');
      const accountId = localStorage.getItem('accountId');

      if (!accountId || !packageId || isPackageSaved) {
        setLoading(false);
        return;
      }

      try {
        // Fetch the package details directly
        const response = await axios.get(`https://localhost:7257/api/ServicePackages/${packageId}`);

        if (response.data && isMounted) {
          const purchaseDetails = {
            AccountID: accountId,
            PackageID: response.data.id,
            PurchaseDate: new Date().toISOString(),
            ExpiryDate: new Date(Date.now() + response.data.duration * 24 * 60 * 60 * 1000).toISOString(),
            RemainingUsage: response.data.usage ?? 0,
            Status: true,
          };

          // Save the purchase details
          await axios.post(USER_PURCHASED_PACKAGES_API_URL, purchaseDetails);

          // Create a notification after successful package purchase
          try {
            const notificationResponse = await axios.post(NOTIFICATIONS_API_URL, {
              AccountId: accountId,
              Message: 'Your package purchase was successful!',
              DateCreated: new Date().toISOString(), // Current date and time
            });

            if (notificationResponse.status === 201) {
              console.log('Notification created:', notificationResponse.data);
            } else {
              console.error('Failed to create notification:', notificationResponse.data);
              alert('Purchase was successful, but failed to create notification.');
            }
          } catch (notificationError) {
            console.error('Error creating notification:', notificationError);
            alert('Purchase was successful, but there was an error sending the notification.');
          }

          // Update the state
          setPackageInfo(response.data);
          setIsPackageSaved(true);
        }
      } catch (error) {
        setErrorMessage('An error occurred while processing the package information.');
        console.error('Error fetching package info:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPackageInfo();

    return () => {
      isMounted = false; // Clean up the flag on component unmount
    };
  }, [isPackageSaved]);

  const handleBackToYourPackage = () => {
    navigate('/SWP391-PodSystemBooking/yourpackage');
  };

  if (loading) {
    return <p>Loading package information...</p>;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div className="success-payment-container">
      {packageInfo ? (
        <div className="package-details">
          <h1>Payment Successful!</h1>
          <h2>Package Details:</h2>
          <p><strong>Package Name:</strong> {packageInfo.packageName}</p>
          <p><strong>Duration:</strong> {packageInfo.duration} {packageInfo.durationType}</p>
          <p><strong>Price:</strong> {packageInfo.price} vnđ</p>
          <p><strong>Purchase Date:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Expiry Date:</strong> {new Date(Date.now() + packageInfo.duration * 24 * 60 * 60 * 1000).toLocaleString()}</p>
          <button onClick={handleBackToYourPackage} className="back-to-yourpackage-button">
            Back to Your Package
          </button>
        </div>
      ) : (
        <p>No package information available.</p>
      )}
    </div>
  );
}

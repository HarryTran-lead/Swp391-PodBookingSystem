import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServicePageSuccessPayment.css'
export default function ServicePageSuccessPayment() {
  const [packageInfo, setPackageInfo] = useState(null);
  const USER_PURCHASED_PACKAGES_API_URL = 'https://localhost:7257/api/UserPurchasedPackages'; // API URL for User Purchased Packages
  const [isPackageSaved, setIsPackageSaved] = useState(false);

  useEffect(() => {
    const fetchPackageInfo = async () => {
        const packageId = new URLSearchParams(window.location.search).get('packageId');
        const accountId = localStorage.getItem('accountId');
      
        if (!accountId || !packageId || isPackageSaved) {
          return; // Early return if accountId, packageId is missing, or the package has already been saved
        }
      
        try {
          // Step 1: Check if the purchase record already exists
          const existingPurchaseResponse = await axios.get(`${USER_PURCHASED_PACKAGES_API_URL}?accountId=${accountId}&packageId=${packageId}`);
          
          if (existingPurchaseResponse.data.length > 0) {
            setIsPackageSaved(true); // Mark as saved to prevent future requests
            return; // Exit if an existing record is found
          }
      
          // Fetch the package information based on the packageId
          const response = await axios.get(`https://localhost:7257/api/ServicePackages/${packageId}`);
          console.log('API Response:', response.data); // Log the response data for debugging
      
          if (response.data) {
            // Create the purchase details object
            const purchaseDetails = {
              AccountID: accountId,
              PackageID: response.data.id,
              PurchaseDate: new Date().toISOString(),
              ExpiryDate: new Date(Date.now() + response.data.duration * 24 * 60 * 60 * 1000).toISOString(),
              RemainingUsage: response.data.usage ?? 0,
              status: true,
            };
      
            // Save the purchase details to the database
            await axios.post(USER_PURCHASED_PACKAGES_API_URL, purchaseDetails);
      
            // Update the state
            setPackageInfo(response.data);
            setIsPackageSaved(true); // Mark as saved
          }
        } catch (error) {
          console.error('Error fetching package info:', error);
        }
      };
      
    fetchPackageInfo();
  }, [isPackageSaved]); // Add isPackageSaved as a dependency
  
  
  
  return (
    <div>
      {packageInfo ? (
        <div>
          <h1>Payment Successful!</h1>
          <h2>Package Details:</h2>
          <p>Package Name: {packageInfo.packageName}</p>
          <p>Duration: {packageInfo.duration} {packageInfo.durationType}</p>
          <p>Price: {packageInfo.price} vnđ</p>
          <p>Purchase Date: {new Date().toLocaleString()}</p> {/* Show current date as purchase date */}
          <p>Expiry Date: {new Date(Date.now() + packageInfo.duration * 24 * 60 * 60 * 1000).toLocaleString()}</p> {/* Calculate expiry date */}
          <p>Status: {packageInfo.status ? "Active" : "Inactive"}</p>
        </div>
      ) : (
        <p>Loading package information...</p>
      )}
    </div>
  );
}

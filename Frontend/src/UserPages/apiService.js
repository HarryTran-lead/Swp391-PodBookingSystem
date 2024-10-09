import axios from 'axios';

// Function to log in a user
export const loginAccount = async (username, password) => {
  try {
    const response = await fetch('https://localhost:7257/api/Authen/SignIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Convert response to JSON
    return data; // Return data
  } catch (error) {
    console.error('Login API Error:', error); // Log error
    return { error: 'Network error' }; // Return error message
  }
};

// Function to get account details based on account ID

export const getAccountDetails = async (id) => {
  try {
    const response = await axios.get(`https://localhost:7257/api/Accounts/${id}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Get Account Details API Error:', error); // Log the error
    return { success: false, message: 'Could not retrieve account details' }; // Return an error message
  }
};

// Function to update account details based on account ID
export const updateAccountDetails = async (accountDetails) => {
  try {
    const response = await axios.put(`https://localhost:7257/api/Accounts/${accountDetails.id}`, accountDetails);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Update Account Details API Error:', error); // Log the error
    return { success: false, message: 'Failed to update account details' }; // Return an error message
  }

};

  [
    {
      "bookingId": 1,  // Optional if auto-generated
      "accountId": 1,  // Use the ID of the account you are associating this booking with
      "podId": 2,  // Example PodId
      "packageId": 3,  // Example PackageId
      "startTime": "2024-10-06T10:00:00",  // Adjust to current or desired start time
      "endTime": "2024-10-06T12:00:00",  // Adjust to current or desired end time
      "status": "Pending",  // Example status
      "account": {
        "id": 1,  // Make sure this matches the Account model's Id
        "name": "Example Account",  // You may want to include more details
        "username": "exampleUser",
        "email": "user@example.com",
        "phone": "1234567890"
      }
    }
  ]
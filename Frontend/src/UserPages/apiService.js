// src/services/apiService.js
const BASE_URL = 'https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Account';

// Hàm đăng nhập
export const loginAccount = async (username, password) => {
  try {
    const response = await fetch(BASE_URL);
    const accounts = await response.json();
    
    // Kiểm tra tài khoản
    const account = accounts.find(
      (acc) => acc.username === username && acc.password === password && acc.role === 'User'
    );

    if (account) {
      return { success: true, message: 'Login successful', account };
    } else {
      return { success: false, message: 'Invalid credentials or unauthorized role' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

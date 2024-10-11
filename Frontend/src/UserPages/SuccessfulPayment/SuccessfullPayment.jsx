import React, { useEffect, useState } from 'react'; // Thêm useState để lưu thông tin booking
import { useNavigate } from 'react-router-dom';
import './SucessfullPayment.css';

export default function SuccessfulPayment() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null); // Khai báo state để lưu booking data
  const [error, setError] = useState(null); // Khai báo state để lưu thông báo lỗi

  // Hàm để cập nhật trạng thái đặt phòng (StatusID = 3)
  const updateBookingStatus = async () => {
    const bookingId = localStorage.getItem('bookingId');
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails')); // Lấy thông tin từ localStorage

    if (!bookingId) {
      setError('Booking ID not found in local storage.');
      return; // Đảm bảo có bookingId
    }

    if (!bookingDetails) {
      setError('Booking details not found in local storage.');
      return; // Đảm bảo có bookingDetails
    }

    // Khai báo bookingData và cập nhật StatusID
    const bookingData = {
      bookingId: bookingId,
      StatusID: 4, // Cập nhật StatusID thành 4 (thanh toán thành công)
      AccountID: bookingDetails.accountId, // Lấy AccountID từ bookingDetails
      PodID: bookingDetails.podId, // Lấy PodID từ bookingDetails
      StartTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.startTime}`), // Định dạng lại thời gian bắt đầu
      EndTime: new Date(`${bookingDetails.bookingDate}T${bookingDetails.endTime}`), // Định dạng lại thời gian kết thúc
      Total: bookingDetails.totalPrice, // Tổng giá từ bookingDetails
    };

    setBookingData(bookingData); // Lưu thông tin bookingData vào state

    try {
      const response = await fetch(`https://localhost:7257/api/Bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData), // Gửi bookingData với StatusID = 3
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Failed to update booking status:', errorResponse);
        setError('Failed to update booking status.'); // Cập nhật thông báo lỗi
        return;
      }

      console.log('Booking status updated to Completed.');
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('An error occurred while updating booking status.'); // Cập nhật thông báo lỗi
    }
  };

  // Cập nhật trạng thái khi trang được tải
  useEffect(() => {
    updateBookingStatus(); // Gọi hàm cập nhật trạng thái khi trang được tải
  }, []); // Chỉ chạy 1 lần khi component được mount

  return (
    <div className="payment-success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your booking. Your payment has been processed successfully.</p>
      {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      {bookingData && ( // Kiểm tra xem bookingData có tồn tại không
        <div className="booking-details">
          <h2>Booking Details</h2>
          <p><strong>Booking ID:</strong> {bookingData.bookingId}</p>
          <p><strong>Status:</strong> {bookingData.StatusID}</p>
          <p><strong>Account ID:</strong> {bookingData.AccountID}</p>
          <p><strong>Pod ID:</strong> {bookingData.PodID}</p>
          <p><strong>Start Time:</strong> {bookingData.StartTime.toString()}</p>
          <p><strong>End Time:</strong> {bookingData.EndTime.toString()}</p>
          <p><strong>Total:</strong> {bookingData.Total}</p>
        </div>
      )}
      <p>Click the button below to return to the homepage.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        Go to Homepage
      </button>
    </div>
  );
}

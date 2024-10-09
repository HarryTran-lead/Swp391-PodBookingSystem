import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SucessfullPayment.css';

export default function SuccessfulPayment() {
  const navigate = useNavigate();

  // Redirect to homepage or another page after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to homepage after 5 seconds (you can change the route)
    }, 5000);

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your booking. Your payment has been processed successfully.</p>
      <p>You will be redirected to the homepage shortly.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        Go to Homepage
      </button>
    </div>
  );
}

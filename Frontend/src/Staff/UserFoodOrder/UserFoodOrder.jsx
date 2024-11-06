import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';


export default function FoodOrderDetails() {
  const [foodOrders, setFoodOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    const fetchFoodOrders = async () => {
      try {
        const response = await axios.get('https://localhost:7257/api/FoodOrderDetails');
        const sortedFoodOrders = response.data.sort((a, b) => b.bookingId - a.bookingId);
        setFoodOrders(sortedFoodOrders);
      } catch (error) {
        setErrorMessage('Error fetching food order data. Please try again later.');
        console.error('Error fetching food order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodOrders();
  }, []);

  const handleShowDetails = async (foodId) => {
    try {
      const response = await axios.get(`https://localhost:7257/api/FoodItems/${foodId}`);
      setFoodDetails(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching food details:', error);
      alert('Failed to load food details.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFoodDetails(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="food-order-container">
      <h2 style={{marginTop:30}}>Food Order Details</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {foodOrders.length > 0 ? (
        <Table className="food-order-table" striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Booking ID</th>
              <th>Food ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodOrders.map((order, index) => (
              <tr key={`${order.bookingId}-${order.foodId}`}>
                <td>{index + 1}</td>
                <td>{order.bookingId}</td>
                <td>{order.foodId}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowDetails(order.foodId)}>
                    Detail Food
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No food orders available.</p>
      )}

      {/* Modal for Food Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Food Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {foodDetails ? (
            <div>
              <h5>{foodDetails.foodName}</h5>
              <p><strong>Description:</strong> {foodDetails.description}</p>
              <p><strong>Price:</strong> {foodDetails.price}</p>
              <p><strong>Availability:</strong> {foodDetails.isAvailable ? 'Available' : 'Not Available'}</p>
              {foodDetails.imageUrl && (
                <img src={foodDetails.imageUrl} alt={foodDetails.foodName} className="img-fluid" />
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

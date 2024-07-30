import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order summary details from the backend
    const fetchOrderSummary = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/orderSummary/getorderSummary');
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order summary:', err);
        setError('Failed to fetch order summary. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Summary</h1>
        <button onClick={() => navigate('/custpage')} className="bg-gray-800 text-white px-4 py-2 rounded-md">
          Back to Home
        </button>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Order Details</h2>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Food Name:</label>
            <p className="text-xl text-gray-800">{orderDetails.foodName}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Price:</label>
            <p className="text-xl text-gray-800">₹{orderDetails.foodPrice}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Category:</label>
            <p className="text-xl text-gray-800">{orderDetails.foodCategory}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Veg/Non-Veg:</label>
            <p className="text-xl text-gray-800">{orderDetails.vegNonveg ? 'Veg' : 'Non-Veg'}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Default Delivery Location:</label>
            <p className="text-xl text-gray-800">{orderDetails.defaultDeliveryLocation}</p>
          </div>

          <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Proceed to Payment
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>&copy; 2024 Food Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderSummary;

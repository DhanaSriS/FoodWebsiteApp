import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Cust_profile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/api/customers/get', { withCredentials: true })
      .then(response => {
        setRestaurant(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch restaurant details.');
        setLoading(false);
        console.error('Error fetching restaurant details:', error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-4"
      >
        Your Profile
      </motion.h2>
      {restaurant ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {restaurant.custName}</p>
          <p><strong>Email:</strong> {restaurant.custMail}</p>
          <p><strong>Address:</strong> {restaurant.custAddress}</p>
          <p><strong>Phone:</strong> {restaurant.custPhone}</p>
          {/* Add other fields as needed */}
        </div>
      ) : (
        <p>No restaurant details available.</p>
      )}
    </motion.div>
  );
};

export default Cust_profile;

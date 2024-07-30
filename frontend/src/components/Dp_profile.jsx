import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dp_profile = () => {
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/api/delivery_partner/get', { withCredentials: true }) // Replace 1 with actual ID
      .then(response => {
        setDeliveryPartner(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch delivery partner details.');
        setLoading(false);
        console.error('Error fetching delivery partner details:', error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your profile</h2>
      {deliveryPartner ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p><strong>Name:</strong> {deliveryPartner.deliveryName}</p>
          <p><strong>Email:</strong> {deliveryPartner.dpMail}</p>
          <p><strong>Phone:</strong> {deliveryPartner.deliveryPhn}</p>
          <p><strong>Availability:</strong> {deliveryPartner.dpavailable ? "Yes" : "No" }</p>
          {/* Add other fields as needed */}
        </motion.div>
      ) : (
        <p>No delivery partner details available.</p>
      )}
    </div>
  );
};

export default Dp_profile;

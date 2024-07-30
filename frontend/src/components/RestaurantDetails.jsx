import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails = () => {
  const location = useLocation();
  const { post } = location.state;
  const navigate = useNavigate();

  // State to manage quantity and suggestions
  const [quantity, setQuantity] = useState(1); // Default to 1
  const [suggestion, setSuggestion] = useState('');

  const handleOrderClick = async () => {
    const restname=post.restaurantName;
    const foodname=post.foodName;
    try {
      const response = await axios.post('http://localhost:9000/api/orders/confirmOrder', null, {
        params: {
          quantity,
          suggestion,
          restname,
          foodname 
        },
        withCredentials: true 
      });

      // Show success message
      alert(response.data);
      console.log('Order placed:', response.data);

      // Navigate back to the landing page
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100">
      <header className="bg-orange-500 text-white p-4">
        <h1 className="text-2xl font-bold">Order Details</h1>
      </header>

      <main className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          {/* Image Section */}
          {/* <img
            src={`./images/${post.foodName.replace(' ', '')}.png`}
            alt={post.restaurantName}
            className="w-full h-64 object-cover rounded-t-lg"
          /> */}

          {/* Restaurant and Food Details */}
          <h2 className="text-3xl font-bold mt-4">{post.restaurantName}</h2>
          <p className="text-gray-600 mt-2">{post.foodName}</p>
          <p className="text-gray-800 mt-4">Category: {post.foodCategory}</p>
          <p className="text-gray-800">Price: ₹{post.foodPrice}</p>
          <p className="text-gray-800">Type: {post.vegNonveg ? 'Veg' : 'Non-Veg'}</p>

          {/* Quantity Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-600"
              placeholder="Enter quantity"
            />
          </div>

          {/* Suggestion Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Suggestion (Optional):</label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-600"
              placeholder="Any special instructions?"
              rows="3"
            />
          </div>

          {/* Order Button */}
          <button
            onClick={handleOrderClick}
            className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Order Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;

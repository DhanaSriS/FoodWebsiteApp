import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddMenu = () => {
  const [items, setItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:9000/api/items/selectAllFoods')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:9000/api/menu/addmenu', null, {
      params: {
        foodname: selectedFood,
        preptime: prepTime,
        price: price,
      },
      withCredentials: true,
    })
    .then(response => {
      setMessage('Menu item added successfully!');
      setSelectedFood('');
      setPrepTime('');
      setPrice('');
    })
    .catch(error => {
      setMessage('Failed to add menu item.');
      console.error('Error adding menu item:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

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
        Add Menu Item
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodname" className="block text-gray-700">Select Food</label>
          <motion.select
            id="foodname"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <option value="" disabled>Select an item</option>
            {items.map(item => (
              <option key={item.foodId} value={item.foodName}>{item.foodName}</option>
            ))}
          </motion.select>
        </div>
        <div>
          <label htmlFor="preptime" className="block text-gray-700">Preparation Time (minutes)</label>
          <motion.input
            type="number"
            id="preptime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <motion.input
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          whileTap={{ scale: 0.95 }}
        >
          Add Menu Item
        </motion.button>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex justify-center"
          >
            <div className="w-6 h-6 border-4 border-t-transparent border-orange-600 border-solid rounded-full animate-spin"></div>
          </motion.div>
        )}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 text-sm ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default AddMenu;

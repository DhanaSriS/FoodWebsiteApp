import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddFoodItem = () => {
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('');
  const [vegNonveg, setVegNonveg] = useState('veg');
  const [prepTime, setPrepTime] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFood = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:9000/api/menu/addnewmenu', null, {
      params: {
        foodname: foodName,
        preptime: prepTime,
        price: price,
        category: category,
        veg_noveg: vegNonveg === 'veg',
      },
      withCredentials: true,
    })
    .then(response => {
      setMessage('Food item added successfully!');
      setFoodName('');
      setCategory('');
      setVegNonveg('veg');
      setPrepTime('');
      setPrice('');
    })
    .catch(error => {
      setMessage('Failed to add food item.');
      console.error('Error adding food item:', error);
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
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Add New Food Item
      </motion.h2>
      <form onSubmit={handleAddFood} className="space-y-6">
        <div>
          <label htmlFor="foodName" className="block text-gray-700">Food Name</label>
          <motion.input
            type="text"
            id="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700">Food Category</label>
          <motion.input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div>
          <label className="block text-gray-700">Veg/Non-Veg</label>
          <div className="mt-2 flex space-x-6">
            <label className="inline-flex items-center">
              <motion.input
                type="radio"
                value="veg"
                checked={vegNonveg === 'veg'}
                onChange={(e) => setVegNonveg(e.target.value)}
                className="form-radio text-orange-600"
                required
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="ml-2">Veg</span>
            </label>
            <label className="inline-flex items-center">
              <motion.input
                type="radio"
                value="non-veg"
                checked={vegNonveg === 'non-veg'}
                onChange={(e) => setVegNonveg(e.target.value)}
                className="form-radio text-orange-600"
                required
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="ml-2">Non-Veg</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="prepTime" className="block text-gray-700">Preparation Time (minutes)</label>
          <motion.input
            type="number"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          whileTap={{ scale: 0.95 }}
        >
          Add Food Item
        </motion.button>
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
      </form>
    </motion.div>
  );
};

export default AddFoodItem;

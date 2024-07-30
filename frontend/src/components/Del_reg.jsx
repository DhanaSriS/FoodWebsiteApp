import React, { useState } from 'react';
import axios from 'axios';

const Del_reg = () => {
  const [formData, setFormData] = useState({
    deliveryPhn: '',
    dpMail: '',
    dpPswd: '',
    deliveryName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/delivery_partner/addDP', formData)
      .then(response => {
        console.log('registered', response.data);
      })
      .catch(error => {
        console.error('There was an error', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register as a Delivery Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deliveryPhn" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="deliveryPhn"
            name="deliveryPhn"
            value={formData.deliveryPhn}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="deliveryName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="deliveryName"
            name="deliveryName"
            value={formData.deliveryName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="dpMail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="dpMail"
            name="dpMail"
            value={formData.dpMail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="dpPswd" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="dpPswd"
            name="dpPswd"
            value={formData.dpPswd}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default Del_reg;

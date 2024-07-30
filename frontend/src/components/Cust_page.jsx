import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Cust_orders from './Cust_orders';
import Cust_profile from './Cust_profile';

const Cust_page = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');

  const renderComponent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Cust_orders />;
      case 'profile':
        return <Cust_profile />;
      default:
        return <Cust_orders />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-1/4 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Customer Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setSelectedMenu('orders')}
              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'orders' ? 'bg-white text-blue-500 shadow-lg' : 'hover:bg-blue-400 hover:shadow-md'}`}
            >
              Your Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedMenu('profile')}
              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'profile' ? 'bg-white text-blue-500 shadow-lg' : 'hover:bg-blue-400 hover:shadow-md'}`}
            >
              Profile
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-10 bg-gray-100 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderComponent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Cust_page;

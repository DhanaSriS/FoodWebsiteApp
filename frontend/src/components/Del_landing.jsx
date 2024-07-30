import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Orders from './Dp_orders';
import Profile from './Dp_profile';
import Dp_orders from './Dp_orders';
import Dp_profile from './Dp_profile';

const Del_landing = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');

  const renderComponent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Dp_orders />;
      case 'profile':
        return <Dp_profile />;
      default:
        return <Dp_orders />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-1/4 bg-gradient-to-r from-green-500 to-teal-500 text-white p-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Delivery Partner Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setSelectedMenu('orders')}
              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'orders' ? 'bg-white text-green-500 shadow-lg' : 'hover:bg-green-400 hover:shadow-md'}`}
            >
              Your Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedMenu('profile')}
              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'profile' ? 'bg-white text-green-500 shadow-lg' : 'hover:bg-green-400 hover:shadow-md'}`}
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

export default Del_landing;

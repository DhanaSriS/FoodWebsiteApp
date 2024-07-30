// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

// const Dp_orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:9000/api/delivery_partner/findOrders', { withCredentials: true })
//       .then(response => {
//         setOrders(response.data);
//       })
//       .catch(error => {
//         setError('There was an error fetching the orders!');
//         console.error('Error fetching orders:', error);
//       });
//   }, []);
//   const handleShipment = async orderId => {
//     try {
//       const response = await axios.post(
//         'http://localhost:9000/api/delivery_partner/delivered',
//         null,
//         {
//           params: { order_id: orderId },
//           withCredentials: true,
//         }
//       );
//       alert(response.data); // Display success message
//       // Update the order status locally
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.orderId === orderId
//             ? { ...order, orderStatus: 'Delivered' }
//             : order
//         )
//       );
//     } catch (err) {
//       console.error('Error updating shipment status:', err);
//       alert('There was an error updating the shipment status.');
//     }
//   };
//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {orders.map(order => (
//           <motion.div
//             key={order.orderId}
//             className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-gray-700">{order.foodName}</h3>
//               {order.orderStatus === 'Delivered' ? (
//                 <FaCheckCircle className="text-green-500 text-2xl" />
//               ) : (
//                 <FaTimesCircle className="text-red-500 text-2xl" />
//               )}
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600"><strong>Quantity:</strong> {order.quantity}</p>
//               <p className="text-gray-600"><strong>Order Total:</strong> ${order.order_total}</p>
//               <p className="text-gray-600"><strong>Order Status:</strong> {order.orderStatus}</p>
//               <p className="text-gray-600"><strong>Delivery Partner ID:</strong> {order.dpId}</p>
//               <p className="text-gray-600"><strong>Suggestion:</strong> {order.suggestion}</p>
              
//             </div>
//             <div className="mt-4">
//               <FaUser className="inline-block text-gray-500 mr-2" />
//               <span className="text-gray-500 text-sm">Order ID: {order.orderId}</span>
//               {order.orderStatus !== 'Delivered' && (
//                 <button
//                   onClick={() => handleShipment(order.orderId)}
//                   className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
//                 >
//                   Mark as Delivered
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dp_orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

const Dp_orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/delivery_partner/findOrders', {
          withCredentials: true
        });
        const fetchedOrders = response.data;

        // Group orders by customer, restaurant, and order time
        const groupedOrders = fetchedOrders.reduce((acc, order) => {
          const key = `${order.custId}-${order.restName}-${order.orderTime}`;
          if (!acc[key]) {
            acc[key] = {
              restName: order.restName,
              custId: order.custId,
              orderTime: order.orderTime,
              items: [],
              orderTotal: 0,
              orderStatus: order.orderStatus,
              orderId: order.orderId
            };
          }

          order.items.forEach(item => {
            acc[key].items.push(item);
            acc[key].orderTotal += item.quantity * item.price;
          });

          return acc;
        }, {});

        const formattedOrders = Object.keys(groupedOrders).map(key => ({
          ...groupedOrders[key],
          orderId: groupedOrders[key].orderId,
          orderStatus: groupedOrders[key].orderStatus
        }));

        setOrders(formattedOrders);
      } catch (error) {
        setError('There was an error fetching the orders!');
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle delivery
  const handleDelivery = async orderId => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/delivery_partner/delivered',
        null,
        {
          params: { order_id: orderId },
          withCredentials: true,
        }
      );
      alert(response.data); // Display success message
      // Update the order status locally
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId
            ? { ...order, orderStatus: 'Delivered' }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating delivery status:', err);
      alert('There was an error updating the delivery status.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Delivery Partner Orders
      </motion.h2>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 mb-4"
        >
          {error}
        </motion.p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <motion.div
            key={order.orderId}
            className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">{order.restName}</h3>
              {order.orderStatus === 'Delivered' ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-2xl" />
              )}
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="border-b border-gray-300 pb-2 mb-2">
                  <p className="text-gray-600">
                    <strong>Food:</strong> {item.foodName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="text-gray-600">
                    <strong>Suggestion:</strong> {item.suggestion || 'None'}
                  </p>
                </div>
              ))}
              <p className="text-gray-600">
                <strong>Order Total:</strong> ${order.orderTotal.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p className="text-gray-600">
                <strong>Delivery Partner ID:</strong> {order.dpId}
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <FaUser className="inline-block text-gray-500 mr-2" />
              <span className="text-gray-500 text-sm">Customer ID: {order.custId}</span>
              {order.orderStatus !== 'Delivered' && (
                <button
                  onClick={() => handleDelivery(order.orderId)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dp_orders;

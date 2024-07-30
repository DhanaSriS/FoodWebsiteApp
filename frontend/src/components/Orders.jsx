// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/api/restaurants/findOrders', {
//           withCredentials: true,
//         });
//         const fetchedOrders = response.data;

//         // Fetch food names
//         const foodNameRequests = fetchedOrders.map(order =>
//           axios
//             .get('http://localhost:9000/api/items/findFoodName', {
//               params: { foodId: order.foodId },
//             })
//             .then(res => ({
//               ...order,
//               foodName: res.data.foodName, // Ensure this matches the API response structure
//             }))
//         );

//         const ordersWithFoodNames = await Promise.all(foodNameRequests);
//         setOrders(ordersWithFoodNames);
//       } catch (error) {
//         setError('There was an error fetching the orders!');
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Function to handle shipment
//   const handleShipment = async orderId => {
//     try {
//       const response = await axios.post(
//         'http://localhost:9000/api/restaurants/shipped',
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
//             ? { ...order, orderStatus: 'Shipped' }
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
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="text-3xl font-bold mb-6 text-gray-800"
//       >
//         Your Orders
//       </motion.h2>
//       {error && (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="text-red-500 mb-4"
//         >
//           {error}
//         </motion.p>
//       )}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {orders.map(order => (
//           <motion.div
//             key={order.orderId}
//             className="p-6 border border-gray-200 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl bg-white"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
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
//               <p className="text-gray-600">
//                 <strong>Quantity:</strong> {order.quantity}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Order Total:</strong> ${order.order_total}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Order Status:</strong> {order.orderStatus}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Delivery Partner ID:</strong> {order.dpId}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Suggestion:</strong> {order.suggestion}
//               </p>
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <FaUser className="inline-block text-gray-500 mr-2" />
//               <span className="text-gray-500 text-sm">Order ID: {order.orderId}</span>
//               {order.orderStatus !== 'Shipped' && (
//                 <button
//                   onClick={() => handleShipment(order.orderId)}
//                   className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
//                 >
//                   Mark as Shipped
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/restaurants/findOrders', {
          withCredentials: true,
        });
        const fetchedOrders = response.data;

        // Group orders by restaurant and calculate total
        const groupedOrders = fetchedOrders.reduce((acc, order) => {
          const key = order.restName; // Assuming restName as a unique identifier for grouping
          if (!acc[key]) {
            acc[key] = {
              restName: order.restName,
              orderStatus: 'Delivered', // Initialize as Delivered
              items: [],
              orderTotal: 0,
            };
          }
          // Update order status based on the individual order
          if (order.orderStatus !== 'Delivered') {
            acc[key].orderStatus = 'Not Shipped';
          }
          acc[key].items.push(...order.items);
          acc[key].orderTotal += order.orderTotal; // Sum up the orderTotal
          return acc;
        }, {});

        setOrders(Object.values(groupedOrders));
      } catch (error) {
        setError('There was an error fetching the orders!');
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle shipment for all orders of a restaurant
  const handleShipment = async (restName) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/restaurants/shipped',
        null,
        {
          params: { restName: restName },
          withCredentials: true,
        }
      );
      alert(response.data); // Display success message
      // Update the order status locally
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.restName === restName
            ? { ...order, orderStatus: 'Shipped' }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating shipment status:', err);
      alert('There was an error updating the shipment status.');
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
        Your Orders
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
            key={order.restName}
            className="relative p-6 border border-gray-200 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Status Indicator */}
            <div className="absolute top-2 right-2 flex items-center">
              {order.orderStatus === 'Shipped' ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-2xl" />
              )}
              <span className={`ml-2 font-semibold ${order.orderStatus === 'Shipped' ? 'text-green-500' : 'text-red-500'}`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{order.restName}</h3>
              {order.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-2 mb-2">
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
            </div>
            <div className="mt-4 flex justify-between items-center">
              <FaUser className="inline-block text-gray-500 mr-2" />
            
              {order.orderStatus !== 'Shipped' && (
                <button
                  onClick={() => handleShipment(order.restName)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Mark as Shipped
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

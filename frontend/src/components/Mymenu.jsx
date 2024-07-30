
// import React, { useEffect, useState } from 'react';

// import axios from 'axios';

// import { motion } from 'framer-motion';

 

// const Mymenu = () => {

//   const [menuItems, setMenuItems] = useState([]);

//   const [error, setError] = useState('');

//   const [loading, setLoading] = useState(true);

 

//   const fetchMenu = async () => {

//     try {

//       const response = await axios.get('http://localhost:9000/api/restaurants/getmenu', {

//         withCredentials: true,

//       });

//       const fetchedMenuItems = response.data;

 

//       // Fetch food names

//       const foodNameRequests = fetchedMenuItems.map(item =>

//         axios

//           .get('http://localhost:9000/api/items/findFoodName', {

//             params: { foodId: item.foodId },

//           })

//           .then(res => ({

//             ...item,

//             foodName: res.data, // Ensure this matches the API response structure

//           }))

//       );

 

//       const menuItemsWithFoodNames = await Promise.all(foodNameRequests);

//       setMenuItems(menuItemsWithFoodNames);

//     } catch (error) {

//       setError('There was an error fetching the menu!');

//       console.error('Error fetching menu:', error);

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   useEffect(() => {

//     fetchMenu();

//   }, []);

 

//   return (

//     <div className="container mx-auto p-4">

//       <motion.h1

//         initial={{ opacity: 0, y: -20 }}

//         animate={{ opacity: 1, y: 0 }}

//         transition={{ duration: 0.3 }}

//         className="text-2xl font-bold mb-4"

//       >

//         Menu

//       </motion.h1>

//       {loading ? (

//         <motion.p

//           initial={{ opacity: 0 }}

//           animate={{ opacity: 1 }}

//           transition={{ duration: 0.3 }}

//           className="text-gray-500"

//         >

//           Loading...

//         </motion.p>

//       ) : error ? (

//         <motion.p

//           initial={{ opacity: 0 }}

//           animate={{ opacity: 1 }}

//           transition={{ duration: 0.3 }}

//           className="text-red-500"

//         >

//           {error}

//         </motion.p>

//       ) : (

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

//           {menuItems.map(item => (

//             <motion.div

//               key={item.menuNumber}

//               className="bg-white shadow-md rounded-lg p-4"

//               initial={{ opacity: 0, y: 20 }}

//               animate={{ opacity: 1, y: 0 }}

//               transition={{ duration: 0.3 }}

//             >

//               <h2 className="text-xl font-semibold">Food Name: {item.foodName}</h2>

//               <p>Price: ₹{item.foodPrice}</p>

//               <p>Preparation Time: {item.preparationTime}</p>

//               <p>Available: {item.mavailable ? 'No' : 'Yes'}</p>

//             </motion.div>

//           ))}

//         </div>

//       )}

//     </div>

//   );

// };

 

// export default Mymenu;

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { motion } from 'framer-motion';

 

const Mymenu = () => {

  const [menuItems, setMenuItems] = useState([]);

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

 

  const fetchMenu = async () => {

    try {

      const response = await axios.get('http://localhost:9000/api/restaurants/getmenu', {

        withCredentials: true,

      });

      const fetchedMenuItems = response.data;

      const foodNameRequests = fetchedMenuItems.map(item =>

        axios

          .get('http://localhost:9000/api/items/findFoodName', {

            params: { foodId: item.foodId },

          })

          .then(res => ({

            ...item,

            foodName: res.data, // Ensure this matches the API response structure

          }))

      );

 

      const menuItemsWithFoodNames = await Promise.all(foodNameRequests);

      setMenuItems(menuItemsWithFoodNames);

    } catch (error) {

      setError('There was an error fetching the menu!');

      console.error('Error fetching menu:', error);

    } finally {

      setLoading(false);

    }

  };

 

  const toggleAvailability = async (itemId, currentAvailability) => {

    try {

      const newAvailability = !currentAvailability;

      console.log(`Sending PATCH request with itemId: ${itemId}, available: ${newAvailability}`);

      const response = await axios.patch('http://localhost:9000/api/menu/available', null, {

        params: { itemId, available: newAvailability },

        withCredentials: true,

      });

      console.log('Response from server:', response.data);

 

      setMenuItems(prevItems =>

        prevItems.map(item =>

          item.foodId === itemId

            ? { ...item, mavailable: newAvailability }

            : item

        )

      );

    } catch (error) {

      console.error('Error updating availability:', error);

      setError('Failed to update item availability');

    }

  };

 

  useEffect(() => {

    fetchMenu();

  }, []);

 

  return (

    <div className="container mx-auto p-4">

      <motion.h1

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.3 }}

        className="text-2xl font-bold mb-4"

      >

        Menu

      </motion.h1>

      {loading ? (

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 0.3 }}

          className="text-gray-500"

        >

          Loading...

        </motion.p>

      ) : error ? (

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 0.3 }}

          className="text-red-500"

        >

          {error}

        </motion.p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {menuItems.map(item => (

            <motion.div

              key={item.menuNumber}

              className="bg-white shadow-md rounded-lg p-4"

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3 }}

            >

              <h2 className="text-xl font-semibold">Food Name: {item.foodName}</h2>

              <p>Price: ₹{item.foodPrice}</p>

              <p>Preparation Time: {item.preparationTime}</p>

              <p>Available: {item.mavailable ? 'Yes' : 'No'}</p>

              <button

                onClick={() => toggleAvailability(item.foodId, item.mavailable)}

                className="mt-2 px-4 py-2 rounded bg-orange-500 text-white"

              >

                Change Availability

              </button>

            </motion.div>

          ))}

        </div>

      )}

    </div>

  );

};

 

export default Mymenu;


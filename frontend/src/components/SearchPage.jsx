
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
// import { FaSearch, FaArrowLeft, FaShoppingCart } from 'react-icons/fa'; // Importing icons

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [cart, setCart] = useState([]); // Cart to hold selected items
//   const [visibleCount, setVisibleCount] = useState(10); // Limit visible items initially
//   const navigate = useNavigate();

//   const fetchData = async (value) => {
//     try {
//       const apiUrl = `http://localhost:9000/api/customers/search?name=${encodeURIComponent(value)}`;
//       const response = await axios.get(apiUrl);
//       setSearchResults(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // Fetch data only if search term is not empty
//     if (value) {
//       fetchData(value);
//     } else {
//       setSearchResults([]); // Clear search data if input is empty
//     }
//   };

//   const handleAddToCart = (post) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.foodId === post.foodId);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.foodId === post.foodId ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...post, quantity: 1 }];
//       }
//     });
//   };

//   const handleRemoveFromCart = (foodId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.foodId === foodId ? { ...item, quantity: item.quantity - 1 } : item
//       ).filter((item) => item.quantity > 0)
//     );
//   };

//   const handleConfirmOrder = async () => {
//     try {
//       const orderData = cart.map((item) => ({
//         food_name: item.foodName,
//         food_price: item.foodPrice,
//         food_category: item.foodCategory,
//         rest_id: item.restaurantId,
//         quantity: item.quantity,
//       }));

//       await axios.post('http://localhost:9000/api/orders/confirmOrder', orderData);

//       // Clear cart after order confirmation
//       setCart([]);
//       alert('Order placed successfully!');
//     } catch (error) {
//       console.error('Error confirming order:', error);
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   const loadMoreResults = () => {
//     setVisibleCount((prevCount) => prevCount + 10); // Load more results
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           {/* Back button to go to the main page */}
//           <Link to="/customerpage">
//             <button className="flex items-center text-white hover:text-gray-200">
//               <FaArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>
//           </Link>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search for restaurants or dishes..."
//             className="px-4 py-2 w-full md:w-96 text-black rounded-l-md border-none focus:ring-2 focus:ring-orange-600"
//           />
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
//             <FaSearch className="h-5 w-5" />
//           </button>
//         </div>
//       </header>

//       <main className="p-6 max-w-4xl mx-auto">
//         {searchResults.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {searchResults.slice(0, visibleCount).map((post, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow flex flex-col"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-800">{post.restaurantName}</h3>
//                     <p className="text-gray-600 mt-1">{post.foodName}</p>
//                   </div>
//                   {/* Example of displaying a logo or icon */}
//                   <img
//                     src={`./images/${post.restaurantName.toLowerCase().replace(/\s/g, '')}.png`}
//                     alt={post.restaurantName}
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">{post.foodCategory}</p>
//                 <p className="text-lg text-orange-500 font-semibold mt-2">₹{post.foodPrice}</p>
//                 <button
//                   onClick={() => handleAddToCart(post)}
//                   className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-600 mt-8">
//             {searchTerm ? 'No results found.' : 'Type to search for restaurants or dishes.'}
//           </div>
//         )}

//         {visibleCount < searchResults.length && (
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={loadMoreResults}
//               className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
//             >
//               Load More
//             </button>
//           </div>
//         )}

//         {/* Cart Section */}
//         {cart.length > 0 && (
//           <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Cart</h2>
//             {cart.map((item, index) => (
//               <div key={index} className="flex justify-between items-center mb-2">
//                 <div>
//                   <p className="text-lg font-semibold">{item.foodName}</p>
//                   <p className="text-sm text-gray-600">₹{item.foodPrice} x {item.quantity}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => handleRemoveFromCart(item.foodId)}
//                     className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
//                   >
//                     -
//                   </button>
//                   <span className="mx-2">{item.quantity}</span>
//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               onClick={handleConfirmOrder}
//               className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors w-full"
//             >
//               Confirm Order
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default SearchPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch data based on search term
  const fetchData = async (value) => {
    try {
      const apiUrl = `http://localhost:9000/api/customers/search?name=${encodeURIComponent(value)}`;
      const response = await axios.get(apiUrl);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      fetchData(value);
    } else {
      setSearchResults([]);
    }
  };

  // Add item to cart via API
  const handleAddToCart = async (post) => {
    try {
      const response = await axios.post('http://localhost:9000/api/cart/add', null, {
        params: {
          restName: post.restaurantName,
          foodName: post.foodName,
          quantity: 1,
        },
        withCredentials: true, // Important for session management
      });

      console.log(response.data);
      alert(response.data);

      // Fetch updated cart details
      fetchCartDetails();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // Remove item from cart via API
  const handleRemoveFromCart = async (foodId) => {
    try {
      const response = await axios.delete('http://localhost:9000/api/cart/remove', {
        params: {
          foodId: foodId,
        },
        withCredentials: true,
      });

      console.log(response.data);
      alert(response.data);

      // Fetch updated cart details
      fetchCartDetails();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  // Confirm the order via API
  // Function to handle order confirmation


  axios.defaults.withCredentials = true;  // Ensure cookies are sent with each request
  
  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/orders/confirmOrder",
        null,  // If no request body, pass null
        { withCredentials: true }  // Ensure credentials are sent
      );
  
      if (response.status === 200) {
        alert("Order confirmed successfully!");
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        alert(`Error confirming order: ${response.data}`);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Server error: ${error.response.data}`);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Error in request setup. Please try again.");
      }
    }
  };


  // Fetch cart details from backend
  const fetchCartDetails = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/cart/show', {
        withCredentials: true,
      });

      if (typeof response.data === 'string' && response.data.includes('Cart is empty')) {
        setCart([]);
        setTotalPrice(0);
      } else {
        const cartData = response.data;
        setCart(cartData.items);
        setTotalPrice(cartData.totalPrice);
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
      setCart([]);
      setTotalPrice(0);
    }
  };

  // Load more search results
  const loadMoreResults = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  // Initial fetch of cart details
  useEffect(() => {
    fetchCartDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/customerpage">
            <button className="flex items-center text-white hover:text-gray-200">
              <FaArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </Link>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for restaurants or dishes..."
            className="px-4 py-2 w-full md:w-96 text-black rounded-l-md border-none focus:ring-2 focus:ring-orange-600"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
            <FaSearch className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center">
          <FaShoppingCart className="h-6 w-6 mr-2" />
          <span>{cart.length} items</span>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.slice(0, visibleCount).map((post, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{post.restaurantName}</h3>
                    <p className="text-gray-600 mt-1">{post.foodName}</p>
                  </div>
                  <img
                    src={`./images/${post.restaurantName.toLowerCase().replace(/\s/g, '')}.png`}
                    alt={post.restaurantName}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{post.foodCategory}</p>
                <p className="text-lg text-orange-500 font-semibold mt-2">₹{post.foodPrice}</p>
                <button
                  onClick={() => handleAddToCart(post)}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            {searchTerm ? 'No results found.' : 'Type to search for restaurants or dishes.'}
          </div>
        )}

        {visibleCount < searchResults.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreResults}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg font-semibold">{item.foodName}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleRemoveFromCart(item.foodId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <FaMinus className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-orange-500">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full"
            >
              Confirm Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

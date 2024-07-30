// import React, { useState } from 'react';

// // Components for different sections
// import Orders from './Orders';
// import AddMenu from './AddMenu';
// import AddFoodItem from './AddFoodItem';
// import Profile from './Profile';

// const RestLanding = () => {
//   const [selectedMenu, setSelectedMenu] = useState('orders');

//   const renderComponent = () => {
//     switch (selectedMenu) {
//       case 'orders':
//         return <Orders />;
//       case 'addmenu':
//         return <AddMenu />;
//       case 'additem':
//         return <AddFoodItem />;
//       case 'profile':
//         return <Profile />;
//       default:
//         return <Orders />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//         <h2 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => setSelectedMenu('orders')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'orders' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Your Orders
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setSelectedMenu('addmenu')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'addmenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Add Menu
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setSelectedMenu('additem')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'additem' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Add Food Item
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setSelectedMenu('profile')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'profile' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Profile
//             </button>
//           </li>
//         </ul>
//       </nav>
//       <div className="flex-1 p-10 bg-gray-100 overflow-auto">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default RestLanding;
import React, { useState } from 'react';

 

// Components for different sections

import Orders from './Orders';

import AddMenu from './AddMenu';

import AddFoodItem from './AddFoodItem';

import Profile from './Profile';

import Mymenu from './Mymenu';

 

const RestLanding = () => {

  const [selectedMenu, setSelectedMenu] = useState('orders');

 

  const renderComponent = () => {

    switch (selectedMenu) {

      case 'orders':

        return <Orders />;

      case 'addmenu':

        return <AddMenu />;

      case 'additem':

        return <AddFoodItem />;

      case 'Mymenu':

        return <Mymenu/>;

      case 'profile':

        return <Profile />;

     

      default:

        return <Orders />;

    }

  };

 

  return (

    <div className="flex h-screen bg-gray-100">

      <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">

        <h2 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h2>

        <ul className="space-y-4">

          <li>

            <button

              onClick={() => setSelectedMenu('orders')}

              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'orders' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

            >

              Your Orders

            </button>

          </li>

          <li>

            <button

              onClick={() => setSelectedMenu('addmenu')}

              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'addmenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

            >

              Add Menu

            </button>

          </li>

          <li>

            <button

              onClick={() => setSelectedMenu('additem')}

              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'additem' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

            >

              Add Food Item

            </button>

          </li>

          <li>

            <button

              onClick={() => setSelectedMenu('Mymenu')}

              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'Mymenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

            >

              Mymenu

            </button>

          </li>

          <li>

            <button

              onClick={() => setSelectedMenu('profile')}

              className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'profile' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

            >

              Profile

            </button>

          </li>

        </ul>

      </nav>

      <div className="flex-1 p-10 bg-gray-100 overflow-auto">

        {renderComponent()}

      </div>

    </div>

  );

};

 

export default RestLanding;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Landing from './components/Landing';
import Cust_reg from './components/Cust_reg';
import Rest_reg from './components/Rest_reg';
import Customer_Landing from './components/Customer_landing';
import Del_reg from './components/Del_reg';
import About from './components/About';
import Rest_landing from './components/Rest_landing';
import Orders from './components/Orders';
import AddMenu from './components/AddMenu';
import AddFoodItem from './components/AddFoodItem';
import Profile from './components/Profile';
import Del_landing from "./components/Del_landing";
import Cust_page from "./components/Cust_page"
import RestaurantDetails from "./components/RestaurantDetails";
import OrderSummary from "./components/OrderSummary";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/customerreg' element={<Cust_reg />} />
        <Route path='/restaurantreg'element={<Rest_reg/>}/>
        <Route path='/deliveryreg'element={<Del_reg/>}/>       
        <Route path='/customerpage'element={<Customer_Landing/>}/>
        <Route path='/restpage' element={<Rest_landing/>}/>
        <Route path='/restpage/orders' element={<Orders />} />
        <Route path='/restpage/addmenu' element={<AddMenu />} />
        <Route path='/restpage/additem' element={<AddFoodItem />} />
        <Route path='/restpage/profile' element={<Profile />} />
        <Route path='/delpage' element={<Del_landing />} />
        <Route path="/custpage" element={<Cust_page/>}/>
        <Route path="/restaurant/:id" element={<RestaurantDetails />}/>
        <Route path="/orderSummary" element={<OrderSummary />} />
        <Route path="/search" element={<SearchPage/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

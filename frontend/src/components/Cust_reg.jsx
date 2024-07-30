import  { useState } from 'react';
import axios from 'axios';
const Cust_reg= () => {
  const [formData, setFormData] = useState({
    custName: '',
    custAddress: '',
    custPhone: 0,
    custMail: '',
    custPswd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:9000/api/customers/addCustomer',formData).then(response=>{
            console.log('registered',response.data);
        }).catch(error =>{
            console.error('there was an error')
        });
    };


  return (
    <div className="flex items-center justify-center min-h-screen ">
      
      
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register as a Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="custName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="custName"
            name="custName"
            value={formData.custName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="custAddress" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="custAddress"
            name="custAddress"
            value={formData.custAddress}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="custPhone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="custPhone"
            name="custPhone"
            value={formData.custPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="custMail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="custMail"
            name="custMail"
            value={formData.custMail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div >
          <label htmlFor="custPswd" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <input
            type="password"
            id="custPswd"
            name="custPswd"
            value={formData.custPswd}
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

export default Cust_reg;

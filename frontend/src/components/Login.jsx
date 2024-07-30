
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Fetch the role based on email
            const roleResponse = await axios.get('http://localhost:9000/api/roles/findrole', {
                params: { email }
            });
            const role = roleResponse.data;
            
            let loginResponse;

            // Based on role, make the appropriate login request
            if (role === 1) {
                loginResponse = await axios.post('http://localhost:9000/api/customers/login', null, {
                    params: { email, password },
                    withCredentials: true
                });
                
            } else if (role === 2) {
                loginResponse = await axios.post('http://localhost:9000/api/restaurants/login', null, {
                    params: { email, password },
                    withCredentials: true
                });
            } else if (role === 3) {
                loginResponse = await axios.post('http://localhost:9000/api/delivery_partner/login', null, {
                    params: { email, password },
                    withCredentials: true
                });
            } else {
                alert("Invalid role");
                return;
            }

            // Check if login was successful
            if (loginResponse.data === "Login successful") {
                // Navigate based on role
                if (role === 1) {
                    navigate('/customerpage');
                } else if (role === 2) {
                    navigate('/restpage');
                } else if (role === 3) {
                    navigate('/delpage');
                }
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-950 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-orange-500 hover:text-orange-600">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-950 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/customerreg" className="font-semibold leading-6 text-orange-500 hover:text-orange-500">
                        Sign up
                    </Link> 
                </p>
            </div>
        </div>
    );
};

export default Login;



// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             // Fetch the role based on email
//             const roleResponse = await axios.get('http://localhost:9000/api/roles/findrole', {
//                 params: { email }
//             });
//             const role = roleResponse.data;

//             let loginResponse;

//             // Based on role, make the appropriate login request
//             if (role === 1) {
//                 loginResponse = await axios.post('http://localhost:9000/api/customers/login', null, {
//                     params: { email, password },
//                     withCredentials: true
//                 });
//             } else if (role === 2) {
//                 loginResponse = await axios.post('http://localhost:9000/api/restaurants/login', null, {
//                     params: { email, password },
//                     withCredentials: true
//                 });
//             } else if (role === 3) {
//                 loginResponse = await axios.post('http://localhost:9000/api/delivery_partner/login', null, {
//                     params: { email, password },
//                     withCredentials: true
//                 });
//             } else {
//                 alert("Invalid role");
//                 return;
//             }

//             if (loginResponse.data === "Login successful") {
//                 setShowSuccessAlert(true);
//                 // Navigate based on role
//                 if (role === 1) {
//                     navigate('/customerpage');
//                 } else if (role === 2) {
//                     navigate('/restpage');
//                 } else if (role === 3) {
//                     navigate('/delpage');
//                 }
//             } else {
//                 alert("Login failed");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("An error occurred during login");
//         }
//     };

//     return (
//         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                     Sign in to your account
//                 </h2>
//             </div>

//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                 <form onSubmit={handleLogin} className="space-y-6">
//                     <div>
//                         <div className="flex items-center justify-between">
//                             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Email address
//                             </label>
//                         </div>
//                         <div className="mt-2">
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 required
//                                 autoComplete="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-950 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex items-center justify-between">
//                             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Password
//                             </label>
//                         </div>
//                         <div className="mt-2">
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 required
//                                 autoComplete="current-password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-950 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Sign in
//                         </button>
//                     </div>
//                 </form>{showSuccessAlert && (
//                     <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
//                     <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
//                   </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default Login;

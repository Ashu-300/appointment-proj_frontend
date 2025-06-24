import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/CustomerSlice';

const CustomerLogIn = () => {
   const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const customer = JSON.parse(localStorage.getItem('customerInfo'))

    if (token && customer) {
      navigate('/customer'); // redirect if already logged in
    }
    if (!token || !customer) {
      dispatch(logout()); // Force reset Redux store
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('');
    setsuccess('');

    try {
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/login/submit`, credentials); 
      const { token, customer } = res.data;
      
     

      localStorage.setItem('customerToken', token);
      localStorage.setItem('customerInfo', JSON.stringify(customer));

      
      setsuccess('Login successful!');
      setCredentials({ email: '', password: '' });
      
      // ✅ Redirect to dashboard
      navigate('/customer');
    } catch (err) {
      seterror(err.response?.data?.message || 'Login failed.');
    }
  };
  const handleSignUp = async(e)=>{
     navigate('/customer/signup');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Customer Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
           <button
           onClick={handleSignUp}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogIn

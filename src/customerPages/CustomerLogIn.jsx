import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/CustomerSlice';

const CustomerLogIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const customer = JSON.parse(localStorage.getItem('customerInfo'));

    if (token && customer) {
      navigate('/customer'); // redirect if already logged in
    } else {
      dispatch(logout()); // Force reset Redux store
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('');
    setsuccess('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/customer/login/submit`,
        credentials,
        {
          withCredentials: true,
        } 
      );
      const { token, customer } = res.data;

      localStorage.setItem('customerToken', token);
      localStorage.setItem('customerInfo', JSON.stringify(customer));

      setsuccess('Login successful!');
      setCredentials({ email: '', password: '' });

      navigate('/customer');
    } catch (err) {
      seterror(err.response?.data?.message || 'Login failed.');
    }
  };

  const handleSignUp = () => {
    navigate('/customer/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 mb-4 text-center font-medium">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-white text-indigo-600 hover:text-white hover:bg-indigo-500 active:scale-95 border border-indigo-500 font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogIn;

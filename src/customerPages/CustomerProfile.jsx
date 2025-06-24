import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const token = localStorage.getItem('customerToken');

        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomer(response.data);
      } catch (err) {
        console.error('Error fetching customer info:', err);
        setError('Failed to fetch customer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-red-500 text-lg font-semibold">
          {error || 'No customer data found. Please log in.'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform hover:scale-105 duration-300">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-md border-4 border-white">
            {customer.name.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-extrabold mt-4 text-indigo-800">{customer.name}</h1>

          {/* Contact Info */}
          <p className="text-gray-600 mt-2">{customer.email}</p>
          <p className="text-gray-600">{customer.phone}</p>

          {/* Divider */}
          <div className="my-4 w-1/2 border-b-2 border-indigo-200"></div>

          {/* Total Bookings */}
          <p className="text-lg text-gray-700">
            Total Bookings:{' '}
            <span className="text-indigo-600 font-semibold">
              {customer.bookings?.length || 0}
            </span>
          </p>

          {/* Optional: Add button or action */}
          <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

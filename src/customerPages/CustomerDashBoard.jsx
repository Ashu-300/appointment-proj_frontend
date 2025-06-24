import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const customer = JSON.parse(localStorage.getItem('customerInfo'));

  const fetchConfirmedBookings = async () => {
    try {
      const token = localStorage.getItem('customerToken');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/mybooking/${customer.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const confirmed = res.data.filter((b) => b.status === 'confirmed');
      setBookings(confirmed);
    } catch (err) {
      console.error('Error fetching bookings:', err.message);
      setError('Failed to load your confirmed bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl rounded-xl p-8 mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-blue-700">Welcome, {customer?.name} 👋</h2>
          <p className="text-gray-600 mt-2">Here are your <span className="font-medium text-blue-600">confirmed</span> bookings</p>
        </div>

        {loading && <p className="text-center text-gray-500">Loading bookings...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && bookings.length === 0 && (
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium">You have no confirmed bookings yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800">💇 {booking.salonName}</h3>
                <p className="text-sm text-gray-500">{new Date(booking.appointmentDate).toLocaleString()}</p>
              </div>

              <div className="mb-3">
                <p className="text-gray-700 font-medium mb-1">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {booking.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {service.serviceName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                  ✅ {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

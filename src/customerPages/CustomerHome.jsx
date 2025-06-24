import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../cutomerComponent/Header';
import SalonList from '../cutomerComponent/SalonList';
import Footer from '../cutomerComponent/Footer';
import { Link, useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const navigate = useNavigate();
  const [salons, setSalons] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customerInfo');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }

    const fetchSalons = async () => {
      try {
        const customerToken = localStorage?.getItem('customerToken');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        });
        setSalons(response.data);
      } catch (error) {
        console.error('Failed to fetch salons:', error.message);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setAuthError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const openSalon = (salon) => {
    navigate(`/customer/${salon.salonName}`, { state: { salon } });
  };

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-red-400 text-white p-6 text-center">
        <p className="text-xl font-semibold mb-4">🚫 You must be logged in to view salon listings.</p>
        <Link
          to="/customer/login"
          className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          🔑 Go to Login Page
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="loader mx-auto mb-4 border-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading salons near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header customer={customer} />

      <main className="flex-grow w-full p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-10">
          💇‍♀️ Explore Top Salons Near You
        </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
            {salons.map((salon) => (
              <div
                key={salon._id}
                className="h-full flex flex-col"
              >
                <button
                  onClick={() => openSalon(salon)}
                  className="h-full w-full bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden text-left"
                >
                  <SalonList salon={salon} />
                </button>
              </div>
            ))}
          </div>

      </main>

      <Footer />
    </div>
  );
};

export default CustomerHome;

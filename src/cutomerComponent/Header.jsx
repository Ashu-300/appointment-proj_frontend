import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/CustomerSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ customer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerInfo');
    dispatch(logout());
    navigate('/customer/login');
  };

  const dashboard = () => {
    navigate('/customer/dashboard');
  };
  function profile (){
    navigate('/customer/profile') ;
  }

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Branding */}
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          ✂️ SalonHub
        </h1>

        {/* Right side */}
        {customer && (
          <div className="flex flex-wrap items-center gap-3">
            <button
            onClick={profile}
             className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold text-sm">
              👤 {customer.name}
            </button>

            <button
              onClick={dashboard}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-full font-medium shadow transition duration-300"
            >
              🧾 Dashboard
            </button>

            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium shadow transition duration-300"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

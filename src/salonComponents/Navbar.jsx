import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSalon } from '../redux/slices/SalonSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
   const logOut = ()=>{
  
      localStorage.removeItem('salonToken');
      dispatch(logoutSalon()) ;
      navigate('/salon/login');
  
    }
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
  <Link to="/salon" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-300">
    Salon Snap
  </Link>

  <div className="flex gap-6 items-center text-gray-700 font-medium text-lg">
    <Link to="/salon/dashboard" className="hover:text-blue-500 transition duration-200">
      Dashboard
    </Link>
    <Link to="/salon/new-appointments" className="hover:text-blue-500 transition duration-200">
      New Appointments
    </Link>
    <Link to="/salon/booked-appointments" className="hover:text-blue-500 transition duration-200">
      Booked Appointments
    </Link>

    <button
      type="button"
      onClick={logOut}
      className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
    >
      Log Out
    </button>
  </div>
</nav>

  );
}

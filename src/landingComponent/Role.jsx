import React from 'react'
import { useNavigate } from 'react-router-dom';

const Role = () => {

    const navigate = useNavigate();
    const openCustomerPage = () => {
    window.open('/customer', '_blank', 'noopener,noreferrer');
  };

  const openSalonPage = () => {
    window.open('/salon', '_blank', 'noopener,noreferrer');
  };
  return (
    <>
       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 px-4">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Choose Your Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

          {/* Customer Card */}
          <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer</h2>
            <p className="text-gray-600 text-base">
              Book appointments, explore salons, and enjoy seamless grooming services.
            </p>
            <button onClick={openCustomerPage} className="mt-6 inline-block px-5 py-2 bg-black text-white rounded-xl font-medium transition-colors hover:bg-gray-800">
              Check it out
            </button>
          </div>

          {/* Salon Owner Card */}
          <div className="bg-gradient-to-b from-pink-100 to-pink-50 rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Salon Owner</h2>
            <p className="text-gray-600 text-base">
              Manage bookings, showcase services, and grow your salon business.
            </p>
            <button onClick={openSalonPage} className="mt-6 inline-block px-5 py-2 bg-black text-white rounded-xl font-medium transition-colors hover:bg-gray-800">
              Check it out
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Role

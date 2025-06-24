import React from 'react';

const SalonList = ({ salon }) => {
  return (
    <div className="w-full flex justify-center px-4 py-6">
      <div
        key={salon._id}
        className="bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 w-full max-w-xl border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-indigo-700 mb-2">
          {salon.salonName}
        </h3>
        <p className="text-gray-500 mb-1">{salon.address}</p>
        <p className="text-gray-700 mb-4">📞 {salon.phone}</p>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Services Offered:</h4>
          <div className="flex flex-wrap gap-2">
            {salon.services.map((service, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {service.serviceName} - ₹{service.price}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonList;

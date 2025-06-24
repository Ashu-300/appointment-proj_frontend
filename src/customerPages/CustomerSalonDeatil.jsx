// CustomerSalonDetails.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { io } from "socket.io-client";
import Header from '../cutomerComponent/Header';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
  withCredentials: true,
});



const CustomerSalonDetails = () => {
  
const {register , handleSubmit , reset , watch , formState:{errors}   } = useForm()


  const { name } = useParams();
  const location = useLocation();
  const { salon } = location.state || {};

  // const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceError, setServiceError] = useState('');
  const [selectedSlots, setselectedSlots] = useState([]);
  


  // const { customerInfo, isLoggedIn } = useSelector((state) => state.customer);
const customer = JSON.parse(localStorage.getItem('customerInfo'));
const token = localStorage.getItem('customerToken') ;

useEffect(() => {
   
  socket.emit('customer_joined' , customer._id) ;
  socket.on('booking_confirmed', async ( booking ) => {
    console.log('✅ Booking confirmed from salon:', booking);
      const formattedTime = new Date(booking.appointmentDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });    
    alert('📢 Booking has been confirmed!');
  });

  socket.on('booking_decline' , ({message})=>{
    alert(message) ;
  })
  return () => {
    socket.off('booking_confirmed');
    socket.off('booking_decline');
  };
}, []);

 // booking handler
  const handleBooking = async () => {
    try {
       socket.emit('customerBookingRequest' , {
         services : selectedServices,
         slots : selectedSlots,
         salonId : salon._id , 
         customerEmail  : customer.email,
    })   
    if (selectedServices.length === 0) {
    setServiceError('Please select at least one service.');
    return;
  } else {
    setServiceError('');
  }
      alert('Booking Request Send');
      setSelectedServices([]);
      setselectedSlots([]);
      reset()
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      alert('Failed to book the service. Please try again.');
    }
  };

  // adding services by customer
  const handleService = (serv) => {
    setSelectedServices((prev) => [...prev, serv]);
  };

  // deleting services selected by customer
  const handleDeleteService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.filter((s) => s.serviceName !== serviceName)
    );
  };

  if (!salon) {
    return (
      <div className="p-6 text-red-600 text-center">
        <h2 className="text-xl font-semibold">No salon data found.</h2>
        <p>Try navigating from the homepage.</p>
      </div>
    );
  }

  // generating slots for customer
  const generateTimeSlotsFromNow = (count = 10, intervalMinutes = 15) => {
    const now = new Date();
    const slots = [];

    for (let i = 0; i < count; i++) {
      const slot = new Date(now.getTime() + i * intervalMinutes * 60000);
      const label = slot.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      slots.push({ label, value: slot.toISOString() });
    }

    return slots;
  };

  return (
   // Inside your return statement

<>
  <Header customer={customer} />
  <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
      {/* Salon Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">{salon.salonName}</h1>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Owner:</span> {salon.ownerName}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Phone:</span> {salon.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Address:</span> {salon.address}
        </p>
      </div>

      {/* Services */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Services</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {salon.services.map((serv, index) => (
          <div
            key={index}
            className="border rounded-lg p-5 bg-indigo-50 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{serv.serviceName}</h3>
            <p className="text-gray-700 mb-3">Price: ₹{serv.price}</p>
            <button
              onClick={() => handleService(serv)}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 active:scale-95"
            >
              Add Service
            </button>
          </div>
        ))}
      </div>

      {/* Booking Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Make Booking</h2>

      {/* Selected Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Services:</h3>
        {selectedServices.length === 0 ? (
          <p className="text-gray-500 italic">No services selected yet.</p>
        ) : (
          <ul className="space-y-2">
            {selectedServices.map((service, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
              >
                <span className="text-gray-800">{service.serviceName}</span>
                <button
                  onClick={() => handleDeleteService(service.serviceName)}
                  className="text-red-500 hover:text-red-700 active:scale-95"
                >
                  <i className="ri-close-large-line text-xl"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
        {serviceError && <p className="text-red-600 text-sm mt-2">{serviceError}</p>}
      </div>

      {/* Time Slot Selection */}
      <form
        onSubmit={handleSubmit(handleBooking)}
        className="bg-white border-t pt-6 mt-6 flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label htmlFor="slots" className="block mb-1 font-medium text-gray-700">
              Select Time Slot
            </label>
            <select
              {...register("slots", { required: "Please select a slot" })}
              id="slots"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a slot</option>
              {generateTimeSlotsFromNow().map((slot, idx) => (
                <option key={idx} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            {errors.slots && (
              <p className="text-red-600 text-sm mt-1">{errors.slots.message}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const currentSlot = watch("slots");
              if (currentSlot) {
                setselectedSlots((prev) => [...prev, currentSlot]);
              } else {
                alert("Please select a slot first.");
              }
            }}
            className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-indigo-700 transition duration-300 active:scale-95"
          >
            Add Slot
          </button>
        </div>

        {/* Selected Slots */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Slots:</h3>
          {selectedSlots.length === 0 ? (
            <p className="text-gray-500 italic">No slots added yet.</p>
          ) : (
            <ul className="list-disc ml-6 space-y-1 text-gray-800">
              {selectedSlots.map((slot, index) => (
                <li key={index}>
                  {new Date(slot).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Booking */}
        <button
          type="submit"
          className="self-start mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 active:scale-95"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
</>


  );
};

export default CustomerSalonDetails;

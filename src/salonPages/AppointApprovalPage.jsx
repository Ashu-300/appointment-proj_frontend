import React, { useEffect, useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearBookingById } from '../redux/slices/BookingSlice';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function AppointApprovalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookings, setbookings] = useState([]);
  const salon = useSelector((state) => state?.salon?.salon)?.salon;
  const salontoken = localStorage.getItem('salonToken') ;
  const socket = io('http://localhost:8080');
  
  const location = useLocation();
  const {  booking } = location.state || {};
  
  
  
  useEffect(() => {
  const fetchExistingBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/salon/${salon.email}/allbooking` , {
        headers : {
          Authorization: `Bearer ${salontoken}`
        }
      });
      setbookings(response.data); // overwrite local state with DB data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  if (salon?._id) {
    fetchExistingBookings();
  }
}, [salon?._id]);
  
  // Placeholder customer data (replace with fetched data in real implementation)
  const customer = {
    name: booking?.customerName,
    email: booking?.customerEmail,
    phone: booking?.customerPhone,
    Slots: booking?.slots,
    services: booking?.services ,
  };

 
  
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleConfirm = async (booking) => {
  try {
    const updatedBooking = {
      ...booking,
      status: 'confirmed',
      slot: selectedSlot, // Or update `slots: [selectedSlot]` if that's your schema
    };

    const token = localStorage.getItem('salonToken');

    // ✅ Call API with correct booking ID
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/salon/booking/confirm/${booking._id}`, updatedBooking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Emit via socket to customer
    socket.emit('booking_confirmed', {
      customerId: booking.customerId,
      booking: updatedBooking,
    });

    alert(`Appointment confirmed for ${booking.customerName} at ${selectedSlot}`);
    navigate('/salon/new-appointments', {
      state: { booking: updatedBooking },
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    alert('Failed to confirm appointment. Please try again.');
  }
};


  const handleDecline = (booking) => {
    // Handle decline logic here
     socket.emit('booking_decline', {
      bookingId: booking._id,
      customerId: booking.customerId,
      booking: booking,
    });

    alert(`Appointment declined for ${customer.name}`);
    navigate('/salon/new-appointments');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 bg-white p-6 rounded shadow max-w-xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <h2 className="text-2xl text-center font-bold mb-4">Approve Appointment</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Select a preferred time slot:</p>
          {customer.Slots?.map((slot, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="preferredSlot"
                value={slot}
                checked={selectedSlot === slot}
                onChange={() => setSelectedSlot(slot)}
                className="mr-2"
              />
              {new Date(slot).toLocaleString()}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={()=>handleDecline(booking)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
          <button onClick={()=>handleConfirm(booking)} disabled={!selectedSlot} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50">Confirm Approval</button>
        </div>
      </div>
    </div>
  );
}

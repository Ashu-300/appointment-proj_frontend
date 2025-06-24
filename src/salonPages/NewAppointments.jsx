import React, { useEffect, useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../redux/slices/BookingSlice';
import { io } from 'socket.io-client';
import axios from 'axios';

// ✅ Place socket outside component to avoid re-connection on every render
const socket = io('http://localhost:8080');

export default function NewAppointments() {
  const salon = useSelector((state) => state?.salon?.salon)?.salon;

  
  const salontoken = localStorage.getItem('salonToken') ;
  const [bookings, setbookings] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location?.state || {};

  useEffect(() => {
  const fetchExistingBookings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/salon/${salon.email}/allbooking` , {
        headers : {
          Authorization: `Bearer ${salontoken}`
        }
      });
       const pendingBookings = response.data.filter((b) => b.status === 'pending');

      setbookings(pendingBookings);
    // overwrite local state with DB data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  if (salon?._id) {
    fetchExistingBookings();
  }
}, [salon?._id]);


    
   

  useEffect(() => {
    if (!salon?._id) return;

    // ✅ Salon joins as online
    socket.emit('salon_owner_join', salon._id);

    // ✅ Handle new booking event
    const handleNewBooking = (booking) => {      
      setbookings((prev) => [...prev, booking]);
      alert('📢 New booking received!');
    };

    socket.on('new_booking_notification', handleNewBooking);

    // ✅ Cleanup on unmount
    return () => {
      socket.off('new_booking_notification', handleNewBooking);
    };
  }, [salon?._id, dispatch]);


 




  // ✅ Filter only pending appointments
  const pendingBookings = bookings?.filter((b) => b?.status === 'pending') || [];

  // ✅ Navigate to approval page
  const approveAppointment = ( booking) => {
    navigate('/salon/new-appointments/appointment-approval', {
      state: {  booking },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">New Appointments (Pending Approval)</h2>

        <ul className="space-y-2">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <li
                key={index}
                className="border p-2 rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{booking.customerName}</p>
                  <div className="text-gray-500 text-sm">
                    {/* {booking.slots &&
                      new Date(booking.slots).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })} */}
                  </div>
                </div>
                <button
                  onClick={() => approveAppointment( booking)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No new appointments waiting for approval.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../salonComponents/Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function BookedAppointments() {
  const navigate = useNavigate();
  const [bookings , setbookings] = useState([]);
  const salontoken = localStorage.getItem('salonToken') ;
  const salon = useSelector((state)=> state.salon.salon)?.salon ;


  useEffect(() => {
  const fetchExistingBookings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/salon/${salon.email}/allbooking` , {
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

  const viewAppointment = (bookie) => {
    navigate('/salon/booked-appointments/view-appointment' , {
      state : {bookie},
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>
      {/* Booked Appointments Section */}
      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Booked Appointments</h2>
        <ul className="space-y-2">
          {bookings.filter((bookie)=> bookie.status === 'confirmed').map((bookie) => (
            <li
              key={bookie._id}
              className="border p-2 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div><strong>{bookie.customerName}</strong> </div>
               <div className="text-gray-500 text-sm">
                  {bookie.appointmentDate && new Date(bookie.appointmentDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>

              </div>
              <button
                onClick={() => viewAppointment(bookie)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

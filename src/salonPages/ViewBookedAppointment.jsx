import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../salonComponents/Navbar';
import axios from 'axios';

export default function ViewBookedAppointment() {
  const navigate = useNavigate();
  const location = useLocation() ;
  const {bookie} = location.state || {} ;
  const date = new Date(bookie.appointmentDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })

const salontoken = localStorage.getItem('salonToken') ;
  async function completeBooking(bookie){
    bookie.status = 'completed' ;
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/salon/booking/complete/${bookie._id}` , bookie , {
      headers:{
         Authorization: `Bearer ${salontoken}` 
      }
    }) ;
    navigate('/salon/booked-appointments') ;
  }
  


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 max-w-xl mx-auto bg-white p-6 rounded shadow relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Appointment Details</h2>

        <div className="space-y-3">
          <p><strong>Customer Name:</strong> {bookie.customerName}</p>
          <p><strong>Email:</strong> {bookie.customerEmail}</p>
          <p><strong>Phone:</strong> {bookie.customerPhone}</p>
          <p><strong>Appointment Time:</strong> {date}</p>
          <p>
            <strong>Service:</strong>{' '}
            {bookie.services.map((service, index) => (
              <span key={index}>{service.serviceName}{index < bookie.services.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <button
            onClick={()=>completeBooking(bookie)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-sm transition duration-300"
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
}

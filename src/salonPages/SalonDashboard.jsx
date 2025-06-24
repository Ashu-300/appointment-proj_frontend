import React, { useEffect, useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
// ⬅️ Add useEffect

export default function SalonDashboardPage() {

const salonDetail = useSelector((state)=>state.salon.salon)?.salon ;
const token = localStorage.getItem('salonToken');


  
  const [salon, setSalon] = useState({
    name: salonDetail.salonName,
    owner: salonDetail.ownerName,
    phone: salonDetail.phone,
    email: salonDetail.email,
    services: salonDetail.services,
  });

  const [editing, setEditing] = useState(false);

  const [appointments, setappointments] = useState([]);

  const handleChange = (field, value) => {
    setSalon((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...salon.services];
    updatedServices[index] = value;
    setSalon((prev) => ({ ...prev, services: updatedServices }));
  };

  

// Inside component...
useEffect(() => {
  const fetchCompletedAppointments = async () => {
    try {
      const completedBookings = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/salon/${salonDetail.email}/completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setappointments(completedBookings.data);
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
    }
  };

  if (salonDetail?.email) {
    fetchCompletedAppointments();
  }
}, [salonDetail?.email]);





  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>
      {/* Content Section */}
      <div className="mt-6 bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Salon Details</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name:</label>
            {editing ? (
              <input
                value={salon.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            ) : (
              <span className="ml-2">{salon.name}</span>
            )}
          </div>

          <div>
            <label className="font-semibold">Owner:</label>
            {editing ? (
              <input
                value={salon.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            ) : (
              <span className="ml-2">{salon.owner}</span>
            )}
          </div>

          <div>
            <label className="font-semibold">Phone:</label>
            {editing ? (
              <input
                value={salon.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            ) : (
              <span className="ml-2">{salon.phone}</span>
            )}
          </div>

          <div>
            <label className="font-semibold">Email:</label>
            {editing ? (
              <input
                value={salon.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            ) : (
              <span className="ml-2">{salon.email}</span>
            )}
          </div>

          <div>
            <label className="font-semibold">Services:</label>
            {editing ? (
              <ul className="ml-2 space-y-1">
                {salon.services.map((service, index) => (
                  <li key={index}>
                    <input
                      value={service}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                      className="p-1 border rounded"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="ml-2 list-disc list-inside">
                {salon.services.map((service, index) => (
                  <li key={index}>{service.serviceName}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Completed Appointments */}
      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Completed Appointments</h2>
        <ul className="space-y-2">
          {appointments?.map((appt) => (
            <li
              key={appt?._id}
              className="border p-2 rounded shadow-sm flex justify-between items-center"
            >
              <span>{appt?.customerName} -{' '}
                {appt?.services.map((service) => service?.serviceName).join(', ')}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(appt.appointmentDate).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

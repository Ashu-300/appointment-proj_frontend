import React, { useEffect, useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function SalonHomePage() {

  const [salon, setsalon] = useState(null);

  const [authError, setauthError] = useState(false); // For unauthorized access

   const storedSalonOwner = useSelector((state)=>state.salon.salon) ;
  useEffect( () => {
    
    // const storedSalonOwner = localStorage.getItem('salonInfo');
    // const token = localStorage.getItem('salonToken');
   
      
      if(!storedSalonOwner){
          // setsalon(JSON.parse(storedSalonOwner));
          setauthError(true);
      } 

    const salonInfo = async ()=>{
      try{
       const token = (localStorage?.getItem('salonToken')) ;
        
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/salon`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
      setsalon(res.data)
      
      
    }catch(error){
      console.log(error);
      
    }
  
    }
    salonInfo()
    
  }, []);






   if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-red-400 text-white p-6 text-center">
        <p className="text-xl font-semibold mb-4">🚫 You must be logged in to view salon listings.</p>
        <Link
          to="/salon/login"
          className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
        >
          🔑 Go to Login Page
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>

      {/* Home Content */}
      <div className="mt-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to {salon?.salonName}</h1>
          <p className="text-gray-600">Your beauty and comfort is our priority. Explore our services and manage appointments easily from here.</p>
        </div>

        {/* Services Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {salon?.services?.map((service, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-semibold mb-2">{service.serviceName}</h3>
              <p className="text-gray-500">Professional services to make you feel amazing.</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-100 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Need an Appointment?</h2>
          <p className="text-gray-700 mb-4">Schedule your session with us today and let us take care of the rest!</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Book Now</button>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic">"Absolutely loved the haircut! Very professional and friendly staff."</p>
              <p className="text-sm text-right mt-2 text-gray-500">- Priya</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic">"I feel so refreshed after the facial. Highly recommend this place!"</p>
              <p className="text-sm text-right mt-2 text-gray-500">- Rahul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import video from '../assets/video1.mp4';
import Mobile from '../assets/Mobile.webp';
import Calender from '../assets/Calender.webp';
import Footer from './Footer';
import Role from './Role';

const roles = [
  {
    title: "Customer",
    description: "Book appointments, explore salons, and enjoy seamless grooming services.",
    bgColor: "from-blue-100 to-blue-50",
    hoverColor: "hover:scale-105 hover:shadow-lg",
  },
  {
    title: "Salon Owner",
    description: "Manage bookings, showcase services, and grow your salon business.",
    bgColor: "from-pink-100 to-pink-50",
    hoverColor: "hover:scale-105 hover:shadow-lg",
  },
];


const LandingPage = () => {


  return (
    <>
    
 <div className="flex items-center justify-center  w-full h-full bg-black bg-opacity-50">
      <video
        src={video}
        autoPlay
        muted
        loop
        className="w-full h-[47rem] object-cover"
      />
      <div className=" absolute h-[48rem] text-white mb-28 flex justify-center flex-col items-center   ">
        <h1 className=" text-center w-96 h-20 text-7xl font-extrabold mt-56 ">SalonSnap</h1>
        <h1 className=' text-center text-5xl font-semibold w-[40rem]    ' >Snag your style, anytime</h1>
        <h2 className='text-3xl w-[30rem] text-center mt-5   '>Experience seamless online booking of your beauty anytime, anywhere!!!</h2>
        <div className='flex flex-col justify-end h-full ' >
          <h3 className=' text-3xl animate-bounce'>scroll down</h3>
        </div>
      </div>
    </div>

    <div className=' relative h-[50rem] mt-5 flex flex-col items-center justify-center object-contain ' >

      <h1 className='text-7xl'>What’s waiting for you ?</h1>
      <h3 className='text-2xl text-center w-96  '>Our app is packed with features that enable you to experience booking like never before</h3>
      <img className='h-96 w-80 '  src={Mobile} alt="" />
      <img className='h-52 w-72 absolute top-[27rem] ' src={Calender} alt="" />
      <h3 className='absolute top-[39rem] text-2xl ' >Schedule your booking</h3>

    </div>

    <Role/>

    <Footer/>



    </>
  )
}

export default LandingPage

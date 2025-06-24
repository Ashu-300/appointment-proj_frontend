import React, { useState } from 'react';
import { salonServices } from '../utils/servicesData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalonSignUp = () => {
  const [salonName, setSalonName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [rate, setRate] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = salonServices.filter((item) =>
        item.serviceName.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setShowSuggestions(false);
  };

  const handleShowSelectedServices = () => {
    if (inputValue.trim() !== '' && rate.trim() !== '') {
      const isExist = salonServices.find(service => service.serviceName === inputValue);
      const isExistAlready = selectedServices.find(service => service.serviceName === inputValue);

      if (isExist && !isExistAlready) {
        const serviceObj = {
          serviceName: inputValue,
          price: rate
        };
        setSelectedServices(prev => [...prev, serviceObj]);
        setInputValue('');
        setRate('');
      }
    }
  };

  const handleDeleteService = (serviceName) => {
    setSelectedServices((prev) => prev.filter((s) => s.serviceName !== serviceName));
  };

  const handleFormSubbmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/salon/signup/submit`, {
        salonName: salonName,
        ownerName: ownerName,
        email: email,
        password: password,
        phone: phoneNumber,
        address: address,
        services: selectedServices
      },
        {
          withCredentials: true
        }
      );

      if (response.status === 201) {
        console.log('user registered');

        navigate('/salon/login');
        
        setSalonName('');
        setAddress('');
        setEmail('');
        setOwnerName('');
        setPhoneNumber('');
        setPassword('');
        setSelectedServices([]);
        setShowSuggestions(false);
        setInputValue('');
        setRate('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div className='w-[50%] max-h-[90%] rounded-lg border border-gray-400 p-6 shadow-lg flex flex-col gap-6 overflow-y-auto bg-white'>
        <h2 className='text-2xl font-bold text-center'>Salon Signup</h2>

        <form className='flex flex-col gap-4' onSubmit={handleFormSubbmission}>
          <h3 className='text-xl font-semibold'>Salon Details</h3>

          {/* Salon Name */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='salonName' className='text-sm font-medium'>Salon Name</label>
            <input
              type='text'
              id='salonName'
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
              placeholder='Enter Salon Name'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Owner Name */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='ownerName' className='text-sm font-medium'>Owner Name</label>
            <input
              type='text'
              id='ownerName'
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder='Enter Owner Name'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='phoneNumber' className='text-sm font-medium'>Phone Number</label>
            <input
              type='text'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='+91-XXXXXXXXXX'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Address */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='address' className='text-sm font-medium'>Address</label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter address'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-medium'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Service + Rate Input */}
          <div className='flex flex-col gap-2 mt-4'>
            <h4 className='font-medium text-lg'>Select Services</h4>

            <div className='flex gap-2'>
              <div className='relative w-full'>
                <input
                  type='text'
                  value={inputValue}
                  onChange={handleChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                  onFocus={() => {
                    if (inputValue) setShowSuggestions(true);
                  }}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Type service name...'
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-auto'>
                    {filteredSuggestions.map((item, index) => (
                      <li
                        key={index}
                        onMouseDown={() => handleSelect(item.serviceName)} 
                        className='px-4 py-2 hover:bg-blue-100 cursor-pointer'
                      >
                        {item.serviceName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                type='number'
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder='Rate'
                className='w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div
              role='button'
              onClick={handleShowSelectedServices}
              className='py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-black transition-colors duration-200 w-fit'
            >
              Add
            </div>

            <div className='flex flex-col gap-1'>
              {selectedServices.map((service, index) => (
                <div key={index} className='flex justify-between items-center border px-3 py-2 rounded-md bg-gray-50'>
                  <div>{service.serviceName} - ₹{service.price}</div>
                  <div
                    role='button'
                    className='cursor-pointer text-red-500'
                    onClick={() => handleDeleteService(service.serviceName)}
                  >
                    <i className='ri-close-large-line text-xl'></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className='mt-6'>
            <button
              type='submit'
              className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalonSignUp;

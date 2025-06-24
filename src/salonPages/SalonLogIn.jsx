import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSalon } from '../redux/slices/SalonSlice';

const SalonLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    clearErrors,

  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const salon = useSelector((state)=> state.salon.salon) ;
  
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/salon/login/submit`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, salon } = response.data;

      if (response.status === 200) {
        localStorage.setItem('salonToken', token);
        dispatch(loginSalon({salon})) ; 
      
        navigate('/salon');
      }
        reset();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError('apiError', {
          type: 'manual',
          message: 'Invalid email or password.',
        });
      } else {
        setError('apiError', {
          type: 'manual',
          message: 'Something went wrong. Please try again.',
        });
      }
    }
  };
 
  

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div className='w-[50%] max-w-md rounded-lg border border-gray-400 p-6 shadow-lg flex flex-col gap-6 bg-white'>
        <h2 className='text-2xl font-bold text-center'>Salon Login</h2>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Email</label>
           <input
              type='email'
              id='email'
              {...register('email', {
              required: 'Email is required',
              onChange : ()=> clearErrors('apiError') ,
              })}
              
              placeholder='Enter email'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-medium'>Password</label>
            <input
              type='password'
              id='password'
              {...register('password', { 
                required: 'Password is required' ,
                onChange : ()=> clearErrors('apiError') ,
               })}
                
              placeholder='Enter password'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          {/* API error message */}
          {errors.apiError && (
            <p className='text-sm text-red-500'>{errors.apiError.message}</p>
          )
          }

          <div className='mt-4 flex flex-col gap-3'>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
            >
              Login
            </button>

            <button
              type='button'
              onClick={() => navigate('/salon/signup')}
              className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalonLogin;

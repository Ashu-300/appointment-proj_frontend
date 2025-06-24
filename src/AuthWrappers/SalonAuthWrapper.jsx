import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SalonAuthWrapper = ({children}) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const token = localStorage.getItem('token');

            if(!token){
               navigate('/salon/login');
               return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/salon/checkAuth`,{
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if(response.status === 200){
                    setIsLoading(false);
                }

            } catch (error) {
                localStorage.removeItem('token')
                navigate('/salon/login');
                console.log(error);
            }
        }

        checkUserAuthentication();
    }, [navigate])

    if(isLoading){
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                Loading....
            </div>
        )
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default SalonAuthWrapper

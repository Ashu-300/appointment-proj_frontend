import React from 'react'
import { createContext } from 'react'
import {initializeSocketIO} from '../utils/socket'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'

const socketContext = createContext(null)

const SocketContext = ({children}) => {
    const [socket, setSocket] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const newSocket = initializeSocketIO(token);
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('socket connected', newSocket.id);
            })

            return () => newSocket.disconnect(); // ✅ only runs if socket was created
        }
    }, [token]);

  return (
    <div>
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    </div>
  )
}

export default SocketContext;
export const useSocket = () => {
    return useContext(SocketContext);
}
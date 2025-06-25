import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeSocketIO } from '../utils/socket';

const socketContext = createContext(null);

const SocketContext = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const customertoken = localStorage.getItem('customerToken');
    const salontoken = localStorage.getItem('salonToken');
    const token = customertoken || salontoken;

    useEffect(() => {
        if (token) {
            const newSocket = initializeSocketIO(token);
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('✅ Socket connected:', newSocket.id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('❌ Socket connection failed:', err.message);
            });

            return () => newSocket.disconnect(); // Cleanup on unmount
        }
    }, [token]);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
};

export default SocketContext;

// ✅ Correct usage of the context object
export const useSocket = () => useContext(socketContext);

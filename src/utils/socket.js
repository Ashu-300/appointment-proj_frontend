import { io } from "socket.io-client";

let socket;

export function initializeSocketIO(token) {
    socket = io(import.meta.env.VITE_BACKEND_URL,{
        withCredentials:true,
        auth: {token}
    })

    return socket;
}

export function getIO(){
    if(!socket){
        console.log('socket was not initialized');
    }
    return socket;
}


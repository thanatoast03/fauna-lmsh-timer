import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const MILFCount = () => {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_WEBSOCKET_URL, { //* CHANGE ON PROD TO WSS AND VERCEL_URL/api/socket.io
            transports: ["websocket"],
            forceNew: true
        });  // Flask-SocketIO server

        // Listen for the 'update_counter' event to update the counter
        socket.on('update_counter', (data) => {
            setCounter(data.counter);
        });

        // Handle socket connection and disconnection
        socket.on('connect', () => {
            setConnected(true);
            console.log("Connected to server");
        });

        socket.on('disconnect', () => {
            setConnected(false);
            console.log("Disconnected from server");
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const incrementCounter = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_BACKEND + '/increment', { //* CHANGE TO PROD_BACKEND ON PROD
            method: "GET"
          });
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.error('Error incrementing counter:', err);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center text-center h-screen'>
            <p>Counter: {counter}</p>
            <button onClick={incrementCounter}>Increment Counter</button>
        </div>
    );
}

export default MILFCount;
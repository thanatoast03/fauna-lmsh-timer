import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const MILFCount = () => {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io('ws://localhost:8080', {
            transports: ["websocket"]
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
          const response = await fetch('http://localhost:8080/increment', {
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
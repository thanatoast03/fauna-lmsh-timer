import React, { useState, useEffect } from 'react';

const MILFCount = () => {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(true);

    // Function to fetch the counter value
    const fetchCounter = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/getCounter`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch counter');
            }
            const data = await response.json();
            setCounter(data.counter);
        } catch (error) {
            console.error('Error fetching counter:', error);
            setConnected(false); // Assume disconnection on error
        } finally {
            // Call fetchCounter again after a delay (long-polling)
            setTimeout(fetchCounter, 10000); // Adjust interval as needed
        }
    };

    // Start long polling when the component mounts
    useEffect(() => {
        fetchCounter();
    }, []);

    // Function to increment the counter
    const incrementCounter = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/increment`, { //* CHANGE TO PROD_BACKEND ON PROD
                method: 'GET',
            });
            const data = await response.json();
            setCounter(data.counter);
        } catch (err) {
            console.error('Error incrementing counter:', err);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center text-center h-screen'>
            <p>Counter: {counter}</p>
            {connected ? (
                <p>Connected to server</p>
            ) : (
                <p className="text-red-500">Disconnected from server</p>
            )}
            <button onClick={incrementCounter}>Increment Counter</button>
        </div>
    );
};

export default MILFCount;

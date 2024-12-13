import React, { useState, useEffect } from 'react';

const MILFCount = () => {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(true);
    const [loading, setLoading] = useState(true);
    // const [hash, setHash] = useState(window.location.hash);

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
        } 
    };

    useEffect(() => {
        // testing commit for vercel
        fetchCounter()
        .finally(() => {
            setLoading(false);
        }) // fetch ONCE to get counter
    
        // Open event source for streaming
        const eventSource = new EventSource(`${process.env.REACT_APP_BACKEND}/stream`);
        
        eventSource.onopen = () => {
            console.log('Connection established');
        };

        // only expected change to database is update
        eventSource.onmessage = (event) => { 
            try {
                console.log(event);
                const data = JSON.parse(event.data);
                setCounter(data.counter);
            } catch (error){
                const data = JSON.parse(event.data);
                console.log('error: ', data.error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        // TODO: set interval to check if event source broken
    
        // Cleanup
        return () => {
            console.log("DB stream closed");
            eventSource.close();
        };  
    }, []);

    // Function to increment the counter
    const incrementCounter = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/increment`, { //* CHANGE TO PROD_BACKEND ON PROD
                method: 'GET',
            });
            // const data = await response.json();
            // setCounter(data.counter);
        } catch (err) {
            console.error('Error incrementing counter:', err);
        }
    };

    if (loading) {
        return (
            <div className='flex flex-col justify-center items-center text-center h-screen'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center text-center h-screen'>
            <p>Counter: {counter}</p>
            {/* {connected ? (
                <p>Connected to server</p>
            ) : (
                <p className="text-red-500">Disconnected from server</p>
            )} */}
            <button className="border" onClick={incrementCounter}>MAN I LOVE FAUNA</button>
        </div>
    );
};

export default MILFCount;

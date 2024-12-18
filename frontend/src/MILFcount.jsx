import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import grayscale from "../public/images/uuu.jpg";
import animated from "../public/images/animated_uuu.gif";

const MILFCount = () => {
    const [counter, setCounter] = useState(0);
    const [localCounter, setLocalCounter] = useState(0);
    const [imageSrc, setImageSrc] = useState(grayscale);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    // const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        // testing commit for vercel
        const newSocket = io(`${process.env.REACT_APP_SOCKET}`, {
            path: "/api/ws",
            transports: ['websocket'],  // Force WebSocket
        });
        setLoading(false); // TODO: ERASE THIS ON PROD
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('Socket connected');
            setLoading(false);
        });
    
        newSocket.on('counter_update', (data) => {
            setCounter(data.value);
        });

        newSocket.on('error', (data) => {
            console.log(data.message);
        })
    
        return () => newSocket.disconnect();
    }, []);

    // Function to increment the counter
    const incrementCounter = async () => {
        try {
            setLocalCounter(localCounter + 1);
            socket.emit('increment');
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
        <div className='flex flex-col h-screen'>
            <div className='flex flex-col justify-center items-center flex-grow'>
                <h1 className='text-4xl sm:text-6xl font-bold'>{counter}</h1>
                <h1 className='text-2xl sm:text-4xl pb-10'>Man I Love Fauna Counter</h1>
                <a className='hover:cursor-pointer' onMouseEnter={() => setImageSrc(animated)} onMouseLeave={() => setImageSrc(grayscale)} onClick={incrementCounter}>
                    <img src={imageSrc} alt='static grayscaled fauna uuu icon' className={`${imageSrc === grayscale ? 'grayscale' : 'grayscale-0'} hidden sm:block max-w-[128px] max-h-[128px]`}/>
                    <img src={animated} alt='animated fauna uuu icon' className='block sm:hidden max-w-[128px] max-h-[128px]'/> {/* for mobile users, we want them to see the animation */}
                </a>
                <a className='hover:underline' href='https://x.com/shiinareii'>
                    <small>Credits to: shiina</small>
                </a>
                
                <h1 className='pt-3'>You've clicked {localCounter} times!</h1>
            </div>
            <a className='hover:underline flex justify-center' href='https://x.com/TheCodeOfJoel/status/1509385096104607749'>
                    <small>Inspired by: Joel Z</small>
            </a>
        </div>
    );
};

export default MILFCount;

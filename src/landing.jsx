import React, { useState, useEffect } from 'react';
import { getUnixTime } from "date-fns";
import spotify from '../public/images/Spotify_Primary_Logo_RGB_Green.png';
import youtube_music from '../public/images/music_icon_1024px.png';
import apple_music from '../public/images/apple_music_logo.png';

const Landing = () => {
    const [seconds, setSeconds] = useState(getUnixTime(new Date()));
    const [lmshs, setLmshs] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(getUnixTime(new Date())); // Update state every second
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []); // Empty dependency array ensures the effect runs once on mount
    
    useEffect(() => {
        setLmshs((seconds / 212).toFixed(2)); // length of LMSH rounded up to 2 decimal places
    }, [seconds])

    return (
        <div className='flex flex-col justify-center h-screen bg-green-300'>
            <div className="flex flex-col justify-evenly items-center text-center flex-grow">
                <div>
                    <h1 className='text-4xl'>Let Me Stay Here's Since Epoch</h1>
                    <h1 className='text-8xl font-bold'>{lmshs}</h1>
                </div>
                <div className='flex flex-col justify-evenly'> 
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/0RMVJTLZOzQ?si=9EQIUzUCNKubLyTO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <div className='flex pt-3 justify-center'>
                        <div className='flex flex-row justify-evenly pt-3 w-2/3'>
                            <div className="flex-1 flex-col justify-center text-center">
                                <a 
                                    className="inline-flex flex-col justify-center items-center" 
                                    href="https://open.spotify.com/track/3z6Mq8NBLhmct2obP1lU4h?autoplay=true"
                                >
                                    <div className="flex justify-center items-center">
                                        <img src={spotify} className="w-10 h-10" />
                                    </div>
                                    <p className="text-xs pt-2">Spotify</p>
                                </a>
                            </div>
                            
                            <div className="flex-1 flex-col justify-center text-center">
                                <a 
                                    className="inline-flex flex-col justify-center items-center" 
                                    href="https://music.youtube.com/watch?v=mJSFX_Sbmlk"
                                >
                                    <div className="flex justify-center items-center">
                                        <img src={youtube_music} className="w-10 h-10" />
                                    </div>
                                    <p className="text-xs pt-2">Youtube Music</p>
                                </a>
                            </div>

                            <div className="flex-1 flex-col justify-center text-center">
                                <a 
                                    className="inline-flex flex-col justify-center items-center" 
                                    href="https://music.apple.com/us/album/let-me-stay-here-single/1624026668"
                                >
                                    <div className="flex justify-center items-center">
                                        <img src={apple_music} className="w-10 h-10" />
                                    </div>
                                    <p className="text-xs pt-2">Apple Music</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
                
            </div>
            <footer className="flex flex-col text-center p-4 text-sm">
                <a className='text-green-800' href="https://www.youtube.com/@ceresfauna">Ceres Fauna Ch. hololive-EN</a>
                <small>Not affiliated with Fauna or hololive</small>
            </footer>
        </div>
    )
}

export default Landing;
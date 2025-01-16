import { React, useState, useRef, useEffect } from 'react';

const MissingFaunaModal = ({setGameStart, found, setFound, foundCount}) => {
    
    return (
        
        <div className='flex bg-white rounded-md p-5 flex-col justify-around'>
            <h1 className='text-xl font-bold mb-5'>Find the Invisible Fauna</h1>
            {/* Change this text to let them know how many times they have found Fauna. Else, give instructions.*/}
            { found ? (
                <div>
                    <p className='mb-5'>Congratulations! You found Fauna! You have found her {foundCount} times.</p>
                </div>
            ) : (
                <div>
                    <p className='mb-5'>Drag your mouse (or finger) around to find the missing Fauna. The rate of beeps will increase the closer you are.</p>
                    <p className='italic mb-5'>Make sure you turn your audio on before playing.</p>
                </div>
            )}
            
            <div> {/* This is just to make sure the div takes up the horizontal length while ensuring the button only takes as much space as it needs*/}
                <button 
                    className='bg-[#FFACAA] text-[#FDF2C5] p-5 text-md font-bold justify-self-start flex rounded'
                    onClick={() => {setGameStart(true); setFound(false); }}
                >
                        { found ? "Play Again?" : "Start Game!" }
                </button>
            </div>
        </div>
    );
};

export default MissingFaunaModal;
import { React } from 'react';
import fauna_beep from "url:../../../public/videos/fauna_beep.mp4";

const MissingFaunaModal = ({setGameStart, found, setFound, foundCount}) => {
    
    return (
        
        <div className='flex bg-white rounded-md p-5 flex-col justify-around'>
            <h1 className='text-xl font-bold mb-5'>Find the Invisible Fauna</h1>
            {/* Change this text to let them know how many times they have found Fauna. Else, give instructions.*/}
            { found ? (
                <div className='mb-5'>
                    { foundCount > 1 ? 
                        ( <p className='mb-5'>Congratulations! You found Fauna! You have found her {foundCount} times.</p> ) 
                        : 
                        ( <p className='mb-5'>Congratulations! You found Fauna! You have found her {foundCount} time.</p> )
                    }
                    <video className='w-[240px] h-[180px] md:w-[320px] md:h-[240px]' src={fauna_beep} controls>Your browser does not support the video tag.</video>
                    <a href="https://x.com/0toufusan/status/1872296318615347282" className='underline'><small>Animation credit to @Otofu-san</small></a>
                </div>
            ) : (
                <div>
                    <p className='mb-5'>Drag your mouse (or finger) around to find the missing Fauna. The rate of beeps will increase the closer you are.</p>
                    <p className='italic mb-5'>Make sure you turn your audio on before playing.</p>
                </div>
            )}
            
            <div> {/* This is just to make sure the div takes up the horizontal length while ensuring the button only takes as much space as it needs*/}
                <button 
                    className='bg-[#FFACAA] text-[#FDF2C5] p-3 text-md font-bold justify-self-start flex rounded'
                    onClick={() => {setGameStart(true); setFound(false); }}
                >
                        { found ? "Play Again?" : "Start Game!" }
                </button>
            </div>
        </div>
    );
};

export default MissingFaunaModal;
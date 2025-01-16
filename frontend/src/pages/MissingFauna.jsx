import React, { useState, useEffect, useMemo, useRef } from 'react';
import useSound from "use-sound";
import { useMouse } from "react-use";
import MissingFaunaModal from './modules/MissingFaunaModal';
import slowestFaunaSound from 'url:../sounds/slowest_fauna_beep.mp3';
import slowFaunaSound from 'url:../sounds/slow_fauna_beep.mp3';
import fastFaunaSound from 'url:../sounds/fast_fauna_beep.mp3';
import fastestFaunaSound from 'url:../sounds/fastest_fauna_beep.mp3';
import won from 'url:../sounds/I_WONNN.mp3';
import { useWindowSize, useInterval } from './modules/MissingFaunaHooks';
import uuu from '../../public/images/uuu.webp';

const MissingFauna = () => {
    const [gameStart, setGameStart] = useState(false);
    const [found, setFound] = useState(false);
    const [foundCount, setFoundCount] = useState(0);
    const [distanceLevel, setDistanceLevel] = useState(0);
    const size = useWindowSize();
    const emoteSize = 64;
    
    const [playSlowest] = useSound(slowestFaunaSound);
    const [playSlow] = useSound(slowFaunaSound);
    const [playFast] = useSound(fastFaunaSound);
    const [playFastest] = useSound(fastestFaunaSound);
    const [playWon] = useSound(won);

    const containerRef = useRef(null);
    const { docX, docY } = useMouse(containerRef);

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const faunaX = useMemo(() => {
        return getRandomNumber(Math.max(0, size.width - emoteSize));
    }, [size.width, foundCount]);

    const faunaY = useMemo(() => {
        return getRandomNumber(Math.max(0, size.height - emoteSize - 192)); // 12rem = 192px
    }, [size.height, foundCount]);

    const playSound = () => {
        if (distanceLevel === 3) playFastest();
        else if (distanceLevel === 2) playFast();
        else if (distanceLevel === 1) playSlow();
        else playSlowest();
    }

    useInterval(() => {
        if (!found && gameStart) {
            //console.log("Distance Level:", distanceLevel, "Distance:", distance);
            playSound();
        }
    }, 850);

    // Calculate distance between cursor and Fauna
    const distance = useMemo(() => {
        if (!gameStart || found) return Infinity;
        
        const distanceX = Math.abs(docX - (faunaX + emoteSize / 2));
        const distanceY = Math.abs(docY - (faunaY + emoteSize / 2));
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }, [docX, docY, faunaX, faunaY, gameStart, found]);

    // Update distance level based on cursor proximity
    useEffect(() => {
        if (!gameStart || found) return;

        if (distance < 100) {
            setDistanceLevel(3);
        } else if (distance < 200) {
            setDistanceLevel(2);
        } else if (distance < 250) {
            setDistanceLevel(1);
        } else {
            setDistanceLevel(0);
        }
    }, [distance, gameStart, found]);

    const handleFaunaFound = () => {
        if (!found && gameStart) {
            setGameStart(false);
            setFound(true);
            setFoundCount(prev => prev + 1);
            setTimeout(() => {
                playWon(); // VICTORY FANFARE!! LMAO
            }, 1000);
        }
    };

    return (
        <div 
            ref={containerRef}
            className='flex flex-grow items-center justify-center h-[calc(100vh-12rem)] relative'
        >
            {!gameStart && 
                <div className='mx-5 z-10'>
                    <MissingFaunaModal 
                        setGameStart={setGameStart}
                        found={found}
                        setFound={setFound}
                        foundCount={foundCount}
                    />
                </div>
            }

            <div 
                onClick={handleFaunaFound}
                className='hover:cursor-pointer absolute'
                style={{
                    top: found ? `calc(50% - ${emoteSize}px)` : `${faunaY}px`,
                    left: found ? `calc(50% - ${emoteSize}px)` : `${faunaX}px`,
                    opacity: 0,
                    width: emoteSize,
                    height: emoteSize
                }}
            >
                <img 
                    src={uuu} 
                    alt="Fauna"
                    className='w-full h-full'
                />
            </div>
        </div>
    );
};

export default MissingFauna;
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from 'react';
import './index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && 
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[#5f7b8d] text-white flex flex-col relative mb-4">
            {/* Navbar */}
            <nav className="flex flex-row p-4 justify-between items-center border-b-2 border-yellow-200">
                {/* Left Section - Home */}
                <Link
                    to="/"
                    className="text-lg font-bold text-[#fdfbc0]"
                >
                    Home
                </Link>

                {/* Right Section - Buttons; ONLY SHOWS UNTIL MOBILE VIEW */}
                <div className="sm:flex space-x-4 hidden">
                    <Link
                        to="/submissions"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block transform hover:scale-105 hover:shadow-lg"
                    >
                        Faunart
                    </Link>
                    <Link
                        to="/LMSH"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 transform hover:scale-105 hover:shadow-lg"
                    >
                        LMSH Epoch Timer
                    </Link>
                    <Link
                        to="/MILF"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 transform hover:scale-105 hover:shadow-lg"
                    >
                        Man I Love Fauna Counter
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button
                    ref={buttonRef}
                    className="block sm:hidden w-6 h-6 cursor-pointer relative"
                    onClick={handleClick}
                    aria-label="Toggle menu"
                >
                    <span 
                        className={`block absolute h-0.5 w-6 bg-[#fdfbc0] transform transition duration-300 ease-in-out ${
                            isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-2'
                        }`}
                    />
                    <span 
                        className={`block absolute h-0.5 w-6 bg-[#fdfbc0] transform transition duration-300 ease-in-out ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span 
                        className={`block absolute h-0.5 w-6 bg-[#fdfbc0] transform transition duration-300 ease-in-out ${
                            isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
                        }`}
                    />
                </button>
            </nav>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    ref={dropdownRef}
                    className="absolute right-0 top-full bg-white text-black w-[200px] shadow-lg rounded-lg sm:hidden"
                >
                    <Link
                        to="/submissions"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(false)}}
                    >
                        Faunart
                    </Link>
                    <Link
                        to="/LMSH"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(false)}}
                    >
                        LMSH Epoch Timer
                    </Link>
                    <Link
                        to="/MILF"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg"
                        onClick={() => {setIsOpen(false)}}
                    >
                        Man I Love Fauna Counter
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
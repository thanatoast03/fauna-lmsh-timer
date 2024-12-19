import { Link } from 'react-router-dom';
import { React, useState } from 'react';
import './index.css';
import hamburger_menu from '../public/images/hamburger-menu-icon.webp';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block md:hidden transform hover:scale-105 hover:shadow-lg"
                    >
                        LMSH Timer
                    </Link>
                    <Link
                        to="/LMSH"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 hidden md:block transform hover:scale-105 hover:shadow-lg"
                    >
                        LMSH Epoch Timer
                    </Link>
                    <Link
                        to="/MILF"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block md:hidden transform hover:scale-105 hover:shadow-lg"
                    >
                        MILF Count
                    </Link>
                    <Link
                        to="/MILF"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 hidden md:block transform hover:scale-105 hover:shadow-lg"
                    >
                        Man I Love Fauna Counter
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <img
                    src={hamburger_menu}
                    className="w-[24px] h-[24px] block sm:hidden cursor-pointer"
                    onClick={handleClick}
                    alt="menu"
                />
            </nav>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full bg-white text-black w-[200px] shadow-lg rounded-lg sm:hidden">
                    <Link
                        to="/submissions"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(!isOpen)}}
                    >
                        Faunart
                    </Link>
                    <Link
                        to="/LMSH"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(!isOpen)}}
                    >
                        LMSH Epoch Timer
                    </Link>
                    <Link
                        to="/MILF"
                        className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg"
                        onClick={() => {setIsOpen(!isOpen)}}
                    >
                        Man I Love Fauna Counter
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;

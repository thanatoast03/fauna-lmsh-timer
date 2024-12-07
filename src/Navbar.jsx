import { Link } from 'react-router-dom';
import React from 'react';
import './index.css'; 

const Navbar = () => {
    return (
        <nav className="bg-[#5f7b8d] text-white p-4 flex justify-between items-center">
            {/* Left Section - Home */}
            <Link to="/" className="text-lg font-bold hover:underline text-[#fdfbc0]">
                Home
            </Link>

            {/* Right Section - Buttons */}
            <div className="flex space-x-4">
                <Link
                to="/LMSH"
                className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block sm:hidden transform hover:scale-105 hover:shadow-lg"
                >
                    LMSH Timer
                </Link>
                <Link
                to="/LMSH"
                className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 hidden sm:block transform hover:scale-105 hover:shadow-lg"
                >
                    LMSH Epoch Timer
                </Link>
                <Link
                to="/MILFCount"
                className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block sm:hidden transform hover:scale-105 hover:shadow-lg"
                >
                    MILF Count
                </Link>
                <Link
                to="/MILFCount"
                className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 hidden sm:block transform hover:scale-105 hover:shadow-lg"
                >
                    Man I Love Fauna Counter
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
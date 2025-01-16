import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from 'react';
import './index.css';
import SuggestionModal from './pages/modules/SuggestionModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // hold modal information so it isn't deleted unless on reload
    const [username, setUsername] = useState('');
    const [submitterLink, setSubmitterLink] = useState('');
    const [suggestion, setSuggestion] = useState('');

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

    const handleSuggestionClick = () => {
        setIsSuggestionOpen(!isSuggestionOpen);
    }

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

                {/* ONLY SHOW WHEN LG+ */}
                <div className="lg:flex space-x-4 hidden">
                    <Link
                        to="/findfauna"
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 block transform hover:scale-105 hover:shadow-lg"
                    >
                        Find Fauna
                    </Link>
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
                    <button
                        className="bg-[#414857] text-[#fdfbc0] px-4 py-2 rounded hover:bg-gray-800 transform hover:scale-105 hover:shadow-lg"
                        onClick={() => { setIsSuggestionOpen(true) }}
                    >
                        Suggestions?
                    </button>
                </div>

                {/* Hamburger Button */}
                <button
                    ref={buttonRef}
                    className="block lg:hidden w-6 h-6 cursor-pointer relative"
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
                    className="absolute right-0 top-full bg-white text-black w-[200px] shadow-lg rounded-lg "
                >
                    <Link 
                        to="/findfauna"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(false)}}
                    >
                        Find Fauna
                    </Link>
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
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => {setIsOpen(false)}}
                    >
                        Man I Love Fauna Counter
                    </Link>
                    <button
                        className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg w-full text-left"
                        onClick={() => {setIsOpen(false); setIsSuggestionOpen(true); }}
                    >
                        Suggestions?
                    </button>
                </div>
            )}

            { isSuggestionOpen && <SuggestionModal
                isOpen={isSuggestionOpen}
                onClose={() => setIsSuggestionOpen(false)}
                username={username}
                setUsername={setUsername}
                submitterLink={submitterLink}
                setSubmitterLink={setSubmitterLink}
                suggestion={suggestion}
                setSuggestion={setSuggestion}
            /> }
        </div>
    );
};

export default Navbar;
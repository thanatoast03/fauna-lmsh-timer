import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const navLMSH = () => { navigate('/LMSH'); }
    const navMILF = () => { navigate('/MILF'); }

    return (
        <div className='flex flex-col justify-center text-center items-center h-screen'>
            <h1 className='max-w-sm sm:text-2xl sm:max-w-max font-bold'>Hello! This is a site dedicated to random projects for Ceres Fauna!</h1>
            <div className='flex flex-row justify-evenly text-center items-stretch h-1/5 w-2/3 border-2 border-[#557891] mt-8 rounded-md'>
                <button className='flex-grow max-w-sm rounded-md m-4 p-4 hidden sm:block transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navLMSH}>
                    Let Me Stay Here Epoch Timer
                </button>
                <button className='flex-grow max-w-sm rounded-md m-4 p-4 block sm:hidden transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navLMSH}>
                    LMSH Timer
                </button>
                <button className='flex-grow max-w-sm rounded-md m-4 p-4 hidden sm:block transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navMILF}>
                    Man I Love Fauna Counter
                </button>
                <button className='flex-grow max-w-sm rounded-md m-4 p-4 block sm:hidden transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navMILF}>
                    MILF Counter
                </button>
            </div>
        </div>
    );
}

export default Landing;
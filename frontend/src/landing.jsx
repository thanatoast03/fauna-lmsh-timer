import React from "react";
import { useNavigate } from "react-router-dom";
import fauna from "../public/images/konfauna.png";

const Landing = () => {
    const navigate = useNavigate();
    const navLMSH = () => { navigate('/LMSH'); }
    const navMILF = () => { navigate('/MILF'); }

    return (
        <div className='flex flex-col justify-center text-center items-center h-screen'>
            <h1 className='max-w-sm sm:text-2xl sm:max-w-max font-bold'>Hello! This is a site dedicated to random projects for Ceres Fauna!</h1>
            <div className='flex flex-row justify-evenly text-center items-stretch h-1/5 w-3/4 border-2 border-[#557891] mt-8 rounded-md md:w-1/2'>
                <button className='flex justify-center items-center flex-grow max-w-sm rounded-md m-4 p-4 hidden lg:block transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navLMSH}>
                    Let Me Stay Here Epoch Timer
                </button>
                <button className='flex justify-center items-center flex-grow max-w-sm rounded-md m-4 p-4 block lg:hidden transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navLMSH}>
                    LMSH Timer
                </button>
                <button className='flex justify-center items-center flex-grow max-w-sm rounded-md m-4 p-4 hidden lg:block transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navMILF}>
                    Man I Love Fauna Counter
                </button>
                <button className='flex justify-center items-center flex-grow max-w-sm rounded-md m-4 p-4 block lg:hidden transform hover:scale-105 hover:shadow-lg hover:bg-[#5f7b8d] bg-[#80b5a5]' onClick={navMILF}>
                    MILF Counter
                </button>
            </div>
            <div className="flex flex-col justify-center mt-4">
                <img className='mx-auto w-2/3 md:w-5/12 rounded-md aspect-w-16 aspect-h-9' src={fauna} />
                <a className='hover:underline' href="https://x.com/SummerFloofball">
                    <small>Credits to: Summer Floofy</small>
                </a>
            </div>
        </div>
    );
}

export default Landing;
import React from "react";
import fauna from "../../public/images/konfauna.png";

const Landing = () => {
    return (
        <div className='flex flex-col justify-center text-center items-center h-[calc(100vh-12rem)]'>
            <h1 className='max-w-sm sm:text-2xl md:max-w-max font-bold'>Hello! This is a site dedicated to random projects for Ceres Fauna!</h1>
            <div className="flex flex-col justify-center mt-4">
                <img className='mx-auto w-2/3 md:w-5/12 rounded-md aspect-w-16 aspect-h-9' src={fauna} alt="fauna smiling with saplings!"/>
                <a className='hover:underline' href="https://x.com/SummerFloofball">
                    <small>Credits to: Summer Floofy</small>
                </a>
            </div>
        </div>
    );
}

export default Landing;
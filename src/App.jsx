import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';  // Import the Tailwind CSS file
import LMSHTimer from './LMSHTimer.jsx';
import Navbar from './Navbar.jsx';
import Landing from './landing.jsx';
import MILFCount from './MILFcount.jsx';

function App() {
    return(
        <div className='h-screen flex flex-col bg-green-300'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/LMSH" element={<LMSHTimer />} />
                    <Route path="/MILF" element={<MILFCount /> }/>
                </Routes>
            </BrowserRouter>
            <footer className="flex flex-col text-center p-4 text-sm">
                <a className='text-green-800' href="https://www.youtube.com/@ceresfauna">Ceres Fauna Ch. hololive-EN</a>
                <small>Not affiliated with Fauna or Hololive</small>
            </footer>
        </div>
    )
}

export default App;
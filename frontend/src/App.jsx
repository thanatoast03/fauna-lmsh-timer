import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';  // Import the Tailwind CSS file
import LMSHTimer from './pages/LMSHTimer.jsx';
import Navbar from './Navbar.jsx';
import Landing from './pages/landing.jsx';
import MILFCount from './pages/MILFcount.jsx';
import UserSubmissions from './pages/UserSubmissions.jsx';

function App() {
    return(
        <div className='h-screen flex flex-col bg-green-300'>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />}/>
                    <Route path="/LMSH" element={<LMSHTimer />}/>
                    <Route path="/MILF" element={<MILFCount /> }/>
                    <Route path="/submissions" element={<UserSubmissions />}/>
                </Routes>
            </HashRouter>
            <footer className="flex flex-col text-center items-center p-4 text-sm">
                <a className="text-green-800 hover:underline" href="https://www.youtube.com/@ceresfauna">
                    Ceres Fauna Ch. hololive-EN
                </a>
                <small>Not affiliated with Fauna or Hololive</small>
                <a className="hover:underline" href="https://x.com/braindoko">
                    <small>Created by @braindoko</small>
                </a>
            </footer>
        </div>
    )
}

export default App;
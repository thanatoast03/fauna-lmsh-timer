import { React, useState, useRef, useEffect } from 'react';

const UserSubmissionModal = ({isOpen, onClose, username, setUsername, submitterLink, setSubmitterLink, imageLink, setImageLink}) => {
    const modalRef = useRef();
    const [status, setStatus] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = async () => {
        try {
            if (!username) {
                setStatus("Please enter your username.");
            } else if (!submitterLink) {
                setStatus("Please link your account.");
            } else if(!imageLink) {
                setStatus("Please send an image link.");
            } else { // send request only if fields are filled out
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/user_submission`, {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "imageLink": imageLink,
                        "submitter": username,
                        "submitterLink": submitterLink
                    })
                });
                const result = await response.json();
                if (result.status === "success"){
                    setStatus("Submission successfully sent!");
                } else {
                    setStatus("Submission has failed; please try again later.")
                }
            }
        } catch (error) {
            console.log(error);
            setStatus("Failed to send to server.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                ref={modalRef}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
            >
                <div className='flex flex-row justify-center text-center'>
                    
                    <h2 className="text-xl font-bold mb-4">Submit Faunart</h2>
                    <button onClick={onClose} className=" text-gray-500 hover:text-gray-700 ml-auto inline-flex">
                        ×
                    </button>
                </div>
                
                <div className='rounded'>
                    <div className='flex flex-col text-left'>
                        <div className='flex flex-col'>
                            <h2>Your Username:</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                maxlength="15"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <h2>Link to your account:</h2>
                            <input
                                type="text"
                                placeholder="Link to your account"
                                maxlength="30"
                                value={submitterLink}
                                onChange={(e) => setSubmitterLink(e.target.value)}
                                className="border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <h2>Image Link:</h2>
                            <input
                                type="text"
                                placeholder="Image Link"
                                maxlength="100"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <p>{status}</p>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2 self-end' onClick={handleSend}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default UserSubmissionModal;
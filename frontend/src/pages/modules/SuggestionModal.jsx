import { React, useState, useRef, useEffect } from 'react';

const SuggestionModal = ({isOpen, onClose, username, setUsername, submitterLink, setSubmitterLink, suggestion, setSuggestion}) => {
    const modalRef = useRef();
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);

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
            if(!suggestion) {
                setError(true);
                setStatus("Please send a suggestion.");
            } else { // send request only if required fields are filled out
                setStatus("Loading...");
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/user_suggestions`, {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "suggestion": suggestion,
                        "submitter": username,
                        "submitterLink": submitterLink
                    })
                });
                const result = await response.json();
                if (result.status === "success"){
                    setError(false);
                    setStatus("Submission successfully sent!");
                } else {
                    setError(true);
                    setStatus(result.message);
                }
            }
        } catch (error) {
            console.log(error); 
            setError(true);
            setStatus("Failed to send to server.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                ref={modalRef}
                className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative text-black"
            >
                <div className='flex flex-row justify-center text-center'>
                    
                    <h2 className="text-xl font-bold mb-4">Submit Suggestions</h2>
                    <button onClick={onClose} className=" text-gray-500 hover:text-gray-700 ml-auto inline-flex">
                        ×
                    </button>
                </div>
                
                <div className='rounded'>
                    <div className='flex flex-col text-left' onKeyDown={handleKeyPress}>
                        <div className='flex flex-col'>
                            <h2>Your Username (optional)</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                maxLength="15"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <h2>Link to your account (optional)</h2>
                            <input
                                type="text"
                                placeholder="Link to your account"
                                maxLength="30"
                                value={submitterLink}
                                onChange={(e) => setSubmitterLink(e.target.value)}
                                className="border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <h2>Suggestion (required)</h2>
                            <textarea
                                placeholder="Suggestion"
                                maxLength="4000"
                                value={suggestion}
                                onChange={(e) => setSuggestion(e.target.value)}
                                className="border border-gray-400 p-2 rounded min-h-[200px] overflow-y-auto resize-none w-full"
                            />
                        </div>
                        <p className={`${error ? "text-red-600" : "text-green-500"}`}>{status}</p>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2 self-end' onClick={handleSend}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default SuggestionModal;
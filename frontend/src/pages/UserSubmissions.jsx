import { React, useState } from 'react';
import testImage from '../../public/images/konfauna.png';
import send from '../../public/images/send.webp';
import UserSubmissionModule from './UserSubmissionModule';

const UserSubmissions = () => {
    const acceptedImages = [
        {
            "creator": "Sappy",
            "submitter": "braindoko",
            "creatorLink": "https://x.com/Sappysque",
            "submitterLink": "https://x.com/braindoko",
            "image_path": testImage
        }, 
    ];

    const [username, setUsername] = useState('');
    const [submitterLink, setSubmitterLink] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [status, setStatus] = useState('');

    const handleSend = async () => {
        try {
            const response = fetch(`${process.env.REACT_APP_PROD}/user_submission`, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "imageLink": imageLink,
                    "submitter": submitter,
                    "submitterLink": submitterLink
                })
            });
            const result = await response.json();
            if (result.status === "success"){
                setStatus("Submission successfully sent.");
            } else {
                setStatus("Submission has failed; please try again later.")
            }
        } catch (error) {
            setStatus("Failed to send to server.");
        }
    };

    return (
        <div className="flex flex-col text-center items-center h-full">
            <h1 className="text-4xl pb-5">Your Faunart!</h1>
            <div className="overflow-y-auto flex flex-wrap flex-grow justify-evenly gap-5 p-4">
                {/* Container holding fanart */}
                { acceptedImages.map((image) => (
                    <UserSubmissionModule creator={image.creator} submitter={image.submitter} creatorLink={image.creatorLink} submitterLink={image.submitterLink} image={testImage}/>
                ))}
            </div>
            <div className='bg-white w-3/4 rounded'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-grow justify-center items-center'>
                        <small>Your Username:</small>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-400 p-2 rounded m-2 w-1/8"
                        />
                    </div>
                    <div className='flex flex-grow justify-center items-center'>
                        <small>Link to your account:</small>
                        <input
                            type="text"
                            placeholder="Link to your account"
                            value={submitterLink}
                            onChange={(e) => setSubmitterLink(e.target.value)}
                            className="border border-gray-400 p-2 rounded m-2 w-1/8"
                        />
                    </div>
                    <div className='flex flex-grow justify-center items-center'>
                        <small>Image Link:</small>
                        <input
                            type="text"
                            placeholder="Image Link"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            className="border border-gray-400 p-2 rounded m-2 w-1/8"
                        />
                    </div>
                    <a className='flex items-center hover:cursor-pointer' onClick={handleSend}>
                        <img className='w-[32px] h-[32px]' src={send}/>
                    </a>
                </div>
                <p>{status}</p>
            </div>
        </div>
    );
};

export default UserSubmissions;

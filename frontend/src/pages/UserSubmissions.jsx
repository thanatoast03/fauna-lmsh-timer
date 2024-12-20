import { React, useState } from 'react';
import ogImage from '../../public/images/konfauna.png';
import UserSubmissionImage from './modules/UserSubmissionImage';
import UserSubmissionModal from './modules/UserSubmissionModal';

const UserSubmissions = () => {
    const acceptedImages = [
        {
            "creator": "Summer Floofy",
            "submitter": "braindoko",
            "creatorLink": "https://x.com/SummerFloofball",
            "submitterLink": "https://x.com/braindoko",
            "image_path": ogImage
        }, 
    ];

    // holds state so not deleted when user exits modal
    const [username, setUsername] = useState('');
    const [submitterLink, setSubmitterLink] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col text-center items-center flex-grow h-[calc(100vh-12rem)]"> {/* Parent container */}
            <h1 className="text-4xl pb-5">Your Faunart!</h1>
            <div className="flex-1 w-full overflow-y-auto flex flex-wrap p-4 rounded"> {/* Modified this div */}
                {/* Container holding fanart */}
                {acceptedImages.map((image) => (
                    <UserSubmissionImage creator={image.creator} submitter={image.submitter} creatorLink={image.creatorLink} submitterLink={image.submitterLink} image={image.image_path}/>
                ))}
            </div>
            <button className='bg-white rounded py-2 my-2 px-3 flex' onClick={() => { setIsOpen(!isOpen) }}>
                Submit Faunart
            </button>
            {/* Open modal */}
            { isOpen && <UserSubmissionModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                username={username}
                setUsername={setUsername}
                submitterLink={submitterLink}
                setSubmitterLink={setSubmitterLink}
                imageLink={imageLink}
                setImageLink={setImageLink}
            />}
        </div>
    );
};

export default UserSubmissions;

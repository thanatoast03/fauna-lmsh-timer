import React from 'react';

const UserSubmissionModule = ({creator, submitter, creatorLink, submitterLink, image}) => {
    return (
        <div className="flex flex-col items-center w-1/5 h-min flex-shrink-0 p-5 bg-white rounded">
          <img className="w-full h-auto mb-2 border-2 rounded-sm" src={image} alt="Faunart" />
          <div className='mt-3 inline-block'>
            <a className='hover:underline' href={creatorLink}>
                <small>Drawn by: {creator}</small>
            </a>
            <br></br>
            <a className='hover:underline' href={submitterLink}>
                <small>Submitted by: {submitter}</small>
            </a>
          </div>
        </div>
    );
};

export default UserSubmissionModule;
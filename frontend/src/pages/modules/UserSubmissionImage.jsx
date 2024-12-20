import React from 'react';

const UserSubmissionImage = ({creator, submitter, creatorLink, submitterLink, image}) => {
    return (
        <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 h-min border flex-shrink-0 p-5 bg-white rounded mt-2">
          <img className="w-full h-auto mb-2 border-2 rounded-sm" src={image} alt="Faunart" />
          <div className='inline-block'>
            <a className='hover:underline flex flex-col' href={creatorLink}>
                <small>Credits to:</small> 
                <small>{creator}</small> {/* shouldn't have to worry too much, max twitter username length = 15 */}
            </a>
            <a className='hover:underline flex flex-col mt-2' href={submitterLink}>
                <small>Submitted by:</small>
                <small>{submitter}</small>
            </a>
          </div>
        </div>
    );
};

export default UserSubmissionImage;
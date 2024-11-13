import React from 'react';

const Popup = ({ content, visible }) => {
    return (
        <div className={`absolute top-full mt-2 bg-white border border-gray-200 shadow-md rounded p-2 ${visible ? 'block' : 'hidden'}`}>
            {content}
        </div>
    );
};

export default Popup;

// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;

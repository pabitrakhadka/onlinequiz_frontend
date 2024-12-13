import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable Toast component
const Toast = ({ type, message, position = 'top-right', autoClose = 2000 }) => {

    // Function to trigger toast messages of different types
    const notify = () => {
        switch (type) {
            case 'success':
                toast.success(message, {
                    position: position,
                    autoClose: autoClose,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                break;
            case 'error':
                toast.error(message, {
                    position: position,
                    autoClose: autoClose,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                break;
            case 'info':
                toast.info(message, {
                    position: position,
                    autoClose: autoClose,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                break;
            case 'warning':
                toast.warn(message, {
                    position: position,
                    autoClose: autoClose,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                break;
            default:
                toast(message, {
                    position: position,
                    autoClose: autoClose,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                break;
        }
    };

    // Trigger toast when component mounts
    React.useEffect(() => {
        notify();
    }, [type, message, position, autoClose]);

    return (
        <div>
            {/* ToastContainer is required to display the toasts */}
            <ToastContainer
                position={position}
                autoClose={autoClose}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={true}
                theme="colored"
            />
        </div>
    );
};

export default Toast;

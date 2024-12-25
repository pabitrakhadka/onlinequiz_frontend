import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const StatusMessage = ({ statusCode, open, onClose }) => {
    let message = "";
    let severity = "";

    switch (statusCode) {
        case 200:
            message = "Operation successful!";
            severity = "success";
            break;
        case 400:
            message = "Bad request. Please check your input.";
            severity = "warning";
            break;
        case 401:
            message = "Unauthorized. Please login.";
            severity = "error";
            break;
        case 403:
            message = "Forbidden. You do not have access.";
            severity = "error";
            break;
        case 404:
            message = "Resource not found.";
            severity = "info";
            break;
        case 500:
            message = "Internal server error. Please try again later.";
            severity = "error";
            break;
        default:
            message = "Unknown status code.";
            severity = "info";
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position to the right side
        >
            <Alert onClose={onClose} severity={severity} variant="filled">
                <AlertTitle>Status Code: {statusCode}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default StatusMessage;

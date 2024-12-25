import React, { useState } from 'react';
import { Button } from '@mui/material';
import StatusMessage from '@/Components/StatusMessage';

const App = () => {
    const [statusCode, setStatusCode] = useState(null);
    const [open, setOpen] = useState(false);

    const handleButtonClick = (code) => {
        setStatusCode(code);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button variant="contained" color="primary" onClick={() => handleButtonClick(200)}>Show Success</Button>
            <Button variant="contained" color="secondary" onClick={() => handleButtonClick(400)}>Show Warning</Button>
            <Button variant="contained" color="error" onClick={() => handleButtonClick(401)}>Show Unauthorized</Button>
            <Button variant="contained" color="error" onClick={() => handleButtonClick(403)}>Show Forbidden</Button>
            <Button variant="contained" color="info" onClick={() => handleButtonClick(404)}>Show Info</Button>
            <Button variant="contained" color="error" onClick={() => handleButtonClick(500)}>Show Error</Button>
            <StatusMessage statusCode={statusCode} open={open} onClose={handleClose} />
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import Timer from '@/Components/User/Timer';

const App = () => {
    const [stopTime, setStopTime] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const handleTimeChange = (time) => {


        const actualtime = (1 * 60) - time
        console.log("this is functions", actualtime);
        setRemainingTime(actualtime);
    };

    const handleStopTime = () => {
        console.log(remainingTime);
        setStopTime(true);
    };

    return (
        <div>
            <Timer
                initialMinutes={1}
                onTimeChange={handleTimeChange}
                stopTime={stopTime}
            />
            <div>
                <p>Is Time Over: {remainingTime <= 0 ? 'Yes' : 'No'}</p>
                <p>Remaining Time in Seconds: {remainingTime}</p>
                <button onClick={handleStopTime}>Stop Time</button>
            </div>
        </div>
    );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialMinutes, onTimeChange, stopTime }) => {
    const [remainingTime, setRemainingTime] = useState(initialMinutes * 60);
    const [isTimeOver, setIsTimeOver] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (remainingTime <= 0) {
            setIsTimeOver(true);
            clearInterval(timerRef.current);

        }
    }, [remainingTime]);

    useEffect(() => {
        if (stopTime) {
            clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {

            setRemainingTime(prevTime => {

                const newTime = prevTime - 1;

                onTimeChange(newTime);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [stopTime]);



    return (
        <div>
            <p>Is Time Over: {isTimeOver ? 'Yes' : 'No'}</p>
            <p>Remaining Time in Seconds: {remainingTime}</p>

        </div>
    );
};

export default Timer;

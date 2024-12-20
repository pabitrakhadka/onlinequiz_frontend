import { useEffect, useState } from 'react';

const TimerQuestion = ({ duration = 60, onTimeEnd, onTimeChange }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                const newTime = prev - 1;

                // Trigger onTimeChange with elapsed time
                if (onTimeChange) {
                    onTimeChange(duration - newTime);
                }

                // Stop timer at 0 and call onTimeEnd
                if (newTime <= 0) {
                    clearInterval(interval);
                    if (onTimeEnd) onTimeEnd();
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [duration, onTimeEnd, onTimeChange]);

    return (
        <div className="text-center text-lg font-semibold">
            Time Remaining: {timeRemaining}s
        </div>
    );
};

export default TimerQuestion;

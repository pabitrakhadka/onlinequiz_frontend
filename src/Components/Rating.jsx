import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const Rating = ({ initialRating = 0, onChange, size = 20 }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (index) => {
        setRating(index + 1);
        if (onChange) {
            onChange(index + 1);
        }
    };

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <FaStar className='mb-2' size={size}
                    key={index}
                    onClick={() => handleClick(index)}
                    color={index < rating ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    );
}

export default Rating;

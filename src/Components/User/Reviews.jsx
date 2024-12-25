import React from "react";

import ReviewsProfileCard from "./ReviewsProfileCard";
import Rating from "../Rating";

const Reviews = ({ user = "Ram Oli", timestamp = "Just Now", rating = -1 }) => {



    return (
        <div className="p-4 border rounded-lg shadow-md bg-white max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <ReviewsProfileCard user={user} timestamp={timestamp} />
            <Rating initialRating={5} />
            <p className="text-sm sm:text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid eveniet ducimus, quas voluptatibus saepe exercitationem voluptates natus veritatis soluta!
            </p>
        </div>
    );
};

export default Reviews;

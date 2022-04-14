import React from "react";
import ReactStars from "react-rating-stars-component";

export const Star = ({ size, rating }) => {
  return (
    <div className="book-rating">
      <ReactStars
        count={5}
        edit={false}
        value={rating ? parseInt(rating) : 0}
        size={size}
        isHalf={true}
        activeColor="#ffd700"
      />
    </div>
  );
};

'use client';
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";

const WishListIndicator: React.FC = () => {
  // Step 1: Initialize state for the favorite count
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Step 2: Function to handle click and update favorite count
  const handleFavoriteClick = () => {
    setFavoriteCount(favoriteCount + 1); // Increases the count on click
  };

  return (
    <div className="relative">
      {/* Heart icon for the wishlist */}
      <FaRegHeart
        size={20}
        onClick={handleFavoriteClick} // Handle the click event
        className="hidden md:block cursor-pointer"
      />
      {/* Display the count if greater than 0 */}
      {favoriteCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default WishListIndicator;

"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CartItem interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  sizes: string[]; // Available sizes
  selectedSize: string; // ✅ Single selected size
  category: string;
  materialMade: string;
  slug: string;
  images: string[];
  quantity: number;
}

// Load wishlist from localStorage
const loadWishlist = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return []; // Return an empty wishlist when on the server
};

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(), // Initialize from localStorage
  reducers: {
    addToWishlist(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        (item) => item.slug === action.payload.slug && item.selectedSize === action.payload.selectedSize
      );

      if (!existingItem) {
        // Add new item if it doesn't already exist
        state.push(action.payload);
      }

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    removeFromWishlist(state, action: PayloadAction<{ slug: string; selectedSize: string }>) {
      // Remove the item from the wishlist
      const updatedState = state.filter(
        (item) => !(item.slug === action.payload.slug && item.selectedSize === action.payload.selectedSize)
      );

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updatedState));
      }

      return updatedState; // Return updated state
    },
    clearWishlist(state) {
      // Clear all items in the wishlist
      const updatedState: CartItem[] = [];

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updatedState));
      }

      return updatedState; // Return an empty array
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

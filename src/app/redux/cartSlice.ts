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

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return []; // Return an empty cart when on the server
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(), // Initialize from localStorage
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        (item) => item.slug === action.payload.slug && item.selectedSize === action.payload.selectedSize
      );

      if (existingItem) {
        // If the item with the same size exists, increase quantity
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Add new item with selected size
        state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    remove(state, action: PayloadAction<{ slug: string; selectedSize: string }>) {
      // Filter out the specific item with the selected size
      const updatedState = state.filter(
        (item) => !(item.slug === action.payload.slug && item.selectedSize === action.payload.selectedSize)
      );

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedState));
      }
      return updatedState; // Return updated state
    },
    updateQuantity(state, action: PayloadAction<{ slug: string; selectedSize: string; quantity: number }>) {
      const item = state.find(
        (item) => item.slug === action.payload.slug && item.selectedSize === action.payload.selectedSize
      );

      if (item) {
        // Update quantity only if it's greater than 0
        item.quantity = Math.max(1, action.payload.quantity); // Prevent negative/zero quantity
      }

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { add, remove, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
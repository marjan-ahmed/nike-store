"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, HeartIcon, XIcon } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, remove, updateQuantity } from "@/app/redux/cartSlice";
import { RootState } from "../redux/store";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function Cart() {  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  // Handle item removal using slug and size
  const handleRemove = (item: CartItem) => {
    dispatch(remove({ slug: item.slug, selectedSize: item.selectedSize }));
  };

  // Handle quantity update
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ 
        slug: item.slug, 
        selectedSize: item.selectedSize, 
        quantity: newQuantity 
      }));
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Bag</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
              <Link href="/air-max-dn8-shoes">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item: CartItem) => (
                <div key={`${item.slug}-${item.selectedSize}`} className="mb-6 flex flex-col sm:flex-row gap-4 pb-6 border-b">
                  <div className="relative w-full sm:w-[161px] h-[161px] bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={161}
                      height={161}
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{item.category}</p>

                    <div className="mt-2">
                      <span className="font-medium">Size: </span>{" "}
                      <span>{item.selectedSize}</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded-full">
                        <button 
                          className="w-8 h-8 rounded-full hover:bg-[#e9e9e9] flex items-center justify-center"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          <MinusIcon size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 rounded-full hover:bg-[#e9e9e9] flex items-center justify-center"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          <PlusIcon size={16} />
                        </button>
                      </div>
                      
                      <div className="flex gap-4">
                        <button className="text-gray-500 hover:text-black">
                          <HeartIcon size={20} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-black"
                          onClick={() => handleRemove(item)}
                        >
                          <XIcon size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => cartItems.forEach((item) => handleRemove(item))}
                >
                  Clear Cart
                </Button>
                <Link href="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery & Handling</span>
                <span className="font-medium">Free</span>
              </div>
              
              <Separator />
              
              <div className="font-semibold mb-6 flex text-[15px] justify-between flex-col sm:flex-row gap-3 pb-4 border-b">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <CheckoutButton cartItems={cartItems} />
          
              <Button className="w-full py-6 rounded-full" variant="default">
                <Link href={'/signin'}>Member Checkout</Link>
              </Button>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
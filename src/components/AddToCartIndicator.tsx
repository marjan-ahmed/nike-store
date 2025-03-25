"use client";

import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const AddToCartIndicator = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <Link href="/cart" className="relative cursor-pointer flex items-center">
      <IoBagOutline size={20} className="text-black" />
      {cartItems.length > 0 && (
        <span className="absolute top-[5px] right-2 text-black text-[10px] font-medium">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
};

export default AddToCartIndicator;

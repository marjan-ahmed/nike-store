'use client'
import { IoBagOutline } from "react-icons/io5";
import { useCart } from "../../redux/CartContext";

const AddToCartIndicator = () => {
  const { cart } = useCart();

  return (
    <div className="relative cursor-pointer">
      <IoBagOutline size={24} />
      
      {/* Show badge if cart is not empty */}
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cart.length}
        </span>
      )}
    </div>
  );
};

export default AddToCartIndicator;

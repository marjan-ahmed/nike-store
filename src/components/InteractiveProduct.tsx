"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs"; // Import Clerk authentication hooks
import { Button } from "@/components/ui/button";
import { Heart, Ruler } from "lucide-react";
import ProductInfoTabs from "./ProductInfoTabs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SizeGuidePopover from "./SizeGuide";

interface Product {
  name: string;
  price: number;
  sizes: string[];
  category: string;
  materialMade: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetailRight: React.FC<ProductDetailProps> = ({ product }) => {
  const { isSignedIn } = useUser(); // Check if user is logged in
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!isSignedIn) {
      window.location.href = "/signin"; // Redirect to sign-in page if not logged in
      return;
    }

    // ✅ Add product to cart logic here (implement cart functionality)
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <div className="md:col-span-5">
      <div className="space-y-6 px-2">
        <div>
          <p className="text-red-600 text-sm">{product.materialMade}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.category}</p>
        </div>

        <p className="text-xl font-semibold">${product.price}</p>

        {/* Size Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Select Size</h2>
            <SizeGuidePopover />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => (
              <button
                onClick={() => setSelectedSize(size)}
                key={size}
                className={`border rounded-md py-3 px-2 text-center transition-colors ${
                  selectedSize === size ? "border-black border-2" : "hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            className="w-full py-6 text-base rounded-full bg-black hover:bg-black/90"
          >
            Add to Bag
          </Button>
          <Button variant="outline" className="w-full py-6 text-base rounded-full border-gray-300">
            <Heart className="w-5 h-5 mr-2" /> Favourite
          </Button>
        </div>
        <div className="mt-14">
      <ProductInfoTabs />
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, itaque praesentium quaerat facilis dolores laudantium necessitatibus sapiente ipsam eaque est.lorem10 Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, vel?</p>
      </div>
    </div>
  );
};

export default ProductDetailRight;

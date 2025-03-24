"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductInfoTabs from "./ProductInfoTabs";
import SizeGuidePopover from "./SizeGuide";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { add } from "../app/redux/cartSlice";
import Swal from "sweetalert2";

interface Product {
  name: string;
  price: number;
  sizes: string[];
  category: string;
  materialMade: string;
  id: string;
  slug: string;
  images: string[];
  quantity: number;
  selectedSize: string[]
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetailRight: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAdd = (product: Product) => {
    if (!selectedSize) {
      Swal.fire({
        title: "Please select a size!",
        text: "You need to choose a size before adding to the cart.",
        icon: "warning",
      });
      return;
    }

    dispatch(add({ ...product, selectedSize, quantity: 1 }));

    Swal.fire({
      title: "Product Added to Cart!",
      text: `${product.name} has been added successfully.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
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
                  selectedSize === size ? "border-black" : "hover:border-black"
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
            onClick={() => handleAdd(product)}
            className="w-full py-6 text-base rounded-full bg-black hover:bg-black/90"
          >
            Add to Bag
          </Button>
          <div className="mb-3 flex gap-10 items-center">
            <Button variant="outline" className="w-full py-6 text-base rounded-full border-gray-300">
              Favourite <FaRegHeart className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>

        <div className="w-[270px] mb-20 text-center mx-auto">
          <span className="text-[16px] font-semibold text-[#707072]">
            This product is excluded from site promotions and discounts.
          </span>
        </div>

        <p className="mt-4">
          More Air, less bulk. The Dn8 takes our Dynamic Air system and condenses it into a sleek, low-profile package.
          Powered by eight pressurised Air tubes, it gives you a responsive sensation with every step. Enter an unreal
          experience of movement.
        </p>

        <div className="mt-14">
          <ProductInfoTabs />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailRight;

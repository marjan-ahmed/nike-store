"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { ChevronLeft, ChevronRight, Heart, Ruler } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Product {
  name: string;
  slug: string;
  description: string;
  tag: string;
  price: number;
  sizes: string[];
  category: string;
  highlyRated: boolean;
  materialMade: string;
  images: string[];
}

interface ProductDetailProps {
  params: { slug: string };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        name,
        "slug": slug.current,
        description,
        tag,
        price,
        sizes,
        category,
        highlyRated,
        materialMade,
        "images": images[].asset->url
      }`;

      const data = await client.fetch(query, { slug: params.slug });

      if (!data) {
        router.push("/404"); // Redirect to 404 page if not found
      } else {
        setProduct(data);
        setSelectedImage(data.images[0]); // Set first image as default
      }
    };

    fetchProduct();
  }, [params.slug, router]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 md:py-8">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        
        {/* Thumbnails on Left - Hidden on Small Screens */}
        <div className="hidden md:flex md:flex-col md:col-span-1 gap-2">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`border ${selectedImage === image ? "border-black" : "border-transparent"} rounded-md cursor-pointer`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                width={100}
                height={100}
                className="object-cover w-[80px] h-[80px] rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Main Product Image Carousel */}
        <div className="md:col-span-6 relative">
        <Carousel className="w-full max-w-[530px] mx-auto px-2">
  <CarouselContent>
    {product.images.map((image: string, index: number) => (
      <CarouselItem key={index} className="flex justify-center items-center">
        <Image
          src={image}
          alt={`Product image ${index}`}
          width={530}
          height={660}
          className="object-cover w-full h-full rounded-lg"
          priority
        />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
</Carousel>

        </div>

        {/* Product Details - Right Side */}
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
                <button className="flex items-center text-sm font-medium">
                  <Ruler className="w-4 h-4 mr-1" />
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="border rounded-md py-3 px-2 text-center hover:border-black transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full py-6 text-base rounded-full bg-black hover:bg-black/90">Add to Bag</Button>
              <Button variant="outline" className="w-full py-6 text-base rounded-full border-gray-300">
                <Heart className="w-5 h-5 mr-2" />
                Favourite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

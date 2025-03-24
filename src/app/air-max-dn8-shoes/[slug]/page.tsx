import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InteractiveProduct from "@/components/InteractiveProduct";

interface Product {
  id: string;
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
  quantity: number;
  selectedSize: string[];
}

interface ProductDetailProps {
  params: { slug: string };
}

const fetchProduct = async (slug: string): Promise<Product | null> => {
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

  return await client.fetch(query, { slug });
};

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const product = await fetchProduct(params.slug);

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto mt-14 px-2 sm:px-4 md:py-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      
      <div className="md:col-span-7">
        <div className="sticky top-4">
          <div className="flex flex-col md:flex-row gap-4">
            
            <div className="hidden md:flex flex-col gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="border rounded-md cursor-pointer">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width={80}
                    height={80}
                    className="object-cover w-[80px] h-[80px] rounded-md"
                  />
                </div>
              ))}
            </div>
            
            <div className="relative">
              <Carousel className="w-full max-w-[530px] px-2">
                <CarouselContent>
                  {product.images.map((image, index) => (
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
          </div>
        </div>
      </div>
  
      <div className="md:col-span-5">
        <InteractiveProduct product={product} />
      </div>
    </div>
  </div>
  
  );
};

export default ProductDetail;
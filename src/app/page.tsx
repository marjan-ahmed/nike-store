import CategoriesGallery from "@/components/CategoriesGallery";
import Product from "@/components/ProductDesign1";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
  <div className="w-full h-[46vw] flex flex-wrap relative">
  {/* Left Section */}
  <div className="bg-[#262123] h-full w-1/2 relative">
    <Image
      src="/hero-1.JPG"
      alt="Hero Image"
      fill
      className="object-cover"
    />
  </div>

  {/* Right Section */}
  <div className="bg-[#262123] h-full w-1/2 relative">
    <Image
      src="/hero-2.JPG"
      alt="Hero Image 2"
      fill
      className="object-cover"
    />
  </div>

  {/* Centered Content */}
  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white text-center">
  <h1 className="text-5xl sm:text-6xl font-black uppercase  tracking-tighter">AIR MAX DN8</h1>
  <p className="text-lg sm:text-xl mt-4">
    Full-length Dynamic Air, Get the sensation
  </p>
  <button className="mt-6 px-4 py-2 rounded-full bg-white text-black font-bold uppercase hover:bg-gray-200 transition">
    <Link href={'/air-max-dn8-shoes'}>Shop DN8</Link>
  </button>
</div>
</div>
    <div className=" my-6 mx-3 sm:mx-12">
    <CategoriesGallery />
    <div className="mt-16">
    <Carousel>
  {/* Header Section */}
  <div className="flex flex-wrap items-center justify-between px-4 md:px-10">
    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Shop Our Icons</h1>
    <div className="flex gap-2">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  </div>

  {/* Carousel Content */}
  <CarouselContent>
    {/* First Slide */}
    <CarouselItem>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Product image="/air max.jpg" title="Air Max" />
        <Product image="/sh2 (1).jpg" title="Y2K" />
        <Product image="/sh3 (1).jpg" title="Air Force 1" />
      </div>
    </CarouselItem>

    {/* Second Slide */}
    <CarouselItem>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Product image="/sh4 (1).jpg" title="Field General" />
        <Product image="/sh5 (1).jpg" title="Air Jordan" />
        <Product image="/sh6 (1).jpg" title="Pegasus" />
      </div>
    </CarouselItem>

    {/* Third Slide */}
    <CarouselItem>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Product image="/sh7 (1).jpg" title="Metcon" />
        <Product image="/sh8 (1).jpg" title="Mercurial" />
      </div>
    </CarouselItem>
  </CarouselContent>
</Carousel>


    </div>
    </div>
    </>
  );
}

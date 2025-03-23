import CategoriesGallery from "@/components/CategoriesGallery";
import Product from "@/components/ProductDesign1";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
 <div className="w-full h-auto sm:h-[46vw] flex flex-col sm:flex-row relative">
      {/* Left Section */}
      <div className="bg-[#262123] w-full sm:w-1/2 min-h-[37vh] relative">
        <Image
          src="/hero-1.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="bg-[#262123] w-full sm:w-1/2 min-h-[37vh] relative">
        <Image
          src="/hero-2.jpg"
          alt="Hero Image 2"
          fill
          className="object-cover"
        />
      </div>

      {/* Centered Content */}
      <div className="absolute bottom-12 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white text-center p-4 w-full">
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
          AIR MAX DN8
        </h1>
        <p className="text-lg sm:text-xl mt-4">
          Full-length Dynamic Air, Get the sensation
        </p>
        <Link
          href="/air-max-dn8-shoes"
          className="mt-6 px-4 py-1.5 text-sm rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Shop DN8
        </Link>
      </div>
    </div>

    <div className=" my-6 mx-0 sm:mx-12">
    <CategoriesGallery />
    <div className="mt-16">
    <Carousel>
  {/* Header Section */}
  <div className="flex flex-wrap items-center justify-between px-4 md:px-10">
    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Shop Our Icons</h1>
    {/* Hide arrows on small screens */}
    <div className="hidden sm:flex gap-2">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  </div>

  {/* Carousel Content */}
  <div className="overflow-hidden w-full">
    <div className="flex p-2 gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
      {/* Individual Product Slides with Responsive Width */}
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/air max.jpg" title="Air Max" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh2 (1).jpg" title="Y2K" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh3 (1).jpg" title="Air Force 1" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh4 (1).jpg" title="Field General" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh5 (1).jpg" title="Air Jordan" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh6 (1).jpg" title="Pegasus" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh7 (1).jpg" title="Metcon" />
      </div>
      <div className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] flex-shrink-0 snap-center">
        <Product image="/sh8 (1).jpg" title="Mercurial" />
      </div>
    </div>
  </div>
</Carousel>




    </div>
    </div>
    </>
  );
}

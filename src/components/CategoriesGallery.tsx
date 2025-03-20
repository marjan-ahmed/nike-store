import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

function CategoriesGallery() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* 🟢 Carousel for Mobile Devices */}
      <div className="sm:hidden w-full">
        <Carousel>
          <CarouselContent>
            {[
              { src: "/content1.jpg", alt: "Men Category", link: "/mens", label: "Men's" },
              { src: "/content2.jpg", alt: "Women's Category", link: "/womens", label: "Women's" },
              { 
                src: "/content3.jpg", 
                alt: "Kids & Teens Category", 
                extraButtons: [
                  { link: "/teens", label: "Teens'" },
                  { link: "/kids", label: "Kids'" }
                ] 
              }
            ].map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-6">
              <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[580px] relative p-4 sm:p-6 md:p-8">
                <Image src={item.src} alt={item.alt} fill className="object-cover " />
                
                {/* Button Container */}
                <div className="absolute bottom-8 right-10 flex gap-4 p-2 sm:p-4">
                  {item.link && (
                    <Button className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 shadow-md">
                      <Link href={item.link}>{item.label}</Link>
                    </Button>
                  )}
                  {item.extraButtons?.map((btn, btnIndex) => (
                    <Button key={btnIndex} className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 shadow-md">
                      <Link href={btn.link}>{btn.label}</Link>
                    </Button>
                  ))}
                </div>
                </div>
              </div>
            </CarouselItem>
            
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 🔹 Grid Layout for Larger Screens */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {[
          { src: "/content1.jpg", alt: "Men Category", link: "/mens", label: "Men's" },
          { src: "/content2.jpg", alt: "Women's Category", link: "/womens", label: "Women's" },
          { 
            src: "/content3.jpg", 
            alt: "Kids & Teens Category", 
            extraButtons: [
              { link: "/teens", label: "Teens'" },
              { link: "/kids", label: "Kids'" }
            ] 
          }
        ].map((item, index) => (
          <div key={index} className="w-full h-[580px] relative">
            <Image src={item.src} alt={item.alt} fill className="object-cover" />
            <div className="absolute bottom-12 right-10 flex gap-2">
              {item.link && (
                <Button className="px-6 py-5 rounded-full bg-white text-black hover:bg-gray-200">
                  <Link href={item.link}>{item.label}</Link>
                </Button>
              )}
              {item.extraButtons?.map((btn, btnIndex) => (
                <Button key={btnIndex} className="px-6 py-5 rounded-full bg-white text-black hover:bg-gray-200">
                  <Link href={btn.link}>{btn.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
  {[
    { src: "/content4.jpg", description: "New In Running", product: "Vomero 18" },
    { src: "/content5.jpg", description: "Nike Football", product: "Mad Energy Pack" },
    { src: "/content6.jpg", description: "Nike Style By", product: "Field General" },
    { src: "/content7.jpg", description: "Tailored For All-Day Comfort", product: "Nike 27.7 Collection" }
  ].map((item, index) => (
    <div key={index} className="w-full h-[400px] sm:h-[500px] md:h-[748px] relative">
      <Image src={item.src} alt={`Image ${index + 1}`} fill className="object-cover" />
      <div className="absolute left-6 bottom-6 sm:left-12 sm:bottom-12 text-white">
        <h2 className="text-[18px] font-medium">{item.description}</h2>
        <h1 className="text-[24px] font-bold">{item.product}</h1>
        <button className="mt-4 px-4 sm:px-6 py-2 bg-white text-black font-bold uppercase rounded-full hover:bg-gray-200 transition">
          Shop
        </button>
      </div>
    </div>
  ))}
</div>



      {/* 🔹 Full-width Image */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[748px] relative">
        <Image src="/content8.jpg" alt="Content 8" fill className="object-cover" />
        <div className="absolute left-12 bottom-16 text-black">
        <h2 className="text-[18px] font-medium">Athlete Picks</h2>
        <h1 className="text-[24px] font-bold">Sha'Carri Richardson</h1>
        <Button className="mt-4 px-6 py-2uppercase rounded-full">
          Shop
        </Button>
      </div>
      </div>
    </div>
  );
}

export default CategoriesGallery;

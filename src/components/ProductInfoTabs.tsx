"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IoIosStar } from "react-icons/io";

const ProductInfoTabs = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-sm font-semibold border-b-2 border-black mb-4 inline-block w-fit">
        View Product Details
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="delivery">
          <AccordionTrigger className="text-[17px]">Free Delivery and Returns</AccordionTrigger>
          <AccordionContent>
            Get free delivery and returns on this product. Check our return policy for more details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-made">
          <AccordionTrigger className="text-[17px]">How This Was Made</AccordionTrigger>
          <AccordionContent>
            This product is made using sustainable materials with eco-friendly processes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reviews">
          <AccordionTrigger className="text-[17px]">
            Reviews (25)
            <div className="flex md:ml-48 ml-20">
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} size={16} fill="currentColor" className="text-black" />
              ))}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Customers love this product! Check out the reviews to see what they’re saying.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfoTabs;

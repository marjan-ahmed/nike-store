'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IoIosStar } from "react-icons/io";
import ReviewDialog from "./ReviewDialog";
import { useUser } from "@clerk/clerk-react";
import ReviewsList from "./ReviewList";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/app/lib/supabaseClient";

const ProductInfoTabs = ({slug}: {slug: string}) => {
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchTotalReviews = async () => {
      const { count, error } = await supabaseClient
        .from("reviews")
        .select("*", { count: "exact", head: true }) // Only fetch count
        .eq("product_slug", slug);

      if (error) {
        console.error("Error fetching total reviews:", error.message);
      } else {
        setTotalReviews(count || 0);
      }
    };

    fetchTotalReviews();
  }, [slug]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-sm font-semibold border-b-2 border-black mb-4 inline-block w-fit">
        View Product Details
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="delivery">
          <AccordionTrigger className="text-[20px]">Free Delivery and Returns</AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Get free delivery and returns on this product. Check our return policy for more details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-made">
          <AccordionTrigger className="text-[20px]">How This Was Made</AccordionTrigger>
          <AccordionContent className="text-[16px]">
            This product is made using sustainable materials with eco-friendly processes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reviews">
          <AccordionTrigger className="text-[20px]">
            Reviews ({totalReviews})
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            <ReviewDialog productSlug={slug} /> 
            <ReviewsList productSlug={slug} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfoTabs;

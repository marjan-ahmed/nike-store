"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/lib/supabaseClient";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { IoIosStar } from "react-icons/io";

export default function ReviewsList({ productSlug }: { productSlug: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useUser()

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("reviews") // Replace with your table name
        .select("*") // Fetch all columns for debugging
        .eq("product_slug", productSlug)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        console.log("Fetched Reviews:", data); // Log fetched reviews
        setReviews(data || []);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [productSlug, user]);

  return (
    <div className="mt-6">
  <h2 className="cursor-pointer text-sm font-semibold border-b-2 border-black mb-4 inline-block w-fit">
          Read review
        </h2>  
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg shadow">
              {/* Display first name and review date */}
              <div className="flex justify-between items-center">
                <p className="font-normal text-gray-500">{user?.fullName || "Anonymous"}</p>
                <p className="text-sm text-gray-500">{format(new Date(review.created_at), "PPP")}</p>
              </div>

              {/* Display black stars based on rating */}
              <div className="flex mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < review.rating ? "text-black" : "text-gray-300"}>
                    <IoIosStar />
                  </span>
                ))}
              </div>

              {/* Display review text */}
              <p className="mt-2 text-sm">{review.review_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

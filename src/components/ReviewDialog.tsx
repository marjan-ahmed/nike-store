"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/app/lib/supabaseClient";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react"; // ✅ Import useUser

export default function ReviewDialog({ productSlug }: { productSlug: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    review_title: "",
    review_description: "",
    fit_rating: "True to Size",
    comfort_rating: "Very Comfortable",
    recommend: "true",
  });
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const { user } = useUser(); // ✅ Use Clerk's user

  const supabase = supabaseClient;

  // Check if user has already submitted a review
  useEffect(() => {
    const checkIfUserReviewed = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("reviews")
        .select("id")
        .eq("product_slug", productSlug)
        .single(); // We expect only one review per user

      if (error && error.code !== "PGRST116") {
        console.error("Error checking user reviews:", error.message);
      }

      setUserHasReviewed(!!data); // ✅ If data exists, user has reviewed
    };

    checkIfUserReviewed();
  }, [user, productSlug, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (userHasReviewed) {
      toast.error("You have already submitted a review for this product.");
      return;
    }

    setLoading(true);

    if (!user) {
      toast.error("You must be logged in to submit a review.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        product_slug: productSlug,
        review_text: formData.review_description,
        rating: formData.rating,
        review_title: formData.review_title,
        fit_rating: formData.fit_rating,
        comfort_rating: formData.comfort_rating,
        recommend: formData.recommend,
        user_id: user.id, // ✅ Store user ID in DB
      },
    ]);

    if (error) {
      console.error("Error inserting review:", error.message);
      toast.error("Failed to submit review.");
    } else {
      toast.success("Review submitted successfully!");
      setUserHasReviewed(true);
    }

    setLoading(false);
  };

  return (
    <>
    {!userHasReviewed ? (
      <Dialog>
        <DialogTrigger asChild>
          <h2 className="cursor-pointer text-sm font-semibold border-b-2 border-black mb-4 inline-block w-fit">
            Write a review
          </h2>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
    
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input type="number" name="rating" id="rating" value={formData.rating} onChange={handleChange} min="1" max="5" />
    
          <Label htmlFor="review_title">Review Title (Optional)</Label>
          <Input type="text" name="review_title" id="review_title" value={formData.review_title} onChange={handleChange} />
    
          <Label htmlFor="review_description">Review Description</Label>
          <Textarea name="review_description" id="review_description" value={formData.review_description} onChange={handleChange} />
    
          <Label>How did this product fit?</Label>
          <RadioGroup name="fit_rating" value={formData.fit_rating} onValueChange={(value) => setFormData({ ...formData, fit_rating: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Runs Small" id="runs-small" />
              <Label htmlFor="runs-small">Runs Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="True to Size" id="true-to-size" />
              <Label htmlFor="true-to-size">True to Size</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Runs Big" id="runs-big" />
              <Label htmlFor="runs-big">Runs Big</Label>
            </div>
          </RadioGroup>
    
          <Label>How comfortable was this product?</Label>
          <RadioGroup name="comfort_rating" value={formData.comfort_rating} onValueChange={(value) => setFormData({ ...formData, comfort_rating: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Uncomfortable" id="uncomfortable" />
              <Label htmlFor="uncomfortable">Uncomfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Average" id="average" />
              <Label htmlFor="average">Average</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Very Comfortable" id="very-comfortable" />
              <Label htmlFor="very-comfortable">Very Comfortable</Label>
            </div>
          </RadioGroup>
    
          <Label>Would you recommend this product?</Label>
          <RadioGroup name="recommend" value={formData.recommend} onValueChange={(value) => setFormData({ ...formData, recommend: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="recommend-yes" />
              <Label htmlFor="recommend-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="recommend-no" />
              <Label htmlFor="recommend-no">No</Label>
            </div>
          </RadioGroup>
    
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogContent>
      </Dialog>
    ) : (
      <p className="text-red-600 font-semibold mb-4">You have already submitted a review for this product.</p>
    )}
</>    
  );
}

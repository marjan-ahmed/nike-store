import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// Helper function to ensure image URLs are absolute
function getAbsoluteImageUrl(imageUrl: string): string {
  if (!imageUrl) return ""

  // If the URL is already absolute, return it
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }

  // If it's a relative URL, make it absolute
  const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nike-clone-version.vercel.app"
    : "http://localhost:3000";

  // Remove leading slash if present in both baseUrl and imageUrl
  if (baseUrl.endsWith("/") && imageUrl.startsWith("/")) {
    return `${baseUrl}${imageUrl.substring(1)}`
  }

  // Add slash if missing in both
  if (!baseUrl.endsWith("/") && !imageUrl.startsWith("/")) {
    return `${baseUrl}/${imageUrl}`
  }

  // Otherwise just concatenate
  return `${baseUrl}${imageUrl}`
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()
    const { cartItems } = body

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
    }

    // Format line items for Stripe
    const lineItems = cartItems.map((item) => {
      // Create the product_data object with required fields
      const product_data: any = {
        name: item.name,
      }

      // Only add description if it exists and is not empty
      if (item.description && item.description.trim() !== "") {
        product_data.description = item.description
      }

      // Handle images - check if it's an array or a single string
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        // Use only the first image from the array
        const firstImage = item.images[0]
        if (firstImage) {
          const absoluteImageUrl = getAbsoluteImageUrl(firstImage)
          if (absoluteImageUrl) {
            product_data.images = [absoluteImageUrl]
          }
        }
      }
      // Fallback to the image property if images array is not available
      else if (item.image) {
        const absoluteImageUrl = getAbsoluteImageUrl(item.image)
        if (absoluteImageUrl) {
          product_data.images = [absoluteImageUrl]
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data,
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity,
      }
    })

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
    })

    // Return the session ID and URL
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 })
  }
}


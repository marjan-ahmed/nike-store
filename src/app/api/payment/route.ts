import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Helper function to ensure image URLs are absolute
function getAbsoluteImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://nike-clone-version.vercel.app"
      : "http://localhost:3000";

  if (baseUrl.endsWith("/") && imageUrl.startsWith("/")) {
    return `${baseUrl}${imageUrl.substring(1)}`;
  }

  if (!baseUrl.endsWith("/") && !imageUrl.startsWith("/")) {
    return `${baseUrl}/${imageUrl}`;
  }

  return `${baseUrl}${imageUrl}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartItems } = body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 });
    }

    const lineItems = cartItems.map((item) => {
      const product_data: any = {
        name: item.name,
      };

      if (item.description && item.description.trim() !== "") {
        product_data.description = item.description;
      }

      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        const firstImage = item.images[0];
        if (firstImage) {
          const absoluteImageUrl = getAbsoluteImageUrl(firstImage);
          if (absoluteImageUrl) {
            product_data.images = [absoluteImageUrl];
          }
        }
      } else if (item.image) {
        const absoluteImageUrl = getAbsoluteImageUrl(item.image);
        if (absoluteImageUrl) {
          product_data.images = [absoluteImageUrl];
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data,
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // define baseUrl here (important)
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.NODE_ENV === "production"
        ? "https://nike-clone-version.vercel.app"
        : "http://localhost:3000");

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // Stripe requires the literal {CHECKOUT_SESSION_ID}, not a template var
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

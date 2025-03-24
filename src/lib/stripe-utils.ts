import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      success: true,
      session,
    }
  } catch (error) {
    console.error("Error retrieving session:", error)
    return {
      success: false,
      error: "Invalid session",
    }
  }
}


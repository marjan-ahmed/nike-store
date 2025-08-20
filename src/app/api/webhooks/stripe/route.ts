import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const STRIPE_WEBHOOK_SECRET = "whsec_ZcHpOYDenqHOnnFDdeDBbxdVye7ymcMI";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service key for server
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // ✅ Try to get hosted invoice or receipt
    let receiptUrl: string | null = null;

    if (session.invoice) {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      receiptUrl = invoice.hosted_invoice_url;
    } else if (session.payment_intent) {
      const pi = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );
      receiptUrl = pi.charges.data[0]?.receipt_url ?? null;
    }

    // ✅ Save order in Supabase
    await supabase.from("orders").insert({
      user_id: session.metadata?.user_id, // send this when creating checkout session
      stripe_session_id: session.id,
      receipt_url: receiptUrl,
      status: "processing", // update later when shipped/delivered
    });

    console.log("✅ Order saved with receipt:", receiptUrl);
  }

  return NextResponse.json({ received: true });
}

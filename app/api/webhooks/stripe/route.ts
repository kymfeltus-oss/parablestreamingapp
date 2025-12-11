// ./app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event;
  try {
    event = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      // FIX: The latest Stripe SDK types expect "2025-11-17.clover".
      // Use 'as any' to allow your preferred API version to compile.
      apiVersion: "2023-10-16" as any, 
    }).webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription; // Added a type assertion for safety

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/subscriptions/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorId: sub.metadata.creator_id,
        customerId: sub.customer, // This will be the ID string, e.g., 'cus_ABC'
        subscriptionId: sub.id,
      }),
    });
  }

  return NextResponse.json({ received: true });
}
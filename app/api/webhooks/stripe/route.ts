import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event;
  try {
    event = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    }).webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "customer.subscription.created") {
    const sub = event.data.object;

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/subscriptions/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorId: sub.metadata.creator_id,
        customerId: sub.customer,
        subscriptionId: sub.id,
      }),
    });
  }

  return NextResponse.json({ received: true });
}


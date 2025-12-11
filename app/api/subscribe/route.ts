import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { creatorId, priceId } = await req.json();

  const checkout = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: "https://parablestreaming.com/sub-success",
      cancel_url: "https://parablestreaming.com/sub-cancel",
      "metadata[creator_id]": creatorId,
    }),
  });

  const json = await checkout.json();
  return NextResponse.json(json);
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const body = new URLSearchParams({
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": "Donation",
    "line_items[0][price_data][unit_amount]": String(amount),
    "line_items[0][quantity]": "1",
    mode: "payment",
    success_url: "https://parablestreaming.com/success",
    cancel_url: "https://parablestreaming.com/cancel",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const json = await res.json();
  return NextResponse.json(json);
}

import { NextResponse } from "next/server";
import { getSeries } from "@/lib/parableSeries";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const series = getSeries(params.slug);

  if (!series) {
    return NextResponse.json(
      { ok: false, error: "Series not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, series });
}

import { NextResponse } from "next/server";
import { getOpportunity } from "@/data/export-os";

export function GET(request: Request) {
  const url = new URL(request.url);
  const product = url.searchParams.get("product") ?? "coffee";

  return NextResponse.json({
    query: product,
    result: getOpportunity(product),
  });
}

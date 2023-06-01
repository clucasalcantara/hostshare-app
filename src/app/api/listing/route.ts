import { NextResponse, type NextRequest } from "next/server";
import { listings } from "./data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");

  const listing = listings.find((listing: any) => listing.info.id === ref);

  if (listing) {
    return NextResponse.json({ listing });
  }

  return NextResponse.json(404, { message: "Not found" } as any);
}

import { NextResponse } from "next/server";
import { categories } from "./data";

export async function GET() {
  const data = {
    count: categories.length,
    categories: categories,
  };

  return NextResponse.json({ data });
}

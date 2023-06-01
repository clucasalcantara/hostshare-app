import { NextResponse, type NextRequest } from "next/server";
import { listings } from "./data";
import { uniqBy } from "lodash";

const pageSize = 20;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const filterLocation = searchParams.get("location");

  let itemsRaw = uniqBy([...listings], "ref");

  if (filterLocation) {
    itemsRaw = itemsRaw.filter((data: any) => {
      const {
        info: {
          location: { city },
        },
      } = data;

      if (filterLocation?.toLowerCase().includes(city.toLowerCase())) {
        return data;
      }
    });
  }

  const data = {
    count: itemsRaw.length,
    listings: itemsRaw,
    page,
    pages: Math.floor(listings.length / pageSize),
  };

  return NextResponse.json({ data });
}

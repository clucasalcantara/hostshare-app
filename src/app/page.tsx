// Components
import Script from "next/script";
import { ListingCategories, ListingsGrid } from "@/components";

const getListings = async (pageNumber: number = 1) => {
  const listingsEndpoint = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://127.0.0.1:3000";

  try {
    const res = await fetch(
      `${listingsEndpoint}/api/listings?page=${pageNumber}`,
      {
        cache: "force-cache",
      }
    );

    const listings = await res.json();

    return listings;
  } catch (e) {
    console.error(e);
    return { listings: [] };
  }
};

export default async function Home() {
  const {
    data: { listings = [] },
  } = (await getListings()) || { data: { listings: [] } };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
      />
      <main className="flex min-h-full flex-col items-center justify-between p-24">
        {/* <ListingCategories categories={categories} /> */}
        <ListingsGrid data={listings} />
      </main>
    </>
  );
}
